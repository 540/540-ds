---
predictable: spec
---
## Specification Details
- **ID:** SPEC-023
- **Name:** mcp/tools/get-template-stops.ts

### Description
<!-- predictable:module-summary=This module defines a single function that retrieves the list of named stop points used by a page template, serving the template rendering and validation scripts. -->
**Areas:** Piece Rendering

`get-template-stops.ts` — Get-template-stops. 1 requirement: 1 verified.

### Types

`getTemplateStops` — Declares 1 operation: `handler`(`_pa0`, `metadata`).

### Notation

A requirement is a condition an operation needs in order not to fail in the way its own row names — an operation with several failures carries a row for each, and meeting one says nothing about the others. Some a caller supplies, others the operation establishes and checks itself. Nobody has checked the callers.

`implemented` — the operation exists in the code; every machine-written row carries it.

Tags: `[implemented, verified]` — the operation checks this and refuses when it fails.
`[verified]` on the card above and `[implemented, verified]` on a row below are one state. Ids in the machine-managed sections below are assigned per run and are not stable references; cite the requirement's sentence.

### Analysis

#### get-template-stops.getTemplateStops <!-- predictable:group -->

##### ANL-0005 [implemented, verified]
`s` must not be null where this function reads through it.

<!-- predictable:analysis -->

<!-- predictable:subject=get-template-stops.getTemplateStops -->

<!-- predictable:vc=il1.null-dereference -->

<!-- predictable:sibling-vcs=il2.null-dereference il3.null-dereference il4.null-dereference il5.null-dereference il6.null-dereference il7.null-dereference il8.null-dereference -->

- **Code locations:** [mcp/tools/get-template-stops.ts:4-43](../../../mcp/tools/get-template-stops.ts#L4-L43)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-023/ANL-0005.md -->
