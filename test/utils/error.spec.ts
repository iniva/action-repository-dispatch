import { getErrorMessage, wrapError } from '../../src/utils/error'

describe('error utils', () => {
  it('extracts message from Error', () => {
    expect(getErrorMessage(new Error('boom'))).toBe('boom')
  })

  it('stringifies non-error objects safely', () => {
    expect(getErrorMessage({ a: 1 })).toBe('{"a":1}')
  })

  it('wraps errors with context', () => {
    const inner = new Error('inner')
    const wrapped = wrapError('context', inner)

    expect(wrapped.message).toBe('context: inner')
    expect(wrapped.cause).toBe(inner)
  })
})
