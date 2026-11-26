---
predictable: spec
---
## Specification Details
- **ID:** SPEC-217
- **Name:** src/components/organisms/Share/Share.tsx

### Description
`Share.tsx` — Share. This project's call graph records DIRECT calls only, so a function passed to a container, destructured into an exported binding, or reached through a dynamic lookup is not one it can see. Within that limit it records no call to this module. At least one of its operations is exported. At run time it reaches `useReveal`. `Share` builds `share`, and no requirement here is about what runs inside it. No requirements recorded yet — 1 operation was examined and no obligation was decided about it.

### Declarations

`Share` — Declares 1 function: `Share`(`_pattern`) — “Share is a whole split into its parts: one bar at 100 %, its segments growing from the left when it comes into view (or its Step lights up), and a legend with each part's percentage.”
