---
predictable: spec
---
## Specification Details
- **ID:** SPEC-019
- **Name:** mcp/node-adapter.ts

### Description
`node-adapter.ts` — Node-adapter. Called from `firebase.ts (top level)` and `serve.ts (top level)`, and possibly from places the call graph cannot see. 1 requirement: 1 violated.

### Declarations

`node-adapter` — Declares 2 functions: `toWebRequest`(`req`, `origin`, `rawBody`) — “Node request → Web Request.” and `sendWebResponse`(`res`, `response`) — “Web Response → Node response.”

### Notation

A requirement is a condition an operation needs in order not to fail in the way its own row names — an operation with several failures carries a row for each, and meeting one says nothing about the others. Some a caller supplies, others the operation establishes and checks itself. Nobody has checked the callers.

`implemented` — the operation exists in the code; every machine-written row carries it.

Tags: `[implemented, violated]` — the analysis found a case where the condition fails.
`[violated]` on the card above and `[implemented, violated]` on a row below are one state. Ids in the machine-managed sections below are assigned per run and are not stable references; cite the requirement's sentence.

### Analysis

#### node-adapter.toWebRequest <!-- predictable:group -->

##### ANL-0001 [implemented, violated]
The size must not be negative.

<!-- predictable:analysis -->

<!-- predictable:subject=node-adapter.toWebRequest -->

<!-- predictable:vc=il1.negative-size -->

- **Code locations:** [mcp/node-adapter.ts:12-21](../../mcp/node-adapter.ts#L12-L21)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-019/ANL-0001.md -->
