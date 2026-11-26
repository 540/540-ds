---
predictable: spec
---
## Specification Details
- **ID:** SPEC-002
- **Name:** scripts/build-pieces.mjs

### Description
<!-- predictable:module-summary=A build script that assembles a talk piece's runtime artifacts and manifest from the design system's components. -->
**Areas:** Piece Rendering

`build-pieces.mjs` — Build-pieces. Can fail: “`buildIsland` can fail with the error `Error`.” 3 requirements: 3 violated. 6 stated failures.

### Declarations

`build-pieces.mjs` — Declares 13 functions:
- `scopedName`(`local`, `filename`) — internal, no requirement inferred
- `shared`() — internal, no requirement inferred
- `withPreact`() — internal, no requirement inferred
- `findComponents`() — internal; can fail with the error "Islands with no component:"
- `buildServer`(`components`) — internal, no requirement inferred
- `buildIsland`(`component`) (internal), `tagsOf`(`components`) — can fail with the error `Error`
- `buildRuntime`() — internal, no requirement inferred
- `buildBase`() — internal, no requirement inferred
- `writeManifest`(`components`, `graph`, `islands`) — internal; can be rejected with the error "Error" — it delegates to `tagsOf`, which enforces that precondition; `JSON.parse(…)` is assumed to be an object
- `copyImages`() — internal; `_dest1` is assumed to be an object; `images` may be missing from the payload
- `copyRenderer`() — internal, no requirement inferred
- `buildTalkRuntime`(`manifest`) — internal, no requirement inferred

### Notation

A requirement is a condition an operation needs in order not to fail in the way its own row names — an operation with several failures carries a row for each, and meeting one says nothing about the others. Some a caller supplies, others the operation establishes and checks itself. Nobody has checked the callers.

`implemented` — the operation exists in the code; every machine-written row carries it.

Tags: `[implemented, violated]` — the analysis found a case where the condition fails.
`[implemented, stated-failure]` — the operation is stated to fail with a named error — a behaviour it has, and one this analysis did not settle as prevented.
`[violated]` on the card above and `[implemented, violated]` on a row below are one state;
likewise for the other one.

On the cards: `internal` — nothing outside this file can reach the operation (a `private` member, or a declaration the module does not export), so a requirement here is not addressed to anybody outside it. `no requirement inferred` — no requirement on this page is about the operation. Either nothing was decided about it, or what was decided is not addressed to a caller (see `internal`); neither means nothing is needed. Where the analysis could not finish, the description above says so by name. Ids in the machine-managed sections below are assigned per run and are not stable references; cite the requirement's sentence.

### Requirements

#### build-pieces.buildIsland <!-- predictable:group -->

##### REQ-0001 [implemented, stated-failure]
Calling `buildIsland` can fail with the error `Error`.

<!-- predictable:inferred -->

<!-- predictable:subject=«build-pieces».buildIsland -->

- **Code locations:** [scripts/build-pieces.mjs:114-149](../../scripts/build-pieces.mjs#L114-L149)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-002/REQ-0001.md -->

#### build-pieces.findComponents <!-- predictable:group -->

##### REQ-0002 [implemented, stated-failure]
Calling `findComponents` can fail with the error "Islands with no component:".

<!-- predictable:inferred -->

<!-- predictable:subject=«build-pieces».findComponents -->

- **Code locations:** [scripts/build-pieces.mjs:61-73](../../scripts/build-pieces.mjs#L61-L73)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-002/REQ-0002.md -->

#### build-pieces.tagsOf <!-- predictable:group -->

##### REQ-0003 [implemented, stated-failure]
Calling `tagsOf` can fail with the error `Error`.

<!-- predictable:inferred -->

<!-- predictable:subject=«build-pieces».tagsOf -->

- **Code locations:** [scripts/build-pieces.mjs:223-232](../../scripts/build-pieces.mjs#L223-L232)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-002/REQ-0003.md -->

#### build-pieces.components <!-- predictable:group -->

##### REQ-0004 [implemented, stated-failure]
Calling `components` can be rejected with the error "Islands with no component:" — it delegates to `findComponents`, which enforces that precondition.

<!-- predictable:inferred -->

<!-- predictable:subject=«build-pieces».components -->

- **Code locations:** [scripts/build-pieces.mjs:278](../../scripts/build-pieces.mjs#L278)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-002/REQ-0004.md -->

#### build-pieces.manifest <!-- predictable:group -->

##### REQ-0005 [implemented, stated-failure]
Calling `manifest` can be rejected with the error "Error" — it delegates to `tagsOf`, which enforces that precondition.

<!-- predictable:inferred -->

<!-- predictable:subject=«build-pieces».manifest -->

- **Code locations:** [scripts/build-pieces.mjs:285](../../scripts/build-pieces.mjs#L285)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-002/REQ-0005.md -->

#### build-pieces.writeManifest <!-- predictable:group -->

##### REQ-0006 [implemented, stated-failure]
Calling `writeManifest` can be rejected with the error "Error" — it delegates to `tagsOf`, which enforces that precondition.

<!-- predictable:inferred -->

<!-- predictable:subject=«build-pieces».writeManifest -->

- **Code locations:** [scripts/build-pieces.mjs:174-221](../../scripts/build-pieces.mjs#L174-L221)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-002/REQ-0006.md -->

### Behaviours

#### build-pieces.writeManifest <!-- predictable:group -->

##### BEH-0007 [implemented, violated]
`JSON.parse(…)` is assumed to be an object. The parsed text could be `null`, a list or a number. The request then fails instead of being rejected. Safe to rely on when the parse result's shape is checked before it is used as an object, or the failure is handled.

<!-- predictable:behaviour -->

<!-- predictable:subject=build-pieces.writeManifest -->

<!-- predictable:vc=site.payload-shape-assumed.JSON-parse---.8522f176 -->

- **Code locations:** [scripts/build-pieces.mjs:174-221](../../scripts/build-pieces.mjs#L174-L221)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-002/BEH-0007.md -->

#### build-pieces.copyImages <!-- predictable:group -->

##### BEH-0008 [implemented, violated]
`_dest1` is assumed to be an object. The parsed text could be `null`, a list or a number. The request then fails instead of being rejected. Safe to rely on when the parse result's shape is checked before it is used as an object, or the failure is handled.

<!-- predictable:behaviour -->

<!-- predictable:subject=build-pieces.copyImages -->

<!-- predictable:vc=site.payload-shape-assumed._dest1.afff70c1 -->

- **Code locations:** [scripts/build-pieces.mjs:236-246](../../scripts/build-pieces.mjs#L236-L246)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-002/BEH-0008.md -->

##### BEH-0009 [implemented, violated]
`images` may be missing from the payload. The lookup gives nothing when the payload leaves `images` out, and nothing checks for it first. The request then fails here instead of being rejected. Safe to rely on when `images` is checked for presence, or the payload is validated, before it is used.

<!-- predictable:behaviour -->

<!-- predictable:subject=build-pieces.copyImages -->

<!-- predictable:vc=site.unvalidated-json-dereferenced.images.0170ee01 -->

- **Code locations:** [scripts/build-pieces.mjs:236-246](../../scripts/build-pieces.mjs#L236-L246)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-002/BEH-0009.md -->
