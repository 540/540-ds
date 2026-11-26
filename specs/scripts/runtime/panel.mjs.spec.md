---
predictable: spec
---
## Specification Details
- **ID:** SPEC-012
- **Name:** scripts/runtime/panel.mjs

### Description
<!-- predictable:module-summary=The Panel module implements a runtime debugging overlay used during rendered-piece checks, invoked from the runtime boot process and relying on document.body being available. -->
**Areas:** Runtime Panel

`panel.mjs` — Panel. Observed: “What `Document.body` returns can be null here.” 1 requirement: 1 violated.

### Declarations

`panel.mjs` — Declares 2 functions:
- `showProblems`(`_pattern`) — What `Document.body` returns can be null here
- `el`(`name`, `attrs`, `...children`) — internal, no requirement inferred

### Notation

A requirement is a condition an operation needs in order not to fail in the way its own row names — an operation with several failures carries a row for each, and meeting one says nothing about the others. Some a caller supplies, others the operation establishes and checks itself. Nobody has checked the callers.

`implemented` — the operation exists in the code; every machine-written row carries it.

Tags: `[implemented, violated]` — the analysis found a case where the condition fails.
`[violated]` on the card above and `[implemented, violated]` on a row below are one state.

On the cards: `internal` — nothing outside this file can reach the operation (a `private` member, or a declaration the module does not export), so a requirement here is not addressed to anybody outside it. `no requirement inferred` — no requirement on this page is about the operation. Either nothing was decided about it, or what was decided is not addressed to a caller (see `internal`); neither means nothing is needed. Where the analysis could not finish, the description above says so by name. Ids in the machine-managed sections below are assigned per run and are not stable references; cite the requirement's sentence.

### Behaviours

#### panel.showProblems <!-- predictable:group -->

##### BEH-0018 [implemented, violated]
What `Document.body` returns can be null here. `Document.body` can return nothing in ordinary conditions, and its answer is used without a check, so the first member access throws. Safe to rely on when what `Document.body` answers is tested before it is used.

<!-- predictable:behaviour -->

<!-- predictable:subject=panel.showProblems -->

<!-- predictable:vc=site.platform-type-dereferenced.Document-body.0fbc38fe -->

- **Code locations:** [scripts/runtime/panel.mjs:22-56](../../../scripts/runtime/panel.mjs#L22-L56)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-012/BEH-0018.md -->
