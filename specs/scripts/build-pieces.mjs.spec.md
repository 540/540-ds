---
predictable: spec
---
## Specification Details
- **ID:** SPEC-001
- **Name:** scripts/build-pieces.mjs

### Description
<!-- predictable:module-summary=Documented the Build-pieces module as the script that assembles island components into buildable artifacts, writing the CSS manifest and enforcing tag-contract checks during the build. -->
**Areas:** Piece Checks

`build-pieces.mjs` — Build-pieces. Checks: “`plugins.resolveId` only works when `resolved` is not null.” 2 requirements: 1 violated, 1 verified. 6 stated failures.

### Declarations

`build-pieces.mjs` — Declares 11 functions:
- `scopedName`(`local`, `filename`) — internal, no requirement inferred
- `shared`() — internal, no requirement inferred
- `withPreact`() — internal, no requirement inferred
- `findComponents`() — internal; can fail with the error "Islands with no component:"
- `buildServer`(`components`) — internal, no requirement inferred
- `buildIsland`(`component`) (internal), `tagsOf`(`components`) — can fail with the error `Error`
- `buildRuntime`() — internal, no requirement inferred
- `buildBase`() — internal, no requirement inferred
- `writeManifest`(`components`, `graph`, `islands`) — internal; can be rejected with the error "Error" — it delegates to `tagsOf`, which enforces that precondition; `JSON.parse(…)` is assumed to be an object
- `copyRenderer`() — internal, no requirement inferred

A `[verified]` requirement is one the operation checks itself.

### Notation

A requirement is a condition an operation needs in order not to fail in the way its own row names — an operation with several failures carries a row for each, and meeting one says nothing about the others. Some a caller supplies, others the operation establishes and checks itself. Nobody has checked the callers.

`implemented` — the operation exists in the code; every machine-written row carries it.

Tags: `[implemented, verified]` — the operation checks this and refuses when it fails.
`[implemented, violated]` — the analysis found a case where the condition fails.
`[implemented, stated-failure]` — the operation is stated to fail with a named error — a behaviour it has, and one this analysis did not settle as prevented.
`[verified]` on the card above and `[implemented, verified]` on a row below are one state;
likewise for the other 2.

On the cards: `internal` — nothing outside this file can reach the operation (a `private` member, or a declaration the module does not export), so a requirement here is not addressed to anybody outside it. `no requirement inferred` — no requirement on this page is about the operation. Either nothing was decided about it, or what was decided is not addressed to a caller (see `internal`); neither means nothing is needed. Where the analysis could not finish, the description above says so by name. Ids in the machine-managed sections below are assigned per run and are not stable references; cite the requirement's sentence.

### Requirements

#### build-pieces.buildIsland <!-- predictable:group -->

##### REQ-0001 [stated-failure]
Calling `buildIsland` can fail with the error `Error`.

<!-- predictable:inferred -->

<!-- predictable:subject=«build-pieces».buildIsland -->

#### build-pieces.findComponents <!-- predictable:group -->

##### REQ-0002 [stated-failure]
Calling `findComponents` can fail with the error "Islands with no component:".

<!-- predictable:inferred -->

<!-- predictable:subject=«build-pieces».findComponents -->

#### build-pieces.tagsOf <!-- predictable:group -->

##### REQ-0003 [stated-failure]
Calling `tagsOf` can fail with the error `Error`.

<!-- predictable:inferred -->

<!-- predictable:subject=«build-pieces».tagsOf -->

#### build-pieces.components <!-- predictable:group -->

##### REQ-0004 [stated-failure]
Calling `components` can be rejected with the error "Islands with no component:" — it delegates to `findComponents`, which enforces that precondition.

<!-- predictable:inferred -->

<!-- predictable:subject=«build-pieces».components -->

#### build-pieces.manifest <!-- predictable:group -->

##### REQ-0005 [stated-failure]
Calling `manifest` can be rejected with the error "Error" — it delegates to `tagsOf`, which enforces that precondition.

<!-- predictable:inferred -->

<!-- predictable:subject=«build-pieces».manifest -->

#### build-pieces.writeManifest <!-- predictable:group -->

##### REQ-0006 [stated-failure]
Calling `writeManifest` can be rejected with the error "Error" — it delegates to `tagsOf`, which enforces that precondition.

<!-- predictable:inferred -->

<!-- predictable:subject=«build-pieces».writeManifest -->

### Analysis

#### plugins.resolveId <!-- predictable:group -->

##### ANL-0012 [implemented, verified]
`plugins.resolveId` only works when `resolved` is not null.

<!-- predictable:analysis -->

<!-- predictable:subject=plugins.resolveId -->

<!-- predictable:vc=il1.null-dereference -->

### Behaviours

#### build-pieces.writeManifest <!-- predictable:group -->

##### BEH-0005 [implemented, violated]
`JSON.parse(…)` is assumed to be an object. The parsed text could be `null`, a list or a number. The request then fails instead of being rejected. Safe to rely on when the parse result's shape is checked before it is used as an object, or the failure is handled.

<!-- predictable:behaviour -->

<!-- predictable:subject=build-pieces.writeManifest -->

<!-- predictable:vc=site.payload-shape-assumed.JSON-parse---.8522f176 -->

- **Code locations:** [scripts/build-pieces.mjs:203](../../scripts/build-pieces.mjs#L203)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-001/BEH-0005.md -->
