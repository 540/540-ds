---
predictable: spec
---
## Specification Details
- **ID:** SPEC-583
- **Name:** src/components/molecules/Field/types.ts

### Description
`types.ts` — Types. This project's call graph records DIRECT calls only, so a function passed to a container, destructured into an exported binding, or reached through a dynamic lookup is not one it can see. Within that limit it records no call to this module. `Common` carries `label`, `id`, `size` and `className`. `FieldSize` is `(typeof FIELD_SIZES)[number]` and `FieldProps` is `AsInput | AsTextarea`. It also declares `AsInput` and `AsTextarea`, whose targets are too long to state here. No requirements recorded yet — 2 declarations were examined and no obligation was decided about them.
