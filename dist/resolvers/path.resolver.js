"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathResolver = void 0;
const node_path_1 = require("node:path");
const node_process_1 = require("node:process");
const promises_1 = require("node:fs/promises");
class PathResolver {
    async resolve(path) {
        let content;
        try {
            const filePath = (0, node_path_1.resolve)((0, node_process_1.cwd)(), path);
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
}
exports.PathResolver = PathResolver;
