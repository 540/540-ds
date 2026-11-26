---
predictable: spec
---
## Specification Details
- **ID:** SPEC-030
- **Name:** src/components/molecules/Dialog/Dialog.tsx

### Description
<!-- predictable:module-summary=Dialog is a UI component module providing a modal dialog element gated on a non-null dialog state, exported for use elsewhere in the design system. -->
**Areas:** Molecules

`Dialog.tsx` — Dialog. Checks: “`Dialog.Dialog` only works when `dialog` is not null.” 1 requirement: 1 verified.

### Declarations

`Dialog` — Declares 1 function:
- `Dialog`(`_pattern`) — requires `dialog` is not null [verified]

A `[verified]` requirement is one the operation checks itself.

### Notation

A requirement is a condition an operation needs in order not to fail in the way its own row names — an operation with several failures carries a row for each, and meeting one says nothing about the others. Some a caller supplies, others the operation establishes and checks itself. Nobody has checked the callers.

`implemented` — the operation exists in the code; every machine-written row carries it.

Tags: `[implemented, verified]` — the operation checks this and refuses when it fails.
`[verified]` on the card above and `[implemented, verified]` on a row below are one state. Ids in the machine-managed sections below are assigned per run and are not stable references; cite the requirement's sentence.

### Analysis

#### Dialog.Dialog <!-- predictable:group -->

##### ANL-0038 [implemented, verified]
`Dialog.Dialog` only works when `dialog` is not null.

<!-- predictable:analysis -->

<!-- predictable:subject=Dialog.Dialog -->

<!-- predictable:vc=il1.null-dereference -->

<!-- predictable:sibling-vcs=il2.null-dereference il3.null-dereference il4.null-dereference -->

- **Code locations:** [src/components/molecules/Dialog/Dialog.tsx:13-65](../../../../../src/components/molecules/Dialog/Dialog.tsx#L13-L65)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-030/ANL-0038.md -->
