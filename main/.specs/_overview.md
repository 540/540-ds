---
predictable: overview
---
## Project overview

`main` — “El sistema de diseño de 540 en código: tokens, componentes React y documentación en Storybook.” 1 package, 36 modules, 68 requirements: 35 violated, 33 verified. 60 stated failures.

### `mcp`

> “Un servidor [MCP](https://modelcontextprotocol.io) que deja a un agente (Claude en Desktop, en claude.ai o en Claude Code) **consultar el sistema de diseño de 540 mientras monta una pieza**: las normas, la plantilla y sus paradas, los patrones, los componentes con sus props, las fichas y los tokens.”
> — [`mcp/README.md`](../mcp/README.md)

7 of 22 modules carry an inferred requirement, 8 requirements: 2 violated, 6 verified. Not every row below repeats its requirement as a count, so the tallies there add up to fewer than this.

- `get-component-docs.ts` — Provides `getComponentDocs.handler`. 1 requirement: 1 verified.
- `get-component-stories.ts` — Provides `getComponentStories.handler`. 1 requirement: 1 verified.
- `get-component.ts` — Provides `getComponent.handler`. 1 requirement: 1 verified.
- `get-template-stops.ts` — Provides `getTemplateStops.handler`. 1 requirement: 1 verified.
- `node-adapter.ts` — Provides `toWebRequest` and `sendWebResponse`. 1 requirement: 1 violated.
- `serve.ts` — 1 requirement: 1 violated.
- `shared.ts` — Provides `ToolDef.handler`, `defineTool`, `json`, `text` and 4 more. Requires for `findComponent`: `part` is not null [verified]; for `summary`: `description` is not null [verified].

### `scripts`

- `build-mcp-firebase.ts` — 1 requirement: 1 violated.
- `build-mcp-metadata.ts` — Provides `buildMetadata`. 2 requirements: 2 violated.
- `build-pieces.mjs` — Provides `tagsOf`. `buildIsland` and `tagsOf` can fail with the error `Error`; `findComponents` can fail with the error "Islands with no component:"; `components` can be rejected with the error "Islands with no component:" — it delegates to `findComponents`, which enforces that precondition; `manifest` and `writeManifest` can be rejected with the error "Error" — it delegates to `tagsOf`, which enforces that precondition. 1 requirement: 1 violated. 6 stated failures. `buildIsland` has 2 failure conditions and 1 of them is stated on its page — the rest are in the findings in Predictable Code (the Control Center, or your editor).
- `check-islands.mjs` — Provides `body.items`. 4 requirements: 3 violated, 1 verified.
- `check-runtime.mjs` — Provides `server.lambda`. Requires for `lambda_68_28`: `startsWith`(the `pathname` of `url`, "/talk/") returns true or `startsWith`(the `pathname` of `url`, "/pieces/") returns true [verified] and 3 more rules. `lambda_68_28` can fail with the error "not found"; `lambda_68_28` can fail with the error `outside`. 6 requirements: 4 violated, 2 verified. 2 stated failures.
- `core.mjs` — Provides `extractTalk`, `prepareTalk`, `resolveElement`, `resolveComponent` and 2 more. Requires for `prepareTalk`: the `length` of `errors` is missing or falsy [verified]; for `renderBody`: `includes`(`body`, "<ds-mark") returns false [verified] and 33 more rules. `asImage`, `asNumber`, `fromJson`, `markup` and `prepareTalk` can fail with the error `Error`; `extractTalk` can be rejected with the error "Error" when `the length of the blocks is greater than 1`; `fromAttr` can fail with the error `Error` when `raw` is null; `fromAttr`, `fromJson`, `markup`, `prepareTalk`, `resolveComponent`, `resolveElement` and `resolveNodes` can be rejected with the error "Error" — it delegates to `asImage`, which enforces that precondition; `fromAttr`, `fromJson`, `markup`, `prepareTalk`, `resolveComponent`, `resolveElement` and `resolveNodes` can be rejected with the error "Error" — it delegates to `asNumber`, which enforces that precondition; `fromAttr`, `fromJson`, `prepareTalk`, `resolveComponent`, `resolveElement` and `resolveNodes` can be rejected with the error "Error" — it delegates to `markup`, which enforces that precondition; `fromAttr`, `markup`, `prepareTalk`, `resolveComponent`, `resolveElement` and `resolveNodes` can be rejected with the error "Error" — it delegates to `fromJson`, which enforces that precondition; `fromJson`, `markup`, `prepareTalk`, `resolveComponent`, `resolveElement` and `resolveNodes` can be rejected with the error "Error" — it delegates to `fromAttr`, which enforces that precondition; `prepareTalk` can fail with the error `TagError` — one of 2 ways `prepareTalk` can raise this error, each with its own row. 6 requirements: 2 violated, 4 verified. 40 stated failures. `fromJson` has 16 failure conditions and 5 of them are stated on its page — the rest are in the findings in Predictable Code (the Control Center, or your editor).
- `index.mjs` — Provides `renderTalk`. Requires for `renderTalk`: `pieces` is present and is not falsy [verified]. `checkOffline` can fail with the error "the page would need files from outside:"; `readImage` can fail with the error `Error`; `renderTalk` can be rejected with the error "the page would need files from outside:" — it delegates to `checkOffline`, which enforces that precondition. 4 requirements: 3 violated, 1 verified. 3 stated failures.
- `panel.mjs` — Provides `showProblems`. 1 requirement: 1 violated.
- `parse.mjs` — Provides `decode`, `parse`, `tidy` and `decode.lambda`. Requires for `tidy`: the value of `at`(`out`, -1) is not null [violated] and 6 more rules. `lambda_8_55` can fail with the error `TagError`; `parse` can fail with the error `TagError` — one of 16 conditions under which `parse` fails, and 8 of them are stated here. 8 requirements: 8 violated. 2 stated failures. `decode` has 2 failure conditions and 1 of them is stated on its page, `parse` has 16 failure conditions and 8 of them are stated on its page and `tidy` has 2 failure conditions and 1 of them is stated on its page — the rest are in the findings in Predictable Code (the Control Center, or your editor).
- `runtime.mjs` — `rejectPath` can fail with the error `Error`. 2 requirements: 2 violated. 1 stated failure.
- `tag-contract.mjs` — Provides `tagName`, `attrName` and `readContract`. `readContract` can fail with the error "No module for"; `readContract` can fail with the error `Error`. 1 requirement: 1 violated. 2 stated failures.

### `src`

- `Button.tsx` — Provides `Button`. Requires for `Button`: `rest` is not null [violated].
- `Carousel.tsx` — Provides `Carousel`. Requires for `Carousel`: `track` is not null [verified]; `slot` is not null [verified].
- `Deck.tsx` — Provides `Deck`. Requires for `Deck`: `bar` is not null [verified].
- `Dialog.tsx` — Provides `Dialog`. Requires for `Dialog`: `dialog` is not null [verified].
- `Field.tsx` — Provides `Field`. Requires for `Field`: `rest` is not null [violated].
- `LogoCarousel.tsx` — Provides `LogoCarousel`. Requires for `LogoCarousel`: `track` is not null [verified].
- `Marquee.tsx` — Provides `Marquee`. Requires for `Marquee`: `r` is not null [verified]; `f` is not null [verified].
- `NavMobile.tsx` — Provides `NavMobile`. Requires for `NavMobile`: `panel` is not null [verified]. 2 requirements: 1 violated, 1 verified.
- `Sheet.tsx` — Provides `Sheet`. Requires for `Sheet`: `stop` is not null [verified].
- `Spotlight.tsx` — Provides `Spotlight`. Requires for `Spotlight`: `el` is not null [verified].
- `Steps.tsx` — Provides `Steps`, `Step` and `PanelStack`. Requires for `Step`: `to` is not null [verified]; for `Steps`: `el` is not null [verified]; `t` is not null [verified].
- `client.ts` — Requires for `slotHtml`: `slot` is not null [verified].
- `islands.ts` — Provides `whenSlotMounts`, `Slot`, `revive` and `registryOf`. `revive` can fail with the error "540-ds: component ""; `revive` can fail with the error `Error`.
- `main.tsx` — Requires for `__moduleInit__`: the value of `getElementById`(`document`, "root") is not null [violated].
- `server.ts` — Provides `renderIsland`, `renderStatic` and `renderToString`. Requires for `renderIsland`: `type` is not null [verified]; for `renderToString`: `options` is not null [verified]. `renderIsland` can be rejected with the error "540-ds: component "" when `the type equals null`; `lambda_27_19` can fail with the error "540-ds: slot "".
- `useCenterState.ts` — Provides `useCenterState`. Requires for `useCenterState`: `el` is not null [verified].
- `useDeckNavigation.ts` — Provides `useDeckNavigation`. Requires for `useDeckNavigation`: `el` is not null [verified]; `t` is not null [verified].
- `useTokenValue.ts` — Provides `useTokenValue`, `useResolvedValue` and `toHex`. 1 requirement: 1 violated.

A requirement is a condition an operation needs in order not to fail in the way its own row names — an operation with several failures carries a row for each, and meeting one says nothing about the others. Some a caller supplies, others the operation establishes and checks itself. Nobody has checked the callers.

**verified** — the operation checks this and refuses when it fails.
**violated** — the analysis found a case where the condition fails.

`falsy` is JavaScript's word for a value that counts as false in a condition: `false`, `0`, an empty string, `null`, `undefined` or `NaN`.

**stated failure** — the operation is stated to fail with a named error — a behaviour it has, and one this analysis did not settle as prevented.
