---
predictable: spec
---
## Specification Details
- **ID:** SPEC-677
- **Name:** src/components/organisms/Waffle/types.ts

### Description
`types.ts` — Types. This project's call graph records DIRECT calls only, so a function passed to a container, destructured into an exported binding, or reached through a dynamic lookup is not one it can see. Within that limit it records no call to this module. `WafflePart` carries `value` and `label`; `WaffleProps` carries `value`, `total`, `label`, `name`, `display`, `caption`, `tone`, `secondary` and 2 more. `WaffleTone` is `Extract<ChartTone, 'ink' | 'accent'>`. No requirements recorded yet — 1 declaration was examined and no obligation was decided about it.
