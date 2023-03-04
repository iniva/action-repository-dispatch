"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayloadResolver = void 0;
const promises_1 = require("node:fs/promises");
const path_1 = require("path");
const got_1 = __importDefault(require("got"));
const process_1 = require("process");
class PayloadResolver {
    static fromString(payload) {
        try {
            return JSON.parse(payload);
        }
        catch (error) {
            throw new Error(`An error ocurred while parsing the payload: ${error.message}`);
        }
    }
    static async fromPath(path) {
        let content;
        try {
            const filePath = (0, path_1.resolve)((0, process_1.cwd)(), path);
            content = await (0, promises_1.readFile)(filePath, { encoding: 'utf8' });
        }
        catch (error) {
            throw new Error(`An error ocurred while reading the payload from ${path}: ${error.message}`);
        }
        try {
            return JSON.parse(content);
        }
        catch (error) {
            throw new Error(`An error ocurred while parsing the payload from ${path}: ${error.message}`);
        }
    }
    static async fromUrl(url) {
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
exports.PayloadResolver = PayloadResolver;
