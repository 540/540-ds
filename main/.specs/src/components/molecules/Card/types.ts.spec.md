---
predictable: spec
---
## Specification Details
- **ID:** SPEC-434
- **Name:** src/components/molecules/Card/types.ts

### Description
`types.ts` — Types. This project's call graph records DIRECT calls only, so a function passed to a container, destructured into an exported binding, or reached through a dynamic lookup is not one it can see. Within that limit it records no call to this module. `CardVariant` is `(typeof CARD_VARIANTS)[number]`, `CardAlign` is `(typeof CARD_ALIGNS)[number]`, `CardState` is `(typeof CARD_STATES)[number]` and `CardEmphasis` is `(typeof CARD_EMPHASES)[number]`. It also declares `CardProps`, whose target is too long to state here. No requirements recorded yet — 5 declarations were examined and no obligation was decided about them.
