import { fetchJsonObject } from '../utils/http';
export class UrlResolver {
    async resolve(url) {
        return fetchJsonObject(url, { retries: 1, retryDelayMs: 300 });
    }
}
//# sourceMappingURL=url.resolver.js.map