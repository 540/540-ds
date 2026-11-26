---
predictable: spec
---
## Specification Details
- **ID:** SPEC-063
- **Name:** scripts/lib/pieces-harness.mjs

### Description
`pieces-harness.mjs` — Pieces-harness. Called from `«check-islands».ts (top level)` and `«check-pieces».ts (top level)`, and possibly from places the call graph cannot see. `openPieces` builds `load`, `openPieces` builds `text`, `createHarness` builds `get`, `createHarness` builds `id`, `createHarness` builds `mark`, `createHarness` builds `fill`, `createHarness` builds `slot` and `createHarness` builds `island`, and no requirement here is about what runs inside them. No requirements recorded yet — 2 operations were examined and no obligation was decided about them.

### Declarations

`pieces-harness.mjs` — Declares 2 functions: `openPieces`(`dir`) and `createHarness`(`rt`, `registry`).
