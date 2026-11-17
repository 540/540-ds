---
predictable: spec
---
## Specification Details
- **ID:** SPEC-027
- **Name:** src/components/organisms/Steps/Steps.tsx

### Description
`Steps.tsx` — Steps. This project's call graph records DIRECT calls only, so a function passed to a container, destructured into an exported binding, or reached through a dynamic lookup is not one it can see. Within that limit it records no call to this module. At least one of its operations is exported. At run time it reaches `StepsContext`. Checks: “`Steps.Step` only works when `to` is not null.” and 2 more. 3 requirements: 3 verified.

### Declarations

`Steps` — Declares 3 functions:
- `Steps`(`_pattern`) — “Steps is a block the keyboard walks through, step by step, while it is on screen: the same arrow that moves between stops first lights the next step; when the steps run out, it moves on.” — requires `el` is not null [verified]; `t` is not null [verified]
- `Step`(`_pattern`) — “Step is a piece of a Steps block that shows from a step on (and, optionally, until another).” — requires `to` is not null [verified]
- `PanelStack`(`_pattern`) — “PanelStack puts several Steps in the same cell: only the one of the step shows.” — no requirement inferred

A `[verified]` requirement is one the operation checks itself.

### Notation

A requirement is a condition an operation needs in order not to fail in the way its own row names — an operation with several failures carries a row for each, and meeting one says nothing about the others. Some a caller supplies, others the operation establishes and checks itself. Nobody has checked the callers.

`implemented` — the operation exists in the code; every machine-written row carries it.

Tags: `[implemented, verified]` — the operation checks this and refuses when it fails.
`[verified]` on the card above and `[implemented, verified]` on a row below are one state.

On the cards: `no requirement inferred` — no requirement on this page is about the operation. Either nothing was decided about it, or what was decided is not addressed to a caller (see `internal`); neither means nothing is needed. Where the analysis could not finish, the description above says so by name. Ids in the machine-managed sections below are assigned per run and are not stable references; cite the requirement's sentence.

### Analysis

#### Steps.Step <!-- predictable:group -->

##### ANL-0043 [implemented, verified]
`Steps.Step` only works when `to` is not null.

<!-- predictable:analysis -->

<!-- predictable:subject=Steps.Step -->

<!-- predictable:vc=il1.null-dereference -->

- **Code locations:** [src/components/organisms/Steps/Steps.tsx:93-103](../../../../../src/components/organisms/Steps/Steps.tsx#L93-L103)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-027/ANL-0043.md -->

#### Steps.Steps <!-- predictable:group -->

##### ANL-0044 [implemented, verified]
`Steps.Steps` only works when `el` is not null.

<!-- predictable:analysis -->

<!-- predictable:subject=Steps.Steps -->

<!-- predictable:vc=il1.null-dereference -->

- **Code locations:** [src/components/organisms/Steps/Steps.tsx:12-90](../../../../../src/components/organisms/Steps/Steps.tsx#L12-L90)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-027/ANL-0044.md -->

##### ANL-0045 [implemented, verified]
`Steps.Steps` only works when `t` is not null.

<!-- predictable:analysis -->

<!-- predictable:subject=Steps.Steps -->

<!-- predictable:vc=il2.null-dereference -->

<!-- predictable:sibling-vcs=il3.null-dereference il4.null-dereference -->

- **Code locations:** [src/components/organisms/Steps/Steps.tsx:12-90](../../../../../src/components/organisms/Steps/Steps.tsx#L12-L90)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-027/ANL-0045.md -->
