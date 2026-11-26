---
predictable: spec
---
## Specification Details
- **ID:** SPEC-021
- **Name:** mcp/tools/get-component-stories.ts

### Description
`get-component-stories.ts` — Get-component-stories. This project's call graph records DIRECT calls only, so a function passed to a container, destructured into an exported binding, or reached through a dynamic lookup is not one it can see. Within that limit it records no call to this module. At run time it reaches `shared`. 1 requirement: 1 verified.

### Types

`getComponentStories` — Declares 1 operation: `handler`(`_pa0`, `metadata`).

### Notation

A requirement is a condition an operation needs in order not to fail in the way its own row names — an operation with several failures carries a row for each, and meeting one says nothing about the others. Some a caller supplies, others the operation establishes and checks itself. Nobody has checked the callers.

`implemented` — the operation exists in the code; every machine-written row carries it.

Tags: `[implemented, verified]` — the operation checks this and refuses when it fails.
`[verified]` on the card above and `[implemented, verified]` on a row below are one state. Ids in the machine-managed sections below are assigned per run and are not stable references; cite the requirement's sentence.

### Analysis

#### get-component-stories.getComponentStories <!-- predictable:group -->

##### ANL-0003 [implemented, verified]
`match` must not be null where this function reads through it.

<!-- predictable:analysis -->

<!-- predictable:subject=get-component-stories.getComponentStories -->

<!-- predictable:vc=il1.null-dereference -->

- **Code locations:** [mcp/tools/get-component-stories.ts:4-29](../../../mcp/tools/get-component-stories.ts#L4-L29)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-021/ANL-0003.md -->
