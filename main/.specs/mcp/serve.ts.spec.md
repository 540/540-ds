---
predictable: spec
---
## Specification Details
- **ID:** SPEC-010
- **Name:** mcp/serve.ts

### Description
`serve.ts` — Serve. This project's call graph records DIRECT calls only, so a function passed to a container, destructured into an exported binding, or reached through a dynamic lookup is not one it can see. Within that limit it records no call to this module. At run time it reaches `http` and `«node-adapter»`. Observed: “A malformed request is answered as a server failure.” 1 requirement: 1 violated.

### Notation

A requirement is a condition an operation needs in order not to fail in the way its own row names — an operation with several failures carries a row for each, and meeting one says nothing about the others. Some a caller supplies, others the operation establishes and checks itself. Nobody has checked the callers.

`implemented` — the operation exists in the code; every machine-written row carries it.

Tags: `[implemented, violated]` — the analysis found a case where the condition fails. Ids in the machine-managed sections below are assigned per run and are not stable references; cite the requirement's sentence.

### Behaviours

#### serve.__moduleInit__ <!-- predictable:group -->

##### BEH-0001 [implemented, violated]
A malformed request is answered as a server failure. This `catch` answers every failure with a server status, including input the sender got wrong. The sender is told the server broke and retries the same bad request. Safe to rely on when a malformed request is answered as a client error.

<!-- predictable:behaviour -->

<!-- predictable:subject=serve.__moduleInit__ -->

<!-- predictable:vc=site.input-error-as-server-error.-.701a75a4 -->

- **Code locations:** [mcp/serve.ts:20](../../mcp/serve.ts#L20)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-010/BEH-0001.md -->
