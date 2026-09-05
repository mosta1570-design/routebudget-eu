# CodeQL branch-scoped setup

## Why this workflow exists

The observed default-setup failure was the Actions-language scan on protected `gh-pages`: that branch contains published static assets, not workflow source, so CodeQL exited with code 32. Its JavaScript scan succeeded. Removing Actions from the repository-wide language list would also remove useful source-workflow coverage on `main`.

`.github/workflows/codeql.yml` separates those inputs without dummy files, ignored errors, or changes to branch protection:

| Input | Trigger | Languages | Analysis identity |
| --- | --- | --- | --- |
| Source checkout | Push to `main`, PR targeting `main`, weekly Tuesday 05:23 UTC, or manual `target=source` | Actions and JavaScript/TypeScript | Normal event ref/SHA; existing `Analyze (actions)` and `Analyze (javascript-typescript)` job names |
| Published checkout | Successful same-repository `pages build and deployment` run on `gh-pages`, or manual `target=published` | JavaScript/TypeScript only | Explicit `refs/heads/gh-pages` and the checked-out commit SHA |

The published job checks out the triggering Pages run's exact `head_sha`; manual runs resolve the current `gh-pages` tip and record its actual SHA. Neither path deploys the website. A `workflow_run` normally carries the default branch's ref/SHA, so relying on those values would misattribute the artifact scan. The workflow must be on the default branch for this trigger to operate. [GitHub event semantics](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#workflow_run)

Published results use the action's paired `ref` and `sha` inputs, retaining `/language:javascript-typescript`. Source results retain both language categories. [Pinned analyze action inputs](https://github.com/github/codeql-action/blob/cdf488f595d80d6e07e03d4674febd5ab45fa938/analyze/action.yml)

## Security boundary

Global token permissions are empty; each scan receives only `contents: read` and `security-events: write`. Checkout and CodeQL actions use full commit pins, and checkout does not persist credentials. There are no PATs, caches, downloaded workflow artifacts, package installs, build commands, `pull_request_target`, or execution of checked-out files. Both languages use `build-mode: none`, the default query suite, and no custom exclusions. Source matrix failures are independent (`fail-fast: false`); every job has a 30-minute timeout.

The published event guard requires the expected workflow name, a successful result, this repository as `head_repository`, and `gh-pages` as `head_branch`. Event values enter the fixed SHA-verification shell step through environment variables, not shell interpolation. Missing or mismatched event SHAs fail verification. Skipped jobs indicate a different event target, not a suppressed analysis failure.

Published scanning supplements source scanning: it is not proof that every generated bundle was analyzed. CodeQL excludes minified JavaScript averaging more than 200 characters per line by default. Inspect extracted-file coverage in both analyses; retain source scanning for those bundles. [CodeQL JavaScript extraction behavior](https://codeql.github.com/docs/codeql-overview/codeql-changelog/codeql-cli-2.24.0/)

## Controlled default-to-advanced migration

Adding these files does not change the repository's CodeQL setup mode. The maintainer must perform the migration explicitly; no settings change is made by this workflow or guide.

1. Record the current default-setup languages, query suite, latest successful analyses, and required checks. Verify the source suite is the existing default suite; if current settings differ, preserve them in the reviewed workflow before switching. Keep existing alerts and analysis history.
2. Have this exact workflow reviewed and ready to land. Only then use the explicit default-setup API update to set `state: not-configured`, as part of the authorized switch to advanced setup. Do not merely hide the failed check or remove required languages.
3. Enable the reviewed replacement promptly and run it on `main`. Default setup and advanced CodeQL uploads cannot overlap: uploads from the replacement are rejected while default setup is enabled. Treat the switch and first verified scans as one coordinated operation. [GitHub migration procedure](https://docs.github.com/en/code-security/how-tos/find-and-fix-code-vulnerabilities/configure-code-scanning/configuring-advanced-setup-for-code-scanning), [default-setup upload conflict](https://docs.github.com/en/code-security/reference/code-scanning/sarif-files/troubleshoot-sarif-uploads/default-setup-enabled)
4. Verify successful uploaded source analyses for both languages at the expected `main` SHA and a PR merge ref; confirm the existing required check names still resolve. A green workflow alone is insufficient.
5. Manually run this workflow from `main` with `target=published` to verify the current artifact without a new deployment. Confirm the resulting analysis has `refs/heads/gh-pages`, the exact logged/checked-out SHA, and `/language:javascript-typescript`; inspect its extracted-file coverage.
6. Confirm the next genuine successful Pages deployment triggers the same JS-only scan for that run's exact SHA. A failed, cancelled, differently named, foreign-repository, or non-`gh-pages` run must not enter the privileged published job. Monitor scheduled source scans as well.

Use the documented [default-setup REST schema](https://docs.github.com/en/rest/code-scanning/code-scanning#update-a-code-scanning-default-setup-configuration) for the explicit configuration change; do not create a repository token or store credentials in these files. Repository administrators own setup mode, branch protections, required-check verification, and any later pin updates. Existing Dependabot GitHub Actions updates cover the new pinned actions.

## Rollback

If advanced setup cannot perform both source-language scans and the published JS scan, stop the transition and restore the previously recorded default-setup configuration through the explicit API. Disable the replacement workflow before restoring default uploads to avoid conflicting paths; keep the reviewed files and failure evidence available for correction. Recheck the restored source and JavaScript analyses. The previously diagnosed `gh-pages` Actions mismatch may return until the branch-scoped replacement is operational; do not disguise it with ignored errors. Do not delete alerts, historical analyses, or branch protections to make status green.
