import nock from 'nock'

import { fetchJsonObject, HttpError, ParseError } from '../../src/utils/http'

describe('http utils - fetchJsonObject', () => {
  const base = 'https://api.example.com'

  afterEach(() => {
    nock.cleanAll()
  })

  it('fetches and parses json object', async () => {
    nock(base).get('/data').reply(200, { a: 1 })

    const result = await fetchJsonObject(`${base}/data`)

    expect(result).toEqual({ a: 1 })
  })

  it('throws HttpError on non-2xx', async () => {
    nock(base).get('/fail').reply(404, { error: 'no' })

    await expect(fetchJsonObject(`${base}/fail`)).rejects.toBeInstanceOf(HttpError)
  })

  it('throws ParseError on invalid JSON structure', async () => {
    nock(base).get('/notjson').reply(200, 'not-json', {
      'Content-Type': 'text/plain',
    })

    await expect(fetchJsonObject(`${base}/notjson`)).rejects.toBeInstanceOf(ParseError)
  })

  it('retries on 500 then succeeds', async () => {
    nock(base).get('/flaky').reply(500, { oops: true }).get('/flaky').reply(200, { ok: true })

    const result = await fetchJsonObject(`${base}/flaky`, { retries: 1, retryDelayMs: 10 })

    expect(result).toEqual({ ok: true })
  })
})
