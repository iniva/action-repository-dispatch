import { PayloadType } from '../src/payload.type'
import { PayloadResolverFactory } from '../src/payload-resolver.factory'
import { StringResolver } from '../src/resolvers/string.resolver'
import { PathResolver } from '../src/resolvers/path.resolver'
import { UrlResolver } from '../src/resolvers/url.resolver'


describe('Payload Resolver Factory', () => {
  it('should return a StringResolver when receiving a string PayloadType', () => {
    const resolver = PayloadResolverFactory.getResolverForType(PayloadType.createFrom(PayloadType.STRING))

    expect(resolver).toBeInstanceOf(StringResolver)
  })

  it('should return a PathResolver when receiving a path PayloadType', () => {
    const resolver = PayloadResolverFactory.getResolverForType(PayloadType.createFrom(PayloadType.PATH))

    expect(resolver).toBeInstanceOf(PathResolver)
  })

  it('should return a StringResolver when receiving a url PayloadType', () => {
    const resolver = PayloadResolverFactory.getResolverForType(PayloadType.createFrom(PayloadType.URL))

    expect(resolver).toBeInstanceOf(UrlResolver)
  })
})
