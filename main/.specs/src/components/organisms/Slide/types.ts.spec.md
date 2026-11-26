---
predictable: spec
---
## Specification Details
- **ID:** SPEC-224
- **Name:** src/components/organisms/Slide/types.ts

### Description
`types.ts` — Types. This project's call graph records DIRECT calls only, so a function passed to a container, destructured into an exported binding, or reached through a dynamic lookup is not one it can see. Within that limit it records no call to this module. `SlideTone` is `(typeof SLIDE_TONES)[number]`. It also declares `SlideProps`, whose target is too long to state here. No requirements recorded yet — 2 declarations were examined and no obligation was decided about them.
