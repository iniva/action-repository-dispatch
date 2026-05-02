import { wrapError } from '../utils/error';
import { ensureRecord, safeJsonParse } from '../utils/json';
export class StringResolver {
    resolve(payload) {
        try {
            const parsed = safeJsonParse(payload, 'Failed to parse inline payload JSON');
            const record = ensureRecord(parsed, 'Inline payload is not a JSON object');
            return Promise.resolve(record);
        }
        catch (e) {
            throw wrapError('An error occurred while parsing the inline payload', e);
        }
    }
}
//# sourceMappingURL=string.resolver.js.map