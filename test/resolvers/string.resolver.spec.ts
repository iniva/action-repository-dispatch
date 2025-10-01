import { StringResolver } from '../../src/resolvers/string.resolver'

describe('StringResolver', () => {
  const resolver = new StringResolver()

  it('should fail when given an invalid value', async () => {
    try {
      await resolver.resolve('{"field"}')
      fail('Expected error was not thrown')
    } catch (error: unknown) {
      let message: string

      if (
        typeof error === 'object' &&
        error !== null &&
        'message' in error &&
        typeof (error as { message?: unknown }).message === 'string'
      ) {
        message = (error as { message: string }).message
      } else {
        message = String(error)
      }

      expect(message).toMatch(/parsing the inline payload/i)
    }
  })

  it('should return valid JSON when receiving a valid value', async () => {
    const expected = {
      field: 'with a value',
    }
    const result = await resolver.resolve(JSON.stringify(expected))

    expect(result).toBeDefined()
    expect(result.field).toEqual(expected.field)
    expect(Object.keys(result)).toEqual(Object.keys(expected))
  })
})
