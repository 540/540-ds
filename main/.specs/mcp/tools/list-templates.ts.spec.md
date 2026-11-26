---
predictable: spec
---
## Specification Details
- **ID:** SPEC-056
- **Name:** mcp/tools/list-templates.ts

### Description
`list-templates.ts` — List-templates. This project's call graph records DIRECT calls only, so a function passed to a container, destructured into an exported binding, or reached through a dynamic lookup is not one it can see. Within that limit it records no call to this module. At run time it reaches `shared`. No requirements recorded yet — 2 operations were examined and no obligation was decided about them.

### Declarations

`list-templates` — Declares 1 function: `toolsFor`(`pieceType`, `metadata`) (internal) — “The template tools that have data for a piece type, so the agent never calls one that would fail.”

`listTemplates` — Declares 1 operation: `handler`(`_input`, `metadata`).

### Notation

On the cards: `internal` — nothing outside this file can reach the operation (a `private` member, or a declaration the module does not export), so a requirement here is not addressed to anybody outside it.
