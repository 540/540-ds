---
predictable: spec
---
## Specification Details
- **ID:** SPEC-052
- **Name:** scripts/check-pieces.mjs

### Description
`check-pieces.mjs` — Check-pieces. This project's call graph records DIRECT calls only, so a function passed to a container, destructured into an exported binding, or reached through a dynamic lookup is not one it can see. Within that limit it records no call to this module. At run time it reaches `«pieces-harness»`. No requirements recorded yet — 2 operations were examined and no obligation was decided about them.

### Declarations

`check-pieces.mjs` — Declares 1 function: `counter`() (internal).

`dom` — Declares 1 operation: `beforeParse`(`win`).

### Notation

On the cards: `internal` — nothing outside this file can reach the operation (a `private` member, or a declaration the module does not export), so a requirement here is not addressed to anybody outside it.
