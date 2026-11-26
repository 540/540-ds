---
predictable: spec
---
## Specification Details
- **ID:** SPEC-060
- **Name:** scripts/build-lib.mjs

### Description
`build-lib.mjs` — Build-lib. This project's call graph records DIRECT calls only, so a function passed to a container, destructured into an exported binding, or reached through a dynamic lookup is not one it can see. Within that limit it records no call to this module. No requirements recorded yet — 9 declarations were examined and no obligation was decided about them.
