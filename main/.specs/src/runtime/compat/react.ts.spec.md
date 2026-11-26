---
predictable: spec
---
## Specification Details
- **ID:** SPEC-257
- **Name:** src/runtime/compat/react.ts

### Description
`react.ts` — React. Called from `client.hydrateIslands`, and possibly from places the call graph cannot see. No requirements recorded yet — 3 operations were examined and no obligation was decided about them.

### Declarations

`react` — Declares 3 functions: `useId`(), `whileHydrating`(`run`) — “Runs a hydrate call; components rendered inside it read the server snapshot of external stores.” and `useSyncExternalStore`(`subscribe`, `getSnapshot`, `getServerSnapshot`) — “React's contract, which preact/compat skips: on the server and while hydrating, read the server snapshot, so the first client render matches the HTML; switch to the live one after mounting.”
