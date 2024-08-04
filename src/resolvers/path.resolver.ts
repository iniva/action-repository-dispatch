import { resolve as pathResolve } from 'node:path'
import { cwd } from 'node:process'
import { readFile } from 'node:fs/promises'

import { PayloadResolver } from '../payload.resolver'

export class PathResolver implements PayloadResolver {
  async resolve(path: string): Promise<any> {
    let content: string

    try {
      const filePath = pathResolve(cwd(), path)
      content = await readFile(filePath, { encoding: 'utf8' })
    } catch (error: any) {
      throw new Error(`An error ocurred while reading the payload from ${path}: ${error.message}`)
    }

    try {
      return JSON.parse(content)
    } catch (error: any) {
      throw new Error(`An error ocurred while parsing the payload from ${path}: ${error.message}`)
    }
  }
}
