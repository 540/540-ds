---
predictable: spec
---
## Specification Details
- **ID:** SPEC-009
- **Name:** src/runtime/server.ts

### Description
`server.ts` — Server. This project's call graph records DIRECT calls only, so a function passed to a container, destructured into an exported binding, or reached through a dynamic lookup is not one it can see. Within that limit it records no call to this module. At least one of its operations is exported. At run time it reaches `islands`. `IslandOptions` carries `name`, `props`, `id` and `slots`; `RenderOptions` carries `identifierPrefix`. `renderIsland` builds `slotHtml`, and no requirement here is about what runs inside it. Checks: “`renderIsland` throws `Error` unless `type` is not null.” and 1 more. 2 requirements: 2 verified. 2 stated failures.

### Declarations

`server` — Declares 5 functions:
- `render`(`element`, `id`) — internal, no requirement inferred
- `renderIsland`(`registry`, `_pattern`) — requires `type` is not null [verified]; can be rejected with the error "540-ds: component "" when `the type equals null`
- `renderStatic`(`element`, `id`) — no requirement inferred
- `renderToString`(`element`, `options`) — “Kept from the React runtime, so talk builds that call them keep working.” — requires `options` is not null [verified]
- `escapeAttr`(`value`) — internal, no requirement inferred

A `[verified]` requirement is one the operation checks itself.

### Notation

A requirement is a condition an operation needs in order not to fail in the way its own row names — an operation with several failures carries a row for each, and meeting one says nothing about the others. Some a caller supplies, others the operation establishes and checks itself. Nobody has checked the callers.

`implemented` — the operation exists in the code; every machine-written row carries it.

Tags: `[implemented, verified]` — the operation checks this and refuses when it fails.
`[implemented, stated-failure]` — the operation is stated to fail with a named error — a behaviour it has, and one this analysis did not settle as prevented.
`[verified]` on the card above and `[implemented, verified]` on a row below are one state;
likewise for the other one.

On the cards: `internal` — nothing outside this file can reach the operation (a `private` member, or a declaration the module does not export), so a requirement here is not addressed to anybody outside it. `no requirement inferred` — no requirement on this page is about the operation. Either nothing was decided about it, or what was decided is not addressed to a caller (see `internal`); neither means nothing is needed. Where the analysis could not finish, the description above says so by name. Ids in the machine-managed sections below are assigned per run and are not stable references; cite the requirement's sentence.

### Requirements

#### server.renderIsland <!-- predictable:group -->

##### REQ-0001 [implemented, stated-failure]
When `renderIsland` is called, if `the type equals null` then the call is rejected with the error "540-ds: component "".

<!-- predictable:inferred -->

<!-- predictable:subject=server.renderIsland -->

- **Code locations:** [src/runtime/server.ts:24-33](../../../src/runtime/server.ts#L24-L33)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-009/REQ-0001.md -->

#### slotHtml.lambda_27_19 <!-- predictable:group -->

##### REQ-0002 [implemented, stated-failure]
Calling `lambda_27_19` can fail with the error "540-ds: slot "".

<!-- predictable:inferred -->

<!-- predictable:subject=slotHtml.lambda_27_19 -->

- **Code locations:** [src/runtime/server.ts:27-30](../../../src/runtime/server.ts#L27-L30)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-009/REQ-0002.md -->

### Analysis

#### server.renderIsland <!-- predictable:group -->

##### ANL-0058 [implemented, verified]
`renderIsland` throws `Error` unless `type` is not null.

<!-- predictable:analysis -->

<!-- predictable:subject=server.renderIsland -->

<!-- predictable:vc=il1.domain-guard -->

<!-- predictable:throws=Error -->

<!-- predictable:canonical=`server.renderIsland` only works when `type` is not null. -->

- **Code locations:** [src/runtime/server.ts:24-33](../../../src/runtime/server.ts#L24-L33)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-009/ANL-0058.md -->

#### server.renderToString <!-- predictable:group -->

##### ANL-0059 [implemented, verified]
`server.renderToString` only works when `options` is not null.

<!-- predictable:analysis -->

<!-- predictable:subject=server.renderToString -->

<!-- predictable:vc=il1.null-dereference -->

<!-- predictable:sibling-vcs=il2.null-dereference -->

- **Code locations:** [src/runtime/server.ts:42-44](../../../src/runtime/server.ts#L42-L44)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-009/ANL-0059.md -->
