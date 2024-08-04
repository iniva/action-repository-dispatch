"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayloadResolverFactory = void 0;
const path_resolver_1 = require("./resolvers/path.resolver");
const string_resolver_1 = require("./resolvers/string.resolver");
const url_resolver_1 = require("./resolvers/url.resolver");
class PayloadResolverFactory {
    static getResolverForType(type) {
        switch (true) {
            case type.isPath():
                return new path_resolver_1.PathResolver();
            case type.isURL():
                return new url_resolver_1.UrlResolver();
            case type.isString():
            default:
                return new string_resolver_1.StringResolver();
        }
    }
}
exports.PayloadResolverFactory = PayloadResolverFactory;
