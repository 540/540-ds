---
predictable: spec
---
## Specification Details
- **ID:** SPEC-017
- **Name:** src/components/molecules/Carousel/Carousel.tsx

### Description
`Carousel.tsx` — Carousel. This project's call graph records DIRECT calls only, so a function passed to a container, destructured into an exported binding, or reached through a dynamic lookup is not one it can see. Within that limit it records no call to this module. At least one of its operations is exported. Checks: “`Carousel.Carousel` requires that `track` is not null.” and 1 more. 2 requirements: 2 verified.

### Declarations

`Carousel` — Declares 1 function:
- `Carousel`(`_pattern`) — “Carousel is a strip that is paged with the dots below.” — requires `track` is not null [verified]; `slot` is not null [verified]

A `[verified]` requirement is one the operation checks itself.

### Notation

A requirement is a condition an operation needs in order not to fail in the way its own row names — an operation with several failures carries a row for each, and meeting one says nothing about the others. Some a caller supplies, others the operation establishes and checks itself. Nobody has checked the callers.

`implemented` — the operation exists in the code; every machine-written row carries it.

Tags: `[implemented, verified]` — the operation checks this and refuses when it fails.
`[verified]` on the card above and `[implemented, verified]` on a row below are one state. Ids in the machine-managed sections below are assigned per run and are not stable references; cite the requirement's sentence.

### Analysis

#### Carousel.Carousel <!-- predictable:group -->

##### ANL-0030 [implemented, verified]
`Carousel.Carousel` requires that `track` is not null.

<!-- predictable:analysis -->

<!-- predictable:subject=Carousel.Carousel -->

<!-- predictable:vc=il1.null-dereference -->

<!-- predictable:sibling-vcs=il2.null-dereference il4.null-dereference il5.null-dereference il6.null-dereference il7.null-dereference il8.null-dereference il9.null-dereference -->

- **Code locations:** [src/components/molecules/Carousel/Carousel.tsx:12-142](../../../../../src/components/molecules/Carousel/Carousel.tsx#L12-L142)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-017/ANL-0030.md -->

##### ANL-0031 [implemented, verified]
`Carousel.Carousel` requires that `slot` is not null.

<!-- predictable:analysis -->

<!-- predictable:subject=Carousel.Carousel -->

<!-- predictable:vc=il3.null-dereference -->

- **Code locations:** [src/components/molecules/Carousel/Carousel.tsx:12-142](../../../../../src/components/molecules/Carousel/Carousel.tsx#L12-L142)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-017/ANL-0031.md -->
