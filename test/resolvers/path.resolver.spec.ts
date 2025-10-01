import { PathResolver } from '../../src/resolvers/path.resolver'

describe('PathResolver', () => {
  const resolver = new PathResolver()

  it('should fail when given an invalid path', async () => {
    try {
      await resolver.resolve('where/is/this/file.json')
    } catch (error: unknown) {
      const message =
        typeof error === 'object' &&
        error !== null &&
        'message' in error &&
        typeof (error as { message?: unknown }).message === 'string'
          ? (error as { message: string }).message
          : String(error)

      expect(message).toMatch(/Failed to read payload file/i)
    }
  })

  it('should fail when given a valid path to an invalid file', async () => {
    try {
      await resolver.resolve('test/files/invalid.json')
    } catch (error: unknown) {
      const message =
        typeof error === 'object' &&
        error !== null &&
        'message' in error &&
        typeof (error as { message?: unknown }).message === 'string'
          ? (error as { message: string }).message
          : String(error)

      expect(message).toMatch(/Failed to interpret payload/i)
    }
  })

  it('should return valid JSON when receiving a valid input', async () => {
    const payload = await resolver.resolve('test/files/valid.json')

    expect(payload).toBeDefined()
  })
})
