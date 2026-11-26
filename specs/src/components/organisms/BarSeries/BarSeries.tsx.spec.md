---
predictable: spec
---
## Specification Details
- **ID:** SPEC-032
- **Name:** src/components/organisms/BarSeries/BarSeries.tsx

### Description
<!-- predictable:module-summary=BarSeries is a chart organism component that renders a bar series with animated reveal and formatted numeric labels. -->
**Areas:** Charts

`BarSeries.tsx` — Bar series. REFUTED: “`BarSeries.BarSeries` only works when 0 is at most `j` and `j` is less than the `length` of `tones`.” 1 requirement: 1 violated.

### Declarations

`BarSeries` — Declares 3 functions:
- `share`(`value`, `top`) — internal, no requirement inferred
- `sum`(`values`) — internal, no requirement inferred
- `BarSeries`(`_pattern`) — requires 0 is at most `j` and `j` is less than the `length` of `tones` [violated]

### Notation

A requirement is a condition an operation needs in order not to fail in the way its own row names — an operation with several failures carries a row for each, and meeting one says nothing about the others. Some a caller supplies, others the operation establishes and checks itself. Nobody has checked the callers.

`implemented` — the operation exists in the code; every machine-written row carries it.

Tags: `[implemented, violated]` — the analysis found a case where the condition fails.
`[violated]` on the card above and `[implemented, violated]` on a row below are one state.

On the cards: `internal` — nothing outside this file can reach the operation (a `private` member, or a declaration the module does not export), so a requirement here is not addressed to anybody outside it. `no requirement inferred` — no requirement on this page is about the operation. Either nothing was decided about it, or what was decided is not addressed to a caller (see `internal`); neither means nothing is needed. Where the analysis could not finish, the description above says so by name. Ids in the machine-managed sections below are assigned per run and are not stable references; cite the requirement's sentence.

### Analysis

#### BarSeries.BarSeries <!-- predictable:group -->

##### ANL-0041 [implemented, violated]
`BarSeries.BarSeries` only works when 0 is at most `j` and `j` is less than the `length` of `tones`.

<!-- predictable:analysis -->

<!-- predictable:subject=BarSeries.BarSeries -->

<!-- predictable:vc=il1.bounds -->

<!-- predictable:sibling-vcs=il2.bounds -->

- **Code locations:** [src/components/organisms/BarSeries/BarSeries.tsx:17-71](../../../../../src/components/organisms/BarSeries/BarSeries.tsx#L17-L71)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-032/ANL-0041.md -->
