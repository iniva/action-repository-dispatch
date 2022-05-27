"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayloadResolver = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const got_1 = require("got");
const process_1 = require("process");
const util_1 = require("util");
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
            const asyncReadFile = (0, util_1.promisify)(fs_1.readFile);
            content = await asyncReadFile(filePath, { encoding: 'utf8' });
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
