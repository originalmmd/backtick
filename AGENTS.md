# Backtick — Agent Workflow Conventions

## Branching & PRs

- All work **must** be done on a feature branch, never directly on `main`.
- After completing work on a branch, create a pull request with a full industry-standard description covering:
  - What was changed and why
  - How it was implemented
  - Any relevant details for reviewers
- PRs are merged into `main` (no direct pushes or tag creation from a local checkout).
- After merging, tag the release from the `main` branch via the GitHub UI or a dedicated release workflow.

## Conventions

- No comments in code except `// TODO:` markers.
- Keep responses concise — no preamble or postamble.
- Always run lint/typecheck before committing.
