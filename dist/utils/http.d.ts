export declare class HttpError extends Error {
    readonly status: number;
    readonly url: string;
    readonly bodySnippet?: string | undefined;
    constructor(message: string, status: number, url: string, bodySnippet?: string | undefined);
}
export declare class ParseError extends Error {
    readonly url: string;
    constructor(url: string, rawMessage: string);
}
interface FetchJsonOptions {
    timeoutMs?: number;
    headers?: Record<string, string>;
    retries?: number;
    retryDelayMs?: number;
}
export declare function fetchJsonObject(url: string, { timeoutMs, headers, retries, retryDelayMs }?: FetchJsonOptions): Promise<Record<string, unknown>>;
export {};
//# sourceMappingURL=http.d.ts.map