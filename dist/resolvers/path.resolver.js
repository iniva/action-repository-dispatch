import { readFile } from 'node:fs/promises';
import { resolve as pathResolve } from 'node:path';
import { cwd } from 'node:process';
import { wrapError } from '../utils/error';
import { safeJsonParse, ensureRecord } from '../utils/json';
export class PathResolver {
    async resolve(path) {
        let content;
        try {
            const filePath = pathResolve(cwd(), path);
            content = await readFile(filePath, { encoding: 'utf8' });
        }
        catch (e) {
            throw wrapError(`Failed to read payload file at ${path}`, e);
        }
        try {
            const parsed = safeJsonParse(content, `Failed to parse JSON from file ${path}`);
            return ensureRecord(parsed, `JSON in file ${path} is not an object`);
        }
        catch (e) {
            throw wrapError(`Failed to interpret payload from file ${path}`, e);
        }
    }
}
//# sourceMappingURL=path.resolver.js.map