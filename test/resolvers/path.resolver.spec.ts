import { PathResolver } from '../../src/resolvers/path.resolver'

describe('PathResolver', () => {
  const resolver = new PathResolver()

  it('should fail when given an invalid path', async () => {
    try {
      await resolver.resolve('where/is/this/file.json')
    } catch (error: any) {
      expect(error.message).toMatch(/An error ocurred while reading the payload/)
    }
  })

  it('should fail when given a valid path to an invalid file', async () => {
    try {
      await resolver.resolve('test/files/invalid.json')
    } catch (error: any) {
      expect(error.message).toMatch(/An error ocurred while parsing the payload/)

    }
  })

  it('should return valid JSON when receiving a valid input', async () => {
    const payload = await resolver.resolve('test/files/valid.json')

    expect(payload).toBeDefined
  })
})
