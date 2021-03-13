import { inspect } from 'util'
import * as core from '@actions/core'
import { getOctokit } from '@actions/github'

import { PayloadResolver } from './PayloadResolver'
import { PayloadType } from './PayloadType'

async function run(): Promise<void> {
  try {
    // Get values from inputs
    const targetRepository = core.getInput('targetRepository')
    const eventType = core.getInput('eventType', { required: true })
    const token = core.getInput('token', { required: true })
    const payloadType = core.getInput('payloadType')
    const payload = core.getInput('payload')
    const payloadPath = core.getInput('payloadPath')
    const payloadUrl = core.getInput('payloadUrl')

    if (targetRepository.split('/').length < 2) {
      throw new Error(`Invalid repository name [${targetRepository}]. Expected format: owner/repo-name`)
    }

    const [owner, repository] = targetRepository.split('/')

    const type = PayloadType.createFrom(payloadType)
    let clientPayload: any

    switch(true) {
      case type.isString():
        clientPayload = PayloadResolver.fromString(payload)
        break

      case type.isPath():
        clientPayload = await PayloadResolver.fromPath(payloadPath)
        break

      case type.isURL():
        clientPayload = await PayloadResolver.fromUrl(payloadUrl)
        break
    }

    const octokitClient = getOctokit(token)

    await octokitClient.repos.createDispatchEvent({
      owner,
      repo: repository,
      event_type: eventType,
      client_payload: clientPayload
    })

    core.info(`Event [${eventType}] dispatched to [${targetRepository}]`)
  } catch (e) {
    core.debug(inspect(e))
    core.setFailed(e.message)
  }
}

run()
