import * as core from '@actions/core'
import { getOctokit } from '@actions/github'

async function run(): Promise<void> {
  try {
    // Get values from inputs
    const targetRepository = core.getInput('targetRepository')
    const eventType = core.getInput('eventType', { required: true })
    const token = core.getInput('token', { required: true })
    const payload = core.getInput('payload')
    let clientPayload

    if (targetRepository.split('/').length < 2) {
      throw new Error(`Invalid repository name [${targetRepository}]. Expected format: owner/repo-name`)
    }

    const [owner, repository] = targetRepository.split('/')


    try {
      clientPayload = JSON.parse(payload)
    } catch (error) {
      throw new Error(`An error ocurred while parsing the payload. ${error.message}`)
    }

    const octokitClient = getOctokit(token)

    await octokitClient.repos.createDispatchEvent({
      owner,
      repo: repository,
      event_type: eventType,
      client_payload: clientPayload
    })

    core.info(`Event [${eventType}] dispatched to [${owner}/${targetRepository}]`)
  } catch (e) {
    core.setFailed(e.message)
  }
}

run()
