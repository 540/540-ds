---
predictable: spec
---
## Specification Details
- **ID:** SPEC-016
- **Name:** src/components/organisms/LineChart/LineChart.tsx

### Description
`LineChart.tsx` — Line chart. This project's call graph records DIRECT calls only, so a function passed to a container, destructured into an exported binding, or reached through a dynamic lookup is not one it can see. Within that limit it records no call to this module. At least one of its operations is exported. At run time it reaches `scale`, `tones`, `useNumberFormat` and `useReveal`. `LineChart` builds `x`, `LineChart` builds `y`, `LineChart` builds `pick` and `LineChart` builds `keys`, and no requirement here is about what runs inside them. REFUTED: “`LineChart.LineChart` only works when 0 is at most `i` and `i` is less than the `length` of `tones`.” 2 requirements: 2 violated.

### Declarations

`LineChart` — Declares 1 function:
- `LineChart`(`_pattern`) — “LineChart is an evolution over time: one to three lines over the same categories, drawn from the left when the chart comes into view (or its Step lights up).” — requires 0 is at most `i` and `i` is less than the `length` of `tones` [violated]; `values` is a lazy sequence and is consumed twice

### Notation

A requirement is a condition an operation needs in order not to fail in the way its own row names — an operation with several failures carries a row for each, and meeting one says nothing about the others. Some a caller supplies, others the operation establishes and checks itself. Nobody has checked the callers.

`implemented` — the operation exists in the code; every machine-written row carries it.

Tags: `[implemented, violated]` — the analysis found a case where the condition fails.
`[violated]` on the card above and `[implemented, violated]` on a row below are one state. Ids in the machine-managed sections below are assigned per run and are not stable references; cite the requirement's sentence.

### Analysis

#### LineChart.LineChart <!-- predictable:group -->

##### ANL-0045 [implemented, violated]
`LineChart.LineChart` only works when 0 is at most `i` and `i` is less than the `length` of `tones`.

<!-- predictable:analysis -->

<!-- predictable:subject=LineChart.LineChart -->

<!-- predictable:vc=il1.bounds -->

<!-- predictable:sibling-vcs=il2.bounds il3.bounds -->

- **Code locations:** [src/components/organisms/LineChart/LineChart.tsx:15-111](../../../../../src/components/organisms/LineChart/LineChart.tsx#L15-L111)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-016/ANL-0045.md -->

### Behaviours

#### LineChart.LineChart <!-- predictable:group -->

##### BEH-0023 [implemented, violated]
`values` is a lazy sequence and is consumed twice. `values` produces its elements only when consumed, and it is consumed more than once. The second pass throws, sees nothing, or repeats all the work. Safe to rely on when `values` is consumed at most once, or collected before it is used again.

<!-- predictable:behaviour -->

<!-- predictable:subject=LineChart.LineChart -->

<!-- predictable:vc=site.single-pass-sequence-reused.values.34074714 -->

- **Code locations:** [src/components/organisms/LineChart/LineChart.tsx:21](../../../../../src/components/organisms/LineChart/LineChart.tsx#L21)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-016/BEH-0023.md -->
