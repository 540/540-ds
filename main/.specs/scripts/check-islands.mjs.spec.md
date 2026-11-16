---
predictable: spec
---
## Specification Details
- **ID:** SPEC-015
- **Name:** scripts/check-islands.mjs

### Description
`check-islands.mjs` — Check-islands. This project's call graph records DIRECT calls only, so a function passed to a container, destructured into an exported binding, or reached through a dynamic lookup is not one it can see. Within that limit it records no call to this module. At run time it reaches `«pieces-harness»`. 4 requirements: 3 violated, 1 verified.

### Declarations

`check-islands.mjs` — Declares 13 functions:
- `sample`(`file`) — internal, no requirement inferred
- `island`(`name`, `props`) — internal, no requirement inferred
- `el`(`name`, `p`) — internal, no requirement inferred
- `t`(`children`, `props`) — internal, no requirement inferred
- `header`(`props`) — internal, no requirement inferred
- `card`(`ordinal`, `title`, `children`) — internal, no requirement inferred
- `label`(`text`) — internal, no requirement inferred
- `slide`(`slideId`, `story`, `...children`) — internal, no requirement inferred
- `grid`(`columns`, `children`, `style`) — internal, no requirement inferred
- `chain`(`y`, `kind`) — internal, no requirement inferred
- `check`(`name`, `run`) — internal, no requirement inferred
- `center`(`selector`) — internal, no requirement inferred
- `island$`(`name`) — internal, no requirement inferred

A `[verified]` requirement is one the operation checks itself.

`body` — Declares 1 operation: `items`(`_pa0`, `i`).

### Notation

A requirement is a condition an operation needs in order not to fail in the way its own row names — an operation with several failures carries a row for each, and meeting one says nothing about the others. Some a caller supplies, others the operation establishes and checks itself. Nobody has checked the callers.

`implemented` — the operation exists in the code; every machine-written row carries it.

Tags: `[implemented, verified]` — the operation checks this and refuses when it fails.
`[implemented, violated]` — the analysis found a case where the condition fails.
`[verified]` on the card above and `[implemented, verified]` on a row below are one state;
likewise for the other one.

On the cards: `internal` — nothing outside this file can reach the operation (a `private` member, or a declaration the module does not export), so a requirement here is not addressed to anybody outside it. `no requirement inferred` — no requirement on this page is about the operation. Either nothing was decided about it, or what was decided is not addressed to a caller (see `internal`); neither means nothing is needed. Where the analysis could not finish, the description above says so by name. Ids in the machine-managed sections below are assigned per run and are not stable references; cite the requirement's sentence.

### Analysis

#### check-islands.__moduleInit__ <!-- predictable:group -->

##### ANL-0013 [implemented, violated]
The value used here must not be null.

<!-- predictable:analysis -->

<!-- predictable:subject=check-islands.__moduleInit__ -->

<!-- predictable:vc=il2.null-dereference -->

<!-- predictable:sibling-vcs=il4.null-dereference il7.null-dereference il8.null-dereference -->

##### ANL-0014 [implemented, violated]
i < 2 || states.join() != "false,true,false"

<!-- predictable:analysis -->

<!-- predictable:subject=check-islands.__moduleInit__ -->

<!-- predictable:vc=il5.bounds -->

<!-- predictable:sibling-vcs=il6.bounds -->

##### ANL-0015 [implemented, violated]
The index must be within the bounds of what it indexes.

<!-- predictable:analysis -->

<!-- predictable:subject=check-islands.__moduleInit__ -->

<!-- predictable:vc=il9.bounds -->

<!-- predictable:sibling-vcs=il10.bounds -->

##### ANL-0016 [implemented, verified]
`hit` must not be null where this module's top-level code reads through it.

<!-- predictable:analysis -->

<!-- predictable:subject=check-islands.__moduleInit__ -->

<!-- predictable:vc=il1.null-dereference -->

<!-- predictable:sibling-vcs=il3.null-dereference -->
