import { wrapError } from './error';
import { ensureRecord } from './json';
export class HttpError extends Error {
    status;
    url;
    bodySnippet;
    constructor(message, status, url, bodySnippet) {
        super(message);
        this.status = status;
        this.url = url;
        this.bodySnippet = bodySnippet;
        this.name = 'HttpError';
    }
}
export class ParseError extends Error {
    url;
    constructor(url, rawMessage) {
        super(`Failed to parse JSON from ${url}: ${rawMessage}`);
        this.url = url;
        this.name = 'ParseError';
    }
}
function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
}
export async function fetchJsonObject(url, { timeoutMs = 10000, headers = {}, retries = 0, retryDelayMs = 500 } = {}) {
    let attempt = 0;
    let lastError;
    while (attempt <= retries) {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), timeoutMs);
        try {
            const res = await fetch(url, {
                method: 'GET',
                headers: { Accept: 'application/json', ...headers },
                signal: controller.signal,
            });
            const text = await res.text();
            if (!res.ok) {
                const snippet = text.slice(0, 300);
                throw new HttpError(`Request to ${url} failed with status ${res.status}`.trim(), res.status, url, snippet);
            }
            let parsed;
            try {
                parsed = text.length ? JSON.parse(text) : {};
            }
            catch (e) {
                throw new ParseError(url, e.message);
            }
            try {
                return ensureRecord(parsed, 'Response JSON is not an object');
            }
            catch (e) {
                throw wrapError('Invalid JSON shape', e);
            }
        }
        catch (e) {
            lastError = e;
            attempt += 1;
            const shouldRetry = attempt <= retries &&
                (e instanceof HttpError ? e.status >= 500 : !(e instanceof ParseError));
            if (shouldRetry) {
                await sleep(retryDelayMs);
                continue;
            }
            throw e;
        }
        finally {
            clearTimeout(timeout);
        }
    }
    throw lastError;
}
//# sourceMappingURL=http.js.map