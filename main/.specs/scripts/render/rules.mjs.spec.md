---
predictable: spec
---
## Specification Details
- **ID:** SPEC-271
- **Name:** scripts/render/rules.mjs

### Description
`rules.mjs` — Rules. This project's call graph records DIRECT calls only, so a function passed to a container, destructured into an exported binding, or reached through a dynamic lookup is not one it can see. Within that limit it records no call to this module. No requirements recorded yet — 6 declarations were examined and no obligation was decided about them.
