# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Context

This is a practical assignment workspace ("CELL IA/Project/Practical 1"). The repository is currently minimal with no source code or build manifests present yet.

## Development Approach

**Discovery First**: Before running any commands, identify the project's language and structure:
- Look for entrypoint files (`main.py`, `index.js`, `app.py`, etc.) or directories (`src/`, `app/`)
- Check for package manifests (`package.json`, `requirements.txt`, `pyproject.toml`, `pom.xml`, `Cargo.toml`, etc.)
- If these don't exist, ask the user for the project language/runtime and expected structure

**When Blocked**: If required files (build manifests, entrypoints, configuration) are missing, stop and ask for clarification rather than making assumptions about project structure or tooling.

## Code Modification Rules

- Make single logical changes per commit with focused scope
- Edit the minimal number of files needed for the feature/bugfix
- Add tests for behavioral changes following the repository's existing test framework conventions
- When adding dependencies, include justification in the commit message
- Keep changes non-breaking where possible

## Testing Conventions

When adding tests, use standard conventions for the detected language if no existing tests are present:
- Python: `test_*.py` or `*_test.py`
- JavaScript/TypeScript: `*.test.js`, `*.spec.js`
- Java: `*Test.java`
- Go: `*_test.go`

## Pull Requests

For automated PRs, include:
- Goal of the change
- Files modified and why
- Test summary or validation approach
