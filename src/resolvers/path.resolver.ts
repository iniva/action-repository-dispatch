import { readFile } from 'node:fs/promises'
import { resolve as pathResolve } from 'node:path'
import { cwd } from 'node:process'

import { PayloadResolver } from '../payload.resolver'
import { wrapError } from '../utils/error'
import { safeJsonParse, ensureRecord } from '../utils/json'

export class PathResolver implements PayloadResolver {
  async resolve(path: string): Promise<Record<string, unknown>> {
    let content: string

    try {
      const filePath = pathResolve(cwd(), path)

      content = await readFile(filePath, { encoding: 'utf8' })
    } catch (e: unknown) {
      throw wrapError(`Failed to read payload file at ${path}`, e)
    }

    try {
      const parsed = safeJsonParse<unknown>(content, `Failed to parse JSON from file ${path}`)

      return ensureRecord(parsed, `JSON in file ${path} is not an object`)
    } catch (e: unknown) {
      throw wrapError(`Failed to interpret payload from file ${path}`, e)
    }
  }
}
