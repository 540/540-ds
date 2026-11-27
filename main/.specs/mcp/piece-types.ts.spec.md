---
predictable: spec
---
## Specification Details
- **ID:** SPEC-267
- **Name:** mcp/piece-types.ts

### Description
`piece-types.ts` — Piece-types. This project's call graph records DIRECT calls only, so a function passed to a container, destructured into an exported binding, or reached through a dynamic lookup is not one it can see. Within that limit it records no call to this module. `PieceTypeDef` carries `name`, `description`, `triggers`, `status`, `rulesFile` and `templateDir`. `PieceTypeStatus` is `'stable' | 'draft'` and `PieceType` is `string`. No requirements recorded yet — 2 declarations were examined and no obligation was decided about them.
