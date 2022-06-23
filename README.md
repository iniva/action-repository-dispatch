![CI for Repository Dispatch](https://github.com/iniva/action-repository-dispatch/workflows/CI%20for%20Repository%20Dispatch/badge.svg)
![CI](https://github.com/iniva/action-repository-dispatch/workflows/CI/badge.svg)

# Action: Repository Dispatch <!-- omit in toc -->

- [Usage](#usage)
  - [Inputs](#inputs)
  - [PAT requirements](#pat-requirements)
- [DEBUG](#debug)

# Usage
> :information_source: Check the [ci workflow](.github/workflows/ci.yml) in this repo to see a live example on how to use this action in your own workflow

## Inputs
| Input | Description | Required | Default | Comments |
|-|-|-|-|-|
| eventType | Custom event type expected by the receiving repository | :white_check_mark: |  | **example**: `'do-something-awesome'` |
| token | A GitHub Personal Access Token (PAT) | :white_check_mark: |  | [PAT requirements](#pat-requirements) |
| targetRepository | Full name (`owner/repo-name`) of the repository<br>that will receive the `repository_dispatch` event | :x: | `${{ github.repository }}` | **default**: current repository running the workflow |
| payloadType | Type of payload provided.<br></br>Types: `string`, `path`, `url` | :x: | `string` | -- |
| payload | Stringified JSON payload.<br>Expected when `payloadType` is not provided or provided as `"string"` | :x: | `'{}'` | **example**:<br>`'{"customField": "some value", "anotherField": "another value"}'` |
| payloadPath | Path to file with JSON payload.<br>Expected when `payloadType` is provided as `"path"` | :x: | | **example:** `path/to/valid.json` |
| payloadUrl | URL to JSON payload.<br>Expected when `payloadType` is provided as `"url"` | :x: | | **example:** `https://example.com/to/valid.json` |

## PAT requirements
:information_source: If you are targeting:
- **Public repository**: The PAT only needs `public_repo` scope
- **Private repository**: The PAT needs `repo` scope and its owner needs `write` access in the target repository

# DEBUG
To enable step debug logging, set the following secret in the repository that's running the workflow:
- Secret name: `ACTIONS_STEP_DEBUG`
- value: `true`
