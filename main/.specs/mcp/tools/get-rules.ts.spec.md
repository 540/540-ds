---
predictable: spec
---
## Specification Details
- **ID:** SPEC-051
- **Name:** mcp/tools/get-rules.ts

### Description
`get-rules.ts` — Get-rules. This project's call graph records DIRECT calls only, so a function passed to a container, destructured into an exported binding, or reached through a dynamic lookup is not one it can see. Within that limit it records no call to this module. At run time it reaches `shared`. No requirements recorded yet — 1 operation was examined and no obligation was decided about it.

### Types

`getRules` — Declares 1 operation: `handler`(`_pa0`, `metadata`).
