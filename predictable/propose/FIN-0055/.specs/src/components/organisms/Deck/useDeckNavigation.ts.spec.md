---
predictable: spec
---
## Specification Details
- **ID:** SPEC-022
- **Name:** src/components/organisms/Deck/useDeckNavigation.ts

### Description
`useDeckNavigation.ts` — Use deck navigation. Called from `Deck.Deck`, and possibly from places the call graph cannot see. `useDeckNavigation` builds `reduced`, `useDeckNavigation` builds `photoOf`, `useDeckNavigation` builds `box` and `useDeckNavigation` builds `nameOf`, and no requirement here is about what runs inside them. Checks: “`useDeckNavigation.useDeckNavigation` requires that `el` is not null.” and 1 more. 2 requirements: 2 verified.

### Declarations

`useDeckNavigation` — Declares 4 functions:
- `slidesOf`(`parent`) (internal) — “The Slides under parent, at any depth: a wrapper (a div with a label, an island) does not hide them.” — internal, no requirement inferred
- `nextThroughWrappers`(`el`) (internal) — “The element after el, looking through the ds-slot/ds-island wrappers (not other wrappers: a photo goes next to its title).” — internal, no requirement inferred
- `photoAfter`(`el`) — internal, no requirement inferred
- `useDeckNavigation`(`mainRef`, `footerRef`) — “The journey of a talk, ported from the talks' navegacion-540.js (without GSAP): - stops are the Slides inside <main> (at any depth), split by their outermost [data-stop] descendants, plus the footer; - the keyboard moves between stops (and pages inside a stop taller than the window); - the current stop is the one holding the center of the window.” — requires `el` is not null [verified]; `t` is not null [verified]

A `[verified]` requirement is one the operation checks itself.

### Notation

A requirement is a condition an operation needs in order not to fail in the way its own row names — an operation with several failures carries a row for each, and meeting one says nothing about the others. Some a caller supplies, others the operation establishes and checks itself. Nobody has checked the callers.

`implemented` — the operation exists in the code; every machine-written row carries it.

Tags: `[implemented, verified]` — the operation checks this and refuses when it fails.
`[verified]` on the card above and `[implemented, verified]` on a row below are one state.

On the cards: `internal` — nothing outside this file can reach the operation (a `private` member, or a declaration the module does not export), so a requirement here is not addressed to anybody outside it. `no requirement inferred` — no requirement on this page is about the operation. Either nothing was decided about it, or what was decided is not addressed to a caller (see `internal`); neither means nothing is needed. Where the analysis could not finish, the description above says so by name. Ids in the machine-managed sections below are assigned per run and are not stable references; cite the requirement's sentence.

### Analysis

#### useDeckNavigation.useDeckNavigation <!-- predictable:group -->

##### ANL-0036 [implemented, verified]
`useDeckNavigation.useDeckNavigation` requires that `el` is not null.

<!-- predictable:analysis -->

<!-- predictable:subject=useDeckNavigation.useDeckNavigation -->

<!-- predictable:vc=il1.null-dereference -->

<!-- predictable:sibling-vcs=il2.null-dereference il3.null-dereference -->

- **Code locations:** [src/components/organisms/Deck/useDeckNavigation.ts:31-216](../../../../../src/components/organisms/Deck/useDeckNavigation.ts#L31-L216)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-022/ANL-0036.md -->

##### ANL-0037 [implemented, verified]
`useDeckNavigation.useDeckNavigation` requires that `t` is not null.

<!-- predictable:analysis -->

<!-- predictable:subject=useDeckNavigation.useDeckNavigation -->

<!-- predictable:vc=il4.null-dereference -->

- **Code locations:** [src/components/organisms/Deck/useDeckNavigation.ts:31-216](../../../../../src/components/organisms/Deck/useDeckNavigation.ts#L31-L216)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-022/ANL-0037.md -->
