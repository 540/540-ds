---
predictable: spec
---
## Specification Details
- **ID:** SPEC-017
- **Name:** src/components/organisms/Scatter/Scatter.tsx

### Description
<!-- predictable:module-summary=A chart organism component that renders scattered data points, deriving position, size, naming, and selection from input data while applying scale, tone, number formatting, and reveal-animation behavior. -->
**Areas:** Organisms

`Scatter.tsx` — Scatter. Observed: “`xs` is a lazy sequence and is consumed twice.” 2 requirements: 2 violated.

### Declarations

`Scatter` — Declares 1 function:
- `Scatter`(`_pattern`) — `xs` is a lazy sequence and is consumed twice; `ys` is a lazy sequence and is consumed twice

### Notation

A requirement is a condition an operation needs in order not to fail in the way its own row names — an operation with several failures carries a row for each, and meeting one says nothing about the others. Some a caller supplies, others the operation establishes and checks itself. Nobody has checked the callers.

`implemented` — the operation exists in the code; every machine-written row carries it.

Tags: `[implemented, violated]` — the analysis found a case where the condition fails.
`[violated]` on the card above and `[implemented, violated]` on a row below are one state. Ids in the machine-managed sections below are assigned per run and are not stable references; cite the requirement's sentence.

### Behaviours

#### Scatter.Scatter <!-- predictable:group -->

##### BEH-0024 [implemented, violated]
`xs` is a lazy sequence and is consumed twice. `xs` produces its elements only when consumed, and it is consumed more than once. The second pass throws, sees nothing, or repeats all the work. Safe to rely on when `xs` is consumed at most once, or collected before it is used again.

<!-- predictable:behaviour -->

<!-- predictable:subject=Scatter.Scatter -->

<!-- predictable:vc=site.single-pass-sequence-reused.xs.7a2ee3e5 -->

- **Code locations:** [src/components/organisms/Scatter/Scatter.tsx:16-170](../../../../../src/components/organisms/Scatter/Scatter.tsx#L16-L170)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-017/BEH-0024.md -->

##### BEH-0025 [implemented, violated]
`ys` is a lazy sequence and is consumed twice. `ys` produces its elements only when consumed, and it is consumed more than once. The second pass throws, sees nothing, or repeats all the work. Safe to rely on when `ys` is consumed at most once, or collected before it is used again.

<!-- predictable:behaviour -->

<!-- predictable:subject=Scatter.Scatter -->

<!-- predictable:vc=site.single-pass-sequence-reused.ys.5f0db3e7 -->

- **Code locations:** [src/components/organisms/Scatter/Scatter.tsx:16-170](../../../../../src/components/organisms/Scatter/Scatter.tsx#L16-L170)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-017/BEH-0025.md -->
