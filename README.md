![CI for Repository Dispatch](https://github.com/iniva/action-repository-dispatch/workflows/CI%20for%20Repository%20Dispatch/badge.svg)
![CI](https://github.com/iniva/action-repository-dispatch/workflows/CI/badge.svg)

# Action: Repository Dispatch <!-- omit in toc -->
Send `repository_dispatch` events with custom payloads

- [Usage](#usage)
  - [Inputs](#inputs)
  - [Examples](#examples)
    - [String](#string)
    - [Path](#path)
    - [URL](#url)
  - [PAT requirements](#pat-requirements)
- [DEBUG](#debug)

# Usage
- :information_source: Check the [ci workflow](.github/workflows/ci.yml) in this repo to see a live example on how to use this action in your own workflow
- Check the [Inputs](#inputs) sections for more details

## Inputs
| Input | Description | Required | Default | Comments |
|-|-|-|-|-|
| eventType | Custom event type expected by the receiving repository | Yes |  | **example**: `'do-something-awesome'` |
| token | A GitHub Personal Access Token (PAT) | Yes |  | [PAT requirements](#pat-requirements) |
| targetRepository | Full name (`owner/repo-name`) of the repository<br>that will receive the `repository_dispatch` event | No | `github.repository` | **default**: current repository running the workflow |
| payloadType | Type of payload provided.<br></br>Types: `string`, `path`, `url` | No | `string` | -- |
| payload | Stringified JSON payload.<br>**Required** when `payloadType` is not provided or provided as `"string"` | No | `'{}'` | **example**:<br>`'{"customField": "some value", "anotherField": "another value"}'` |
| payloadPath | Path to file with JSON payload.<br>**Required** when `payloadType` is provided as `"path"` | No | | **example:** `path/to/valid.json` |
| payloadUrl | URL to JSON payload.<br>**Required** when `payloadType` is provided as `"url"` | No | | **example:** `https://example.com/valid.json` |

## Examples
These are the 3 supported formats to send custom payloads
### String
```yml
  - uses: iniva/action-repository-dispatch
    name: Dispatch Event
    id: dispatch_action
    with:
      eventType: 'test_dispatch'
      token: ${{ secrets.REPO_PAT }}
      payload: '{"requested_by": "${{github.actor}}"}'
```

### Path
```yml
  - uses: iniva/action-repository-dispatch
    name: Dispatch Event
    id: dispatch_action
    with:
      eventType: 'test_dispatch'
      token: ${{ secrets.REPO_PAT }}
      payloadType: path
        payloadPath: path/to/valid.json
```

### URL
```yml
  - uses: iniva/action-repository-dispatch
    name: Dispatch Event
    id: dispatch_action
    with:
      eventType: 'test_dispatch'
      token: ${{ secrets.REPO_PAT }}
      payloadType: url
      payloadUrl: https://example.com/valid.json
```

## PAT requirements
:information_source: If you are targeting:
- **Public repository**: The PAT only needs `public_repo` scope
- **Private repository**: The PAT needs `repo` scope and its owner needs `write` access in the target repository

# DEBUG
To enable step debug logging, set the following secret in the repository that's running the workflow:
- Secret name: `ACTIONS_STEP_DEBUG`
- value: `true`
