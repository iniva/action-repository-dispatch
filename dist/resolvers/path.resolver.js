"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathResolver = void 0;
const promises_1 = require("node:fs/promises");
const node_path_1 = require("node:path");
const node_process_1 = require("node:process");
const error_1 = require("../utils/error");
const json_1 = require("../utils/json");
class PathResolver {
    async resolve(path) {
        let content;
        try {
            const filePath = (0, node_path_1.resolve)((0, node_process_1.cwd)(), path);
            content = await (0, promises_1.readFile)(filePath, { encoding: 'utf8' });
        }
        catch (e) {
            throw (0, error_1.wrapError)(`Failed to read payload file at ${path}`, e);
        }
        try {
            const parsed = (0, json_1.safeJsonParse)(content, `Failed to parse JSON from file ${path}`);
            return (0, json_1.ensureRecord)(parsed, `JSON in file ${path} is not an object`);
        }
        catch (e) {
            throw (0, error_1.wrapError)(`Failed to interpret payload from file ${path}`, e);
        }
    }
}
exports.PathResolver = PathResolver;
//# sourceMappingURL=path.resolver.js.map