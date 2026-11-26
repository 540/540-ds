---
predictable: spec
---
## Specification Details
- **ID:** SPEC-018
- **Name:** src/foundations/useTokenValue.ts

### Description
`useTokenValue.ts` — Use token value. Called from `ColorSwatch.ColorSwatch`, `MeasureTable.Row`, `RadiusSamples.Sample` and `TypeSpecimens.Specimen`, and possibly from places the call graph cannot see. `toHex` builds `h`, and no requirement here is about what runs inside it. Observed: “What `Document.body` returns can be null here.” 1 requirement: 1 violated.

### Declarations

`useTokenValue` — Declares 3 functions:
- `useTokenValue`(`name`) — “Reads the live computed value of a CSS custom property from <html>.” — no requirement inferred
- `useResolvedValue`(`name`, `property`) — “Resolves a token to its final value (follows var() chains) using a probe element.” — What `Document.body` returns can be null here
- `toHex`(`css`) — “Converts "rgb(r, g, b)" / "rgba(r, g, b, a)" to "#rrggbb" or "#rrggbbaa" for display.” — no requirement inferred

### Notation

A requirement is a condition an operation needs in order not to fail in the way its own row names — an operation with several failures carries a row for each, and meeting one says nothing about the others. Some a caller supplies, others the operation establishes and checks itself. Nobody has checked the callers.

`implemented` — the operation exists in the code; every machine-written row carries it.

Tags: `[implemented, violated]` — the analysis found a case where the condition fails.
`[violated]` on the card above and `[implemented, violated]` on a row below are one state.

On the cards: `no requirement inferred` — no requirement on this page is about the operation. Either nothing was decided about it, or what was decided is not addressed to a caller (see `internal`); neither means nothing is needed. Where the analysis could not finish, the description above says so by name. Ids in the machine-managed sections below are assigned per run and are not stable references; cite the requirement's sentence.

### Behaviours

#### useTokenValue.useResolvedValue <!-- predictable:group -->

##### BEH-0026 [implemented, violated]
What `Document.body` returns can be null here. `Document.body` can return nothing in ordinary conditions, and its answer is used without a check, so the first member access throws. Safe to rely on when what `Document.body` answers is tested before it is used.

<!-- predictable:behaviour -->

<!-- predictable:subject=useTokenValue.useResolvedValue -->

<!-- predictable:vc=site.platform-type-dereferenced.Document-body.0fbc38fe -->

- **Code locations:** [src/foundations/useTokenValue.ts:31](../../../src/foundations/useTokenValue.ts#L31)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-018/BEH-0026.md -->
