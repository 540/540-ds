---
predictable: spec
---
## Specification Details
- **ID:** SPEC-067
- **Name:** scripts/render/spelling.mjs

### Description
`spelling.mjs` — Spelling. Called from `index.renderTalk`, and possibly from places the call graph cannot see. At run time it reaches `parse`. `collectCopy` builds `fromJson`, `collectCopy` builds `visit` and `checkSpelling` builds `known`, and no requirement here is about what runs inside them. No requirements recorded yet — 7 operations were examined and no obligation was decided about them.

### Declarations

`spelling.mjs` — Declares 7 functions:
- `loadCheckers`() — internal, no requirement inferred
- `loadWords`(`file`) — internal, no requirement inferred
- `collectCopy`(`nodes`) — internal, no requirement inferred
- `plain`(`text`) — internal, no requirement inferred
- `isAcronymOrCode`(`word`) — internal, no requirement inferred
- `isCapitalized`(`word`) — internal, no requirement inferred
- `checkSpelling`(`source`, `_pattern`) — no requirement inferred

### Notation

On the cards: `internal` — nothing outside this file can reach the operation (a `private` member, or a declaration the module does not export), so a requirement here is not addressed to anybody outside it. `no requirement inferred` — no requirement on this page is about the operation. Either nothing was decided about it, or what was decided is not addressed to a caller (see `internal`); neither means nothing is needed. Where the analysis could not finish, the description above says so by name.
