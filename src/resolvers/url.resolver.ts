import { PayloadResolver } from '../payload.resolver';
import { fetchJsonObject } from '../utils/http';

export class UrlResolver implements PayloadResolver {
  async resolve(url: string): Promise<Record<string, unknown>> {
    return fetchJsonObject(url, { retries: 1, retryDelayMs: 300 });
  }
}
