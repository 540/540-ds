---
predictable: spec
---
## Specification Details
- **ID:** SPEC-029
- **Name:** src/main.tsx

### Description
`main.tsx` — Main. This project's call graph records DIRECT calls only, so a function passed to a container, destructured into an exported binding, or reached through a dynamic lookup is not one it can see. Within that limit it records no call to this module. REFUTED: “`main.__moduleInit__` requires that the value of `getElementById`(`document`, "root") is not null.” 1 requirement: 1 violated.

### Notation

A requirement is a condition an operation needs in order not to fail in the way its own row names — an operation with several failures carries a row for each, and meeting one says nothing about the others. Some a caller supplies, others the operation establishes and checks itself. Nobody has checked the callers.

`implemented` — the operation exists in the code; every machine-written row carries it.

Tags: `[implemented, violated]` — the analysis found a case where the condition fails. Ids in the machine-managed sections below are assigned per run and are not stable references; cite the requirement's sentence.

### Analysis

#### main.__moduleInit__ <!-- predictable:group -->

##### ANL-0047 [implemented, violated]
`main.__moduleInit__` requires that the value of `getElementById`(`document`, "root") is not null.

<!-- predictable:analysis -->

<!-- predictable:subject=main.__moduleInit__ -->

<!-- predictable:vc=il1.null-dereference -->

- **Code locations:** [src/main.tsx:6-10](../../src/main.tsx#L6-L10)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-029/ANL-0047.md -->
