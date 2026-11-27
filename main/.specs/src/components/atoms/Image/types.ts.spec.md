---
predictable: spec
---
## Specification Details
- **ID:** SPEC-561
- **Name:** src/components/atoms/Image/types.ts

### Description
`types.ts` — Types. This project's call graph records DIRECT calls only, so a function passed to a container, destructured into an exported binding, or reached through a dynamic lookup is not one it can see. Within that limit it records no call to this module. `ImageRatio` is `(typeof IMAGE_RATIOS)[number]`. It also declares `ImageProps`, whose target is too long to state here. No requirements recorded yet — 2 declarations were examined and no obligation was decided about them.
