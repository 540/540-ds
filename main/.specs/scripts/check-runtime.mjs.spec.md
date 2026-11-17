---
predictable: spec
---
## Specification Details
- **ID:** SPEC-226
- **Name:** scripts/check-runtime.mjs

### Description
`check-runtime.mjs` — Check-runtime. This project's call graph records DIRECT calls only, so a function passed to a container, destructured into an exported binding, or reached through a dynamic lookup is not one it can see. Within that limit it records no call to this module. Checks: “`server.lambda_68_28` only works when `startsWith`(the `pathname` of `url`, "/talk/") returns true or `startsWith`(the `pathname` of `url`, "/pieces/") returns true.” and 1 more. 4 requirements: 2 violated, 2 verified. 2 stated failures.

### Declarations

`check-runtime.mjs` — Declares 5 functions:
- `photo`(`file`) — internal, no requirement inferred
- `page`(`tags`, `lang`) — internal, no requirement inferred
- `check`(`ok`, `message`) — internal, no requirement inferred
- `open`(`load`) — internal, no requirement inferred
- `snapshot`(`tab`) — internal, no requirement inferred

A `[verified]` requirement is one the operation checks itself.

`server` — Declares 1 operation: `lambda_68`(`req`, `res`).

Requires of its callers (2) — a `[verified]` one the operation checks itself, or the analysis proved:
- for `lambda_68_28`: `startsWith`(the `pathname` of `url`, "/talk/") returns true or `startsWith`(the `pathname` of `url`, "/pieces/") returns true [verified]
- for `lambda_68_28`: `startsWith`(the `pathname` of `url`, "/talk/") returns true or `startsWith`(the `pathname` of `url`, "/pieces/") returns false or `startsWith`(`file`, `pieces`) returns true [verified]

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

#### server.lambda_68_28 <!-- predictable:group -->

##### REQ-0001 [stated-failure]
Calling `lambda_68_28` can fail with the error "not found".

<!-- predictable:inferred -->

<!-- predictable:subject=server.lambda_68_28 -->

##### REQ-0002 [stated-failure]
Calling `lambda_68_28` can fail with the error `outside`.

<!-- predictable:inferred -->

<!-- predictable:subject=server.lambda_68_28 -->

### Analysis

#### check-runtime.origin <!-- predictable:group -->

##### ANL-0052 [implemented, violated]
The value used here must not be null.

<!-- predictable:analysis -->

<!-- predictable:subject=check-runtime.origin -->

<!-- predictable:vc=il1.null-dereference -->

#### server.lambda_68_28 <!-- predictable:group -->

##### ANL-0053 [implemented, verified]
`server.lambda_68_28` only works when `startsWith`(the `pathname` of `url`, "/talk/") returns true or `startsWith`(the `pathname` of `url`, "/pieces/") returns true.

<!-- predictable:analysis -->

<!-- predictable:subject=server.lambda_68_28 -->

<!-- predictable:vc=il1.domain-guard -->

##### ANL-0054 [implemented, verified]
`server.lambda_68_28` only works when `startsWith`(the `pathname` of `url`, "/talk/") returns true or `startsWith`(the `pathname` of `url`, "/pieces/") returns false or `startsWith`(`file`, `pieces`) returns true.

<!-- predictable:analysis -->

<!-- predictable:subject=server.lambda_68_28 -->

<!-- predictable:vc=il2.domain-guard -->

### Behaviours

#### check-runtime.server <!-- predictable:group -->

##### BEH-0006 [implemented, violated]
Lookup in `TYPES` can hit a built-in property. A key such as `constructor` returns a value that `TYPES` never held, and it is neither absent nor falsy. Safe to rely on when the key is confirmed to be one of `TYPES`'s own entries.

<!-- predictable:behaviour -->

<!-- predictable:subject=check-runtime.server -->

<!-- predictable:vc=site.table-key-not-checked.TYPES.ada29a86 -->

- **Code locations:** [scripts/check-runtime.mjs:78](../../scripts/check-runtime.mjs#L78)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-226/BEH-0006.md -->
