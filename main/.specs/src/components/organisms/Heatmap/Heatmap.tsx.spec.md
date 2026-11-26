---
predictable: spec
---
## Specification Details
- **ID:** SPEC-015
- **Name:** src/components/organisms/Heatmap/Heatmap.tsx

### Description
`Heatmap.tsx` — Heatmap. This project's call graph records DIRECT calls only, so a function passed to a container, destructured into an exported binding, or reached through a dynamic lookup is not one it can see. Within that limit it records no call to this module. At least one of its operations is exported. At run time it reaches `scale`, `useNumberFormat` and `useReveal`. `Heatmap` builds `level` and `Heatmap` builds `keys`, and no requirement here is about what runs inside them. Observed: “`all` is a lazy sequence and is consumed twice.” 1 requirement: 1 violated.

### Declarations

`Heatmap` — Declares 1 function:
- `Heatmap`(`_pattern`) — “Heatmap is intensity in a table: rows × columns (days × hours, teams × weeks), each cell darker the higher its figure, in five steps.” — `all` is a lazy sequence and is consumed twice

### Notation

A requirement is a condition an operation needs in order not to fail in the way its own row names — an operation with several failures carries a row for each, and meeting one says nothing about the others. Some a caller supplies, others the operation establishes and checks itself. Nobody has checked the callers.

`implemented` — the operation exists in the code; every machine-written row carries it.

Tags: `[implemented, violated]` — the analysis found a case where the condition fails.
`[violated]` on the card above and `[implemented, violated]` on a row below are one state. Ids in the machine-managed sections below are assigned per run and are not stable references; cite the requirement's sentence.

### Behaviours

#### Heatmap.Heatmap <!-- predictable:group -->

##### BEH-0022 [implemented, violated]
`all` is a lazy sequence and is consumed twice. `all` produces its elements only when consumed, and it is consumed more than once. The second pass throws, sees nothing, or repeats all the work. Safe to rely on when `all` is consumed at most once, or collected before it is used again.

<!-- predictable:behaviour -->

<!-- predictable:subject=Heatmap.Heatmap -->

<!-- predictable:vc=site.single-pass-sequence-reused.all.41a049a3 -->

- **Code locations:** [src/components/organisms/Heatmap/Heatmap.tsx:29](../../../../../src/components/organisms/Heatmap/Heatmap.tsx#L29)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-015/BEH-0022.md -->
