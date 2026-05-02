import { wrapError } from './error';
export function safeJsonParse(raw, context = 'JSON parse') {
    try {
        return JSON.parse(raw);
    }
    catch (e) {
        throw wrapError(context, e);
    }
}
export function ensureRecord(value, context = 'Expected JSON object') {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
        throw new Error(`${context}: received ${Array.isArray(value) ? 'array' : typeof value}`);
    }
    return value;
}
//# sourceMappingURL=json.js.map