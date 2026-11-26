---
predictable: spec
---
## Specification Details
- **ID:** SPEC-038
- **Name:** src/components/organisms/Spotlight/Spotlight.tsx

### Description
<!-- predictable:module-summary=Spotlight is a small UI component that conditionally renders a highlighting effect around a target element identified by an el reference. -->
**Areas:** Atoms

`Spotlight.tsx` — Spotlight. Checks: “`Spotlight.Spotlight` only works when `el` is not null.” 1 requirement: 1 verified.

### Declarations

`Spotlight` — Declares 1 function:
- `Spotlight`(`_pattern`) — requires `el` is not null [verified]

A `[verified]` requirement is one the operation checks itself.

### Notation

A requirement is a condition an operation needs in order not to fail in the way its own row names — an operation with several failures carries a row for each, and meeting one says nothing about the others. Some a caller supplies, others the operation establishes and checks itself. Nobody has checked the callers.

`implemented` — the operation exists in the code; every machine-written row carries it.

Tags: `[implemented, verified]` — the operation checks this and refuses when it fails.
`[verified]` on the card above and `[implemented, verified]` on a row below are one state. Ids in the machine-managed sections below are assigned per run and are not stable references; cite the requirement's sentence.

### Analysis

#### Spotlight.Spotlight <!-- predictable:group -->

##### ANL-0050 [implemented, verified]
`Spotlight.Spotlight` only works when `el` is not null.

<!-- predictable:analysis -->

<!-- predictable:subject=Spotlight.Spotlight -->

<!-- predictable:vc=il1.null-dereference -->

- **Code locations:** [src/components/organisms/Spotlight/Spotlight.tsx:10-37](../../../../../src/components/organisms/Spotlight/Spotlight.tsx#L10-L37)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-038/ANL-0050.md -->
