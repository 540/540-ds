---
predictable: spec
---
## Specification Details
- **ID:** SPEC-071
- **Name:** src/components/molecules/Grid/types.ts

### Description
`types.ts` — Types. This project's call graph records DIRECT calls only, so a function passed to a container, destructured into an exported binding, or reached through a dynamic lookup is not one it can see. Within that limit it records no call to this module. `GridProps` carries `layout`, `compact`, `align`, `children` and `className`; `GridItemProps` carries `span`, `children` and `className`. `GridLayout` is `(typeof GRID_LAYOUTS)[number]` and `GridAlign` is `(typeof GRID_ALIGNS)[number]`. `GRID_DEFAULTS` maps `layout` to `twelve`, `align` to `stretch` and `span` to `12`. No requirements recorded yet — 3 declarations were examined and no obligation was decided about them.
