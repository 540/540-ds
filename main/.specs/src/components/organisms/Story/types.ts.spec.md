---
predictable: spec
---
## Specification Details
- **ID:** SPEC-390
- **Name:** src/components/organisms/Story/types.ts

### Description
`types.ts` — Types. This project's call graph records DIRECT calls only, so a function passed to a container, destructured into an exported binding, or reached through a dynamic lookup is not one it can see. Within that limit it records no call to this module. `StoryProps` carries `id`, `title`, `paragraphs`, `bridge`, `kind`, `tone` and `className`. No requirements recorded yet — 1 declaration was examined and no obligation was decided about it.
