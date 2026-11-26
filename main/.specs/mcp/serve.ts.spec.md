---
predictable: spec
---
## Specification Details
- **ID:** SPEC-010
- **Name:** mcp/serve.ts

### Description
`serve.ts` — Serve. This project's call graph records DIRECT calls only, so a function passed to a container, destructured into an exported binding, or reached through a dynamic lookup is not one it can see. Within that limit it records no call to this module. At run time it reaches `http` and `«node-adapter»`. Observed: “This async callback's work is never awaited.” 1 requirement: 1 violated.

### Notation

A requirement is a condition an operation needs in order not to fail in the way its own row names — an operation with several failures carries a row for each, and meeting one says nothing about the others. Some a caller supplies, others the operation establishes and checks itself. Nobody has checked the callers.

`implemented` — the operation exists in the code; every machine-written row carries it.

Tags: `[implemented, violated]` — the analysis found a case where the condition fails. Ids in the machine-managed sections below are assigned per run and are not stable references; cite the requirement's sentence.

### Behaviours

#### serve.__moduleInit__ <!-- predictable:group -->

##### BEH-0001 [implemented, violated]
This async callback's work is never awaited. This callback returns before its work finishes and hands back nothing to wait on. The caller carries on too early, and a later failure is raised where nobody catches it. Safe to rely on when the asynchronous work the module's top-level code starts returns a handle that its caller waits for.

<!-- predictable:behaviour -->

<!-- predictable:subject=serve.__moduleInit__ -->

<!-- predictable:vc=site.async-work-in-void-slot.-.c47e47ad -->

- **Code locations:** [mcp/serve.ts:25](../../mcp/serve.ts#L25)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-010/BEH-0001.md -->
