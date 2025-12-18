import { wrapError } from './error';
import { ensureRecord } from './json';

export class HttpError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly url: string,
    public readonly bodySnippet?: string,
  ) {
    super(message);
    this.name = 'HttpError';
  }
}

export class ParseError extends Error {
  constructor(
    public readonly url: string,
    rawMessage: string,
  ) {
    super(`Failed to parse JSON from ${url}: ${rawMessage}`);
    this.name = 'ParseError';
  }
}

interface FetchJsonOptions {
  timeoutMs?: number;
  headers?: Record<string, string>;
  retries?: number;
  retryDelayMs?: number;
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

export async function fetchJsonObject(
  url: string,
  { timeoutMs = 10000, headers = {}, retries = 0, retryDelayMs = 500 }: FetchJsonOptions = {},
): Promise<Record<string, unknown>> {
  let attempt = 0;
  let lastError: unknown;

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

        throw new HttpError(
          `Request to ${url} failed with status ${res.status}`.trim(),
          res.status,
          url,
          snippet,
        );
      }

      let parsed: unknown;

      try {
        parsed = text.length ? JSON.parse(text) : {};
      } catch (e: unknown) {
        throw new ParseError(url, (e as Error).message);
      }

      try {
        return ensureRecord(parsed, 'Response JSON is not an object');
      } catch (e: unknown) {
        throw wrapError('Invalid JSON shape', e);
      }
    } catch (e: unknown) {
      lastError = e;
      attempt += 1;
      const shouldRetry =
        attempt <= retries &&
        (e instanceof HttpError ? e.status >= 500 : !(e instanceof ParseError));

      if (shouldRetry) {
        await sleep(retryDelayMs);
        continue;
      }

      throw e;
    } finally {
      clearTimeout(timeout);
    }
  }

  throw lastError;
}
