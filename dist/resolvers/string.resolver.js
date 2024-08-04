"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringResolver = void 0;
class StringResolver {
    resolve(payload) {
        try {
            return JSON.parse(payload);
        }
        catch (error) {
            throw new Error(`An error ocurred while parsing the payload: ${error.message}`);
        }
    }
}
exports.StringResolver = StringResolver;
