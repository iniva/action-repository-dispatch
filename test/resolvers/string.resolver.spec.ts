import { StringResolver } from '../../src/resolvers/string.resolver'

describe('StringResolver', () => {
  const resolver = new StringResolver()

  it('should fail when given an invalid value', async () => {
    try {
      await resolver.resolve('{"field"}')
    } catch (error: any) {
      expect(error.message).toMatch(/An error ocurred while parsing the payload/)
    }
  })

  it('should return valid JSON when receiving a valid value', async () => {
    const expected = {
      field: 'with a value'
    }
    const result = await resolver.resolve(JSON.stringify(expected))

    expect(result).toBeDefined
    expect(result.field).toEqual(expected.field)
    expect(Object.keys(result)).toEqual(Object.keys(expected))
  })
})
