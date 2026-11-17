---
predictable: spec
---
## Specification Details
- **ID:** SPEC-024
- **Name:** src/components/organisms/Marquee/Marquee.tsx

### Description
`Marquee.tsx` — Marquee. This project's call graph records DIRECT calls only, so a function passed to a container, destructured into an exported binding, or reached through a dynamic lookup is not one it can see. Within that limit it records no call to this module. At least one of its operations is exported. `Marquee` builds `pieces` and `Marquee` builds `roundOf`, and no requirement here is about what runs inside them. Checks: “`Marquee.Marquee` only works when `r` is not null.” and 1 more. 2 requirements: 2 verified.

### Declarations

`Marquee` — Declares 1 function:
- `Marquee`(`_pattern`) — “Marquee is a strip of short pieces that scrolls endlessly between two hairlines, edge to edge.” — requires `r` is not null [verified]; `f` is not null [verified]

A `[verified]` requirement is one the operation checks itself.

### Notation

A requirement is a condition an operation needs in order not to fail in the way its own row names — an operation with several failures carries a row for each, and meeting one says nothing about the others. Some a caller supplies, others the operation establishes and checks itself. Nobody has checked the callers.

`implemented` — the operation exists in the code; every machine-written row carries it.

Tags: `[implemented, verified]` — the operation checks this and refuses when it fails.
`[verified]` on the card above and `[implemented, verified]` on a row below are one state. Ids in the machine-managed sections below are assigned per run and are not stable references; cite the requirement's sentence.

### Analysis

#### Marquee.Marquee <!-- predictable:group -->

##### ANL-0039 [implemented, verified]
`Marquee.Marquee` only works when `r` is not null.

<!-- predictable:analysis -->

<!-- predictable:subject=Marquee.Marquee -->

<!-- predictable:vc=il1.null-dereference -->

- **Code locations:** [src/components/organisms/Marquee/Marquee.tsx:13-53](../../../../../src/components/organisms/Marquee/Marquee.tsx#L13-L53)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-024/ANL-0039.md -->

##### ANL-0040 [implemented, verified]
`Marquee.Marquee` only works when `f` is not null.

<!-- predictable:analysis -->

<!-- predictable:subject=Marquee.Marquee -->

<!-- predictable:vc=il2.null-dereference -->

- **Code locations:** [src/components/organisms/Marquee/Marquee.tsx:13-53](../../../../../src/components/organisms/Marquee/Marquee.tsx#L13-L53)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-024/ANL-0040.md -->
