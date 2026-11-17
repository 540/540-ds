---
predictable: spec
---
## Specification Details
- **ID:** SPEC-229
- **Name:** scripts/runtime/panel.mjs

### Description
`panel.mjs` — Panel. Called from `runtime.boot`, and possibly from places the call graph cannot see. No requirements recorded yet — 2 operations were examined and no obligation was decided about them.

### Declarations

`panel.mjs` — Declares 2 functions: `showProblems`(`_pattern`) and `el`(`name`, `attrs`, `...children`) (internal).

### Notation

On the cards: `internal` — nothing outside this file can reach the operation (a `private` member, or a declaration the module does not export), so a requirement here is not addressed to anybody outside it.
