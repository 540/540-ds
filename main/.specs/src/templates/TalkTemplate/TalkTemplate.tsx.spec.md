---
predictable: spec
---
## Specification Details
- **ID:** SPEC-259
- **Name:** src/templates/TalkTemplate/TalkTemplate.tsx

### Description
`TalkTemplate.tsx` — Talk template. This project's call graph records DIRECT calls only, so a function passed to a container, destructured into an exported binding, or reached through a dynamic lookup is not one it can see. Within that limit it records no call to this module. At least one of its operations is exported. At run time it reaches `StepsContext`. `TalkTemplateProps` carries `defaultTheme`. No requirements recorded yet — 9 operations were examined and no obligation was decided about them.

### Declarations

`TalkTemplate` — Declares 9 functions:
- `ContextCards`() (internal) — “Five compact cards that enter one by one; at the last step the first one is highlighted.” — internal, no requirement inferred
- `CycleWithPanel`() (internal) — “The ring follows the step; at step 4 every phase is done and the fourth is marked red.” — internal, no requirement inferred
- `LayeredDiagram`() (internal) — “A diagram that lights up in three layers: the chain, a note, and the chain with two highlights.” — internal, no requirement inferred
- `x`(`i`) — internal, no requirement inferred
- `y`(`v`) — internal, no requirement inferred
- `path`(`vals`) — internal, no requirement inferred
- `SchemaLine`() (internal) — “A two-series line chart drawn with the Schema vocabulary: gray context, one yellow series.” — internal, no requirement inferred
- `TalkTemplate`(`_pattern`) — “TalkTemplate is a whole talk built only with the catalog: every stop the system can make.” — no requirement inferred
- `TimeBar`() (internal) — “The time bar fills with the step and lights its milestones one by one.” — internal, no requirement inferred

### Notation

On the cards: `internal` — nothing outside this file can reach the operation (a `private` member, or a declaration the module does not export), so a requirement here is not addressed to anybody outside it. `no requirement inferred` — no requirement on this page is about the operation. Either nothing was decided about it, or what was decided is not addressed to a caller (see `internal`); neither means nothing is needed. Where the analysis could not finish, the description above says so by name.
