---
predictable: spec
---
## Specification Details
- **ID:** SPEC-002
- **Name:** scripts/lib/tag-contract.mjs

### Description
`tag-contract.mjs` — Tag-contract. Called from `«build-pieces».tagsOf`, and possibly from places the call graph cannot see. `readContract` builds `isOwn`, `readContract` builds `isNode`, `readContract` builds `describe` and `readContract` builds `propsOf`, and no requirement here is about what runs inside them. Can fail: “`readContract` can fail with the error "No module for".” 1 requirement: 1 violated. 2 stated failures.

### Declarations

`tag-contract.mjs` — Declares 5 functions:
- `tagName`(`exportName`) — no requirement inferred
- `attrName`(`prop`) — no requirement inferred
- `readContract`(`root`, `components`) — can fail with the error "No module for"; can fail with the error `Error`; an unrecognised value is answered as "json"
- `byValue`(`a`, `b`) — internal, no requirement inferred
- `mergeTypes`(`a`, `b`) — internal, no requirement inferred

### Notation

A requirement is a condition an operation needs in order not to fail in the way its own row names — an operation with several failures carries a row for each, and meeting one says nothing about the others. Some a caller supplies, others the operation establishes and checks itself. Nobody has checked the callers.

`implemented` — the operation exists in the code; every machine-written row carries it.

Tags: `[implemented, violated]` — the analysis found a case where the condition fails.
`[implemented, stated-failure]` — the operation is stated to fail with a named error — a behaviour it has, and one this analysis did not settle as prevented.
`[violated]` on the card above and `[implemented, violated]` on a row below are one state;
likewise for the other one.

On the cards: `internal` — nothing outside this file can reach the operation (a `private` member, or a declaration the module does not export), so a requirement here is not addressed to anybody outside it. `no requirement inferred` — no requirement on this page is about the operation. Either nothing was decided about it, or what was decided is not addressed to a caller (see `internal`); neither means nothing is needed. Where the analysis could not finish, the description above says so by name. Ids in the machine-managed sections below are assigned per run and are not stable references; cite the requirement's sentence.

### Requirements

#### tag-contract.readContract <!-- predictable:group -->

`tag-contract.readContract` — “The props every component export takes from a tag, read from its TypeScript Props type.”

##### REQ-0001 [stated-failure]
Calling `readContract` can fail with the error "No module for".

<!-- predictable:inferred -->

<!-- predictable:subject=«tag-contract».readContract -->

### Analysis

#### tag-contract.readContract <!-- predictable:group -->

##### ANL-0017 [implemented, stated-failure]
Calling `readContract` can fail with the error `Error`.

<!-- predictable:analysis -->

<!-- predictable:subject=tag-contract.readContract -->

<!-- predictable:vc=il1.domain-guard -->

<!-- predictable:throws=Error -->

### Behaviours

#### tag-contract.readContract <!-- predictable:group -->

##### BEH-0006 [implemented, violated]
An unrecognised value is answered as "json". Each test here answers a category, and a value no test recognises falls through to "json" — the same answer one of the tests gives. An unrecognised value is therefore reported as that category, and nothing tells it apart from one that really is. Safe to rely on when every value that reaches here really is that category.

<!-- predictable:behaviour -->

<!-- predictable:subject=tag-contract.readContract -->

<!-- predictable:vc=site.classifier-default-is-a-category.json.d2349ccc -->

- **Code locations:** [scripts/lib/tag-contract.mjs:72](../../../scripts/lib/tag-contract.mjs#L72)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-002/BEH-0006.md -->
