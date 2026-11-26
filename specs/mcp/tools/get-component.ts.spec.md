---
predictable: spec
---
## Specification Details
- **ID:** SPEC-022
- **Name:** mcp/tools/get-component.ts

### Description
<!-- predictable:module-summary=A thin wrapper module exposing a getComponent function that retrieves component data from shared runtime resources. -->
**Areas:** App Shell

`get-component.ts` — Get-component. 1 requirement: 1 verified.

### Types

`getComponent` — Declares 1 operation: `handler`(`_pa0`, `metadata`).

### Notation

A requirement is a condition an operation needs in order not to fail in the way its own row names — an operation with several failures carries a row for each, and meeting one says nothing about the others. Some a caller supplies, others the operation establishes and checks itself. Nobody has checked the callers.

`implemented` — the operation exists in the code; every machine-written row carries it.

Tags: `[implemented, verified]` — the operation checks this and refuses when it fails.
`[verified]` on the card above and `[implemented, verified]` on a row below are one state. Ids in the machine-managed sections below are assigned per run and are not stable references; cite the requirement's sentence.

### Analysis

#### get-component.getComponent <!-- predictable:group -->

##### ANL-0004 [implemented, verified]
`match` must not be null where this function reads through it.

<!-- predictable:analysis -->

<!-- predictable:subject=get-component.getComponent -->

<!-- predictable:vc=il1.null-dereference -->

<!-- predictable:sibling-vcs=il2.null-dereference il3.null-dereference il4.null-dereference -->

- **Code locations:** [mcp/tools/get-component.ts:4-32](../../../mcp/tools/get-component.ts#L4-L32)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-022/ANL-0004.md -->
