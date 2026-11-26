---
predictable: spec
---
## Specification Details
- **ID:** SPEC-008
- **Name:** src/runtime/islands.ts

### Description
<!-- predictable:module-summary=Islands defines the client/server-shared registry and encoding logic that lets interactive components be rendered server-side and selectively revived as hydrated islands in the browser. -->
**Areas:** Runtime

`islands.ts` — Islands. Can fail: “`revive` can fail with the error "540-ds: component "".” 2 stated failures.

### Declarations

`islands` — Declares 7 functions:
- `whenSlotMounts`(`callback`) — no requirement inferred
- `Slot`(`_pattern`) — no requirement inferred
- `isObject`(`value`) — internal, no requirement inferred
- `revive`(`value`, `registry`, `slotHtml`) — can fail with the error "540-ds: component ""; can fail with the error `Error`
- `withKey`(`node`, `key`) — internal, no requirement inferred
- `isComponent`(`value`) — internal, no requirement inferred
- `registryOf`(`...modules`) — no requirement inferred

### Notation

`implemented` — the operation exists in the code; every machine-written row carries it.

Tags: `[implemented, stated-failure]` — the operation is stated to fail with a named error — a behaviour it has, and one this analysis did not settle as prevented.
`[stated-failure]` on the card above and `[implemented, stated-failure]` on a row below are one state.

On the cards: `internal` — nothing outside this file can reach the operation (a `private` member, or a declaration the module does not export), so a requirement here is not addressed to anybody outside it. `no requirement inferred` — no requirement on this page is about the operation. Either nothing was decided about it, or what was decided is not addressed to a caller (see `internal`); neither means nothing is needed. Where the analysis could not finish, the description above says so by name. Ids in the machine-managed sections below are assigned per run and are not stable references; cite the requirement's sentence.

### Requirements

#### islands.revive <!-- predictable:group -->

##### REQ-0001 [implemented, stated-failure]
Calling `revive` can fail with the error "540-ds: component "".

<!-- predictable:inferred -->

<!-- predictable:subject=islands.revive -->

- **Code locations:** [src/runtime/islands.ts:33-52](../../../src/runtime/islands.ts#L33-L52)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-008/REQ-0001.md -->

### Analysis

#### islands.revive <!-- predictable:group -->

##### ANL-0057 [implemented, stated-failure]
Calling `revive` can fail with the error `Error`.

<!-- predictable:analysis -->

<!-- predictable:subject=islands.revive -->

<!-- predictable:vc=il1.domain-guard -->

<!-- predictable:throws=Error -->

- **Code locations:** [src/runtime/islands.ts:33-52](../../../src/runtime/islands.ts#L33-L52)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-008/ANL-0057.md -->
