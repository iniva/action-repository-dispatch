import type { PayloadResolver } from './payload.resolver';
import type { PayloadType } from './payload.type';
import { PathResolver } from './resolvers/path.resolver';
import { StringResolver } from './resolvers/string.resolver';
import { UrlResolver } from './resolvers/url.resolver';

export const PayloadResolverFactory = {
  getResolverForType(type: PayloadType): PayloadResolver {
    switch (true) {
      case type.isPath():
        return new PathResolver();

      case type.isURL():
        return new UrlResolver();
      default:
        return new StringResolver();
    }
  },
};
