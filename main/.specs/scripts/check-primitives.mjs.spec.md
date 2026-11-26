---
predictable: spec
---
## Specification Details
- **ID:** SPEC-062
- **Name:** scripts/check-primitives.mjs

### Description
`check-primitives.mjs` — Check-primitives. This project's call graph records DIRECT calls only, so a function passed to a container, destructured into an exported binding, or reached through a dynamic lookup is not one it can see. Within that limit it records no call to this module. No requirements recorded yet — 1 operation was examined and no obligation was decided about it.

### Declarations

`check-primitives.mjs` — Declares 1 function: `isChecked`(`file`) (internal).

### Notation

On the cards: `internal` — nothing outside this file can reach the operation (a `private` member, or a declaration the module does not export), so a requirement here is not addressed to anybody outside it.
