---
predictable: spec
---
## Specification Details
- **ID:** SPEC-028
- **Name:** src/components/atoms/Button/Button.tsx

### Description
`Button.tsx` — Button. This project's call graph records DIRECT calls only, so a function passed to a container, destructured into an exported binding, or reached through a dynamic lookup is not one it can see. Within that limit it records no call to this module. At least one of its operations is exported. REFUTED: “`Button.Button` only works when `rest` is not null.” 1 requirement: 1 violated.

### Declarations

`Button` — Declares 1 function:
- `Button`(`props`) — “Button is the action that triggers something: send, open, confirm.” — requires `rest` is not null [violated]

### Notation

A requirement is a condition an operation needs in order not to fail in the way its own row names — an operation with several failures carries a row for each, and meeting one says nothing about the others. Some a caller supplies, others the operation establishes and checks itself. Nobody has checked the callers.

`implemented` — the operation exists in the code; every machine-written row carries it.

Tags: `[implemented, violated]` — the analysis found a case where the condition fails.
`[violated]` on the card above and `[implemented, violated]` on a row below are one state. Ids in the machine-managed sections below are assigned per run and are not stable references; cite the requirement's sentence.

### Analysis

#### Button.Button <!-- predictable:group -->

##### ANL-0035 [implemented, violated]
`Button.Button` only works when `rest` is not null.

<!-- predictable:analysis -->

<!-- predictable:subject=Button.Button -->

<!-- predictable:vc=il1.null-dereference -->

- **Code locations:** [src/components/atoms/Button/Button.tsx:9-53](../../../../../src/components/atoms/Button/Button.tsx#L9-L53)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-028/ANL-0035.md -->
