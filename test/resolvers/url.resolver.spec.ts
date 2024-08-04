import { cwd } from 'node:process'
import { resolve as pathResolve } from 'node:path'
import nock from 'nock'

import { UrlResolver } from '../../src/resolvers/url.resolver'

describe('UrlResolver', () => {
  const resolver = new UrlResolver()

  let scope: nock.Scope

  afterEach(() => {
    scope.done()
  })

  it('should fail when fetching the resource fails', async () => {
    const hostUrl = 'https://some-page.com'
    const resource = '/resource'

    scope = nock(hostUrl).get(resource).reply(404)

    try {
      await resolver.resolve(`${hostUrl}${resource}`)
    } catch (error: any) {
      expect(error.message).toMatch(/An error ocurred while fetching the payload/)
    }

  })

  it('should fail when the fetched resource is not JSON', async () => {
    const hostUrl = 'https://some-page.com'
    const resource = '/resource'

    scope = nock(hostUrl).get(resource).reply(200, 'some text value')

    try {
      await resolver.resolve(`${hostUrl}${resource}`)
    } catch (error: any) {
      expect(error.message).toMatch(/An error ocurred while parsing the payload/)
    }
  })

  it('should fail when the fetched resource is not valid JSON', async () => {
    const hostUrl = 'https://some-page.com'
    const resource = '/resource'

    scope = nock(hostUrl).get(resource)
    .replyWithFile(200, pathResolve(cwd(), 'test/files/invalid.json'), {
      'Content-Type': 'application/json',
    })

    try {
      await resolver.resolve(`${hostUrl}${resource}`)
    } catch (error: any) {
      expect(error.message).toMatch(/An error ocurred while parsing the payload/)
    }

  })

  it('should return valid JSON when fetching a valid resource', async () => {
    const hostUrl = 'https://some-page.com'
    const resource = '/resource'
    const expected = {
      field: 'with a value'
    }

    scope = nock(hostUrl).get(resource)
    .replyWithFile(200, pathResolve(cwd(), 'test/files/valid.json'), {
      'Content-Type': 'application/json',
    })

    const payload = await resolver.resolve(`${hostUrl}${resource}`)

    expect(payload).toBeDefined
    expect(payload.field).toEqual(expected.field)
  })
})
