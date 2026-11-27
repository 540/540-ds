---
predictable: spec
---
## Specification Details
- **ID:** SPEC-482
- **Name:** src/components/organisms/Cycle/types.ts

### Description
`types.ts` — Types. This project's call graph records DIRECT calls only, so a function passed to a container, destructured into an exported binding, or reached through a dynamic lookup is not one it can see. Within that limit it records no call to this module. `CycleProps` carries `phases`, `active`, `all`, `highlightFirst`, `marks`, `label` and `className`. `CycleMark` is `(typeof CYCLE_MARKS)[number]`. No requirements recorded yet — 2 declarations were examined and no obligation was decided about them.
