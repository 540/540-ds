---
predictable: spec
---
## Specification Details
- **ID:** SPEC-003
- **Name:** scripts/render/index.mjs

### Description
`index.mjs` — Index. This project's call graph records DIRECT calls only, so a function passed to a container, destructured into an exported binding, or reached through a dynamic lookup is not one it can see. Within that limit it records no call to this module. At least one of its operations is exported. At run time it reaches `parse`. `resolveComponent` builds `attrNames`, `renderPage` builds `load`, `renderPage` builds `info`, `renderPage` builds `isIsland`, `renderPage` builds `onClient`, `renderPage` builds `readsSteps`, `renderPage` builds `nextId`, `renderPage` builds `fill`, `renderPage` builds `svgClass`, `renderPage` builds `htmlProps`, `renderPage` builds `toElement`, `renderPage` builds `toNodes`, `renderPage` builds `toProps`, `renderPage` builds `slot`, `renderPage` builds `encodeNodes`, `renderPage` builds `encode`, `renderPage` builds `encodeElement`, `renderPage` builds `contextOf`, `renderPage` builds `renderIsland`, `renderPage` builds `text` and `walk` builds `values`, and no requirement here is about what runs inside them. `fromJson` has 15 failure conditions and 5 of them are stated here — the rest are in the findings in Predictable Code (the Control Center, or your editor). Checks: “`renderTalk` fails with "renderTalk needs the pieces folder" unless `pieces` is present and is not falsy.” and 1 more. 5 requirements: 3 violated, 2 verified. 43 stated failures.

### Declarations

`index.mjs` — Declares 18 functions:
- `camel`(`name`) — internal, no requirement inferred
- `kebab`(`name`) — internal, no requirement inferred
- `renderTalk`(`source`, `_pattern`) — requires `pieces` is present and is not falsy [verified]; can fail with the error `Error`; can be rejected with the error "540-ds renderer: an island was left unplaced" — it delegates to `renderPage`, which enforces that precondition; can be rejected with the error "the page would need files from outside:" — it delegates to `checkOffline`, which enforces that precondition; can be rejected with the error "Error" — it delegates to `fromAttr`, which enforces that precondition; can be rejected with the error "Error" — it delegates to `asImage`, which enforces that precondition; can be rejected with the error "Error" — it delegates to `asNumber`, which enforces that precondition; can be rejected with the error "Error" — it delegates to `markup`, which enforces that precondition; can be rejected with the error "Error" — it delegates to `fromJson`, which enforces that precondition; can fail with the error `TagError` — one of 2 ways `renderTalk` can raise this error, each with its own row; throws `TagError` when `pieces` is present and is not falsy and the `length` of `errors` is present and is not falsy [verified]; `manifest` is used as an object without checking that the parsed text was one
- `resolveNodes`(`nodes`, `ctx`, `env`), `resolveElement`(`node`, `ctx`, `env`), `resolveComponent`(`node`, `ctx`, `env`) — internal; can be rejected with the error "Error" — it delegates to `fromAttr`, which enforces that precondition; can be rejected with the error "Error" — it delegates to `asImage`, which enforces that precondition; can be rejected with the error "Error" — it delegates to `asNumber`, which enforces that precondition; can be rejected with the error "Error" — it delegates to `markup`, which enforces that precondition; can be rejected with the error "Error" — it delegates to `fromJson`, which enforces that precondition
- `fromAttr`(`raw`, `type`, `label`, `at`, `env`) — internal; can fail with the error `Error` when `raw` is null; can be rejected with the error "Error" — it delegates to `asImage`, which enforces that precondition; can be rejected with the error "Error" — it delegates to `asNumber`, which enforces that precondition; can be rejected with the error "Error" — it delegates to `markup`, which enforces that precondition; can be rejected with the error "Error" — it delegates to `fromJson`, which enforces that precondition
- `fromJson`(`value`, `type`, `label`, `at`, `env`) — internal; can fail with the error `Error`; can be rejected with the error "Error" — it delegates to `asImage`, which enforces that precondition; can be rejected with the error "Error" — it delegates to `markup`, which enforces that precondition; can be rejected with the error "Error" — it delegates to `fromAttr`, which enforces that precondition; can be rejected with the error "Error" — it delegates to `asNumber`, which enforces that precondition — one of 15 conditions under which `fromJson` fails, and 5 of them are stated here
- `markup`(`text`, `label`, `at`, `env`) — internal; can fail with the error `Error`; can be rejected with the error "Error" — it delegates to `fromAttr`, which enforces that precondition; can be rejected with the error "Error" — it delegates to `asImage`, which enforces that precondition; can be rejected with the error "Error" — it delegates to `asNumber`, which enforces that precondition; can be rejected with the error "Error" — it delegates to `fromJson`, which enforces that precondition
- `asNumber`(`raw`, `label`) — internal; can fail with the error `Error`
- `asImage`(`value`, `label`, `env`) — internal; can fail with the error `Error`; `MIME` is asked about a key that was not checked against its own entries
- `describe`(`type`) — internal; `describe` recurses along `array`, and nothing proves that chain ends
- `closest`(`name`, `names`) — internal, no requirement inferred
- `distance`(`a`, `b`) — internal, no requirement inferred
- `renderPage`(`nodes`, `_pattern`) — internal; can fail with the error "540-ds renderer: an island was left unplaced"
- `walk`(`nodes`, `visit`) — internal, no requirement inferred
- `checkOffline`(`styles`, `body`) — internal; can fail with the error "the page would need files from outside:"
- `escapeHtml`(`value`) — internal, no requirement inferred

A `[verified]` requirement is one the operation checks itself.

### Notation

A requirement is a condition an operation needs in order not to fail in the way its own row names — an operation with several failures carries a row for each, and meeting one says nothing about the others. Some a caller supplies, others the operation establishes and checks itself. Nobody has checked the callers.

`implemented` — the operation exists in the code; every machine-written row carries it.

Tags: `[implemented, verified]` — the operation checks this and refuses when it fails.
`[implemented, violated]` — the analysis found a case where the condition fails.
`[implemented, stated-failure]` — the operation is stated to fail with a named error — a behaviour it has, and one this analysis did not settle as prevented.
`[verified]` on the card above and `[implemented, verified]` on a row below are one state;
likewise for the other 2.

On the cards: `internal` — nothing outside this file can reach the operation (a `private` member, or a declaration the module does not export), so a requirement here is not addressed to anybody outside it. `no requirement inferred` — no requirement on this page is about the operation. Either nothing was decided about it, or what was decided is not addressed to a caller (see `internal`); neither means nothing is needed. Where the analysis could not finish, the description above says so by name.

`falsy` is JavaScript's word for a value that counts as false in a condition: `false`, `0`, an empty string, `null`, `undefined` or `NaN`. Ids in the machine-managed sections below are assigned per run and are not stable references; cite the requirement's sentence.

### Requirements

#### index.asImage <!-- predictable:group -->

##### REQ-0001 [implemented, stated-failure]
Calling `asImage` can fail with the error `Error`.

<!-- predictable:inferred -->

<!-- predictable:subject=index.asImage -->

- **Code locations:** [scripts/render/index.mjs:292-305](../../../scripts/render/index.mjs#L292-L305)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-003/REQ-0001.md -->

#### index.asNumber <!-- predictable:group -->

##### REQ-0002 [implemented, stated-failure]
Calling `asNumber` can fail with the error `Error`.

<!-- predictable:inferred -->

<!-- predictable:subject=index.asNumber -->

- **Code locations:** [scripts/render/index.mjs:286-290](../../../scripts/render/index.mjs#L286-L290)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-003/REQ-0002.md -->

#### index.checkOffline <!-- predictable:group -->

##### REQ-0003 [implemented, stated-failure]
Calling `checkOffline` can fail with the error "the page would need files from outside:".

<!-- predictable:inferred -->

<!-- predictable:subject=index.checkOffline -->

- **Code locations:** [scripts/render/index.mjs:480-485](../../../scripts/render/index.mjs#L480-L485)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-003/REQ-0003.md -->

#### index.fromAttr <!-- predictable:group -->

##### REQ-0004 [implemented, stated-failure]
When `raw` is null, `index.fromAttr` fails saying "Error".

<!-- predictable:inferred -->

<!-- predictable:subject=index.fromAttr -->

- **Code locations:** [scripts/render/index.mjs:190-216](../../../scripts/render/index.mjs#L190-L216)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-003/REQ-0004.md -->

##### REQ-0009 [implemented, stated-failure]
Calling `fromAttr` can be rejected with the error "Error" — it delegates to `asImage`, which enforces that precondition.

<!-- predictable:inferred -->

<!-- predictable:subject=index.fromAttr -->

- **Code locations:** [scripts/render/index.mjs:190-216](../../../scripts/render/index.mjs#L190-L216)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-003/REQ-0009.md -->

##### REQ-0010 [implemented, stated-failure]
Calling `fromAttr` can be rejected with the error "Error" — it delegates to `asNumber`, which enforces that precondition.

<!-- predictable:inferred -->

<!-- predictable:subject=index.fromAttr -->

- **Code locations:** [scripts/render/index.mjs:190-216](../../../scripts/render/index.mjs#L190-L216)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-003/REQ-0010.md -->

##### REQ-0011 [implemented, stated-failure]
Calling `fromAttr` can be rejected with the error "Error" — it delegates to `markup`, which enforces that precondition.

<!-- predictable:inferred -->

<!-- predictable:subject=index.fromAttr -->

- **Code locations:** [scripts/render/index.mjs:190-216](../../../scripts/render/index.mjs#L190-L216)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-003/REQ-0011.md -->

##### REQ-0012 [implemented, stated-failure]
Calling `fromAttr` can be rejected with the error "Error" — it delegates to `fromJson`, which enforces that precondition.

<!-- predictable:inferred -->

<!-- predictable:subject=index.fromAttr -->

- **Code locations:** [scripts/render/index.mjs:190-216](../../../scripts/render/index.mjs#L190-L216)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-003/REQ-0012.md -->

#### index.fromJson <!-- predictable:group -->

##### REQ-0005 [implemented, stated-failure]
Calling `fromJson` can fail with the error `Error`.

<!-- predictable:inferred -->

<!-- predictable:subject=index.fromJson -->

- **Code locations:** [scripts/render/index.mjs:218-267](../../../scripts/render/index.mjs#L218-L267)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-003/REQ-0005.md -->

##### REQ-0013 [implemented, stated-failure]
Calling `fromJson` can be rejected with the error "Error" — it delegates to `asImage`, which enforces that precondition.

<!-- predictable:inferred -->

<!-- predictable:subject=index.fromJson -->

- **Code locations:** [scripts/render/index.mjs:218-267](../../../scripts/render/index.mjs#L218-L267)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-003/REQ-0013.md -->

##### REQ-0014 [implemented, stated-failure]
Calling `fromJson` can be rejected with the error "Error" — it delegates to `markup`, which enforces that precondition.

<!-- predictable:inferred -->

<!-- predictable:subject=index.fromJson -->

- **Code locations:** [scripts/render/index.mjs:218-267](../../../scripts/render/index.mjs#L218-L267)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-003/REQ-0014.md -->

##### REQ-0015 [implemented, stated-failure]
Calling `fromJson` can be rejected with the error "Error" — it delegates to `fromAttr`, which enforces that precondition.

<!-- predictable:inferred -->

<!-- predictable:subject=index.fromJson -->

- **Code locations:** [scripts/render/index.mjs:218-267](../../../scripts/render/index.mjs#L218-L267)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-003/REQ-0015.md -->

##### REQ-0016 [implemented, stated-failure]
Calling `fromJson` can be rejected with the error "Error" — it delegates to `asNumber`, which enforces that precondition.

<!-- predictable:inferred -->

<!-- predictable:subject=index.fromJson -->

- **Code locations:** [scripts/render/index.mjs:218-267](../../../scripts/render/index.mjs#L218-L267)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-003/REQ-0016.md -->

#### index.markup <!-- predictable:group -->

##### REQ-0006 [implemented, stated-failure]
Calling `markup` can fail with the error `Error`.

<!-- predictable:inferred -->

<!-- predictable:subject=index.markup -->

- **Code locations:** [scripts/render/index.mjs:269-284](../../../scripts/render/index.mjs#L269-L284)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-003/REQ-0006.md -->

##### REQ-0017 [implemented, stated-failure]
Calling `markup` can be rejected with the error "Error" — it delegates to `fromAttr`, which enforces that precondition.

<!-- predictable:inferred -->

<!-- predictable:subject=index.markup -->

- **Code locations:** [scripts/render/index.mjs:269-284](../../../scripts/render/index.mjs#L269-L284)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-003/REQ-0017.md -->

##### REQ-0018 [implemented, stated-failure]
Calling `markup` can be rejected with the error "Error" — it delegates to `asImage`, which enforces that precondition.

<!-- predictable:inferred -->

<!-- predictable:subject=index.markup -->

- **Code locations:** [scripts/render/index.mjs:269-284](../../../scripts/render/index.mjs#L269-L284)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-003/REQ-0018.md -->

##### REQ-0019 [implemented, stated-failure]
Calling `markup` can be rejected with the error "Error" — it delegates to `asNumber`, which enforces that precondition.

<!-- predictable:inferred -->

<!-- predictable:subject=index.markup -->

- **Code locations:** [scripts/render/index.mjs:269-284](../../../scripts/render/index.mjs#L269-L284)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-003/REQ-0019.md -->

##### REQ-0020 [implemented, stated-failure]
Calling `markup` can be rejected with the error "Error" — it delegates to `fromJson`, which enforces that precondition.

<!-- predictable:inferred -->

<!-- predictable:subject=index.markup -->

- **Code locations:** [scripts/render/index.mjs:269-284](../../../scripts/render/index.mjs#L269-L284)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-003/REQ-0020.md -->

#### index.renderPage <!-- predictable:group -->

##### REQ-0007 [implemented, stated-failure]
Calling `renderPage` can fail with the error "540-ds renderer: an island was left unplaced".

<!-- predictable:inferred -->

<!-- predictable:subject=index.renderPage -->

- **Code locations:** [scripts/render/index.mjs:341-462](../../../scripts/render/index.mjs#L341-L462)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-003/REQ-0007.md -->

#### index.renderTalk <!-- predictable:group -->

`index.renderTalk` — “Turns a document written with <rev-…> tags into one self-contained HTML page.”

##### REQ-0008 [implemented, stated-failure]
Calling `renderTalk` can fail with the error `Error`.

<!-- predictable:inferred -->

<!-- predictable:subject=index.renderTalk -->

- **Code locations:** [scripts/render/index.mjs:18-56](../../../scripts/render/index.mjs#L18-L56)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-003/REQ-0008.md -->

##### REQ-0021 [implemented, stated-failure]
Calling `renderTalk` can be rejected with the error "540-ds renderer: an island was left unplaced" — it delegates to `renderPage`, which enforces that precondition.

<!-- predictable:inferred -->

<!-- predictable:subject=index.renderTalk -->

- **Code locations:** [scripts/render/index.mjs:18-56](../../../scripts/render/index.mjs#L18-L56)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-003/REQ-0021.md -->

##### REQ-0022 [implemented, stated-failure]
Calling `renderTalk` can be rejected with the error "the page would need files from outside:" — it delegates to `checkOffline`, which enforces that precondition.

<!-- predictable:inferred -->

<!-- predictable:subject=index.renderTalk -->

- **Code locations:** [scripts/render/index.mjs:18-56](../../../scripts/render/index.mjs#L18-L56)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-003/REQ-0022.md -->

##### REQ-0023 [implemented, stated-failure]
Calling `renderTalk` can be rejected with the error "Error" — it delegates to `fromAttr`, which enforces that precondition.

<!-- predictable:inferred -->

<!-- predictable:subject=index.renderTalk -->

- **Code locations:** [scripts/render/index.mjs:18-56](../../../scripts/render/index.mjs#L18-L56)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-003/REQ-0023.md -->

##### REQ-0024 [implemented, stated-failure]
Calling `renderTalk` can be rejected with the error "Error" — it delegates to `asImage`, which enforces that precondition.

<!-- predictable:inferred -->

<!-- predictable:subject=index.renderTalk -->

- **Code locations:** [scripts/render/index.mjs:18-56](../../../scripts/render/index.mjs#L18-L56)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-003/REQ-0024.md -->

##### REQ-0025 [implemented, stated-failure]
Calling `renderTalk` can be rejected with the error "Error" — it delegates to `asNumber`, which enforces that precondition.

<!-- predictable:inferred -->

<!-- predictable:subject=index.renderTalk -->

- **Code locations:** [scripts/render/index.mjs:18-56](../../../scripts/render/index.mjs#L18-L56)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-003/REQ-0025.md -->

##### REQ-0026 [implemented, stated-failure]
Calling `renderTalk` can be rejected with the error "Error" — it delegates to `markup`, which enforces that precondition.

<!-- predictable:inferred -->

<!-- predictable:subject=index.renderTalk -->

- **Code locations:** [scripts/render/index.mjs:18-56](../../../scripts/render/index.mjs#L18-L56)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-003/REQ-0026.md -->

##### REQ-0027 [implemented, stated-failure]
Calling `renderTalk` can be rejected with the error "Error" — it delegates to `fromJson`, which enforces that precondition.

<!-- predictable:inferred -->

<!-- predictable:subject=index.renderTalk -->

- **Code locations:** [scripts/render/index.mjs:18-56](../../../scripts/render/index.mjs#L18-L56)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-003/REQ-0027.md -->

#### index.resolveComponent <!-- predictable:group -->

##### REQ-0028 [implemented, stated-failure]
Calling `resolveComponent` can be rejected with the error "Error" — it delegates to `fromAttr`, which enforces that precondition.

<!-- predictable:inferred -->

<!-- predictable:subject=index.resolveComponent -->

- **Code locations:** [scripts/render/index.mjs:117-188](../../../scripts/render/index.mjs#L117-L188)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-003/REQ-0028.md -->

##### REQ-0029 [implemented, stated-failure]
Calling `resolveComponent` can be rejected with the error "Error" — it delegates to `asImage`, which enforces that precondition.

<!-- predictable:inferred -->

<!-- predictable:subject=index.resolveComponent -->

- **Code locations:** [scripts/render/index.mjs:117-188](../../../scripts/render/index.mjs#L117-L188)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-003/REQ-0029.md -->

##### REQ-0030 [implemented, stated-failure]
Calling `resolveComponent` can be rejected with the error "Error" — it delegates to `asNumber`, which enforces that precondition.

<!-- predictable:inferred -->

<!-- predictable:subject=index.resolveComponent -->

- **Code locations:** [scripts/render/index.mjs:117-188](../../../scripts/render/index.mjs#L117-L188)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-003/REQ-0030.md -->

##### REQ-0031 [implemented, stated-failure]
Calling `resolveComponent` can be rejected with the error "Error" — it delegates to `markup`, which enforces that precondition.

<!-- predictable:inferred -->

<!-- predictable:subject=index.resolveComponent -->

- **Code locations:** [scripts/render/index.mjs:117-188](../../../scripts/render/index.mjs#L117-L188)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-003/REQ-0031.md -->

##### REQ-0032 [implemented, stated-failure]
Calling `resolveComponent` can be rejected with the error "Error" — it delegates to `fromJson`, which enforces that precondition.

<!-- predictable:inferred -->

<!-- predictable:subject=index.resolveComponent -->

- **Code locations:** [scripts/render/index.mjs:117-188](../../../scripts/render/index.mjs#L117-L188)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-003/REQ-0032.md -->

#### index.resolveElement <!-- predictable:group -->

##### REQ-0033 [implemented, stated-failure]
Calling `resolveElement` can be rejected with the error "Error" — it delegates to `fromAttr`, which enforces that precondition.

<!-- predictable:inferred -->

<!-- predictable:subject=index.resolveElement -->

- **Code locations:** [scripts/render/index.mjs:71-115](../../../scripts/render/index.mjs#L71-L115)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-003/REQ-0033.md -->

##### REQ-0034 [implemented, stated-failure]
Calling `resolveElement` can be rejected with the error "Error" — it delegates to `asImage`, which enforces that precondition.

<!-- predictable:inferred -->

<!-- predictable:subject=index.resolveElement -->

- **Code locations:** [scripts/render/index.mjs:71-115](../../../scripts/render/index.mjs#L71-L115)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-003/REQ-0034.md -->

##### REQ-0035 [implemented, stated-failure]
Calling `resolveElement` can be rejected with the error "Error" — it delegates to `asNumber`, which enforces that precondition.

<!-- predictable:inferred -->

<!-- predictable:subject=index.resolveElement -->

- **Code locations:** [scripts/render/index.mjs:71-115](../../../scripts/render/index.mjs#L71-L115)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-003/REQ-0035.md -->

##### REQ-0036 [implemented, stated-failure]
Calling `resolveElement` can be rejected with the error "Error" — it delegates to `markup`, which enforces that precondition.

<!-- predictable:inferred -->

<!-- predictable:subject=index.resolveElement -->

- **Code locations:** [scripts/render/index.mjs:71-115](../../../scripts/render/index.mjs#L71-L115)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-003/REQ-0036.md -->

##### REQ-0037 [implemented, stated-failure]
Calling `resolveElement` can be rejected with the error "Error" — it delegates to `fromJson`, which enforces that precondition.

<!-- predictable:inferred -->

<!-- predictable:subject=index.resolveElement -->

- **Code locations:** [scripts/render/index.mjs:71-115](../../../scripts/render/index.mjs#L71-L115)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-003/REQ-0037.md -->

#### index.resolveNodes <!-- predictable:group -->

##### REQ-0038 [implemented, stated-failure]
Calling `resolveNodes` can be rejected with the error "Error" — it delegates to `fromAttr`, which enforces that precondition.

<!-- predictable:inferred -->

<!-- predictable:subject=index.resolveNodes -->

- **Code locations:** [scripts/render/index.mjs:58-69](../../../scripts/render/index.mjs#L58-L69)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-003/REQ-0038.md -->

##### REQ-0039 [implemented, stated-failure]
Calling `resolveNodes` can be rejected with the error "Error" — it delegates to `asImage`, which enforces that precondition.

<!-- predictable:inferred -->

<!-- predictable:subject=index.resolveNodes -->

- **Code locations:** [scripts/render/index.mjs:58-69](../../../scripts/render/index.mjs#L58-L69)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-003/REQ-0039.md -->

##### REQ-0040 [implemented, stated-failure]
Calling `resolveNodes` can be rejected with the error "Error" — it delegates to `asNumber`, which enforces that precondition.

<!-- predictable:inferred -->

<!-- predictable:subject=index.resolveNodes -->

- **Code locations:** [scripts/render/index.mjs:58-69](../../../scripts/render/index.mjs#L58-L69)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-003/REQ-0040.md -->

##### REQ-0041 [implemented, stated-failure]
Calling `resolveNodes` can be rejected with the error "Error" — it delegates to `markup`, which enforces that precondition.

<!-- predictable:inferred -->

<!-- predictable:subject=index.resolveNodes -->

- **Code locations:** [scripts/render/index.mjs:58-69](../../../scripts/render/index.mjs#L58-L69)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-003/REQ-0041.md -->

##### REQ-0042 [implemented, stated-failure]
Calling `resolveNodes` can be rejected with the error "Error" — it delegates to `fromJson`, which enforces that precondition.

<!-- predictable:inferred -->

<!-- predictable:subject=index.resolveNodes -->

- **Code locations:** [scripts/render/index.mjs:58-69](../../../scripts/render/index.mjs#L58-L69)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-003/REQ-0042.md -->

### Analysis

#### index.renderTalk <!-- predictable:group -->

##### ANL-0018 [implemented, verified]
`renderTalk` fails with "renderTalk needs the pieces folder" unless `pieces` is present and is not falsy.

<!-- predictable:analysis -->

<!-- predictable:subject=index.renderTalk -->

<!-- predictable:vc=il1.domain-guard -->

<!-- predictable:throws=renderTalk needs the pieces folder -->

<!-- predictable:canonical=`index.renderTalk` requires that `pieces` is present and is not empty, zero or false. -->

- **Code locations:** [scripts/render/index.mjs:18-56](../../../scripts/render/index.mjs#L18-L56)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-003/ANL-0018.md -->

##### ANL-0019 [implemented, stated-failure]
Calling `renderTalk` can fail with the error `TagError` — one of 2 ways `renderTalk` can raise this error, each with its own row.

<!-- predictable:analysis -->

<!-- predictable:subject=index.renderTalk -->

<!-- predictable:vc=il2.domain-guard -->

<!-- predictable:throws=TagError -->

- **Code locations:** [scripts/render/index.mjs:18-56](../../../scripts/render/index.mjs#L18-L56)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-003/ANL-0019.md -->

##### ANL-0020 [implemented, verified]
`renderTalk` throws `TagError` when `pieces` is present and is not falsy and the `length` of `errors` is present and is not falsy — one of 2 ways `renderTalk` can raise this error, each with its own row.

<!-- predictable:analysis -->

<!-- predictable:subject=index.renderTalk -->

<!-- predictable:vc=il4.domain-guard -->

<!-- predictable:throws=TagError -->

<!-- predictable:canonical=`index.renderTalk` requires that it is not the case that (`pieces` is present and is not empty, zero or false and the `length` of `errors` is present and is not empty, zero or false). -->

- **Code locations:** [scripts/render/index.mjs:18-56](../../../scripts/render/index.mjs#L18-L56)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-003/ANL-0020.md -->

### Behaviours

#### index.renderTalk <!-- predictable:group -->

##### BEH-0007 [implemented, violated]
`manifest` is used as an object without checking that the parsed text was one. `manifest` is what a parser answered for text from outside the program, which nothing shows a caller cannot choose, and a parser answers whatever the text holds — an object, a list, a number or `null`. Nothing after the parse in this function checks that it is an object before it is used as one, in one place, named beside this one (the first on each path), so text of `null` — and, depending on the use, a number or a list — ends the request in an error there instead of being refused as malformed, and no handler takes the failure. Safe to rely on when the parse result's shape is checked before it is used as an object, or the failure is handled.

<!-- predictable:behaviour -->

<!-- predictable:subject=index.renderTalk -->

<!-- predictable:vc=site.payload-shape-assumed.manifest.949ab454 -->

- **Code locations:** [scripts/render/index.mjs:20](../../../scripts/render/index.mjs#L20)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-003/BEH-0007.md -->

#### index.asImage <!-- predictable:group -->

##### BEH-0008 [implemented, violated]
`MIME` is asked about a key that was not checked against its own entries. `MIME` is a table of fixed entries, and this asks it about a key the code did not choose. Indexing answers "what does this name resolve to", which on an ordinary object includes everything the language put there before the author's own keys — so a key like `constructor` comes back with a value, and it is neither absent nor falsy. Testing the RESULT cannot separate the two cases; only asking whether the key is one of the table's OWN can. Use a presence test, or a map that holds only what was put in it. Safe to rely on when the key is confirmed to be one of `MIME`'s own entries.

<!-- predictable:behaviour -->

<!-- predictable:subject=index.asImage -->

<!-- predictable:vc=site.table-key-not-checked.MIME.1f0c4791 -->

- **Code locations:** [scripts/render/index.mjs:303](../../../scripts/render/index.mjs#L303)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-003/BEH-0008.md -->

#### index.describe <!-- predictable:group -->

##### BEH-0009 [implemented, violated]
`describe` recurses along `array`, and nothing proves that chain ends. `describe` calls itself on `array` of what it was given, and returns only where the chain along `array` ends. Nothing in the program proves it does: `array` is set to objects the program did not just make, or by something outside its view, so an object pointing back at itself or one of its own makes the base case unreachable and the stack overflows. Safe to rely on when some path returns without calling the function again, and every recursive call moves its arguments toward it.

<!-- predictable:behaviour -->

<!-- predictable:subject=index.describe -->

<!-- predictable:vc=site.recursion-along-unproven-link.array.978428ae -->

- **Code locations:** [scripts/render/index.mjs:310](../../../scripts/render/index.mjs#L310)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-003/BEH-0009.md -->
