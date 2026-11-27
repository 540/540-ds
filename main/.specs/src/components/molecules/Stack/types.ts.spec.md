---
predictable: spec
---
## Specification Details
- **ID:** SPEC-464
- **Name:** src/components/molecules/Stack/types.ts

### Description
`types.ts` — Types. This project's call graph records DIRECT calls only, so a function passed to a container, destructured into an exported binding, or reached through a dynamic lookup is not one it can see. Within that limit it records no call to this module. `StackProps` carries `gap`, `measure`, `children` and `className`. `StackGap` is `(typeof STACK_GAPS)[number]` and `StackMeasure` is `(typeof STACK_MEASURES)[number]`. No requirements recorded yet — 3 declarations were examined and no obligation was decided about them.
