---
predictable: spec
---
## Specification Details
- **ID:** SPEC-023
- **Name:** src/components/organisms/LogoCarousel/LogoCarousel.tsx

### Description
<!-- predictable:module-summary=LogoCarousel is a component that renders a scrolling or sliding display of partner or client logos, requiring a track element to operate. -->
**Areas:** Organisms

`LogoCarousel.tsx` — Logo carousel. Checks: “`LogoCarousel.LogoCarousel` only works when `track` is not null.” 1 requirement: 1 verified.

### Declarations

`LogoCarousel` — Declares 1 function:
- `LogoCarousel`(`_pattern`) — requires `track` is not null [verified]

A `[verified]` requirement is one the operation checks itself.

### Notation

A requirement is a condition an operation needs in order not to fail in the way its own row names — an operation with several failures carries a row for each, and meeting one says nothing about the others. Some a caller supplies, others the operation establishes and checks itself. Nobody has checked the callers.

`implemented` — the operation exists in the code; every machine-written row carries it.

Tags: `[implemented, verified]` — the operation checks this and refuses when it fails.
`[verified]` on the card above and `[implemented, verified]` on a row below are one state. Ids in the machine-managed sections below are assigned per run and are not stable references; cite the requirement's sentence.

### Analysis

#### LogoCarousel.LogoCarousel <!-- predictable:group -->

##### ANL-0038 [implemented, verified]
`LogoCarousel.LogoCarousel` only works when `track` is not null.

<!-- predictable:analysis -->

<!-- predictable:subject=LogoCarousel.LogoCarousel -->

<!-- predictable:vc=il1.null-dereference -->

<!-- predictable:sibling-vcs=il2.null-dereference -->

- **Code locations:** [src/components/organisms/LogoCarousel/LogoCarousel.tsx:11-61](../../../../../src/components/organisms/LogoCarousel/LogoCarousel.tsx#L11-L61)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-023/ANL-0038.md -->
