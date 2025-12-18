import { PayloadResolver } from '../payload.resolver';
import { wrapError } from '../utils/error';
import { ensureRecord, safeJsonParse } from '../utils/json';

export class StringResolver implements PayloadResolver {
  resolve(payload: string): Promise<Record<string, unknown>> {
    try {
      const parsed = safeJsonParse<unknown>(payload, 'Failed to parse inline payload JSON');
      const record = ensureRecord(parsed, 'Inline payload is not a JSON object');

      return Promise.resolve(record);
    } catch (e: unknown) {
      throw wrapError('An error occurred while parsing the inline payload', e);
    }
  }
}
