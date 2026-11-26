---
predictable: spec
---
## Specification Details
- **ID:** SPEC-214
- **Name:** src/components/organisms/Schema/Schema.tsx

### Description
`Schema.tsx` — Schema. This project's call graph records DIRECT calls only, so a function passed to a container, destructured into an exported binding, or reached through a dynamic lookup is not one it can see. Within that limit it records no call to this module. At least one of its operations is exported. At run time it reaches `StepsContext`. No requirements recorded yet — 4 operations were examined and no obligation was decided about them.

### Declarations

`Schema` — Declares 4 functions: `Schema`(`_pattern`) — “Schema is a drawing of the talk: an SVG with an accessible title and description, built from the vocabulary above.”, `SchemaLayer`(`_pattern`) — “SchemaLayer is a group of the drawing lit from a step on.”, `SchemaFrame`(`_pattern`) — “SchemaFrame gives the drawing the whole window width (scrolling sideways if needed) and a caption.” and `SchemaVoice`(`_pattern`) — “SchemaVoice is the live region that reads the label of the lit layer.”
