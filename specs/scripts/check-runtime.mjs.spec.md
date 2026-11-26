---
predictable: spec
---
## Specification Details
- **ID:** SPEC-003
- **Name:** scripts/check-runtime.mjs

### Description
<!-- predictable:module-summary=Check-runtime is a validation script with an embedded server that verifies runtime page-serving behavior, such as path-based routing requirements, stays correct as the design system evolves. -->
**Areas:** Validation Checks

`check-runtime.mjs` — Check-runtime. Checks: “`server.lambda_70_28` only works when `startsWith`(the `pathname` of `url`, "/talk/") returns true or `startsWith`(the `pathname` of `url`, "/pieces/") returns true.” and 1 more. 7 requirements: 4 violated, 3 verified. 2 stated failures.

### Declarations

`check-runtime.mjs` — Declares 5 functions:
- `photo`(`file`) — internal, no requirement inferred
- `page`(`tags`, `lang`) — internal, no requirement inferred
- `check`(`ok`, `message`) — internal, no requirement inferred
- `open`(`load`) — internal, no requirement inferred
- `snapshot`(`tab`) — internal; what `Document.body` returns can be null here

A `[verified]` requirement is one the operation checks itself.

`server` — Declares 1 operation: `lambda`(`req`, `res`).

Requires of its callers (2) — a `[verified]` one the operation checks itself, or the analysis proved:
- for `lambda_70_28`: `startsWith`(the `pathname` of `url`, "/talk/") returns true or `startsWith`(the `pathname` of `url`, "/pieces/") returns true [verified]
- for `lambda_70_28`: `startsWith`(the `pathname` of `url`, "/talk/") returns true or `startsWith`(the `pathname` of `url`, "/pieces/") returns false or `startsWith`(`file`, `pieces`) returns true [verified]

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

#### server.lambda_70_28 <!-- predictable:group -->

##### REQ-0001 [implemented, stated-failure]
Calling `lambda_70_28` can fail with the error "not found".

<!-- predictable:inferred -->

<!-- predictable:subject=server.lambda_70_28 -->

- **Code locations:** [scripts/check-runtime.mjs:70-84](../../scripts/check-runtime.mjs#L70-L84)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-003/REQ-0001.md -->

##### REQ-0002 [implemented, stated-failure]
Calling `lambda_70_28` can fail with the error `outside`.

<!-- predictable:inferred -->

<!-- predictable:subject=server.lambda_70_28 -->

- **Code locations:** [scripts/check-runtime.mjs:70-84](../../scripts/check-runtime.mjs#L70-L84)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-003/REQ-0002.md -->

### Analysis

#### check-runtime.__moduleInit__ <!-- predictable:group -->

##### ANL-0013 [implemented, violated]
The value used here must not be null.

<!-- predictable:analysis -->

<!-- predictable:subject=check-runtime.__moduleInit__ -->

<!-- predictable:vc=il1.null-dereference -->

- **Code locations:** [scripts/check-runtime.mjs:85-175](../../scripts/check-runtime.mjs#L85-L175)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-003/ANL-0013.md -->

##### ANL-0014 [implemented, verified]
`el` must not be null where this module's top-level code reads through it.

<!-- predictable:analysis -->

<!-- predictable:subject=check-runtime.__moduleInit__ -->

<!-- predictable:vc=il2.null-dereference -->

<!-- predictable:sibling-vcs=il3.null-dereference -->

- **Code locations:** [scripts/check-runtime.mjs:85-175](../../scripts/check-runtime.mjs#L85-L175)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-003/ANL-0014.md -->

#### check-runtime.origin <!-- predictable:group -->

##### ANL-0015 [implemented, violated]
The value used here must not be null.

<!-- predictable:analysis -->

<!-- predictable:subject=check-runtime.origin -->

<!-- predictable:vc=il1.null-dereference -->

- **Code locations:** [scripts/check-runtime.mjs:86](../../scripts/check-runtime.mjs#L86)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-003/ANL-0015.md -->

#### server.lambda_70_28 <!-- predictable:group -->

##### ANL-0016 [implemented, verified]
`server.lambda_70_28` only works when `startsWith`(the `pathname` of `url`, "/talk/") returns true or `startsWith`(the `pathname` of `url`, "/pieces/") returns true.

<!-- predictable:analysis -->

<!-- predictable:subject=server.lambda_70_28 -->

<!-- predictable:vc=il1.domain-guard -->

- **Code locations:** [scripts/check-runtime.mjs:70-84](../../scripts/check-runtime.mjs#L70-L84)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-003/ANL-0016.md -->

##### ANL-0017 [implemented, verified]
`server.lambda_70_28` only works when `startsWith`(the `pathname` of `url`, "/talk/") returns true or `startsWith`(the `pathname` of `url`, "/pieces/") returns false or `startsWith`(`file`, `pieces`) returns true.

<!-- predictable:analysis -->

<!-- predictable:subject=server.lambda_70_28 -->

<!-- predictable:vc=il2.domain-guard -->

- **Code locations:** [scripts/check-runtime.mjs:70-84](../../scripts/check-runtime.mjs#L70-L84)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-003/ANL-0017.md -->

### Behaviours

#### check-runtime.server <!-- predictable:group -->

##### BEH-0010 [implemented, violated]
Lookup in `TYPES` can hit a built-in property. A key such as `constructor` returns a value that `TYPES` never held, and it is neither absent nor falsy. Safe to rely on when the key is confirmed to be one of `TYPES`'s own entries.

<!-- predictable:behaviour -->

<!-- predictable:subject=check-runtime.server -->

<!-- predictable:vc=site.table-key-not-checked.TYPES.ada29a86 -->

- **Code locations:** [scripts/check-runtime.mjs:70-84](../../scripts/check-runtime.mjs#L70-L84)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-003/BEH-0010.md -->

#### check-runtime.snapshot <!-- predictable:group -->

##### BEH-0011 [implemented, violated]
What `Document.body` returns can be null here. `Document.body` can return nothing in ordinary conditions, and its answer is used without a check, so the first member access throws. Safe to rely on when what `Document.body` answers is tested before it is used.

<!-- predictable:behaviour -->

<!-- predictable:subject=check-runtime.snapshot -->

<!-- predictable:vc=site.platform-type-dereferenced.Document-body.0fbc38fe -->

- **Code locations:** [scripts/check-runtime.mjs:105-110](../../scripts/check-runtime.mjs#L105-L110)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-003/BEH-0011.md -->
