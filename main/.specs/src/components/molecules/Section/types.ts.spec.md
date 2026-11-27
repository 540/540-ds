---
predictable: spec
---
## Specification Details
- **ID:** SPEC-460
- **Name:** src/components/molecules/Section/types.ts

### Description
`types.ts` — Types. This project's call graph records DIRECT calls only, so a function passed to a container, destructured into an exported binding, or reached through a dynamic lookup is not one it can see. Within that limit it records no call to this module. `SectionTone` is `(typeof SECTION_TONES)[number]`. It also declares `SectionProps`, whose target is too long to state here. No requirements recorded yet — 2 declarations were examined and no obligation was decided about them.
