---
predictable: spec
---
## Specification Details
- **ID:** SPEC-014
- **Name:** mcp/tools/shared.ts

### Description
`shared.ts` — Shared. Called from at least 11 other places in the project. `ToolDef` carries `name`, `title`, `description`, `inputSchema` and `handler`; `ComponentMatch` carries `component` and `part`. Checks: “`shared.findComponent` only works when `part` is not null.” and 1 more. 2 requirements: 2 verified.

### Declarations

`ToolDef` — Declares 1 operation: `handler`(`input`, `metadata`).

`shared` — Declares 8 functions:
- `defineTool`(`tool`) — no requirement inferred
- `json`(`value`) — no requirement inferred
- `text`(`value`) — no requirement inferred
- `error`(`message`) — no requirement inferred
- `normalize`(`name`) (internal) — “`BlockTitle`, `block-title`, `rev-block-title`, `blocktitle` → `blocktitle`.” — internal, no requirement inferred
- `findComponent`(`metadata`, `query`) — “Finds a component by id, name or tag name, case-insensitive.” — requires `part` is not null [verified]
- `notFound`(`metadata`, `query`) — no requirement inferred
- `summary`(`description`) — “First sentence of a description, for lists.” — requires `description` is not null [verified]

A `[verified]` requirement is one the operation checks itself.

### Notation

A requirement is a condition an operation needs in order not to fail in the way its own row names — an operation with several failures carries a row for each, and meeting one says nothing about the others. Some a caller supplies, others the operation establishes and checks itself. Nobody has checked the callers.

`implemented` — the operation exists in the code; every machine-written row carries it.

Tags: `[implemented, verified]` — the operation checks this and refuses when it fails.
`[verified]` on the card above and `[implemented, verified]` on a row below are one state.

On the cards: `internal` — nothing outside this file can reach the operation (a `private` member, or a declaration the module does not export), so a requirement here is not addressed to anybody outside it. `no requirement inferred` — no requirement on this page is about the operation. Either nothing was decided about it, or what was decided is not addressed to a caller (see `internal`); neither means nothing is needed. Where the analysis could not finish, the description above says so by name. Ids in the machine-managed sections below are assigned per run and are not stable references; cite the requirement's sentence.

### Analysis

#### shared.findComponent <!-- predictable:group -->

##### ANL-0010 [implemented, verified]
`shared.findComponent` only works when `part` is not null.

<!-- predictable:analysis -->

<!-- predictable:subject=shared.findComponent -->

<!-- predictable:vc=il1.null-dereference -->

- **Code locations:** [mcp/tools/shared.ts:48-58](../../../mcp/tools/shared.ts#L48-L58)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-014/ANL-0010.md -->

#### shared.summary <!-- predictable:group -->

##### ANL-0011 [implemented, verified]
`shared.summary` only works when `description` is not null.

<!-- predictable:analysis -->

<!-- predictable:subject=shared.summary -->

<!-- predictable:vc=il1.null-dereference -->

- **Code locations:** [mcp/tools/shared.ts:69](../../../mcp/tools/shared.ts#L69)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-014/ANL-0011.md -->
