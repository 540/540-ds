---
predictable: spec
---
## Specification Details
- **ID:** SPEC-047
- **Name:** mcp/server.ts

### Description
`server.ts` — Server. Called from `http.handleMcpRequest` and `stdio.ts (top level)`, and possibly from places the call graph cannot see. No requirements recorded yet — 1 operation was examined and no obligation was decided about it.

### Declarations

`server` — Declares 1 function: `createServer`(`metadata`) — “One server per request: the metadata is read-only, so every request gets the same tools.”

### Notation

On the cards: `read-only` — read as a property, never called: writing it as a call is a `TypeError`.
