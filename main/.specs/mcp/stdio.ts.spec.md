---
predictable: spec
---
## Specification Details
- **ID:** SPEC-048
- **Name:** mcp/stdio.ts

### Description
`stdio.ts` — Stdio. This project's call graph records DIRECT calls only, so a function passed to a container, destructured into an exported binding, or reached through a dynamic lookup is not one it can see. Within that limit it records no call to this module. At run time it reaches `server`. No requirements recorded yet — 2 declarations were examined and no obligation was decided about them.
