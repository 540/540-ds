---
predictable: spec
---
## Specification Details
- **ID:** SPEC-174
- **Name:** src/components/organisms/Deck/types.ts

### Description
`types.ts` — Types. This project's call graph records DIRECT calls only, so a function passed to a container, destructured into an exported binding, or reached through a dynamic lookup is not one it can see. Within that limit it records no call to this module. `DeckProps` carries `items`, `children`, `footer`, `defaultTheme`, `storageKey`, `navLabel`, `indexLabel`, `blobs` and 3 more. `DeckTheme` is `(typeof DECK_THEMES)[number]`. No requirements recorded yet — 2 declarations were examined and no obligation was decided about them.
