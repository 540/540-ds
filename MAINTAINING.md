# Maintaining this repository

Instructions for the Predictable Code agent. The agent reads this file first on every run.

## Do not fix defects

- Do not propose a fix for any defect the analysis reports, verified or not.
- Do not change production code: nothing under `src/`, `mcp/` or `scripts/`, and no configuration file.
- A person decides which defects to fix and fixes them. The defects stay visible in the Control Center.

## Keep the specs

Specs are welcome: the per-file specs and the capability specs.

- Keep the specs under `specs/` in line with the code: descriptions, requirements, areas and code locations.
- Write specs only for the code folders Predictable analyses: `src`, `mcp`, `scripts/render` and `scripts/runtime`. The build and check scripts are project tooling and have no specs.
- State only what the code does. Check each statement against the code before you write it. `README.md` and the files under `_docs/` can be out of date, so do not copy a claim from them without that check.
- A test that checks a requirement of a spec is fine. It must not need a change in production code.
- When the code contradicts a spec, say so in the pull request and leave the code as it is.

If a run finds nothing to do under these rules, say so and propose nothing.
