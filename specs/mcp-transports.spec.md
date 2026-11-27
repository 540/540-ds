---
predictable: spec
---
# MCP transports

<!-- predictable:capability={"authors":["runner"],"backlog":false,"covers":["mcp/http.ts","mcp/server.ts","mcp/node-adapter.ts","mcp/firebase.ts"],"created":"","guidelines":[],"id":"SPEC-264","lastModified":"","lastVerified":"","proseDigest":"ab654fda0612eb95","relatedSpecs":[]} -->
**Areas:** MCP Transports

The 540-ds MCP server is reached over Streamable HTTP through a stateless, Web-standard handler (mcp/http.ts), and the local server and the Firebase function bridge Node's HTTP objects to it (mcp/node-adapter.ts). createServer(metadata) builds an MCP server named 540-ds whose instructions are metadata.instructions.content, and registers every tool of the registry annotated read-only. handleMcpRequest(request, metadata) answers OPTIONS with 204 and open CORS headers (Access-Control-Allow-Origin *); answers any method other than POST, such as GET or DELETE, with 405, a JSON-RPC error and the header Allow: POST, OPTIONS; and gives each POST its own server and transport with no session: the answer is plain JSON with no Mcp-Session-Id header, initialize returns the server info and instructions, and tools can be listed and called without a session. Every answer carries the open CORS headers. toWebRequest(req, origin, rawBody) turns a Node request into a Web Request with the same method, the URL resolved against origin and every header, a repeated header keeping all its values; a GET or HEAD request carries no body; otherwise the body is rawBody when it is given, else it is streamed from the Node request. sendWebResponse(res, response) writes the response's status, headers and whole body to the Node response.
