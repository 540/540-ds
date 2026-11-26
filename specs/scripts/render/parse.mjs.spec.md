---
predictable: spec
---
## Specification Details
- **ID:** SPEC-026
- **Name:** scripts/render/parse.mjs

### Description
<!-- predictable:module-summary=Parse is the module that reads and decodes raw piece content into structured node data consumed across the markup, talk-preparation, node-resolution, and spelling-check pipelines. -->
**Areas:** Piece Rendering

`parse.mjs` — Parse. REFUTED: “`parse.tidy` only works when the value of `at`(`out`, -1) is not null.” 7 requirements: 7 violated. 2 stated failures.

2 findings reachable from current code (1 distinct problems — each counted where it happens and again at the caller that reaches it) produced no requirement — on `tidy`: a value is used as present without a check.

### Declarations

`parse.mjs` — Declares 4 functions:
- `decode`(`text`, `where`) — no requirement inferred
- `parse`(`source`, `origin`) — can fail with the error `TagError` — one of 16 conditions under which `parse` fails, and 8 of them are stated here
- `tidy`(`nodes`) — requires the value of `at`(`out`, -1) is not null [violated]
- `isInline`(`node`) — internal, no requirement inferred

`decode` — Declares 1 operation: `lambda`(`whole`, `ref`).

### Notation

A requirement is a condition an operation needs in order not to fail in the way its own row names — an operation with several failures carries a row for each, and meeting one says nothing about the others. Some a caller supplies, others the operation establishes and checks itself. Nobody has checked the callers.

`implemented` — the operation exists in the code; every machine-written row carries it.

Tags: `[implemented, violated]` — the analysis found a case where the condition fails.
`[implemented, stated-failure]` — the operation is stated to fail with a named error — a behaviour it has, and one this analysis did not settle as prevented.
`[violated]` on the card above and `[implemented, violated]` on a row below are one state;
likewise for the other one.

On the cards: `internal` — nothing outside this file can reach the operation (a `private` member, or a declaration the module does not export), so a requirement here is not addressed to anybody outside it. `no requirement inferred` — no requirement on this page is about the operation. Either nothing was decided about it, or what was decided is not addressed to a caller (see `internal`); neither means nothing is needed. Where the analysis could not finish, the description above says so by name. Ids in the machine-managed sections below are assigned per run and are not stable references; cite the requirement's sentence.

### Analysis

#### decode.lambda_8_55 <!-- predictable:group -->

##### ANL-0025 [implemented, violated]
The code must be from 0 to 1114111.

<!-- predictable:analysis -->

<!-- predictable:subject=decode.lambda_8_55 -->

<!-- predictable:vc=il1.code-space -->

- **Code locations:** [scripts/render/parse.mjs:8-12](../../../scripts/render/parse.mjs#L8-L12)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-026/ANL-0025.md -->

##### ANL-0026 [implemented, stated-failure]
Calling `lambda_8_55` can fail with the error `TagError`.

<!-- predictable:analysis -->

<!-- predictable:subject=decode.lambda_8_55 -->

<!-- predictable:vc=il2.domain-guard -->

<!-- predictable:throws=TagError -->

- **Code locations:** [scripts/render/parse.mjs:8-12](../../../scripts/render/parse.mjs#L8-L12)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-026/ANL-0026.md -->

#### parse.parse <!-- predictable:group -->

##### ANL-0027 [implemented, violated]
i >= source.length || source.startsWith("<!--", i) || source.startsWith(">=/", i) || !(match is present)

<!-- predictable:analysis -->

<!-- predictable:subject=parse.parse -->

<!-- predictable:vc=il3.null-dereference -->

- **Code locations:** [scripts/render/parse.mjs:19-86](../../../scripts/render/parse.mjs#L19-L86)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-026/ANL-0027.md -->

##### ANL-0028 [implemented, violated]
i >= source.length || source.startsWith("<!--", i) || source.startsWith(">=/", i) || !(match is present) || … == name

<!-- predictable:analysis -->

<!-- predictable:subject=parse.parse -->

<!-- predictable:vc=il4.null-dereference -->

<!-- predictable:sibling-vcs=il5.null-dereference -->

- **Code locations:** [scripts/render/parse.mjs:19-86](../../../scripts/render/parse.mjs#L19-L86)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-026/ANL-0028.md -->

##### ANL-0029 [implemented, stated-failure]
Calling `parse` can fail with the error `TagError` — one of 16 conditions under which `parse` fails, and 8 of them are stated here.

<!-- predictable:analysis -->

<!-- predictable:subject=parse.parse -->

<!-- predictable:vc=il11.domain-guard -->

<!-- predictable:throws=TagError -->

- **Code locations:** [scripts/render/parse.mjs:19-86](../../../scripts/render/parse.mjs#L19-L86)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-026/ANL-0029.md -->

##### ANL-0030 [implemented, violated]
i >= source.length || source.startsWith("<!--", i) || source.startsWith("</", i) || (!(source[i] == "<" && regex("/[a-zA-Z!]/").test((source[i + 1] != null ? source[i + 1] : "")))) || regex("/^<!doctype/i").test(source.slice(i, i + 9)) || i >= source.length

<!-- predictable:analysis -->

<!-- predictable:subject=parse.parse -->

<!-- predictable:vc=il12.null-dereference -->

- **Code locations:** [scripts/render/parse.mjs:19-86](../../../scripts/render/parse.mjs#L19-L86)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-026/ANL-0030.md -->

##### ANL-0031 [implemented, violated]
i >= source.length || source.startsWith("<!--", i) || source.startsWith("</", i) || (source[i] == "<" && regex("/[a-zA-Z!]/").test((source[i + 1] != null ? source[i + 1] : "")))

<!-- predictable:analysis -->

<!-- predictable:subject=parse.parse -->

<!-- predictable:vc=il13.null-dereference -->

- **Code locations:** [scripts/render/parse.mjs:19-86](../../../scripts/render/parse.mjs#L19-L86)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-026/ANL-0031.md -->

##### ANL-0032 [implemented, violated]
i < source.length || stack.length <= 1

<!-- predictable:analysis -->

<!-- predictable:subject=parse.parse -->

<!-- predictable:vc=il14.null-dereference -->

<!-- predictable:sibling-vcs=il15.null-dereference -->

- **Code locations:** [scripts/render/parse.mjs:19-86](../../../scripts/render/parse.mjs#L19-L86)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-026/ANL-0032.md -->

#### parse.tidy <!-- predictable:group -->

##### ANL-0033 [implemented, violated]
`parse.tidy` only works when the value of `at`(`out`, -1) is not null.

<!-- predictable:analysis -->

<!-- predictable:subject=parse.tidy -->

<!-- predictable:vc=il1.null-dereference -->

- **Code locations:** [scripts/render/parse.mjs:89-105](../../../scripts/render/parse.mjs#L89-L105)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-026/ANL-0033.md -->
