import { readFile } from 'fs'
import { resolve } from 'path'
import got from 'got'
import { cwd } from 'process'
import { promisify } from 'util'

class PayloadResolver {
  static fromString(payload: string): any {
    try {
      return JSON.parse(payload)
    } catch (error) {
      throw new Error(`An error ocurred while parsing the payload: ${error.message}`)
    }
  }

  static async fromPath(path: string): Promise<any> {
    let content: string

     try {
      const filePath = resolve(cwd(), path)
      const asyncReadFile = promisify(readFile)
      content = await asyncReadFile(filePath, { encoding: 'utf8'})
    } catch (error) {
      throw new Error(`An error ocurred while reading the payload from ${path}: ${error.message}`)
    }

    try {
      return JSON.parse(content)
    } catch (error) {
      throw new Error(`An error ocurred while parsing the payload from ${path}: ${error.message}`)
    }
  }

  static async fromUrl(url: string): Promise<any> {
    try {
      const response = await got(url, { responseType: 'json' })

      return response.body
    } catch (error) {
      if (error.name && error.name === 'ParseError') {
        throw new Error(`An error ocurred while parsing the payload from ${url}: ${error.message}`)
      }

      throw new Error(`An error ocurred while fetching the payload from ${url}: ${error.message}`)
    }
  }
}

export { PayloadResolver }
