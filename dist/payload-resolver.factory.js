import { PathResolver } from './resolvers/path.resolver';
import { StringResolver } from './resolvers/string.resolver';
import { UrlResolver } from './resolvers/url.resolver';
export class PayloadResolverFactory {
    static getResolverForType(type) {
        switch (true) {
            case type.isPath():
                return new PathResolver();
            case type.isURL():
                return new UrlResolver();
            case type.isString():
            default:
                return new StringResolver();
        }
    }
}
//# sourceMappingURL=payload-resolver.factory.js.map