---
predictable: spec
---
## Specification Details
- **ID:** SPEC-008
- **Name:** scripts/build-mcp-metadata.ts

### Description
`build-mcp-metadata.ts` — Build-mcp-metadata. Called from `serve.ts (top level)` and `stdio.ts (top level)`, and possibly from places the call graph cannot see. `main` is where the program ends. `buildTemplate` builds `dependencies`, and no requirement here is about what runs inside it. Observed: “The walk along `expression` has nothing to stop it going round in a circle.” 2 requirements: 2 violated.

1 finding reachable from current code produced no requirement — on `buildTemplate`: a value is used as present without a check.

### Declarations

`build-mcp-metadata` — Declares 39 functions:
- `read`(`file`) — internal, no requirement inferred
- `rel`(`file`) — internal, no requirement inferred
- `isOwnSource`(`file`) — internal, no requirement inferred
- `createProgram`(`files`) — internal, no requirement inferred
- `docComment`(`symbol`, `checker`) — internal, no requirement inferred
- `resolveAlias`(`symbol`, `checker`) — internal, no requirement inferred
- `unwrap`(`expr`) (internal) — “`X as const`, `X satisfies T`, `(X)` → X.” — internal; the walk along `expression` has nothing to stop it going round in a circle
- `propertyName`(`name`) — internal, no requirement inferred
- `literalValue`(`expr`) (internal) — “A literal as plain JSON when possible, else its source text.” — internal, no requirement inferred
- `toConstantCase`(`name`) — internal, no requirement inferred
- `externalTypeText`(`prop`, `checker`) (internal) — “A type written as a reference to something outside src/ (ReactNode, ReactElement, MouseEvent…) is kept as written; expanding it would print React's internals.” — internal, no requirement inferred
- `extractProps`(`propsType`, `checker`, `defaults`) (internal) — “Props of a (possibly union) props type, keeping only the ones declared in src/.” — internal, no requirement inferred
- `collapseBooleans`(`types`) (internal) — “`false | true` → `boolean`.” — internal, no requirement inferred
- `sanitize`(`s`) (internal) — “Storybook's sanitize() and storyNameFromExport(), so ids match the published Storybook.” — internal, no requirement inferred
- `startCase`(`s`) — internal, no requirement inferred
- `objectProp`(`obj`, `key`) — internal, no requirement inferred
- `pathProp`(`expr`, `keys`) — internal, no requirement inferred
- `stringOf`(`expr`) — internal, no requirement inferred
- `leadingJsDoc`(`node`, `sf`) — internal, no requirement inferred
- `extractStories`(`file`, `sf`) — internal, no requirement inferred
- `findComponentDirs`() — internal, no requirement inferred
- `buildComponents`() — internal, no requirement inferred
- `parsePrimitives`() — internal, no requirement inferred
- `resolveValue`(`value`, `primitives`, `depth`) (internal) — “var(--540-x) → its raw value, recursively; other values untouched.” — internal, no requirement inferred
- `parseTokens`(`category`, `primitives`) (internal) — “Reads `--name: value; /* note *\/` declarations, remembering the group comment above them and the context they live in: base (light, mobile), dark theme, desktop (>= 1024px) or projection scale.” — internal, no requirement inferred
- `buildRules`() — internal, no requirement inferred
- `jsxTagName`(`node`) — internal, no requirement inferred
- `jsxAttributes`(`node`) — internal, no requirement inferred
- `plainText`(`expr`) (internal) — “Readable text of an expression: a string, an array of strings (lines) or JSX (its text, tags dropped).” — internal, no requirement inferred
- `attrText`(`node`, `name`) (internal) — “A JSX attribute as plain text: `title="…"`, `title={['line', 'line']}`, `sentence={<>…</>}`.” — internal, no requirement inferred
- `dedentedText`(`node`, `sf`) (internal) — “A node's source without the indentation of the line it starts on, so it can be pasted anywhere.” — internal, no requirement inferred
- `forEachDescendant`(`node`, `visit`) — internal, no requirement inferred
- `findDeck`(`node`) (internal) — “The first `<Deck>` element in document order under `node`, or `undefined` if there is none.” — internal, no requirement inferred
- `buildTemplate`(`pieceType`, `dirName`, `components`, `rules`) (internal) — “Splits a template into its stops: each direct child of the root Deck.” — internal, no requirement inferred
- `parsePatterns`(`rulesContent`, `stops`) (internal) — “The "Para contar… | Pieza | Nunca" table of a rules file: need → piece → what never to do, plus up to three template stops that show it, the simplest first.” — internal, no requirement inferred
- `buildTemplates`(`components`, `rules`) — internal, no requirement inferred
- `reportGaps`(`components`) — internal, no requirement inferred
- `buildMetadata`() — “The whole metadata, built in memory.” — `pkg` is used as an object without checking that the parsed text was one
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
The walk along `expression` has nothing to stop it going round in a circle. This loop moves `expr` one step along `expression` at a time, and its only way out is the condition — reaching the end of the chain. The analysis cannot place `expression` on one declaration, so nothing proves the chain it makes ever ends. On such data the chain has no end: the condition never becomes false, nothing in the loop leaves it, and the thread running it spins at full CPU for as long as the process lives. Nothing here counts the steps or remembers the objects already visited. Safe to rely on when the walk counts its steps against a bound, or remembers the objects it has passed, so an object reached twice ends it.

<!-- predictable:behaviour -->

<!-- predictable:subject=build-mcp-metadata.unwrap -->

<!-- predictable:vc=site.walk-along-unproven-link.expression.61f30006 -->

- **Code locations:** [scripts/build-mcp-metadata.ts:78](../../scripts/build-mcp-metadata.ts#L78)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-008/BEH-0003.md -->

#### build-mcp-metadata.buildMetadata <!-- predictable:group -->

##### BEH-0004 [implemented, violated]
`pkg` is used as an object without checking that the parsed text was one. `pkg` is what a parser answered for text from outside the program, which nothing shows a caller cannot choose, and a parser answers whatever the text holds — an object, a list, a number or `null`. Nothing after the parse in this function checks that it is an object before it is used as one, in one place, named beside this one (the first on each path), so text of `null` — and, depending on the use, a number or a list — ends the request in an error there instead of being refused as malformed, and no handler takes the failure. Safe to rely on when the parse result's shape is checked before it is used as an object, or the failure is handled.

<!-- predictable:behaviour -->

<!-- predictable:subject=build-mcp-metadata.buildMetadata -->

<!-- predictable:vc=site.payload-shape-assumed.pkg.5ed2813a -->

- **Code locations:** [scripts/build-mcp-metadata.ts:713](../../scripts/build-mcp-metadata.ts#L713)

<!-- predictable:code-locations=.predictable-code/specs/locations/SPEC-008/BEH-0004.md -->
