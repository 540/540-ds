---
predictable: spec
---
## Specification Details
- **ID:** SPEC-556
- **Name:** src/components/atoms/Button/types.ts

### Description
`types.ts` — Types. This project's call graph records DIRECT calls only, so a function passed to a container, destructured into an exported binding, or reached through a dynamic lookup is not one it can see. Within that limit it records no call to this module. `CommonProps` carries `variant`, `size`, `icon`, `iconOnly`, `children` and `className`. `ButtonVariant` is `(typeof BUTTON_VARIANTS)[number]`, `ButtonSize` is `(typeof BUTTON_SIZES)[number]` and `ButtonProps` is `AsButton | AsLink`. It also declares `AsButton` and `AsLink`, whose targets are too long to state here. No requirements recorded yet — 3 declarations were examined and no obligation was decided about them.
