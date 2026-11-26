---
predictable: spec
---
## Specification Details
- **ID:** SPEC-098
- **Name:** src/components/atoms/Text/types.ts

### Description
`types.ts` — Types. This project's call graph records DIRECT calls only, so a function passed to a container, destructured into an exported binding, or reached through a dynamic lookup is not one it can see. Within that limit it records no call to this module. `TextVariant` is `(typeof TEXT_VARIANTS)[number]`, `TextTone` is `(typeof TEXT_TONES)[number]`, `TextAlign` is `(typeof TEXT_ALIGNS)[number]`, `TextWrap` is `(typeof TEXT_WRAPS)[number]`, `TextMeasure` is `(typeof TEXT_MEASURES)[number]` and `TextElement` is `(typeof TEXT_ELEMENTS)[number]`. It also declares `TextProps`, whose target is too long to state here. No requirements recorded yet — 7 declarations were examined and no obligation was decided about them.
