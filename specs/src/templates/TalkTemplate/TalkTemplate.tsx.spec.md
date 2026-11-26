---
predictable: spec
---
## Specification Details
- **ID:** SPEC-259
- **Name:** src/templates/TalkTemplate/TalkTemplate.tsx

### Description
<!-- predictable:module-summary=TalkTemplate is a full-page layout component that arranges a talk piece's slides and steps into a finished themed presentation, consuming StepsContext for navigation state and accepting a default theme via its props. -->
**Areas:** Templates

`TalkTemplate.tsx` — Talk template. No requirements recorded yet.

### Declarations

`TalkTemplate` — Declares 9 functions:
- `ContextCards`() — internal, no requirement inferred
- `CycleWithPanel`() — internal, no requirement inferred
- `LayeredDiagram`() — internal, no requirement inferred
- `x`(`i`) — internal, no requirement inferred
- `y`(`v`) — internal, no requirement inferred
- `path`(`vals`) — internal, no requirement inferred
- `SchemaLine`() — internal, no requirement inferred
- `TalkTemplate`(`_pattern`) — no requirement inferred
- `TimeBar`() — internal, no requirement inferred

### Notation

On the cards: `internal` — nothing outside this file can reach the operation (a `private` member, or a declaration the module does not export), so a requirement here is not addressed to anybody outside it. `no requirement inferred` — no requirement on this page is about the operation. Either nothing was decided about it, or what was decided is not addressed to a caller (see `internal`); neither means nothing is needed. Where the analysis could not finish, the description above says so by name.
