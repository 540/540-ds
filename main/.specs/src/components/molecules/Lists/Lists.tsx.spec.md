---
predictable: spec
---
## Specification Details
- **ID:** SPEC-079
- **Name:** src/components/molecules/Lists/Lists.tsx

### Description
`Lists.tsx` — Lists. This project's call graph records DIRECT calls only, so a function passed to a container, destructured into an exported binding, or reached through a dynamic lookup is not one it can see. Within that limit it records no call to this module. At least one of its operations is exported. No requirements recorded yet — 3 operations were examined and no obligation was decided about them.

### Declarations

`Lists` — Declares 3 functions: `SimpleList`(`_pattern`) — “SimpleList is a centered list without bullets: the air separates the items.”, `ArrowList`(`_pattern`) — “ArrowList is a centered list with an arrow before each item, for things that lead somewhere.” and `ProblemList`(`_pattern`) — “ProblemList is a list of label + text pairs: the label in secondary, the text in primary.”
