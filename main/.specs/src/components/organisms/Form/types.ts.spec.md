---
predictable: spec
---
## Specification Details
- **ID:** SPEC-114
- **Name:** src/components/organisms/Form/types.ts

### Description
`types.ts` — Types. This project's call graph records DIRECT calls only, so a function passed to a container, destructured into an exported binding, or reached through a dynamic lookup is not one it can see. Within that limit it records no call to this module. `FormAlign` is `(typeof FORM_ALIGNS)[number]`. It also declares `FormProps`, whose target is too long to state here. `FORM_DEFAULTS` maps `noValidate` to `true` and `align` to `end`. No requirements recorded yet — 2 declarations were examined and no obligation was decided about them.
