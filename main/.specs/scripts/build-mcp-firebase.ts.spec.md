---
predictable: spec
---
## Specification Details
- **ID:** SPEC-011
- **Name:** scripts/build-mcp-firebase.ts

### Description
`build-mcp-firebase.ts` — Build-mcp-firebase. This project's call graph records DIRECT calls only, so a function passed to a container, destructured into an exported binding, or reached through a dynamic lookup is not one it can see. Within that limit it records no call to this module. Observed: “`JSON.parse(…)` is assumed to be an object.” 1 requirement: 1 violated.

### Declarations

`build-mcp-firebase` — Declares 1 function:
- `installedVersion`(`pkg`) — internal; `JSON.parse(…)` is assumed to be an object

### Notation

A requirement is a condition an operation needs in order not to fail in the way its own row names — an operation with several failures carries a row for each, and meeting one says nothing about the others. Some a caller supplies, others the operation establishes and checks itself. Nobody has checked the callers.

`implemented` — the operation exists in the code; every machine-written row carries it.

Tags: `[implemented, violated]` — the analysis found a case where the condition fails.
`[violated]` on the card above and `[implemented, violated]` on a row below are one state.

On the cards: `internal` — nothing outside this file can reach the operation (a `private` member, or a declaration the module does not export), so a requirement here is not addressed to anybody outside it. Ids in the machine-managed sections below are assigned per run and are not stable references; cite the requirement's sentence.

### Behaviours

#### build-mcp-firebase.installedVersion <!-- predictable:group -->

##### BEH-0002 [implemented, violated]
`JSON.parse(…)` is assumed to be an object. The parsed text could be `null`, a list or a number. The request then fails instead of being rejected. Safe to rely on when the parse result's shape is checked before it is used as an object, or the failure is handled.

<!-- predictable:behaviour -->

<!-- predictable:subject=build-mcp-firebase.installedVersion -->

<!-- predictable:vc=site.payload-shape-assumed.JSON-parse---.8522f176 -->

- **Code locations:** [scripts/build-mcp-firebase.ts:20](../../scripts/build-mcp-firebase.ts#L20)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-011/BEH-0002.md -->
