![CI](https://github.com/iniva/action-repository-dispatch/workflows/CI/badge.svg)

# Repository Dispatch Action <!-- omit in toc -->
Send `repository_dispatch` events to any repository with a validated JSON payload sourced from a string, a local file path, or a remote URL.

## Contents <!-- omit in toc -->
- [Features](#features)
- [Quick Start](#quick-start)
- [Inputs](#inputs)
- [Payload Sources](#payload-sources)
  - [String](#string)
  - [Path](#path)
  - [URL](#url)
- [Personal Access Token (PAT) Scopes](#personal-access-token-pat-scopes)
- [Validation \& Safety](#validation--safety)
- [Debugging](#debugging)
- [Troubleshooting](#troubleshooting)
- [Development](#development)

## Features
- Three payload modes: inline string, local file, remote URL
- Strict JSON parse + object shape validation (rejects non-object roots)
- Repository name validation (`owner/repo` format)
- Clean error messages with optional debug stack output
- Works with public or private target repositories
- Native fetch (no external HTTP client dependency)

## Quick Start
Minimal example using an inline payload:
```yaml
jobs:
  dispatch:
    runs-on: ubuntu-latest
    steps:
      - uses: iniva/action-repository-dispatch@v2
        with:
          eventType: trigger_build
          token: ${{ secrets.REPO_PAT }}
          payload: '{"requested_by": "${{ github.actor }}"}'
```

## Inputs
| Name               | Required      | Default      | Description                                     |
| ------------------ | ------------- | ------------ | ----------------------------------------------- |
| `eventType`        | Yes           | —            | Custom event type the receiver listens for.     |
| `token`            | Yes           | —            | PAT used to authenticate and send the dispatch. |
| `targetRepository` | No            | Current repo | Target in `owner/repo` form.                    |
| `payloadType`      | No            | `string`     | One of: `string`, `path`, `url`.                |
| `payload`          | Conditionally | `{}`         | Inline JSON string (when type is `string`).     |
| `payloadPath`      | Conditionally | —            | Path to JSON file (when type is `path`).        |
| `payloadUrl`       | Conditionally | —            | HTTPS URL returning JSON (when type is `url`).  |

## Payload Sources
Exactly one source must be provided, determined by `payloadType` (defaults to `string`).

### String
```yaml
- uses: iniva/action-repository-dispatch@v2
  with:
    eventType: test_dispatch
    token: ${{ secrets.REPO_PAT }}
    payload: '{"requested_by":"${{ github.actor }}","run_id":${{ github.run_id }} }'
```

### Path
```yaml
- uses: iniva/action-repository-dispatch@v2
  with:
    eventType: test_dispatch
    token: ${{ secrets.REPO_PAT }}
    payloadType: path
    payloadPath: test/files/valid.json
```

### URL
```yaml
- uses: iniva/action-repository-dispatch@v2
  with:
    eventType: test_dispatch
    token: ${{ secrets.REPO_PAT }}
    payloadType: url
    payloadUrl: https://example.com/valid.json
```

## Personal Access Token (PAT) Scopes
| Target Repo Visibility | Required Scope | Notes                               |
| ---------------------- | -------------- | ----------------------------------- |
| Public                 | `public_repo`  | Minimum for dispatching.            |
| Private                | `repo`         | Token owner must have write access. |

## Validation & Safety
- Rejects invalid repository names (`owner/repo` enforced)
- Ensures payload parses to a plain object (arrays / primitives rejected)
- URL fetch: timeout + retry in utility wrapper (native fetch)
- Clear error surfaces base message; enable debug for stack traces

## Debugging
Enable verbose internal logging by setting repository / org secret:
```
ACTIONS_STEP_DEBUG=true
```
Then re-run the workflow. Additional diagnostic info will appear in the Action logs.

## Troubleshooting
| Symptom                                      | Likely Cause                       | Fix                                                                      |
| -------------------------------------------- | ---------------------------------- | ------------------------------------------------------------------------ |
| `Invalid repository name`                    | Missing slash or whitespace        | Provide `owner/repo` exactly.                                            |
| `Failed to interpret JSON payload`           | Malformed JSON string              | Validate JSON with an online formatter.                                  |
| `Failed to interpret JSON payload from file` | File not found or invalid JSON     | Check path & contents committed.                                         |
| `Failed to interpret JSON payload from url`  | Non-200, redirect, or invalid JSON | Confirm URL returns 200 & JSON content-type.                             |
| Dispatch succeeds but receiver ignores it    | Wrong `eventType`                  | Align `eventType` with receiver workflow `on: repository_dispatch` type. |

## Development
Local build:
```bash
npm ci
npm run build
```
Run tests:
```bash
npm test
```
Lint & typecheck:
```bash
npm run test:lint
npm run test:typecheck
```

The bundled artifact is produced via `@vercel/ncc` from the compiled TypeScript in `dist/`.

---
Maintained with care. Contributions welcome.
