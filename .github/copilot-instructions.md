<!--
Guidance for AI coding agents working in this repository.
This file is intentionally concise and focuses on discoverable, actionable
knowledge an agent needs to be productive quickly.
-->

# Copilot instructions (project-specific)

This project appears to be a small practical assignment workspace. No
high-level AI guidance files were present; the instructions below are a
baseline for automated coding agents. Keep changes minimal and always prefer
non-breaking edits, small commits, and a clear PR description.

## Quick objectives for an agent
- Discover and open top-level language files (look for `src/`, `main`, `app`,
  or language-specific entrypoints). If none exist, ask the maintainer which
  file is the program entrypoint.
- Run build/test commands only after identifying package manifests
  (`package.json`, `pyproject.toml`, `requirements.txt`, `pom.xml`, etc.).
- Make small, well-scoped edits. Add or update tests for behavioral changes.

## How to modify code here (rules)
- Make a single logical change per commit and include test(s) where possible.
- Prefer editing the smallest number of files required to implement the
  feature/bugfix.
- When adding new dependencies, add them to the existing manifest and
  include a short justification in the commit message.

## Project-specific patterns to look for
- There are no discovered README or manifest files. Check for these files and
  create them only when the user asks or when required to run/validate code.
- If you need to run anything, ask the user for the project language/runtime
  and confirm the expected build/test commands.

## Examples to reference in edits
- If you add tests, follow the repository's existing test framework and
  naming conventions (e.g., `test_*.py`, `*.spec.js`) if present; otherwise
  use common conventions for the detected language.

## CI / PR guidance
- Keep PRs focused and describe why the change is needed. For automated PRs
  created by agents, include: goal, files changed, and test summary.

## When you're blocked
- If required files (build manifests, entrypoints, tests) are missing, stop
  and ask the user for clarification instead of guessing.

---

If any of the above is unclear or you want the instructions tailored to a
specific language or framework present in this repo, tell me which files to
inspect (or upload them) and I'll update this guidance.
