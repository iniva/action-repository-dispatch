import 'mocha'
import * as chai from 'chai'
import * as chaiAsPromised from 'chai-as-promised'
import * as nock from 'nock'

import { PayloadResolver } from '../src/PayloadResolver'

const { expect } = chai
chai.use(chaiAsPromised)

describe('PayloadResolver', () => {
  context('fromString', () => {
    it('should fail when given an invalid value', () => {
      expect(() => PayloadResolver.fromString('{"field"}'))
        .to.throw(/An error ocurred while parsing the payload/)
    })

    it('should return valid JSON when receiving a valid value', () => {
      const expected = {
        field: 'with a value'
      }
      const result = PayloadResolver.fromString(JSON.stringify(expected))

      expect(result).to.be.ok
      expect(result.field).to.be.equal(expected.field)
      expect(Object.keys(result)).to.be.eql(Object.keys(expected))
    })
  })

  context('fromPath', () => {
    it('should fail when given an invalid path', async () => {
      await expect(PayloadResolver.fromPath('where/is/this/file.json'))
        .to.be.rejectedWith(/An error ocurred while reading the payload/)
    })

    it('should fail when given a valid path to an invalid file', async () => {
      await expect(PayloadResolver.fromPath('test/files/invalid.json'))
        .to.be.rejectedWith(/An error ocurred while parsing the payload/)
    })

    it('should return valid JSON when receiving a valid input', async () => {
      const payload = await PayloadResolver.fromPath('test/files/valid.json')

      expect(payload).to.be.ok
    })
  })

  context('fromUrl', () => {
    let scope: nock.Scope

    afterEach(() => {
      scope.done()
    })

    it('should fail when fetching the resource fails', async () => {
      const hostUrl = 'https://some-page.com'
      const resource = '/resource'

      scope = nock(hostUrl).get(resource).reply(404)

      await expect(PayloadResolver.fromUrl(`${hostUrl}${resource}`))
        .to.be.rejectedWith(/An error ocurred while fetching the payload/)
    })

    it('should fail when the fetched resource is not JSON', async () => {
      const hostUrl = 'https://some-page.com'
      const resource = '/resource'

      scope = nock(hostUrl).get(resource).reply(200, 'some text value')

      await expect(PayloadResolver.fromUrl(`${hostUrl}${resource}`))
        .to.be.rejectedWith(/An error ocurred while parsing the payload/)
    })

    it('should fail when the fetched resource is not valid JSON', async () => {
      const hostUrl = 'https://some-page.com'
      const resource = '/resource'

      scope = nock(hostUrl).get(resource)
      .replyWithFile(200, `${__dirname}/files/invalid.json`, {
        'Content-Type': 'application/json',
      })

      await expect(PayloadResolver.fromUrl(`${hostUrl}${resource}`))
        .to.be.rejectedWith(/An error ocurred while parsing the payload/)
    })

    it('should return valid JSON when fetching a valid resource', async () => {
      const hostUrl = 'https://some-page.com'
      const resource = '/resource'
      const expected = {
        field: 'with a value'
      }

      scope = nock(hostUrl).get(resource)
      .replyWithFile(200, `${__dirname}/files/valid.json`, {
        'Content-Type': 'application/json',
      })

      const payload = await PayloadResolver.fromUrl(`${hostUrl}${resource}`)

      expect(payload).to.be.ok
      expect(payload.field).to.be.equal(expected.field)
    })
  })
})
