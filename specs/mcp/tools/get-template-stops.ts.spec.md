---
predictable: spec
---
## Specification Details
- **ID:** SPEC-013
- **Name:** mcp/tools/get-template-stops.ts

### Description
<!-- predictable:module-summary=Implements the MCP tool handler that returns a template's stops by looking up the template's shared data and validating it exists before responding. -->
**Areas:** MCP Tools

`get-template-stops.ts` — Get-template-stops. Checks: “`getTemplateStops.handler` only works when `s` is not null.” and 1 more. 3 requirements: 3 verified.

### Types

`getTemplateStops` — Declares 1 operation:
- `handler`(`_pa0`, `metadata`) — requires `s` is not null [verified]

A `[verified]` requirement is one the operation checks itself.

### Notation

A requirement is a condition an operation needs in order not to fail in the way its own row names — an operation with several failures carries a row for each, and meeting one says nothing about the others. Some a caller supplies, others the operation establishes and checks itself. Nobody has checked the callers.

`implemented` — the operation exists in the code; every machine-written row carries it.

Tags: `[implemented, verified]` — the operation checks this and refuses when it fails.
`[verified]` on the card above and `[implemented, verified]` on a row below are one state. Ids in the machine-managed sections below are assigned per run and are not stable references; cite the requirement's sentence.

### Analysis

#### get-template-stops.getTemplateStops <!-- predictable:group -->

##### ANL-0007 [implemented, verified]
`s` must not be null where this function reads through it.

<!-- predictable:analysis -->

<!-- predictable:subject=get-template-stops.getTemplateStops -->

<!-- predictable:vc=il1.null-dereference -->

<!-- predictable:sibling-vcs=il2.null-dereference il3.null-dereference il4.null-dereference il5.null-dereference il6.null-dereference il7.null-dereference il8.null-dereference -->

#### getTemplateStops.handler <!-- predictable:group -->

##### ANL-0008 [implemented, verified]
`getTemplateStops.handler` only works when `s` is not null.

<!-- predictable:analysis -->

<!-- predictable:subject=getTemplateStops.handler -->

<!-- predictable:vc=il1.null-dereference -->

<!-- predictable:sibling-vcs=il2.null-dereference il3.null-dereference il4.null-dereference il5.null-dereference il6.null-dereference il7.null-dereference il8.null-dereference -->

#### handler.stops <!-- predictable:group -->

##### ANL-0009 [implemented, verified]
`handler.stops` only works when `s` is not null.

<!-- predictable:analysis -->

<!-- predictable:subject=handler.stops -->

<!-- predictable:vc=il1.null-dereference -->

<!-- predictable:sibling-vcs=il2.null-dereference il3.null-dereference il4.null-dereference il5.null-dereference il6.null-dereference il7.null-dereference il8.null-dereference -->
