---
predictable: spec
---
## Specification Details
- **ID:** SPEC-006
- **Name:** scripts/render/index.mjs

### Description
<!-- predictable:module-summary=Entry module that renders a talk piece by coordinating core and spelling functionality, requiring a pieces folder to be present. -->
**Areas:** Piece Rendering

`index.mjs` — Index. Checks: “`renderTalk` fails with "renderTalk needs the pieces folder" unless `pieces` is present and is not falsy.” 3 requirements: 2 violated, 1 verified. 3 stated failures.

### Declarations

`index.mjs` — Declares 4 functions:
- `renderTalk`(`source`, `_pattern`) — requires `pieces` is present and is not falsy [verified]; can be rejected with the error "the page would need files from outside:" — it delegates to `checkOffline`, which enforces that precondition; `manifest` is assumed to be an object; `manifest.base` may be missing from the payload
- `readImage`(`baseDir`, `file`, `label`) — internal; can fail with the error `Error`
- `checkOffline`(`styles`, `body`) — internal; can fail with the error "the page would need files from outside:"
- `escapeHtml`(`value`) — internal, no requirement inferred

A `[verified]` requirement is one the operation checks itself.

### Notation

A requirement is a condition an operation needs in order not to fail in the way its own row names — an operation with several failures carries a row for each, and meeting one says nothing about the others. Some a caller supplies, others the operation establishes and checks itself. Nobody has checked the callers.

`implemented` — the operation exists in the code; every machine-written row carries it.

Tags: `[implemented, verified]` — the operation checks this and refuses when it fails.
`[implemented, violated]` — the analysis found a case where the condition fails.
`[implemented, stated-failure]` — the operation is stated to fail with a named error — a behaviour it has, and one this analysis did not settle as prevented.
`[verified]` on the card above and `[implemented, verified]` on a row below are one state;
likewise for the other 2.

On the cards: `internal` — nothing outside this file can reach the operation (a `private` member, or a declaration the module does not export), so a requirement here is not addressed to anybody outside it. `no requirement inferred` — no requirement on this page is about the operation. Either nothing was decided about it, or what was decided is not addressed to a caller (see `internal`); neither means nothing is needed. Where the analysis could not finish, the description above says so by name.

`falsy` is JavaScript's word for a value that counts as false in a condition: `false`, `0`, an empty string, `null`, `undefined` or `NaN`. Ids in the machine-managed sections below are assigned per run and are not stable references; cite the requirement's sentence.

### Requirements

#### index.checkOffline <!-- predictable:group -->

##### REQ-0001 [implemented, stated-failure]
Calling `checkOffline` can fail with the error "the page would need files from outside:".

<!-- predictable:inferred -->

<!-- predictable:subject=index.checkOffline -->

- **Code locations:** [scripts/render/index.mjs:64-69](../../../scripts/render/index.mjs#L64-L69)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-006/REQ-0001.md -->

#### index.readImage <!-- predictable:group -->

##### REQ-0002 [implemented, stated-failure]
Calling `readImage` can fail with the error `Error`.

<!-- predictable:inferred -->

<!-- predictable:subject=index.readImage -->

- **Code locations:** [scripts/render/index.mjs:50-62](../../../scripts/render/index.mjs#L50-L62)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-006/REQ-0002.md -->

#### index.renderTalk <!-- predictable:group -->

##### REQ-0003 [implemented, stated-failure]
Calling `renderTalk` can be rejected with the error "the page would need files from outside:" — it delegates to `checkOffline`, which enforces that precondition.

<!-- predictable:inferred -->

<!-- predictable:subject=index.renderTalk -->

- **Code locations:** [scripts/render/index.mjs:17-48](../../../scripts/render/index.mjs#L17-L48)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-006/REQ-0003.md -->

### Analysis

#### index.renderTalk <!-- predictable:group -->

##### ANL-0024 [implemented, verified]
`renderTalk` fails with "renderTalk needs the pieces folder" unless `pieces` is present and is not falsy.

<!-- predictable:analysis -->

<!-- predictable:subject=index.renderTalk -->

<!-- predictable:vc=il1.domain-guard -->

<!-- predictable:throws=renderTalk needs the pieces folder -->

<!-- predictable:canonical=`index.renderTalk` only works when `pieces` is present and is not empty, zero or false. -->

- **Code locations:** [scripts/render/index.mjs:17-48](../../../scripts/render/index.mjs#L17-L48)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-006/ANL-0024.md -->

### Behaviours

#### index.renderTalk <!-- predictable:group -->

##### BEH-0016 [implemented, violated]
`manifest` is assumed to be an object. The parsed text could be `null`, a list or a number. The request then fails instead of being rejected. Safe to rely on when the parse result's shape is checked before it is used as an object, or the failure is handled.

<!-- predictable:behaviour -->

<!-- predictable:subject=index.renderTalk -->

<!-- predictable:vc=site.payload-shape-assumed.manifest.949ab454 -->

- **Code locations:** [scripts/render/index.mjs:17-48](../../../scripts/render/index.mjs#L17-L48)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-006/BEH-0016.md -->

##### BEH-0017 [implemented, violated]
`manifest.base` may be missing from the payload. The lookup gives nothing when the payload leaves `manifest.base` out, and nothing checks for it first. The request then fails here instead of being rejected. Safe to rely on when `manifest.base` is checked for presence, or the payload is validated, before it is used.

<!-- predictable:behaviour -->

<!-- predictable:subject=index.renderTalk -->

<!-- predictable:vc=site.unvalidated-json-dereferenced.manifest-base.c88446d8 -->

- **Code locations:** [scripts/render/index.mjs:17-48](../../../scripts/render/index.mjs#L17-L48)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-006/BEH-0017.md -->
