import { inspect } from 'node:util'
import * as core from '@actions/core'
import { getOctokit } from '@actions/github'

import { PayloadType } from './payload.type'
import { PayloadResolverFactory } from './payload-resolver.factory'

async function run(): Promise<void> {
  try {
    // Get values from inputs
    const targetRepository = core.getInput('targetRepository')
    const eventType = core.getInput('eventType', { required: true })
    const token = core.getInput('token', { required: true })
    const payloadType = core.getInput('payloadType')

    if (targetRepository.split('/').length < 2) {
      throw new Error(
        `Invalid repository name [${targetRepository}]. Expected format: owner/repo-name`,
      )
    }

    const [owner, repository] = targetRepository.split('/')

    const type = PayloadType.createFrom(payloadType)
    const payloadResolver = PayloadResolverFactory.getResolverForType(type)
    let clientPayload: any

    switch (true) {
      case type.isString():
        const payload = core.getInput('payload', { required: true })

        clientPayload = await payloadResolver.resolve(payload)
        break

      case type.isPath():
        const payloadPath = core.getInput('payloadPath', { required: true })

        clientPayload = await payloadResolver.resolve(payloadPath)
        break

      case type.isURL():
        const payloadUrl = core.getInput('payloadUrl', { required: true })

        clientPayload = await payloadResolver.resolve(payloadUrl)
        break
    }

    const octokitClient = getOctokit(token)

    await octokitClient.rest.repos.createDispatchEvent({
      owner,
      repo: repository,
      event_type: eventType,
      client_payload: clientPayload,
    })

    core.info(`Event [${eventType}] dispatched to [${targetRepository}]`)
  } catch (e: any) {
    core.debug(inspect(e))
    core.setFailed(e.message)
  }
}

run()
