"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringResolver = void 0;
const error_1 = require("../utils/error");
const json_1 = require("../utils/json");
class StringResolver {
    resolve(payload) {
        try {
            const parsed = (0, json_1.safeJsonParse)(payload, 'Failed to parse inline payload JSON');
            const record = (0, json_1.ensureRecord)(parsed, 'Inline payload is not a JSON object');
            return Promise.resolve(record);
        }
        catch (e) {
            throw (0, error_1.wrapError)('An error occurred while parsing the inline payload', e);
        }
    }
}
exports.StringResolver = StringResolver;
//# sourceMappingURL=string.resolver.js.map