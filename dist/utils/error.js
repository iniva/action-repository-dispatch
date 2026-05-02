export function getErrorMessage(error) {
    if (typeof error === 'object' &&
        error !== null &&
        'message' in error &&
        typeof error.message === 'string') {
        return error.message;
    }
    try {
        return JSON.stringify(error);
    }
    catch {
        return String(error);
    }
}
export class WrappedError extends Error {
    cause;
    constructor(message, cause) {
        super(message);
        this.cause = cause;
        this.name = 'WrappedError';
    }
}
export function wrapError(context, error) {
    return new WrappedError(`${context}: ${getErrorMessage(error)}`, error);
}
//# sourceMappingURL=error.js.map