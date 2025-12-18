import * as core from '@actions/core';
import { getOctokit } from '@actions/github';
import { inspect } from 'node:util';

import { PayloadResolverFactory } from './payload-resolver.factory';
import type { ClientPayload } from './payload.resolver';
import { PayloadType } from './payload.type';

async function run(): Promise<void> {
  try {
    // Get values from inputs
    const targetRepository = core.getInput('targetRepository').trim();
    const eventType = core.getInput('eventType', { required: true });
    const token = core.getInput('token', { required: true });
    const payloadType = core.getInput('payloadType');

    if (!/^[^\s/]+\/[^\s/]+$/.test(targetRepository)) {
      throw new Error(`Invalid repository name [${targetRepository}]. Expected owner/repo`);
    }

    const [owner, repository] = targetRepository.split('/');

    const type = PayloadType.createFrom(payloadType || 'string');
    const resolver = PayloadResolverFactory.getResolverForType(type);

    const inputKeyByType: Record<string, string> = {
      string: 'payload',
      path: 'payloadPath',
      url: 'payloadUrl',
    };

    const inputKey = inputKeyByType[type.type];
    const rawValue = core.getInput(inputKey, { required: true });
    const clientPayload: ClientPayload | undefined = await resolver.resolve(rawValue);

    const octokitClient = getOctokit(token);

    await octokitClient.rest.repos.createDispatchEvent({
      owner,
      repo: repository,
      event_type: eventType,
      client_payload: clientPayload,
    });

    core.info(`Event [${eventType}] dispatched to [${targetRepository}]`);
  } catch (e: unknown) {
    if (core.isDebug()) {
      core.debug(inspect(e));
    }

    if (
      typeof e === 'object' &&
      e !== null &&
      'message' in e &&
      typeof (e as { message?: unknown }).message === 'string'
    ) {
      core.setFailed((e as { message: string }).message);
    } else {
      core.setFailed('An unknown error occurred');
    }
  }
}

void run();
