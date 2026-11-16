---
predictable: spec
---
## Specification Details
- **ID:** SPEC-216
- **Name:** src/foundations/MeasureTable.tsx

### Description
`MeasureTable.tsx` — Measure table. This project's call graph records DIRECT calls only, so a function passed to a container, destructured into an exported binding, or reached through a dynamic lookup is not one it can see. Within that limit it records no call to this module. At least one of its operations is exported. At run time it reaches `useTokenValue`. `Props` carries `tokens` and `bar`. No requirements recorded yet — 2 operations were examined and no obligation was decided about them.

### Declarations

`MeasureTable` — Declares 2 functions: `Row`(`_pattern`) (internal) and `MeasureTable`(`_pattern`) — “A table of measure tokens with their live value and an optional proportional bar.”

### Notation

On the cards: `internal` — nothing outside this file can reach the operation (a `private` member, or a declaration the module does not export), so a requirement here is not addressed to anybody outside it.
