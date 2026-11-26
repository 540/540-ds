---
predictable: spec
---
## Specification Details
- **ID:** SPEC-186
- **Name:** src/components/organisms/Funnel/Funnel.tsx

### Description
`Funnel.tsx` — Funnel. This project's call graph records DIRECT calls only, so a function passed to a container, destructured into an exported binding, or reached through a dynamic lookup is not one it can see. Within that limit it records no call to this module. At least one of its operations is exported. At run time it reaches `useNumberFormat` and `useReveal`. `Funnel` builds `width`, `Funnel` builds `conversion` and `Funnel` builds `delay`, and no requirement here is about what runs inside them. No requirements recorded yet — 1 operation was examined and no obligation was decided about it.

### Declarations

`Funnel` — Declares 1 function: `Funnel`(`_pattern`) — “Funnel is the steps of a process and how many reach each one: centered bars that narrow with the figure (as wide as the first step at most), each with its figure, and between two steps the share that went on.”
