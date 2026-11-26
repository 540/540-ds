---
predictable: spec
---
## Specification Details
- **ID:** SPEC-044
- **Name:** mcp/http.ts

### Description
<!-- predictable:module-summary=The Http module provides the HTTP server entry point used to expose the system over a web interface, invoked from the Firebase and serve startup paths. -->
**Areas:** MCP Transports

`http.ts` — Http. No requirements recorded yet.

### Declarations

`http` — Declares 2 functions: `withCors`(`response`) (internal) and `handleMcpRequest`(`request`, `metadata`).

### Notation

On the cards: `internal` — nothing outside this file can reach the operation (a `private` member, or a declaration the module does not export), so a requirement here is not addressed to anybody outside it.
