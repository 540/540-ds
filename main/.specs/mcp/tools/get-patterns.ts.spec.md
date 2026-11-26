---
predictable: spec
---
## Specification Details
- **ID:** SPEC-050
- **Name:** mcp/tools/get-patterns.ts

### Description
`get-patterns.ts` — Get-patterns. This project's call graph records DIRECT calls only, so a function passed to a container, destructured into an exported binding, or reached through a dynamic lookup is not one it can see. Within that limit it records no call to this module. At run time it reaches `shared`. No requirements recorded yet — 2 operations were examined and no obligation was decided about them.

### Declarations

`get-patterns` — Declares 1 function: `fold`(`s`) (internal).

`getPatterns` — Declares 1 operation: `handler`(`_pa0`, `metadata`).

### Notation

On the cards: `internal` — nothing outside this file can reach the operation (a `private` member, or a declaration the module does not export), so a requirement here is not addressed to anybody outside it.
