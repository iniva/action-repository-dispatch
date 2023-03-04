import 'mocha'
import { expect } from 'chai'

import { PayloadType } from '../src/PayloadType'

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
        .to.throw(Error)
        .with.property('message', `[${value}] is an invalid payload type. Valid: string, path, url`)
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

      expect(instance).to.be.instanceof(PayloadType)
      expect(instance.type).to.be.equal(value)
    })
  })

  describe('Helper methods', () => {
    context('isString', () => {
      it('should return true when received type is "string"', () => {
        const instance = PayloadType.createFrom('string')

        expect(instance.isString()).to.be.true
      })

      it('should return false when received type is different from "string"', () => {
        const values = [
          'path',
          'url'
        ]

        values.forEach(value => {
          const instance = PayloadType.createFrom(value)

          expect(instance.isString()).to.be.false
        })
      })
    })

    context('isPath', () => {
      it('should return true when received type is "path"', () => {
        const instance = PayloadType.createFrom('path')

        expect(instance.isPath()).to.be.true
      })

      it('should return false when received type is different from "path"', () => {
        const values = [
          'string',
          'url'
        ]

        values.forEach(value => {
          const instance = PayloadType.createFrom(value)

          expect(instance.isPath()).to.be.false
        })
      })
    })

    context('isURL', () => {
      it('should return true when received type is "url"', () => {
        const instance = PayloadType.createFrom('url')

        expect(instance.isURL()).to.be.true
      })

      it('should return false when received type is different from "url"', () => {
        const values = [
          'path',
          'string'
        ]

        values.forEach(value => {
          const instance = PayloadType.createFrom(value)

          expect(instance.isURL()).to.be.false
        })
      })
    })
  })
})
