---
predictable: spec
---
## Specification Details
- **ID:** SPEC-021
- **Name:** src/components/organisms/Deck/Deck.tsx

### Description
`Deck.tsx` — Deck. This project's call graph records DIRECT calls only, so a function passed to a container, destructured into an exported binding, or reached through a dynamic lookup is not one it can see. Within that limit it records no call to this module. At least one of its operations is exported. At run time it reaches `useDeckNavigation`. `Deck` builds `toggleTheme`, `Deck` builds `markOf` and `Deck` builds `firstStopOf`, and no requirement here is about what runs inside them. Checks: “`Deck.Deck` requires that `bar` is not null.” 1 requirement: 1 verified.

### Declarations

`Deck` — Declares 2 functions:
- `readTheme`(`key`, `fallback`) — internal, no requirement inferred
- `Deck`(`_pattern`) — “Deck is the frame of a talk: the blobs behind, the top bar that hides while navigating, the stops (Slides), the side index, keyboard navigation, the remembered theme and the footer.” — requires `bar` is not null [verified]

A `[verified]` requirement is one the operation checks itself.

### Notation

A requirement is a condition an operation needs in order not to fail in the way its own row names — an operation with several failures carries a row for each, and meeting one says nothing about the others. Some a caller supplies, others the operation establishes and checks itself. Nobody has checked the callers.

`implemented` — the operation exists in the code; every machine-written row carries it.

Tags: `[implemented, verified]` — the operation checks this and refuses when it fails.
`[verified]` on the card above and `[implemented, verified]` on a row below are one state.

On the cards: `internal` — nothing outside this file can reach the operation (a `private` member, or a declaration the module does not export), so a requirement here is not addressed to anybody outside it. `no requirement inferred` — no requirement on this page is about the operation. Either nothing was decided about it, or what was decided is not addressed to a caller (see `internal`); neither means nothing is needed. Where the analysis could not finish, the description above says so by name. Ids in the machine-managed sections below are assigned per run and are not stable references; cite the requirement's sentence.

### Analysis

#### Deck.Deck <!-- predictable:group -->

##### ANL-0035 [implemented, verified]
`Deck.Deck` requires that `bar` is not null.

<!-- predictable:analysis -->

<!-- predictable:subject=Deck.Deck -->

<!-- predictable:vc=il1.null-dereference -->

<!-- predictable:sibling-vcs=il2.null-dereference -->

- **Code locations:** [src/components/organisms/Deck/Deck.tsx:32-158](../../../../../src/components/organisms/Deck/Deck.tsx#L32-L158)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-021/ANL-0035.md -->
