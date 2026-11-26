---
predictable: spec
---
## Specification Details
- **ID:** SPEC-013
- **Name:** src/components/molecules/NavMobile/NavMobile.tsx

### Description
`NavMobile.tsx` — Nav mobile. This project's call graph records DIRECT calls only, so a function passed to a container, destructured into an exported binding, or reached through a dynamic lookup is not one it can see. Within that limit it records no call to this module. At least one of its operations is exported. Checks: “`NavMobile.NavMobile` only works when `panel` is not null.” 2 requirements: 1 violated, 1 verified.

### Declarations

`NavMobile` — Declares 1 function:
- `NavMobile`(`_pattern`) — “NavMobile is the narrow-screen navigation: the logo and a button that opens the menu full screen.” — requires `panel` is not null [verified]; what `Document.body` returns can be null here

A `[verified]` requirement is one the operation checks itself.

### Notation

A requirement is a condition an operation needs in order not to fail in the way its own row names — an operation with several failures carries a row for each, and meeting one says nothing about the others. Some a caller supplies, others the operation establishes and checks itself. Nobody has checked the callers.

`implemented` — the operation exists in the code; every machine-written row carries it.

Tags: `[implemented, verified]` — the operation checks this and refuses when it fails.
`[implemented, violated]` — the analysis found a case where the condition fails.
`[verified]` on the card above and `[implemented, verified]` on a row below are one state;
likewise for the other one. Ids in the machine-managed sections below are assigned per run and are not stable references; cite the requirement's sentence.

### Analysis

#### NavMobile.NavMobile <!-- predictable:group -->

##### ANL-0040 [implemented, verified]
`NavMobile.NavMobile` only works when `panel` is not null.

<!-- predictable:analysis -->

<!-- predictable:subject=NavMobile.NavMobile -->

<!-- predictable:vc=il1.null-dereference -->

<!-- predictable:sibling-vcs=il2.null-dereference il3.null-dereference il4.null-dereference -->

- **Code locations:** [src/components/molecules/NavMobile/NavMobile.tsx:14-79](../../../../../src/components/molecules/NavMobile/NavMobile.tsx#L14-L79)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-013/ANL-0040.md -->

### Behaviours

#### NavMobile.NavMobile <!-- predictable:group -->

##### BEH-0020 [implemented, violated]
What `Document.body` returns can be null here. `Document.body` can return nothing in ordinary conditions, and its answer is used without a check, so the first member access throws. Safe to rely on when what `Document.body` answers is tested before it is used.

<!-- predictable:behaviour -->

<!-- predictable:subject=NavMobile.NavMobile -->

<!-- predictable:vc=site.platform-type-dereferenced.Document-body.0fbc38fe -->

- **Code locations:** [src/components/molecules/NavMobile/NavMobile.tsx:37](../../../../../src/components/molecules/NavMobile/NavMobile.tsx#L37)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-013/BEH-0020.md -->
