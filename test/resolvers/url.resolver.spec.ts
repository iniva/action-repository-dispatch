import nock from 'nock'
import { resolve as pathResolve } from 'node:path'
import { cwd } from 'node:process'

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
    } catch (error: unknown) {
      const message =
        typeof error === 'object' &&
        error !== null &&
        'message' in error &&
        typeof (error as { message?: unknown }).message === 'string'
          ? (error as { message: string }).message
          : String(error)

      expect(message).toMatch(/Request to https:\/\/some-page.com\/resource failed/i)
    }
  })

  it('should fail when the fetched resource is not JSON', async () => {
    const hostUrl = 'https://some-page.com'
    const resource = '/resource'

    scope = nock(hostUrl).get(resource).reply(200, 'some text value')

    try {
      await resolver.resolve(`${hostUrl}${resource}`)
    } catch (error: unknown) {
      const message =
        typeof error === 'object' &&
        error !== null &&
        'message' in error &&
        typeof (error as { message?: unknown }).message === 'string'
          ? (error as { message: string }).message
          : String(error)

      expect(message).toMatch(/Failed to parse JSON from https:\/\/some-page.com\/resource/i)
    }
  })

  it('should fail when the fetched resource is not valid JSON', async () => {
    const hostUrl = 'https://some-page.com'
    const resource = '/resource'

    scope = nock(hostUrl)
      .get(resource)
      .replyWithFile(200, pathResolve(cwd(), 'test/files/invalid.json'), {
        'Content-Type': 'application/json',
      })

    try {
      await resolver.resolve(`${hostUrl}${resource}`)
    } catch (error: unknown) {
      const message =
        typeof error === 'object' &&
        error !== null &&
        'message' in error &&
        typeof (error as { message?: unknown }).message === 'string'
          ? (error as { message: string }).message
          : String(error)

      expect(message).toMatch(/Failed to parse JSON from https:\/\/some-page.com\/resource/i)
    }
  })

  it('should return valid JSON when fetching a valid resource', async () => {
    const hostUrl = 'https://some-page.com'
    const resource = '/resource'
    const expected = {
      field: 'with a value',
    }

    scope = nock(hostUrl)
      .get(resource)
      .replyWithFile(200, pathResolve(cwd(), 'test/files/valid.json'), {
        'Content-Type': 'application/json',
      })

    const payload = await resolver.resolve(`${hostUrl}${resource}`)

    expect(payload).toBeDefined()
    expect(payload.field).toEqual(expected.field)
  })
})
