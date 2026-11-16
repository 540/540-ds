---
predictable: spec
---
## Specification Details
- **ID:** SPEC-035
- **Name:** mcp/http.ts

### Description
`http.ts` — Http. Called from `firebase.ts (top level)` and `serve.ts (top level)`, and possibly from places the call graph cannot see. At run time it reaches `server`. No requirements recorded yet — 2 operations were examined and no obligation was decided about them.

### Declarations

`http` — Declares 2 functions: `withCors`(`response`) (internal) and `handleMcpRequest`(`request`, `metadata`).

### Notation

On the cards: `internal` — nothing outside this file can reach the operation (a `private` member, or a declaration the module does not export), so a requirement here is not addressed to anybody outside it.
