export declare function getErrorMessage(error: unknown): string;
export declare class WrappedError extends Error {
    readonly cause?: unknown | undefined;
    constructor(message: string, cause?: unknown | undefined);
}
export declare function wrapError(context: string, error: unknown): WrappedError;
//# sourceMappingURL=error.d.ts.map