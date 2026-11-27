---
predictable: spec
---
## Specification Details
- **ID:** SPEC-366
- **Name:** src/components/organisms/ProgressBar/types.ts

### Description
`types.ts` — Types. This project's call graph records DIRECT calls only, so a function passed to a container, destructured into an exported binding, or reached through a dynamic lookup is not one it can see. Within that limit it records no call to this module. `ProgressBarProps` carries `value`, `start`, `end`, `milestones`, `reached`, `label` and `className`. `PROGRESS_BAR_DEFAULTS` maps `milestones` to `0` and `reached` to `0`. No requirements recorded yet — 1 declaration was examined and no obligation was decided about it.
