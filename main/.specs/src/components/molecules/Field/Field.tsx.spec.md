---
predictable: spec
---
## Specification Details
- **ID:** SPEC-019
- **Name:** src/components/molecules/Field/Field.tsx

### Description
`Field.tsx` — Field. This project's call graph records DIRECT calls only, so a function passed to a container, destructured into an exported binding, or reached through a dynamic lookup is not one it can see. Within that limit it records no call to this module. At least one of its operations is exported. REFUTED: “`Field.Field` only works when `rest` is not null.” 1 requirement: 1 violated.

### Declarations

`Field` — Declares 1 function:
- `Field`(`props`) — “Field is a form field: the label above and the control, tied by the id.” — requires `rest` is not null [violated]

### Notation

A requirement is a condition an operation needs in order not to fail in the way its own row names — an operation with several failures carries a row for each, and meeting one says nothing about the others. Some a caller supplies, others the operation establishes and checks itself. Nobody has checked the callers.

`implemented` — the operation exists in the code; every machine-written row carries it.

Tags: `[implemented, violated]` — the analysis found a case where the condition fails.
`[violated]` on the card above and `[implemented, violated]` on a row below are one state. Ids in the machine-managed sections below are assigned per run and are not stable references; cite the requirement's sentence.

### Analysis

#### Field.Field <!-- predictable:group -->

##### ANL-0033 [implemented, violated]
`Field.Field` only works when `rest` is not null.

<!-- predictable:analysis -->

<!-- predictable:subject=Field.Field -->

<!-- predictable:vc=il1.null-dereference -->

<!-- predictable:sibling-vcs=il2.null-dereference -->

- **Code locations:** [src/components/molecules/Field/Field.tsx:10-35](../../../../../src/components/molecules/Field/Field.tsx#L10-L35)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-019/ANL-0033.md -->
