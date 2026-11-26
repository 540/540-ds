---
predictable: spec
---
## Specification Details
- **ID:** SPEC-248
- **Name:** src/foundations/ImageLibrary.tsx

### Description
`ImageLibrary.tsx` — Image library. This project's call graph records DIRECT calls only, so a function passed to a container, destructured into an exported binding, or reached through a dynamic lookup is not one it can see. Within that limit it records no call to this module. At least one of its operations is exported. `LibraryImage` carries `id`, `kind`, `topics`, `description`, `tone`, `orientation`, `width`, `height` and 2 more. No requirements recorded yet — 2 operations were examined and no obligation was decided about them.

### Declarations

`ImageLibrary` — Declares 2 functions: `urlOf`(`id`) (internal) and `ImageLibrary`(`_pattern`) — “Every photo of the image library of one kind (`imagen` or `textura`), with its reference, themes and credit.”

### Notation

On the cards: `internal` — nothing outside this file can reach the operation (a `private` member, or a declaration the module does not export), so a requirement here is not addressed to anybody outside it.
