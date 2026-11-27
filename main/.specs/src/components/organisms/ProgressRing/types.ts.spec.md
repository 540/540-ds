---
predictable: spec
---
## Specification Details
- **ID:** SPEC-508
- **Name:** src/components/organisms/ProgressRing/types.ts

### Description
`types.ts` — Types. This project's call graph records DIRECT calls only, so a function passed to a container, destructured into an exported binding, or reached through a dynamic lookup is not one it can see. Within that limit it records no call to this module. `ProgressRingProps` carries `value`, `max`, `label`, `display`, `caption`, `tone`, `size`, `decimals` and 1 more. `ProgressRingSize` is `(typeof PROGRESS_RING_SIZES)[number]` and `ProgressRingTone` is `Extract<ChartTone, 'ink' | 'context' | 'accent'>`. No requirements recorded yet — 2 declarations were examined and no obligation was decided about them.
