![CI for Repository Dispatch](https://github.com/iniva/action-repository-dispatch/workflows/CI%20for%20Repository%20Dispatch/badge.svg)
![CI](https://github.com/iniva/action-repository-dispatch/workflows/CI/badge.svg)

# Action: Repository Dispatch <!-- omit in toc -->

- [Usage](#usage)
  - [Inputs](#inputs)
    - [(*) token](#-token)
- [DEBUG](#debug)

# Usage
> :information_source: Check the [ci workflow](.github/workflows/ci.yml) in this repo to see a live example on how to use this action in your own workflow

## Inputs
- `targetRepository`: Full name (`owner/repo-name`) of the repository that will receive the `repository_dispatch` event.
  - required: `false`
  - default: `${{ github.repository }}` (current repository running the workflow)

- `eventType`: Custom event type expected by the receiving repository
  - required: `true`
  - example: `'do-something-awesome'`

- `token`: A GitHub Personal Access Token (PAT) ([more info](#-token))
  - required: `true`

- `payload`: Stringified JSON payload
    - required: `false`
    - default: `'{}'`
    - example: `'{"customField": "some value", "anotherField": "another value"}'`

 ### (*) token
 :information_source: If you are targeting:
  - **Public repository**: The PAT only needs `public_repo` scope
  - **Private repository**: The PAT needs `repo` scope and its owner needs `write` access in the target repository

# DEBUG
To enable step debug logging, set the following secret in the repository that's running the workflow:
- Secret name: `ACTIONS_STEP_DEBUG`
- value: `true`
