---
predictable: spec
---
## Specification Details
- **ID:** SPEC-227
- **Name:** scripts/render/core.mjs

### Description
`core.mjs` — Core. Called from `index.renderTalk` and `runtime.boot`, and possibly from places the call graph cannot see. At run time it reaches `parse`. `resolveComponent` builds `attrNames`, `renderBody` builds `info`, `renderBody` builds `isIsland`, `renderBody` builds `onClient`, `renderBody` builds `readsSteps`, `renderBody` builds `nextId`, `renderBody` builds `fill`, `renderBody` builds `svgClass`, `renderBody` builds `htmlProps`, `renderBody` builds `toElement`, `renderBody` builds `toNodes`, `renderBody` builds `toProps`, `renderBody` builds `slot`, `renderBody` builds `encodeNodes`, `renderBody` builds `encode`, `renderBody` builds `encodeElement`, `renderBody` builds `contextOf`, `renderBody` builds `renderIsland` and `walk` builds `values`, and no requirement here is about what runs inside them. `fromJson` has 15 failure conditions and 5 of them are stated here — the rest are in the findings in Predictable Code (the Control Center, or your editor). Checks: “`extractTalk` throws `TagError` when the `length` of `blocks` is present and is not falsy and the `length` of `blocks` is greater than 1.” and 3 more. 5 requirements: 1 violated, 4 verified. 40 stated failures.

### Declarations

`core.mjs` — Declares 19 functions:
- `extractTalk`(`source`, `origin`) — can be rejected with the error "Error" when `the length of the blocks is greater than 1`; throws `TagError` when either (the `length` of `blocks` is present and is not falsy and the `length` of `blocks` is greater than 1) or (the `length` of `blocks` is present and is not falsy and the `length` of `blocks` is at most 1 and `trim`(`outside`) returns true) [verified]
- `typeAttr`(`attrs`) — internal, no requirement inferred
- `lineOf`(`source`, `pos`) — internal, no requirement inferred
- `prepareTalk`(`source`, `_pattern`) — requires the `length` of `errors` is missing or falsy [verified]; can fail with the error `Error`; can be rejected with the error "Error" — it delegates to `fromAttr`, which enforces that precondition; can be rejected with the error "Error" — it delegates to `asImage`, which enforces that precondition; can be rejected with the error "Error" — it delegates to `asNumber`, which enforces that precondition; can be rejected with the error "Error" — it delegates to `markup`, which enforces that precondition; can be rejected with the error "Error" — it delegates to `fromJson`, which enforces that precondition; can fail with the error `TagError` — one of 2 ways `prepareTalk` can raise this error, each with its own row
- `camel`(`name`) — internal, no requirement inferred
- `kebab`(`name`) — internal, no requirement inferred
- `resolveNodes`(`nodes`, `ctx`, `env`), `resolveElement`(`node`, `ctx`, `env`), `resolveComponent`(`node`, `ctx`, `env`) — internal; can be rejected with the error "Error" — it delegates to `fromAttr`, which enforces that precondition; can be rejected with the error "Error" — it delegates to `asImage`, which enforces that precondition; can be rejected with the error "Error" — it delegates to `asNumber`, which enforces that precondition; can be rejected with the error "Error" — it delegates to `markup`, which enforces that precondition; can be rejected with the error "Error" — it delegates to `fromJson`, which enforces that precondition
- `fromAttr`(`raw`, `type`, `label`, `at`, `env`) — internal; can fail with the error `Error` when `raw` is null; can be rejected with the error "Error" — it delegates to `asImage`, which enforces that precondition; can be rejected with the error "Error" — it delegates to `asNumber`, which enforces that precondition; can be rejected with the error "Error" — it delegates to `markup`, which enforces that precondition; can be rejected with the error "Error" — it delegates to `fromJson`, which enforces that precondition
- `fromJson`(`value`, `type`, `label`, `at`, `env`) — internal; can fail with the error `Error`; can be rejected with the error "Error" — it delegates to `asImage`, which enforces that precondition; can be rejected with the error "Error" — it delegates to `markup`, which enforces that precondition; can be rejected with the error "Error" — it delegates to `fromAttr`, which enforces that precondition; can be rejected with the error "Error" — it delegates to `asNumber`, which enforces that precondition — one of 15 conditions under which `fromJson` fails, and 5 of them are stated here
- `markup`(`text`, `label`, `at`, `env`) — internal; can fail with the error `Error`; can be rejected with the error "Error" — it delegates to `fromAttr`, which enforces that precondition; can be rejected with the error "Error" — it delegates to `asImage`, which enforces that precondition; can be rejected with the error "Error" — it delegates to `asNumber`, which enforces that precondition; can be rejected with the error "Error" — it delegates to `fromJson`, which enforces that precondition
- `asNumber`(`raw`, `label`), `asImage`(`value`, `label`, `env`) — internal; can fail with the error `Error`
- `describe`(`type`) — internal; `describe` can recurse forever along `array`
- `closest`(`name`, `names`) — internal, no requirement inferred
- `distance`(`a`, `b`) — internal, no requirement inferred
- `renderBody`(`nodes`, `_pattern`) — requires `includes`(`body`, "<ds-mark") returns false [verified]
- `walk`(`nodes`, `visit`) — internal, no requirement inferred

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

#### core.asImage <!-- predictable:group -->

##### REQ-0001 [implemented, stated-failure]
Calling `asImage` can fail with the error `Error`.

<!-- predictable:inferred -->

<!-- predictable:subject=core.asImage -->

- **Code locations:** [scripts/render/core.mjs:310-315](../../../scripts/render/core.mjs#L310-L315)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-227/REQ-0001.md -->

#### core.asNumber <!-- predictable:group -->

##### REQ-0002 [implemented, stated-failure]
Calling `asNumber` can fail with the error `Error`.

<!-- predictable:inferred -->

<!-- predictable:subject=core.asNumber -->

- **Code locations:** [scripts/render/core.mjs:304-308](../../../scripts/render/core.mjs#L304-L308)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-227/REQ-0002.md -->

#### core.extractTalk <!-- predictable:group -->

`core.extractTalk` — “A talk for the browser runtime keeps its tags inside <script type="text/rev">, next to the script that loads the runtime.”

##### REQ-0003 [implemented, stated-failure]
When `extractTalk` is called, if `the length of the blocks is greater than 1` then the call is rejected with the error "Error".

<!-- predictable:inferred -->

<!-- predictable:subject=core.extractTalk -->

- **Code locations:** [scripts/render/core.mjs:20-33](../../../scripts/render/core.mjs#L20-L33)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-227/REQ-0003.md -->

#### core.fromAttr <!-- predictable:group -->

##### REQ-0004 [implemented, stated-failure]
When `raw` is null, `core.fromAttr` fails saying "Error".

<!-- predictable:inferred -->

<!-- predictable:subject=core.fromAttr -->

- **Code locations:** [scripts/render/core.mjs:208-234](../../../scripts/render/core.mjs#L208-L234)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-227/REQ-0004.md -->

##### REQ-0008 [implemented, stated-failure]
Calling `fromAttr` can be rejected with the error "Error" — it delegates to `asImage`, which enforces that precondition.

<!-- predictable:inferred -->

<!-- predictable:subject=core.fromAttr -->

- **Code locations:** [scripts/render/core.mjs:208-234](../../../scripts/render/core.mjs#L208-L234)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-227/REQ-0008.md -->

##### REQ-0009 [implemented, stated-failure]
Calling `fromAttr` can be rejected with the error "Error" — it delegates to `asNumber`, which enforces that precondition.

<!-- predictable:inferred -->

<!-- predictable:subject=core.fromAttr -->

- **Code locations:** [scripts/render/core.mjs:208-234](../../../scripts/render/core.mjs#L208-L234)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-227/REQ-0009.md -->

##### REQ-0010 [implemented, stated-failure]
Calling `fromAttr` can be rejected with the error "Error" — it delegates to `markup`, which enforces that precondition.

<!-- predictable:inferred -->

<!-- predictable:subject=core.fromAttr -->

- **Code locations:** [scripts/render/core.mjs:208-234](../../../scripts/render/core.mjs#L208-L234)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-227/REQ-0010.md -->

##### REQ-0011 [implemented, stated-failure]
Calling `fromAttr` can be rejected with the error "Error" — it delegates to `fromJson`, which enforces that precondition.

<!-- predictable:inferred -->

<!-- predictable:subject=core.fromAttr -->

- **Code locations:** [scripts/render/core.mjs:208-234](../../../scripts/render/core.mjs#L208-L234)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-227/REQ-0011.md -->

#### core.fromJson <!-- predictable:group -->

##### REQ-0005 [implemented, stated-failure]
Calling `fromJson` can fail with the error `Error`.

<!-- predictable:inferred -->

<!-- predictable:subject=core.fromJson -->

- **Code locations:** [scripts/render/core.mjs:236-285](../../../scripts/render/core.mjs#L236-L285)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-227/REQ-0005.md -->

##### REQ-0012 [implemented, stated-failure]
Calling `fromJson` can be rejected with the error "Error" — it delegates to `asImage`, which enforces that precondition.

<!-- predictable:inferred -->

<!-- predictable:subject=core.fromJson -->

- **Code locations:** [scripts/render/core.mjs:236-285](../../../scripts/render/core.mjs#L236-L285)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-227/REQ-0012.md -->

##### REQ-0013 [implemented, stated-failure]
Calling `fromJson` can be rejected with the error "Error" — it delegates to `markup`, which enforces that precondition.

<!-- predictable:inferred -->

<!-- predictable:subject=core.fromJson -->

- **Code locations:** [scripts/render/core.mjs:236-285](../../../scripts/render/core.mjs#L236-L285)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-227/REQ-0013.md -->

##### REQ-0014 [implemented, stated-failure]
Calling `fromJson` can be rejected with the error "Error" — it delegates to `fromAttr`, which enforces that precondition.

<!-- predictable:inferred -->

<!-- predictable:subject=core.fromJson -->

- **Code locations:** [scripts/render/core.mjs:236-285](../../../scripts/render/core.mjs#L236-L285)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-227/REQ-0014.md -->

##### REQ-0015 [implemented, stated-failure]
Calling `fromJson` can be rejected with the error "Error" — it delegates to `asNumber`, which enforces that precondition.

<!-- predictable:inferred -->

<!-- predictable:subject=core.fromJson -->

- **Code locations:** [scripts/render/core.mjs:236-285](../../../scripts/render/core.mjs#L236-L285)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-227/REQ-0015.md -->

#### core.markup <!-- predictable:group -->

##### REQ-0006 [implemented, stated-failure]
Calling `markup` can fail with the error `Error`.

<!-- predictable:inferred -->

<!-- predictable:subject=core.markup -->

- **Code locations:** [scripts/render/core.mjs:287-302](../../../scripts/render/core.mjs#L287-L302)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-227/REQ-0006.md -->

##### REQ-0016 [implemented, stated-failure]
Calling `markup` can be rejected with the error "Error" — it delegates to `fromAttr`, which enforces that precondition.

<!-- predictable:inferred -->

<!-- predictable:subject=core.markup -->

- **Code locations:** [scripts/render/core.mjs:287-302](../../../scripts/render/core.mjs#L287-L302)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-227/REQ-0016.md -->

##### REQ-0017 [implemented, stated-failure]
Calling `markup` can be rejected with the error "Error" — it delegates to `asImage`, which enforces that precondition.

<!-- predictable:inferred -->

<!-- predictable:subject=core.markup -->

- **Code locations:** [scripts/render/core.mjs:287-302](../../../scripts/render/core.mjs#L287-L302)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-227/REQ-0017.md -->

##### REQ-0018 [implemented, stated-failure]
Calling `markup` can be rejected with the error "Error" — it delegates to `asNumber`, which enforces that precondition.

<!-- predictable:inferred -->

<!-- predictable:subject=core.markup -->

- **Code locations:** [scripts/render/core.mjs:287-302](../../../scripts/render/core.mjs#L287-L302)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-227/REQ-0018.md -->

##### REQ-0019 [implemented, stated-failure]
Calling `markup` can be rejected with the error "Error" — it delegates to `fromJson`, which enforces that precondition.

<!-- predictable:inferred -->

<!-- predictable:subject=core.markup -->

- **Code locations:** [scripts/render/core.mjs:287-302](../../../scripts/render/core.mjs#L287-L302)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-227/REQ-0019.md -->

#### core.prepareTalk <!-- predictable:group -->

`core.prepareTalk` — “Checks a tag document against the manifest and resolves it into nodes ready to render.”

##### REQ-0007 [implemented, stated-failure]
Calling `prepareTalk` can fail with the error `Error`.

<!-- predictable:inferred -->

<!-- predictable:subject=core.prepareTalk -->

- **Code locations:** [scripts/render/core.mjs:46-70](../../../scripts/render/core.mjs#L46-L70)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-227/REQ-0007.md -->

##### REQ-0020 [implemented, stated-failure]
Calling `prepareTalk` can be rejected with the error "Error" — it delegates to `fromAttr`, which enforces that precondition.

<!-- predictable:inferred -->

<!-- predictable:subject=core.prepareTalk -->

- **Code locations:** [scripts/render/core.mjs:46-70](../../../scripts/render/core.mjs#L46-L70)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-227/REQ-0020.md -->

##### REQ-0021 [implemented, stated-failure]
Calling `prepareTalk` can be rejected with the error "Error" — it delegates to `asImage`, which enforces that precondition.

<!-- predictable:inferred -->

<!-- predictable:subject=core.prepareTalk -->

- **Code locations:** [scripts/render/core.mjs:46-70](../../../scripts/render/core.mjs#L46-L70)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-227/REQ-0021.md -->

##### REQ-0022 [implemented, stated-failure]
Calling `prepareTalk` can be rejected with the error "Error" — it delegates to `asNumber`, which enforces that precondition.

<!-- predictable:inferred -->

<!-- predictable:subject=core.prepareTalk -->

- **Code locations:** [scripts/render/core.mjs:46-70](../../../scripts/render/core.mjs#L46-L70)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-227/REQ-0022.md -->

##### REQ-0023 [implemented, stated-failure]
Calling `prepareTalk` can be rejected with the error "Error" — it delegates to `markup`, which enforces that precondition.

<!-- predictable:inferred -->

<!-- predictable:subject=core.prepareTalk -->

- **Code locations:** [scripts/render/core.mjs:46-70](../../../scripts/render/core.mjs#L46-L70)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-227/REQ-0023.md -->

##### REQ-0024 [implemented, stated-failure]
Calling `prepareTalk` can be rejected with the error "Error" — it delegates to `fromJson`, which enforces that precondition.

<!-- predictable:inferred -->

<!-- predictable:subject=core.prepareTalk -->

- **Code locations:** [scripts/render/core.mjs:46-70](../../../scripts/render/core.mjs#L46-L70)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-227/REQ-0024.md -->

#### core.resolveComponent <!-- predictable:group -->

##### REQ-0025 [implemented, stated-failure]
Calling `resolveComponent` can be rejected with the error "Error" — it delegates to `fromAttr`, which enforces that precondition.

<!-- predictable:inferred -->

<!-- predictable:subject=core.resolveComponent -->

- **Code locations:** [scripts/render/core.mjs:135-206](../../../scripts/render/core.mjs#L135-L206)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-227/REQ-0025.md -->

##### REQ-0026 [implemented, stated-failure]
Calling `resolveComponent` can be rejected with the error "Error" — it delegates to `asImage`, which enforces that precondition.

<!-- predictable:inferred -->

<!-- predictable:subject=core.resolveComponent -->

- **Code locations:** [scripts/render/core.mjs:135-206](../../../scripts/render/core.mjs#L135-L206)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-227/REQ-0026.md -->

##### REQ-0027 [implemented, stated-failure]
Calling `resolveComponent` can be rejected with the error "Error" — it delegates to `asNumber`, which enforces that precondition.

<!-- predictable:inferred -->

<!-- predictable:subject=core.resolveComponent -->

- **Code locations:** [scripts/render/core.mjs:135-206](../../../scripts/render/core.mjs#L135-L206)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-227/REQ-0027.md -->

##### REQ-0028 [implemented, stated-failure]
Calling `resolveComponent` can be rejected with the error "Error" — it delegates to `markup`, which enforces that precondition.

<!-- predictable:inferred -->

<!-- predictable:subject=core.resolveComponent -->

- **Code locations:** [scripts/render/core.mjs:135-206](../../../scripts/render/core.mjs#L135-L206)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-227/REQ-0028.md -->

##### REQ-0029 [implemented, stated-failure]
Calling `resolveComponent` can be rejected with the error "Error" — it delegates to `fromJson`, which enforces that precondition.

<!-- predictable:inferred -->

<!-- predictable:subject=core.resolveComponent -->

- **Code locations:** [scripts/render/core.mjs:135-206](../../../scripts/render/core.mjs#L135-L206)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-227/REQ-0029.md -->

#### core.resolveElement <!-- predictable:group -->

##### REQ-0030 [implemented, stated-failure]
Calling `resolveElement` can be rejected with the error "Error" — it delegates to `fromAttr`, which enforces that precondition.

<!-- predictable:inferred -->

<!-- predictable:subject=core.resolveElement -->

- **Code locations:** [scripts/render/core.mjs:89-133](../../../scripts/render/core.mjs#L89-L133)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-227/REQ-0030.md -->

##### REQ-0031 [implemented, stated-failure]
Calling `resolveElement` can be rejected with the error "Error" — it delegates to `asImage`, which enforces that precondition.

<!-- predictable:inferred -->

<!-- predictable:subject=core.resolveElement -->

- **Code locations:** [scripts/render/core.mjs:89-133](../../../scripts/render/core.mjs#L89-L133)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-227/REQ-0031.md -->

##### REQ-0032 [implemented, stated-failure]
Calling `resolveElement` can be rejected with the error "Error" — it delegates to `asNumber`, which enforces that precondition.

<!-- predictable:inferred -->

<!-- predictable:subject=core.resolveElement -->

- **Code locations:** [scripts/render/core.mjs:89-133](../../../scripts/render/core.mjs#L89-L133)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-227/REQ-0032.md -->

##### REQ-0033 [implemented, stated-failure]
Calling `resolveElement` can be rejected with the error "Error" — it delegates to `markup`, which enforces that precondition.

<!-- predictable:inferred -->

<!-- predictable:subject=core.resolveElement -->

- **Code locations:** [scripts/render/core.mjs:89-133](../../../scripts/render/core.mjs#L89-L133)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-227/REQ-0033.md -->

##### REQ-0034 [implemented, stated-failure]
Calling `resolveElement` can be rejected with the error "Error" — it delegates to `fromJson`, which enforces that precondition.

<!-- predictable:inferred -->

<!-- predictable:subject=core.resolveElement -->

- **Code locations:** [scripts/render/core.mjs:89-133](../../../scripts/render/core.mjs#L89-L133)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-227/REQ-0034.md -->

#### core.resolveNodes <!-- predictable:group -->

##### REQ-0035 [implemented, stated-failure]
Calling `resolveNodes` can be rejected with the error "Error" — it delegates to `fromAttr`, which enforces that precondition.

<!-- predictable:inferred -->

<!-- predictable:subject=core.resolveNodes -->

- **Code locations:** [scripts/render/core.mjs:76-87](../../../scripts/render/core.mjs#L76-L87)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-227/REQ-0035.md -->

##### REQ-0036 [implemented, stated-failure]
Calling `resolveNodes` can be rejected with the error "Error" — it delegates to `asImage`, which enforces that precondition.

<!-- predictable:inferred -->

<!-- predictable:subject=core.resolveNodes -->

- **Code locations:** [scripts/render/core.mjs:76-87](../../../scripts/render/core.mjs#L76-L87)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-227/REQ-0036.md -->

##### REQ-0037 [implemented, stated-failure]
Calling `resolveNodes` can be rejected with the error "Error" — it delegates to `asNumber`, which enforces that precondition.

<!-- predictable:inferred -->

<!-- predictable:subject=core.resolveNodes -->

- **Code locations:** [scripts/render/core.mjs:76-87](../../../scripts/render/core.mjs#L76-L87)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-227/REQ-0037.md -->

##### REQ-0038 [implemented, stated-failure]
Calling `resolveNodes` can be rejected with the error "Error" — it delegates to `markup`, which enforces that precondition.

<!-- predictable:inferred -->

<!-- predictable:subject=core.resolveNodes -->

- **Code locations:** [scripts/render/core.mjs:76-87](../../../scripts/render/core.mjs#L76-L87)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-227/REQ-0038.md -->

##### REQ-0039 [implemented, stated-failure]
Calling `resolveNodes` can be rejected with the error "Error" — it delegates to `fromJson`, which enforces that precondition.

<!-- predictable:inferred -->

<!-- predictable:subject=core.resolveNodes -->

- **Code locations:** [scripts/render/core.mjs:76-87](../../../scripts/render/core.mjs#L76-L87)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-227/REQ-0039.md -->

### Analysis

#### core.extractTalk <!-- predictable:group -->

##### ANL-0055 [implemented, verified]
`extractTalk` throws `TagError` when the `length` of `blocks` is present and is not falsy and the `length` of `blocks` is greater than 1 — one of 2 ways `extractTalk` can raise this error, each with its own row.

<!-- predictable:analysis -->

<!-- predictable:subject=core.extractTalk -->

<!-- predictable:vc=il1.domain-guard -->

<!-- predictable:throws=TagError -->

<!-- predictable:canonical=`core.extractTalk` only works when it is not the case that (the `length` of `blocks` is present and is not empty, zero or false and the `length` of `blocks` is greater than 1). -->

- **Code locations:** [scripts/render/core.mjs:20-33](../../../scripts/render/core.mjs#L20-L33)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-227/ANL-0055.md -->

##### ANL-0056 [implemented, verified]
`extractTalk` throws `TagError` when the `length` of `blocks` is present and is not falsy and the `length` of `blocks` is at most 1 and `trim`(`outside`) returns true — one of 2 ways `extractTalk` can raise this error, each with its own row.

<!-- predictable:analysis -->

<!-- predictable:subject=core.extractTalk -->

<!-- predictable:vc=il2.domain-guard -->

<!-- predictable:throws=TagError -->

<!-- predictable:canonical=`core.extractTalk` only works when it is not the case that (the `length` of `blocks` is present and is not empty, zero or false and the `length` of `blocks` is at most 1 and `trim`(`outside`) returns true). -->

- **Code locations:** [scripts/render/core.mjs:20-33](../../../scripts/render/core.mjs#L20-L33)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-227/ANL-0056.md -->

#### core.prepareTalk <!-- predictable:group -->

##### ANL-0057 [implemented, stated-failure]
Calling `prepareTalk` can fail with the error `TagError` — one of 2 ways `prepareTalk` can raise this error, each with its own row.

<!-- predictable:analysis -->

<!-- predictable:subject=core.prepareTalk -->

<!-- predictable:vc=il1.domain-guard -->

<!-- predictable:throws=TagError -->

- **Code locations:** [scripts/render/core.mjs:46-70](../../../scripts/render/core.mjs#L46-L70)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-227/ANL-0057.md -->

##### ANL-0058 [implemented, verified]
`prepareTalk` throws `TagError` unless the `length` of `errors` is missing or falsy — one of 2 ways `prepareTalk` can raise this error, each with its own row.

<!-- predictable:analysis -->

<!-- predictable:subject=core.prepareTalk -->

<!-- predictable:vc=il3.domain-guard -->

<!-- predictable:throws=TagError -->

<!-- predictable:canonical=`core.prepareTalk` only works when the `length` of `errors` is missing, empty, zero or false. -->

- **Code locations:** [scripts/render/core.mjs:46-70](../../../scripts/render/core.mjs#L46-L70)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-227/ANL-0058.md -->

#### core.renderBody <!-- predictable:group -->

##### ANL-0059 [implemented, verified]
`renderBody` fails with "540-ds renderer: an island was left unplaced" unless `includes`(`body`, "<ds-mark") returns false.

<!-- predictable:analysis -->

<!-- predictable:subject=core.renderBody -->

<!-- predictable:vc=il1.domain-guard -->

<!-- predictable:throws=540-ds renderer: an island was left unplaced -->

<!-- predictable:canonical=`core.renderBody` only works when `includes`(`body`, "<ds-mark") returns false. -->

- **Code locations:** [scripts/render/core.mjs:356-467](../../../scripts/render/core.mjs#L356-L467)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-227/ANL-0059.md -->

### Behaviours

#### core.describe <!-- predictable:group -->

##### BEH-0008 [implemented, violated]
`describe` can recurse forever along `array`. `describe` returns only where the chain along `array` ends. An object pointing back at itself or an earlier one means it never ends, and the stack overflows. Safe to rely on when some path returns without calling the function again, and every recursive call moves its arguments toward it.

<!-- predictable:behaviour -->

<!-- predictable:subject=core.describe -->

<!-- predictable:vc=site.recursion-along-unproven-link.array.978428ae -->

- **Code locations:** [scripts/render/core.mjs:320](../../../scripts/render/core.mjs#L320)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-227/BEH-0008.md -->
