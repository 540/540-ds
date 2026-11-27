---
predictable: spec
---
## Specification Details
- **ID:** SPEC-265
- **Name:** mcp/firebase.ts

### Description
`firebase.ts` — Firebase. This project's call graph records DIRECT calls only, so a function passed to a container, destructured into an exported binding, or reached through a dynamic lookup is not one it can see. Within that limit it records no call to this module. At run time it reaches `http` and `«node-adapter»`. No requirements recorded yet — 1 declaration was examined and no obligation was decided about it.
