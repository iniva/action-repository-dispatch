"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlResolver = void 0;
const http_1 = require("../utils/http");
class UrlResolver {
    async resolve(url) {
        return (0, http_1.fetchJsonObject)(url, { retries: 1, retryDelayMs: 300 });
    }
}
exports.UrlResolver = UrlResolver;
//# sourceMappingURL=url.resolver.js.map