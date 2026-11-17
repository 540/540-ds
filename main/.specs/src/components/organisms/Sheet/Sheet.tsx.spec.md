---
predictable: spec
---
## Specification Details
- **ID:** SPEC-025
- **Name:** src/components/organisms/Sheet/Sheet.tsx

### Description
`Sheet.tsx` — Sheet. This project's call graph records DIRECT calls only, so a function passed to a container, destructured into an exported binding, or reached through a dynamic lookup is not one it can see. Within that limit it records no call to this module. At least one of its operations is exported. At run time it reaches `StepsContext`. Checks: “`Sheet.Sheet` only works when `stop` is not null.” 1 requirement: 1 verified.

### Declarations

`Sheet` — Declares 2 functions:
- `stopOf`(`el`) (internal) — “The stop the Deck counts for el: its outermost [data-stop], or else its section.” — internal, no requirement inferred
- `Sheet`(`_pattern`) — “Sheet is a panel that rises from the bottom edge over the stop, with a veil behind.” — requires `stop` is not null [verified]

A `[verified]` requirement is one the operation checks itself.

### Notation

A requirement is a condition an operation needs in order not to fail in the way its own row names — an operation with several failures carries a row for each, and meeting one says nothing about the others. Some a caller supplies, others the operation establishes and checks itself. Nobody has checked the callers.

`implemented` — the operation exists in the code; every machine-written row carries it.

Tags: `[implemented, verified]` — the operation checks this and refuses when it fails.
`[verified]` on the card above and `[implemented, verified]` on a row below are one state.

On the cards: `internal` — nothing outside this file can reach the operation (a `private` member, or a declaration the module does not export), so a requirement here is not addressed to anybody outside it. `no requirement inferred` — no requirement on this page is about the operation. Either nothing was decided about it, or what was decided is not addressed to a caller (see `internal`); neither means nothing is needed. Where the analysis could not finish, the description above says so by name. Ids in the machine-managed sections below are assigned per run and are not stable references; cite the requirement's sentence.

### Analysis

#### Sheet.Sheet <!-- predictable:group -->

##### ANL-0041 [implemented, verified]
`Sheet.Sheet` only works when `stop` is not null.

<!-- predictable:analysis -->

<!-- predictable:subject=Sheet.Sheet -->

<!-- predictable:vc=il1.null-dereference -->

- **Code locations:** [src/components/organisms/Sheet/Sheet.tsx:19-73](../../../../../src/components/organisms/Sheet/Sheet.tsx#L19-L73)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-025/ANL-0041.md -->
