---
predictable: spec
---
## Specification Details
- **ID:** SPEC-034
- **Name:** src/components/organisms/Deck/useDeckNavigation.ts

### Description
<!-- predictable:module-summary=A React hook that implements deck navigation, computing the active slide position and helper lookups like reduced, photoOf, box, and nameOf for a presentation deck. -->
**Areas:** Organisms

`useDeckNavigation.ts` — Use deck navigation. Checks: “`useDeckNavigation.useDeckNavigation` only works when `el` is not null.” and 1 more. 2 requirements: 2 verified.

### Declarations

`useDeckNavigation` — Declares 4 functions:
- `slidesOf`(`parent`) — internal, no requirement inferred
- `nextThroughWrappers`(`el`) — internal, no requirement inferred
- `photoAfter`(`el`) — internal, no requirement inferred
- `useDeckNavigation`(`mainRef`, `footerRef`) — requires `el` is not null [verified]; `t` is not null [verified]

A `[verified]` requirement is one the operation checks itself.

### Notation

A requirement is a condition an operation needs in order not to fail in the way its own row names — an operation with several failures carries a row for each, and meeting one says nothing about the others. Some a caller supplies, others the operation establishes and checks itself. Nobody has checked the callers.

`implemented` — the operation exists in the code; every machine-written row carries it.

Tags: `[implemented, verified]` — the operation checks this and refuses when it fails.
`[verified]` on the card above and `[implemented, verified]` on a row below are one state.

On the cards: `internal` — nothing outside this file can reach the operation (a `private` member, or a declaration the module does not export), so a requirement here is not addressed to anybody outside it. `no requirement inferred` — no requirement on this page is about the operation. Either nothing was decided about it, or what was decided is not addressed to a caller (see `internal`); neither means nothing is needed. Where the analysis could not finish, the description above says so by name. Ids in the machine-managed sections below are assigned per run and are not stable references; cite the requirement's sentence.

### Analysis

#### useDeckNavigation.useDeckNavigation <!-- predictable:group -->

##### ANL-0043 [implemented, verified]
`useDeckNavigation.useDeckNavigation` only works when `el` is not null.

<!-- predictable:analysis -->

<!-- predictable:subject=useDeckNavigation.useDeckNavigation -->

<!-- predictable:vc=il1.null-dereference -->

<!-- predictable:sibling-vcs=il2.null-dereference il3.null-dereference -->

- **Code locations:** [src/components/organisms/Deck/useDeckNavigation.ts:31-218](../../../../../src/components/organisms/Deck/useDeckNavigation.ts#L31-L218)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-034/ANL-0043.md -->

##### ANL-0044 [implemented, verified]
`useDeckNavigation.useDeckNavigation` only works when `t` is not null.

<!-- predictable:analysis -->

<!-- predictable:subject=useDeckNavigation.useDeckNavigation -->

<!-- predictable:vc=il4.null-dereference -->

- **Code locations:** [src/components/organisms/Deck/useDeckNavigation.ts:31-218](../../../../../src/components/organisms/Deck/useDeckNavigation.ts#L31-L218)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-034/ANL-0044.md -->
