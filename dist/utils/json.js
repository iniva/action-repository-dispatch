"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeJsonParse = safeJsonParse;
exports.ensureRecord = ensureRecord;
const error_1 = require("./error");
function safeJsonParse(raw, context = 'JSON parse') {
    try {
        return JSON.parse(raw);
    }
    catch (e) {
        throw (0, error_1.wrapError)(context, e);
    }
}
function ensureRecord(value, context = 'Expected JSON object') {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
        throw new Error(`${context}: received ${Array.isArray(value) ? 'array' : typeof value}`);
    }
    return value;
}
//# sourceMappingURL=json.js.map