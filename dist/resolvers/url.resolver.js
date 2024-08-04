"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlResolver = void 0;
const got_1 = __importDefault(require("got"));
class UrlResolver {
    async resolve(url) {
        try {
            const response = await (0, got_1.default)(url, { responseType: 'json' });
            return response.body;
        }
        catch (error) {
            if (error.name && error.name === 'ParseError') {
                throw new Error(`An error ocurred while parsing the payload from ${url}: ${error.message}`);
            }
            throw new Error(`An error ocurred while fetching the payload from ${url}: ${error.message}`);
        }
    }
}
exports.UrlResolver = UrlResolver;
