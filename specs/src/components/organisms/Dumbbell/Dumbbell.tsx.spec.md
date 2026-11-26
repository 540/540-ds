---
predictable: spec
---
## Specification Details
- **ID:** SPEC-014
- **Name:** src/components/organisms/Dumbbell/Dumbbell.tsx

### Description
<!-- predictable:module-summary=Dumbbell is a chart component that renders a dumbbell-style data visualization, formatting and signing its values and reacting to reveal and numeric formatting state. -->
**Areas:** Charts

`Dumbbell.tsx` — Dumbbell. Observed: “`values` is a lazy sequence and is consumed twice.” 1 requirement: 1 violated.

### Declarations

`Dumbbell` — Declares 1 function:
- `Dumbbell`(`_pattern`) — `values` is a lazy sequence and is consumed twice

### Notation

A requirement is a condition an operation needs in order not to fail in the way its own row names — an operation with several failures carries a row for each, and meeting one says nothing about the others. Some a caller supplies, others the operation establishes and checks itself. Nobody has checked the callers.

`implemented` — the operation exists in the code; every machine-written row carries it.

Tags: `[implemented, violated]` — the analysis found a case where the condition fails.
`[violated]` on the card above and `[implemented, violated]` on a row below are one state. Ids in the machine-managed sections below are assigned per run and are not stable references; cite the requirement's sentence.

### Behaviours

#### Dumbbell.Dumbbell <!-- predictable:group -->

##### BEH-0021 [implemented, violated]
`values` is a lazy sequence and is consumed twice. `values` produces its elements only when consumed, and it is consumed more than once. The second pass throws, sees nothing, or repeats all the work. Safe to rely on when `values` is consumed at most once, or collected before it is used again.

<!-- predictable:behaviour -->

<!-- predictable:subject=Dumbbell.Dumbbell -->

<!-- predictable:vc=site.single-pass-sequence-reused.values.34074714 -->

- **Code locations:** [src/components/organisms/Dumbbell/Dumbbell.tsx:14-89](../../../../../src/components/organisms/Dumbbell/Dumbbell.tsx#L14-L89)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-014/BEH-0021.md -->
