import { PayloadResolver } from '../payload.resolver'

export class StringResolver implements PayloadResolver {
  resolve(payload: string): Promise<any> {
    try {
      return JSON.parse(payload)
    } catch (error: any) {
      throw new Error(`An error ocurred while parsing the payload: ${error.message}`)
    }
  }
}
