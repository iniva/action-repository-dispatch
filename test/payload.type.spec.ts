import { PayloadType } from '../src/payload.type'

describe('PayloadType', () => {
  it('should fail when receiving an invalid payload type', () => {
    const invalidValues = [
      '',
      null,
      undefined,
      'random'
    ]

    invalidValues.forEach((value: any) => {
      expect(() => PayloadType.createFrom(value))
        .toThrow(`[${value}] is an invalid payload type. Valid: string, path, url`)
    })
  })

  it('should return a PayloadType instance when receiving valid values', () => {
    const validValues = [
      'string',
      'path',
      'url'
    ]

    validValues.forEach(value => {
      const instance = PayloadType.createFrom(value)

      expect(instance).toBeInstanceOf(PayloadType)
      expect(instance.type).toEqual(value)
    })
  })

  describe('Helper methods', () => {
    describe('isString', () => {
      it('should return true when received type is "string"', () => {
        const instance = PayloadType.createFrom('string')

        expect(instance.isString()).toEqual(true)
      })

      it('should return false when received type is different from "string"', () => {
        const values = [
          'path',
          'url'
        ]

        values.forEach(value => {
          const instance = PayloadType.createFrom(value)

          expect(instance.isString()).toEqual(false)
        })
      })
    })

    describe('isPath', () => {
      it('should return true when received type is "path"', () => {
        const instance = PayloadType.createFrom('path')

        expect(instance.isPath()).toEqual(true)
      })

      it('should return false when received type is different from "path"', () => {
        const values = [
          'string',
          'url'
        ]

        values.forEach(value => {
          const instance = PayloadType.createFrom(value)

          expect(instance.isPath()).toEqual(false)
        })
      })
    })

    describe('isURL', () => {
      it('should return true when received type is "url"', () => {
        const instance = PayloadType.createFrom('url')

        expect(instance.isURL()).toEqual(true)
      })

      it('should return false when received type is different from "url"', () => {
        const values = [
          'path',
          'string'
        ]

        values.forEach(value => {
          const instance = PayloadType.createFrom(value)

          expect(instance.isURL()).toEqual(false)
        })
      })
    })
  })
})
