"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WrappedError = void 0;
exports.getErrorMessage = getErrorMessage;
exports.wrapError = wrapError;
function getErrorMessage(error) {
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
class WrappedError extends Error {
    cause;
    constructor(message, cause) {
        super(message);
        this.cause = cause;
        this.name = 'WrappedError';
    }
}
exports.WrappedError = WrappedError;
function wrapError(context, error) {
    return new WrappedError(`${context}: ${getErrorMessage(error)}`, error);
}
//# sourceMappingURL=error.js.map