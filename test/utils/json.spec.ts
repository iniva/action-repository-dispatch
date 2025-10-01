import { safeJsonParse, ensureRecord } from '../../src/utils/json'

describe('json utils', () => {
  it('parses valid json', () => {
    expect(safeJsonParse('{"a":1}')).toEqual({ a: 1 })
  })

  it('throws on invalid json', () => {
    expect(() => safeJsonParse('{"a":')).toThrow(/JSON parse|Failed/)
  })

  it('ensures record', () => {
    expect(ensureRecord({ a: 1 })).toEqual({ a: 1 })
  })

  it('rejects array', () => {
    expect(() => ensureRecord([], 'Context')).toThrow(/Context/)
  })

  it('rejects primitive', () => {
    expect(() => ensureRecord('x' as unknown, 'Context')).toThrow(/Context/)
  })
})
