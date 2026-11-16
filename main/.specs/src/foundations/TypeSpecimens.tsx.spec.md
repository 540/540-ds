---
predictable: spec
---
## Specification Details
- **ID:** SPEC-221
- **Name:** src/foundations/TypeSpecimens.tsx

### Description
`TypeSpecimens.tsx` — Type specimens. This project's call graph records DIRECT calls only, so a function passed to a container, destructured into an exported binding, or reached through a dynamic lookup is not one it can see. Within that limit it records no call to this module. At least one of its operations is exported. At run time it reaches `useTokenValue`. No requirements recorded yet — 2 operations were examined and no obligation was decided about them.

### Declarations

`TypeSpecimens` — Declares 2 functions: `Specimen`(`_pattern`) (internal) and `TypeSpecimens`() — “The thirteen text styles rendered with their live tokens.”

### Notation

On the cards: `internal` — nothing outside this file can reach the operation (a `private` member, or a declaration the module does not export), so a requirement here is not addressed to anybody outside it.
