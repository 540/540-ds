---
predictable: spec
---
## Specification Details
- **ID:** SPEC-402
- **Name:** src/tokens/manifest.ts

### Description
`manifest.ts` — Manifest. This project's call graph records DIRECT calls only, so a function passed to a container, destructured into an exported binding, or reached through a dynamic lookup is not one it can see. Within that limit it records no call to this module. `ColorPrimitive` carries `name` and `label`; `ColorPrimitiveGroup` carries `title`, `description` and `items`; and 5 more shapes. No requirements recorded yet — 9 declarations were examined and no obligation was decided about them.
