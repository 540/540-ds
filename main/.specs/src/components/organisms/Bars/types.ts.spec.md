---
predictable: spec
---
## Specification Details
- **ID:** SPEC-611
- **Name:** src/components/organisms/Bars/types.ts

### Description
`types.ts` — Types. This project's call graph records DIRECT calls only, so a function passed to a container, destructured into an exported binding, or reached through a dynamic lookup is not one it can see. Within that limit it records no call to this module. `Bar` carries `label`, `value`, `display`, `detail`, `tone` and `dimmed`; `BarsProps` carries `rows`, `label`, `header`, `max`, `unit`, `decimals` and `className`. `BarTone` is `(typeof BAR_TONES)[number]`. No requirements recorded yet — 2 declarations were examined and no obligation was decided about them.
