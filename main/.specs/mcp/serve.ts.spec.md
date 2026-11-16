---
predictable: spec
---
## Specification Details
- **ID:** SPEC-006
- **Name:** mcp/serve.ts

### Description
`serve.ts` — Serve. This project's call graph records DIRECT calls only, so a function passed to a container, destructured into an exported binding, or reached through a dynamic lookup is not one it can see. Within that limit it records no call to this module. At run time it reaches `http`, `«build-mcp-metadata»` and `«node-adapter»`. Observed: “An asynchronous callback hands its work to a slot that ignores it.” 1 requirement: 1 violated.

### Notation

A requirement is a condition an operation needs in order not to fail in the way its own row names — an operation with several failures carries a row for each, and meeting one says nothing about the others. Some a caller supplies, others the operation establishes and checks itself. Nobody has checked the callers.

`implemented` — the operation exists in the code; every machine-written row carries it.

Tags: `[implemented, violated]` — the analysis found a case where the condition fails. Ids in the machine-managed sections below are assigned per run and are not stable references; cite the requirement's sentence.

### Behaviours

#### serve.__moduleInit__ <!-- predictable:group -->

##### BEH-0001 [implemented, violated]
An asynchronous callback hands its work to a slot that ignores it. This callback awaits, so it returns to its caller at the first wait and finishes later — but its result is nothing, so the work in flight has no handle anyone can hold. The caller carries on as though the work were done, several such calls run at once rather than in turn, and a failure after the first wait has nowhere to go: it is raised where nobody catches it, which on some runtimes ends the process. Return the work's handle and have the caller wait for it, or hand the callback to something that waits for what it returns. Safe to rely on when the asynchronous work the module's top-level code starts returns a handle that its caller waits for.

<!-- predictable:behaviour -->

<!-- predictable:subject=serve.__moduleInit__ -->

<!-- predictable:vc=site.async-work-in-void-slot.-.c47e47ad -->

- **Code locations:** [mcp/serve.ts:25](../../mcp/serve.ts#L25)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-006/BEH-0001.md -->
