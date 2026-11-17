---
predictable: spec
---
## Specification Details
- **ID:** SPEC-008
- **Name:** scripts/build-mcp-metadata.ts

### Description
<!-- predictable:module-summary=Build-mcp-metadata generates the metadata used by the MCP server to describe and expose the design system's components and templates to an AI agent. -->
**Areas:** MCP Server, Build Scripts

`build-mcp-metadata.ts` — Build-mcp-metadata. Observed: “Loop along `expression` can run forever.” 2 requirements: 2 violated.

1 finding reachable from current code produced no requirement — on `buildTemplate`: a value is used as present without a check.

### Declarations

`build-mcp-metadata` — Declares 38 functions:
- `read`(`file`) — internal, no requirement inferred
- `rel`(`file`) — internal, no requirement inferred
- `isOwnSource`(`file`) — internal, no requirement inferred
- `createProgram`(`files`) — internal, no requirement inferred
- `docComment`(`symbol`, `checker`) — internal, no requirement inferred
- `resolveAlias`(`symbol`, `checker`) — internal, no requirement inferred
- `unwrap`(`expr`) — internal; loop along `expression` can run forever
- `propertyName`(`name`) — internal, no requirement inferred
- `literalValue`(`expr`) — internal, no requirement inferred
- `toConstantCase`(`name`) — internal, no requirement inferred
- `externalTypeText`(`prop`, `checker`) — internal, no requirement inferred
- `extractProps`(`propsType`, `checker`, `defaults`) — internal, no requirement inferred
- `collapseBooleans`(`types`) — internal, no requirement inferred
- `sanitize`(`s`) — internal, no requirement inferred
- `startCase`(`s`) — internal, no requirement inferred
- `objectProp`(`obj`, `key`) — internal, no requirement inferred
- `pathProp`(`expr`, `keys`) — internal, no requirement inferred
- `stringOf`(`expr`) — internal, no requirement inferred
- `leadingJsDoc`(`node`, `sf`) — internal, no requirement inferred
- `extractStories`(`file`, `sf`) — internal, no requirement inferred
- `findComponentDirs`() — internal, no requirement inferred
- `buildComponents`() — internal, no requirement inferred
- `parsePrimitives`() — internal, no requirement inferred
- `resolveValue`(`value`, `primitives`, `depth`) — internal, no requirement inferred
- `parseTokens`(`category`, `primitives`) — internal, no requirement inferred
- `buildRules`() — internal, no requirement inferred
- `jsxTagName`(`node`) — internal, no requirement inferred
- `jsxAttributes`(`node`) — internal, no requirement inferred
- `plainText`(`expr`) — internal, no requirement inferred
- `attrText`(`node`, `name`) — internal, no requirement inferred
- `dedentedText`(`node`, `sf`) — internal, no requirement inferred
- `forEachDescendant`(`node`, `visit`) — internal, no requirement inferred
- `buildTemplate`(`pieceType`, `dirName`, `components`, `rules`) — internal, no requirement inferred
- `parsePatterns`(`rulesContent`, `stops`) — internal, no requirement inferred
- `buildTemplates`(`components`, `rules`) — internal, no requirement inferred
- `reportGaps`(`_pattern`) — internal, no requirement inferred
- `buildMetadata`() — `pkg` is assumed to be an object
- `main`() — internal, no requirement inferred

### Notation

A requirement is a condition an operation needs in order not to fail in the way its own row names — an operation with several failures carries a row for each, and meeting one says nothing about the others. Some a caller supplies, others the operation establishes and checks itself. Nobody has checked the callers.

`implemented` — the operation exists in the code; every machine-written row carries it.

Tags: `[implemented, violated]` — the analysis found a case where the condition fails.
`[violated]` on the card above and `[implemented, violated]` on a row below are one state.

On the cards: `internal` — nothing outside this file can reach the operation (a `private` member, or a declaration the module does not export), so a requirement here is not addressed to anybody outside it. `no requirement inferred` — no requirement on this page is about the operation. Either nothing was decided about it, or what was decided is not addressed to a caller (see `internal`); neither means nothing is needed. Where the analysis could not finish, the description above says so by name. Ids in the machine-managed sections below are assigned per run and are not stable references; cite the requirement's sentence.

### Behaviours

#### build-mcp-metadata.unwrap <!-- predictable:group -->

##### BEH-0003 [implemented, violated]
Loop along `expression` can run forever. If `expression` leads back to an object already visited, the loop never exits. The thread running it spins for as long as the process lives. Safe to rely on when the walk counts its steps against a bound, or remembers the objects it has passed, so an object reached twice ends it.

<!-- predictable:behaviour -->

<!-- predictable:subject=build-mcp-metadata.unwrap -->

<!-- predictable:vc=site.walk-along-unproven-link.expression.61f30006 -->

- **Code locations:** [scripts/build-mcp-metadata.ts:72](../../scripts/build-mcp-metadata.ts#L72)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-008/BEH-0003.md -->

#### build-mcp-metadata.buildMetadata <!-- predictable:group -->

##### BEH-0004 [implemented, violated]
`pkg` is assumed to be an object. The parsed text could be `null`, a list or a number. The request then fails instead of being rejected. Safe to rely on when the parse result's shape is checked before it is used as an object, or the failure is handled.

<!-- predictable:behaviour -->

<!-- predictable:subject=build-mcp-metadata.buildMetadata -->

<!-- predictable:vc=site.payload-shape-assumed.pkg.5ed2813a -->

- **Code locations:** [scripts/build-mcp-metadata.ts:699](../../scripts/build-mcp-metadata.ts#L699)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-008/BEH-0004.md -->
