---
predictable: spec
---
## Specification Details
- **ID:** SPEC-045
- **Name:** mcp/node-adapter.ts

### Description
`node-adapter.ts` — Node-adapter. Called from `firebase.ts (top level)` and `serve.ts (top level)`, and possibly from places the call graph cannot see. No requirements recorded yet — 2 operations were examined and no obligation was decided about them.

### Declarations

`node-adapter` — Declares 2 functions: `toWebRequest`(`req`, `origin`, `rawBody`) — “Node request → Web Request.” and `sendWebResponse`(`res`, `response`) — “Web Response → Node response.”
