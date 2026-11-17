---
predictable: spec
---
## Specification Details
- **ID:** SPEC-228
- **Name:** scripts/runtime/runtime.mjs

### Description
<!-- predictable:module-summary=Documents runtime.mjs, the client and server runtime that hydrates islands, renders on the server, and bridges to Preact and React, exposing a rejectPath function that can throw an Error. -->
**Areas:** Runtime

`runtime.mjs` — Runtime. Can fail: “`rejectPath` can fail with the error `Error`.” 1 requirement: 1 violated. 1 stated failure.

### Declarations

`runtime.mjs` — Declares 5 functions:
- `load`(`file`) — internal, no requirement inferred
- `styleModule`(`file`) — internal, no requirement inferred
- `boot`() — internal, no requirement inferred
- `rejectPath`(`value`, `file`, `label`) — internal; can fail with the error `Error`
- `mount`(`_pattern`) — internal, no requirement inferred

### Notation

A requirement is a condition an operation needs in order not to fail in the way its own row names — an operation with several failures carries a row for each, and meeting one says nothing about the others. Some a caller supplies, others the operation establishes and checks itself. Nobody has checked the callers.

`implemented` — the operation exists in the code; every machine-written row carries it.

Tags: `[implemented, violated]` — the analysis found a case where the condition fails.
`[implemented, stated-failure]` — the operation is stated to fail with a named error — a behaviour it has, and one this analysis did not settle as prevented.
`[violated]` on the card above and `[implemented, violated]` on a row below are one state;
likewise for the other one.

On the cards: `internal` — nothing outside this file can reach the operation (a `private` member, or a declaration the module does not export), so a requirement here is not addressed to anybody outside it. `no requirement inferred` — no requirement on this page is about the operation. Either nothing was decided about it, or what was decided is not addressed to a caller (see `internal`); neither means nothing is needed. Where the analysis could not finish, the description above says so by name. Ids in the machine-managed sections below are assigned per run and are not stable references; cite the requirement's sentence.

### Requirements

#### runtime.rejectPath <!-- predictable:group -->

##### REQ-0001 [implemented, stated-failure]
Calling `rejectPath` can fail with the error `Error`.

<!-- predictable:inferred -->

<!-- predictable:subject=runtime.rejectPath -->

- **Code locations:** [scripts/runtime/runtime.mjs:45-47](../../../scripts/runtime/runtime.mjs#L45-L47)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-228/REQ-0001.md -->

### Behaviours

#### runtime.__moduleInit__ <!-- predictable:group -->

##### BEH-0013 [implemented, violated]
The work `boot` starts is dropped. The handle `boot` returns is thrown away, so nothing waits for the work. Callers hear "done" too early, and its failures are lost. Safe to rely on when the work `boot` starts is waited for, returned, or given a failure handler.

<!-- predictable:behaviour -->

<!-- predictable:subject=runtime.__moduleInit__ -->

<!-- predictable:vc=site.async-result-dropped.boot.232bfb40 -->

- **Code locations:** [scripts/runtime/runtime.mjs:65-66](../../../scripts/runtime/runtime.mjs#L65-L66)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-228/BEH-0013.md -->
