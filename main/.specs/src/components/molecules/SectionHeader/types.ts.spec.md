---
predictable: spec
---
## Specification Details
- **ID:** SPEC-322
- **Name:** src/components/molecules/SectionHeader/types.ts

### Description
`types.ts` — Types. This project's call graph records DIRECT calls only, so a function passed to a container, destructured into an exported binding, or reached through a dynamic lookup is not one it can see. Within that limit it records no call to this module. `SectionHeaderAlign` is `(typeof SECTION_HEADER_ALIGNS)[number]` and `SectionHeaderLevel` is `(typeof SECTION_HEADER_LEVELS)[number]`. It also declares `SectionHeaderProps`, whose target is too long to state here. No requirements recorded yet — 3 declarations were examined and no obligation was decided about them.
