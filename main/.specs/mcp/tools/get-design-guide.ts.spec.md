---
predictable: spec
---
## Specification Details
- **ID:** SPEC-230
- **Name:** mcp/tools/get-design-guide.ts

### Description
`get-design-guide.ts` — Get-design-guide. This project's call graph records DIRECT calls only, so a function passed to a container, destructured into an exported binding, or reached through a dynamic lookup is not one it can see. Within that limit it records no call to this module. At run time it reaches `shared`. No requirements recorded yet — 1 operation was examined and no obligation was decided about it.

### Types

`getDesignGuide` — Declares 1 operation: `handler`(`_input`, `metadata`).
