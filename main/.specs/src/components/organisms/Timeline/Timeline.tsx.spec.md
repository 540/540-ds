---
predictable: spec
---
## Specification Details
- **ID:** SPEC-236
- **Name:** src/components/organisms/Timeline/Timeline.tsx

### Description
`Timeline.tsx` — Timeline. This project's call graph records DIRECT calls only, so a function passed to a container, destructured into an exported binding, or reached through a dynamic lookup is not one it can see. Within that limit it records no call to this module. At least one of its operations is exported. At run time it reaches `useCenterState`. No requirements recorded yet — 2 operations were examined and no obligation was decided about them.

### Declarations

`Timeline` — Declares 2 functions: `Timeline`(`_pattern`) — “Timeline is a vertical axis at half the grid: a dot, a title and a body per step, joined by a continuous line.” and `Step`(`_pattern`) (internal).

### Notation

On the cards: `internal` — nothing outside this file can reach the operation (a `private` member, or a declaration the module does not export), so a requirement here is not addressed to anybody outside it.
