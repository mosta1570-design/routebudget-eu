# CodeQL branch-scoped setup

## Why this workflow exists

The observed default-setup failure was the Actions-language scan on protected `gh-pages`: that branch contains published static assets, not workflow source, so CodeQL exited with code 32. Its JavaScript scan succeeded. Removing Actions from the repository-wide language list would also remove useful source-workflow coverage on `main`.

`.github/workflows/codeql.yml` separates those inputs without dummy files, ignored errors, or changes to branch protection:

| Input | Trigger | Languages | Analysis identity |
| --- | --- | --- | --- |
| Source checkout | Push to `main`, PR targeting `main`, weekly Tuesday 05:23 UTC, or manual `target=source` | Actions and JavaScript/TypeScript | Normal event ref/SHA; existing `Analyze (actions)` and `Analyze (javascript-typescript)` job names in advanced mode |
| Published checkout | Successful same-repository `pages build and deployment` run on `gh-pages`, or manual `target=published` | JavaScript/TypeScript only | Explicit `refs/heads/gh-pages` and the checked-out commit SHA |

The published job checks out the triggering Pages run's exact `head_sha`; manual runs resolve the current `gh-pages` tip and record its actual SHA. Neither path deploys the website. A `workflow_run` normally carries the default branch's ref/SHA, so relying on those values would misattribute the artifact scan. The workflow must be on the default branch for this trigger to operate. [GitHub event semantics](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#workflow_run)

Published results use the action's paired `ref` and `sha` inputs, retaining `/language:javascript-typescript`. Source results retain both language categories. [Pinned analyze action inputs](https://github.com/github/codeql-action/blob/cdf488f595d80d6e07e03d4674febd5ab45fa938/analyze/action.yml)

## Staging is the default

The repository variable `CODEQL_SETUP_MODE` controls uploads, not whether extraction and queries run. An absent or empty value means `staging`. Each job validates the value in a fixed shell step through a quoted environment variable; any value other than `staging` or `advanced` fails before analysis.

| Repository variable | SARIF upload | Database upload | Meaning of a successful run |
| --- | --- | --- | --- |
| Absent, empty, or `staging` | `upload: never` | `upload-database: false` | Extraction and queries completed; this workflow did not publish SARIF or alerts |
| `advanced` | `upload: always` | `upload-database: true` | Uploads are enabled; independently verify accepted analyses and their ref/SHA |

The fixed step logs the selected behavior. It does not query or change GitHub's default-setup configuration, create a token, or infer that an administrator has completed the final transition. Keep default setup active throughout staging so its existing alert protection remains in place. Source staging jobs are named `Verify CodeQL setup (actions)` and `Verify CodeQL setup (javascript-typescript)`, avoiding collisions with the required `Analyze`/`CodeQL` checks still supplied by default setup. Only `advanced` restores the exact `Analyze (language)` source job names. A green staging run is not proof of new alert coverage. These are the pinned analyze action's documented upload inputs. [Upload controls](https://github.com/github/codeql-action/blob/cdf488f595d80d6e07e03d4674febd5ab45fa938/analyze/action.yml)

## Security boundary

Global token permissions are empty; each scan receives only `contents: read` and `security-events: write`. Checkout and CodeQL actions use full commit pins, and checkout does not persist credentials. There are no PATs, caches, downloaded workflow artifacts, package installs, build commands, `pull_request_target`, or execution of checked-out files. Both languages use `build-mode: none`, the default query suite, and no custom exclusions. Source matrix failures are independent (`fail-fast: false`); every job has a 30-minute timeout.

The published event guard requires the expected workflow name, a successful result, this repository as `head_repository`, and `gh-pages` as `head_branch`. Event values enter the fixed SHA-verification shell step through environment variables, not shell interpolation. Missing or mismatched event SHAs fail verification. Skipped jobs indicate a different event target, not a suppressed analysis failure.

Published scanning supplements source scanning: it is not proof that every generated bundle was analyzed. CodeQL excludes minified JavaScript averaging more than 200 characters per line by default. Inspect extracted-file coverage in both analyses; retain source scanning for those bundles. [CodeQL JavaScript extraction behavior](https://codeql.github.com/docs/codeql-overview/codeql-changelog/codeql-cli-2.24.0/)

## Controlled default-to-advanced migration

Adding these files does not change the repository's CodeQL setup mode or variables. The maintainer must perform the final transition explicitly and with separate approval; no settings change is made by this workflow or guide.

1. Record the current default-setup languages, query suite, threat model, latest successful analyses, and required checks. The reviewed baseline uses the default query suite and remote threat model; preserve any subsequently changed settings before switching. Keep existing alerts and analysis history.
2. Leave default setup enabled and `CODEQL_SETUP_MODE` absent or explicitly `staging`. Review the workflow in a PR. Require successful extraction and queries for both source languages before merging; verify the existing default-setup checks and protection remain active.
3. Merge the reviewed workflow, then verify both source jobs in staging on `main`. Manually run it from `main` with `target=published` to preflight the current `gh-pages` commit without deployment. Inspect actual extracted-file coverage, completed query execution, and the published job's exact checked-out SHA. All PR, merged-source, and manual-published preflights must pass. These runs do not publish SARIF or new alerts.
4. Only after the merged replacement is verified and the final transition is separately approved, coordinate the explicit default-setup API update to `state: not-configured`, set the repository variable `CODEQL_SETUP_MODE=advanced`, and dispatch both `target=source` and `target=published` from `main`. Do not disable default setup before staging verification. Do not merely hide the failed check or remove required languages.
5. Verify accepted source analyses for both languages at the expected `main` SHA, and published JavaScript at `refs/heads/gh-pages` with the exact logged/checked-out SHA and `/language:javascript-typescript`. Confirm a subsequent PR scan and required-check mapping. A green workflow alone is insufficient: inspect upload processing and alert coverage.
6. Confirm the next genuine successful Pages deployment triggers the same JS-only scan for that run's exact SHA. A failed, cancelled, differently named, foreign-repository, or non-`gh-pages` run must not enter the privileged published job. Monitor scheduled source scans as well.

Staging avoids simultaneous default/advanced SARIF uploads. Advanced uploads are rejected while default setup remains enabled, so the final configuration change and first verified uploads must be coordinated. [GitHub migration procedure](https://docs.github.com/en/code-security/how-tos/find-and-fix-code-vulnerabilities/configure-code-scanning/configuring-advanced-setup-for-code-scanning), [default-setup upload conflict](https://docs.github.com/en/code-security/reference/code-scanning/sarif-files/troubleshoot-sarif-uploads/default-setup-enabled)

Use the documented [default-setup REST schema](https://docs.github.com/en/rest/code-scanning/code-scanning#update-a-code-scanning-default-setup-configuration) for the explicit configuration change; do not create a repository token or store credentials in these files. Repository administrators own setup mode, branch protections, required-check verification, and any later pin updates. Existing Dependabot GitHub Actions updates cover the new pinned actions.

## Rollback

If staging fails, keep default setup active, preserve the failure evidence, and fix the replacement before requesting the final transition. If advanced mode cannot perform both source-language scans and the published JS scan, first set `CODEQL_SETUP_MODE=staging` or disable the replacement workflow. Stop or let any already-running advanced jobs finish before restoring the previously recorded default-setup configuration through the explicit API, so in-flight uploads do not conflict. Keep the reviewed files and failure evidence available for correction. Recheck the restored source and JavaScript analyses. The previously diagnosed `gh-pages` Actions mismatch may return until the branch-scoped replacement is operational; do not disguise it with ignored errors. Do not delete alerts, historical analyses, or branch protections to make status green.
