---
predictable: spec
---
## Specification Details
- **ID:** SPEC-020
- **Name:** mcp/tools/get-component-docs.ts

### Description
<!-- predictable:module-summary=A server-side function module that assembles and returns documentation for a design system component for consumption by MCP tooling. -->
**Areas:** MCP Tools

`get-component-docs.ts` — Get-component-docs. 1 requirement: 1 verified.

### Types

`getComponentDocs` — Declares 1 operation: `handler`(`_pa0`, `metadata`).

### Notation

A requirement is a condition an operation needs in order not to fail in the way its own row names — an operation with several failures carries a row for each, and meeting one says nothing about the others. Some a caller supplies, others the operation establishes and checks itself. Nobody has checked the callers.

`implemented` — the operation exists in the code; every machine-written row carries it.

Tags: `[implemented, verified]` — the operation checks this and refuses when it fails.
`[verified]` on the card above and `[implemented, verified]` on a row below are one state. Ids in the machine-managed sections below are assigned per run and are not stable references; cite the requirement's sentence.

### Analysis

#### get-component-docs.getComponentDocs <!-- predictable:group -->

##### ANL-0002 [implemented, verified]
`match` must not be null where this function reads through it.

<!-- predictable:analysis -->

<!-- predictable:subject=get-component-docs.getComponentDocs -->

<!-- predictable:vc=il1.null-dereference -->

- **Code locations:** [mcp/tools/get-component-docs.ts:4-20](../../../mcp/tools/get-component-docs.ts#L4-L20)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-020/ANL-0002.md -->
