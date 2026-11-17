---
predictable: spec
---
## Specification Details
- **ID:** SPEC-028
- **Name:** src/hooks/useCenterState.ts

### Description
<!-- predictable:module-summary=A hook that tracks whether a DOM element is currently before, on, or after the viewport center, used to drive center-relative UI state. -->
**Areas:** Hooks

`useCenterState.ts` — Use center state. Checks: “`useCenterState.useCenterState` only works when `el` is not null.” 1 requirement: 1 verified.

### Declarations

`useCenterState` — Declares 1 function:
- `useCenterState`(`ref`) — requires `el` is not null [verified]

A `[verified]` requirement is one the operation checks itself.

### Notation

A requirement is a condition an operation needs in order not to fail in the way its own row names — an operation with several failures carries a row for each, and meeting one says nothing about the others. Some a caller supplies, others the operation establishes and checks itself. Nobody has checked the callers.

`implemented` — the operation exists in the code; every machine-written row carries it.

Tags: `[implemented, verified]` — the operation checks this and refuses when it fails.
`[verified]` on the card above and `[implemented, verified]` on a row below are one state. Ids in the machine-managed sections below are assigned per run and are not stable references; cite the requirement's sentence.

### Analysis

#### useCenterState.useCenterState <!-- predictable:group -->

##### ANL-0046 [implemented, verified]
`useCenterState.useCenterState` only works when `el` is not null.

<!-- predictable:analysis -->

<!-- predictable:subject=useCenterState.useCenterState -->

<!-- predictable:vc=il1.null-dereference -->

- **Code locations:** [src/hooks/useCenterState.ts:12-40](../../../src/hooks/useCenterState.ts#L12-L40)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-028/ANL-0046.md -->
