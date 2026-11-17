---
predictable: spec
---
## Specification Details
- **ID:** SPEC-035
- **Name:** mcp/http.ts

### Description
<!-- predictable:module-summary=Http is the module that defines the HTTP server entry point used to run the application, invoked from both the Firebase function bundle and the standalone serve script. -->
**Areas:** MCP Transports

`http.ts` — Http. No requirements recorded yet.

### Declarations

`http` — Declares 2 functions: `withCors`(`response`) (internal) and `handleMcpRequest`(`request`, `metadata`).

### Notation

On the cards: `internal` — nothing outside this file can reach the operation (a `private` member, or a declaration the module does not export), so a requirement here is not addressed to anybody outside it.
