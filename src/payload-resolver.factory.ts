import { PayloadResolver } from './payload.resolver'
import { PayloadType } from './payload.type'
import { PathResolver } from './resolvers/path.resolver'
import { StringResolver } from './resolvers/string.resolver'
import { UrlResolver } from './resolvers/url.resolver'

export class PayloadResolverFactory {
  static getResolverForType(type: PayloadType): PayloadResolver {
    switch (true) {
      case type.isPath():
        return new PathResolver()

      case type.isURL():
        return new UrlResolver()

      case type.isString():
      default:
        return new StringResolver()
    }
  }
}
