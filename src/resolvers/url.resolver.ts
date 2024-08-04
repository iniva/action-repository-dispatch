import got from 'got'

import { PayloadResolver } from '../payload.resolver'

export class UrlResolver implements PayloadResolver {
  async resolve(url: string): Promise<any> {
    try {
      const response = await got(url, { responseType: 'json' })

      return response.body
    } catch (error: any) {
      if (error.name && error.name === 'ParseError') {
        throw new Error(`An error ocurred while parsing the payload from ${url}: ${error.message}`)
      }

      throw new Error(`An error ocurred while fetching the payload from ${url}: ${error.message}`)
    }
  }
}
