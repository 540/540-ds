---
predictable: spec
---
## Specification Details
- **ID:** SPEC-242
- **Name:** src/components/organisms/Waffle/Waffle.tsx

### Description
`Waffle.tsx` — Waffle. This project's call graph records DIRECT calls only, so a function passed to a container, destructured into an exported binding, or reached through a dynamic lookup is not one it can see. Within that limit it records no call to this module. At least one of its operations is exported. At run time it reaches `useNumberFormat` and `useReveal`. `Waffle` builds `percent`, and no requirement here is about what runs inside it. No requirements recorded yet — 1 operation was examined and no obligation was decided about it.

### Declarations

`Waffle` — Declares 1 function: `Waffle`(`_pattern`) — “Waffle is a proportion counted in squares: a grid of 10 × 10 where the highlighted part fills in reading order, one square after another, when it comes into view (or its Step lights up).”
