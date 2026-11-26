---
predictable: spec
---
## Specification Details
- **ID:** SPEC-027
- **Name:** src/charts/scale.ts

### Description
`scale.ts` — Scale. Called from `Dumbbell.Dumbbell`, `Heatmap.Heatmap`, `LineChart.LineChart` and `Scatter.Scatter`, and possibly from places the call graph cannot see. Checks: “`scale.niceScale` only works when `count` is not null.” 1 requirement: 1 verified.

### Declarations

`scale` — Declares 2 functions:
- `niceScale`(`lo`, `hi`, `count`) — “A round scale for an axis: from `min` to `max` (both included in the data), in about `count` steps of 1, 2, 2.5 or 5.” — requires `count` is not null [verified]
- `position`(`value`, `min`, `max`) — “Where `value` falls between `min` and `max`, from 0 to 1.” — no requirement inferred

A `[verified]` requirement is one the operation checks itself.

### Notation

A requirement is a condition an operation needs in order not to fail in the way its own row names — an operation with several failures carries a row for each, and meeting one says nothing about the others. Some a caller supplies, others the operation establishes and checks itself. Nobody has checked the callers.

`implemented` — the operation exists in the code; every machine-written row carries it.

Tags: `[implemented, verified]` — the operation checks this and refuses when it fails.
`[verified]` on the card above and `[implemented, verified]` on a row below are one state.

On the cards: `no requirement inferred` — no requirement on this page is about the operation. Either nothing was decided about it, or what was decided is not addressed to a caller (see `internal`); neither means nothing is needed. Where the analysis could not finish, the description above says so by name. Ids in the machine-managed sections below are assigned per run and are not stable references; cite the requirement's sentence.

### Analysis

#### scale.niceScale <!-- predictable:group -->

##### ANL-0034 [implemented, verified]
`scale.niceScale` only works when `count` is not null.

<!-- predictable:analysis -->

<!-- predictable:subject=scale.niceScale -->

<!-- predictable:vc=il1.null-dereference -->

- **Code locations:** [src/charts/scale.ts:2-13](../../../src/charts/scale.ts#L2-L13)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-027/ANL-0034.md -->
