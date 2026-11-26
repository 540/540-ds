---
predictable: spec
---
# Design system MCP server

<!-- predictable:capability={"authors":["runner"],"backlog":false,"covers":["mcp","mcp/tools","mcp/piece-types.ts"],"created":"","guidelines":[],"id":"SPEC-269","lastModified":"","lastVerified":"","proseDigest":"d072cdc154d64b5c","relatedSpecs":[]} -->
The MCP server lets an AI agent (Claude Desktop, claude.ai, Claude Code) consult the 540 design system while it assembles a piece: the design guide, the available templates, the rules of each piece type, the template and its stops, the patterns, the components with their props, sheets and stories, the semantic tokens and the image library. It is read only and stateless: each request is answered on its own, as JSON, so it runs as a Cloud Function without a database. Today it serves one piece type, talks; any other piece type is refused.

Everything the server knows comes from the code through build-mcp-metadata: each component's JSDoc, its props from types.ts with their defaults, its stories without the Playground ones and its sheet; the semantic tokens from the CSS; the talk rules; TalkTemplate split into stops (a cover, numbered blocks with a photo, a closing); the connection instructions and the design guide from src/docs, without the HTML comment meant for editors. The agent never sees className, style or inherited HTML attributes, nor primitive tokens. With --strict the build fails when a required document is missing.

The tools are get-design-guide, list-templates, get-rules, get-template, get-patterns, get-template-stops, list-components (filtered by level), search-components (by meaning, in English or Spanish), get-component (props with type, whether required, default and description, finding parts and tag names and suggesting names when one is unknown), get-component-docs, get-component-stories (code only on request), get-tokens (filtered by category and text) and search-images (by theme, skipping photos already used). On connecting, the agent receives instructions naming the order of work, starting with the design guide, and every tool they name exists.

The server is reachable over stdio, over HTTP locally and on Firebase. Over HTTP it answers JSON-RPC POSTs with open CORS headers, including on the preflight, and answers 405 to GET and DELETE because there is no session stream.

## Behaviour

- The metadata never exposes className, style or inherited HTML attributes as component props.
  <!-- predictable:requirement={"analysisKey":null,"codeLocationsFile":null,"conflict":null,"enforcedBy":null,"id":"REQ-0002","origin":"authored","siblingVcs":[],"source":"manual","subject":null,"throwsError":null} -->
- The metadata leaves Playground stories out.
  <!-- predictable:requirement={"analysisKey":null,"codeLocationsFile":null,"conflict":null,"enforcedBy":null,"id":"REQ-0003","origin":"authored","siblingVcs":[],"source":"manual","subject":null,"throwsError":null} -->
- The metadata exposes only semantic tokens, never primitive --540-* tokens.
  <!-- predictable:requirement={"analysisKey":null,"codeLocationsFile":null,"conflict":null,"enforcedBy":null,"id":"REQ-0004","origin":"authored","siblingVcs":[],"source":"manual","subject":null,"throwsError":null} -->
- The talk template is split into stops: a cover, numbered blocks each with a photo, and a closing.
  <!-- predictable:requirement={"analysisKey":null,"codeLocationsFile":null,"conflict":null,"enforcedBy":null,"id":"REQ-0005","origin":"authored","siblingVcs":[],"source":"manual","subject":null,"throwsError":null} -->
- Every tool listed by the server is read-only.
  <!-- predictable:requirement={"analysisKey":null,"codeLocationsFile":null,"conflict":null,"enforcedBy":null,"id":"REQ-0006","origin":"authored","siblingVcs":[],"source":"manual","subject":null,"throwsError":null} -->
- Every tool named in the connection instructions exists, and the instructions start with the design guide.
  <!-- predictable:requirement={"analysisKey":null,"codeLocationsFile":null,"conflict":null,"enforcedBy":null,"id":"REQ-0007","origin":"authored","siblingVcs":[],"source":"manual","subject":null,"throwsError":null} -->
- get-design-guide returns src/docs/diseno.md without the leading note for editors.
  <!-- predictable:requirement={"analysisKey":null,"codeLocationsFile":null,"conflict":null,"enforcedBy":null,"id":"REQ-0008","origin":"authored","siblingVcs":[],"source":"manual","subject":null,"throwsError":null} -->
- get-component suggests close names when the requested component does not exist.
  <!-- predictable:requirement={"analysisKey":null,"codeLocationsFile":null,"conflict":null,"enforcedBy":null,"id":"REQ-0009","origin":"authored","siblingVcs":[],"source":"manual","subject":null,"throwsError":null} -->
- get-component-stories includes the story code only when it is requested.
  <!-- predictable:requirement={"analysisKey":null,"codeLocationsFile":null,"conflict":null,"enforcedBy":null,"id":"REQ-0010","origin":"authored","siblingVcs":[],"source":"manual","subject":null,"throwsError":null} -->
- search-components finds components by meaning, in Spanish as well as English.
  <!-- predictable:requirement={"analysisKey":null,"codeLocationsFile":null,"conflict":null,"enforcedBy":null,"id":"REQ-0011","origin":"authored","siblingVcs":[],"source":"manual","subject":null,"throwsError":null} -->
- get-template-stops returns each stop's code with its helpers and sample assets, and reports unknown stop ids.
  <!-- predictable:requirement={"analysisKey":null,"codeLocationsFile":null,"conflict":null,"enforcedBy":null,"id":"REQ-0012","origin":"authored","siblingVcs":[],"source":"manual","subject":null,"throwsError":null} -->
- search-images skips the photos the caller says are already used.
  <!-- predictable:requirement={"analysisKey":null,"codeLocationsFile":null,"conflict":null,"enforcedBy":null,"id":"REQ-0013","origin":"authored","siblingVcs":[],"source":"manual","subject":null,"throwsError":null} -->
- Over HTTP the server answers 405 to GET and DELETE requests.
  <!-- predictable:requirement={"analysisKey":null,"codeLocationsFile":null,"conflict":null,"enforcedBy":null,"id":"REQ-0015","origin":"authored","siblingVcs":[],"source":"manual","subject":null,"throwsError":null} -->
- Over HTTP the server sends open CORS headers, including on the preflight request.
  <!-- predictable:requirement={"analysisKey":null,"codeLocationsFile":null,"conflict":null,"enforcedBy":null,"id":"REQ-0016","origin":"authored","siblingVcs":[],"source":"manual","subject":null,"throwsError":null} -->
- Over HTTP, handleMcpRequest answers initialize with the server info and instructions as JSON, without a session.
  <!-- predictable:requirement={"analysisKey":null,"codeLocationsFile":null,"conflict":null,"enforcedBy":null,"id":"REQ-0018","origin":"authored","siblingVcs":[],"source":"manual","subject":null,"throwsError":null} -->
- The server built by `createServer` (mcp/server.ts) serves only the talk piece type and refuses any other piece type.
  <!-- predictable:requirement={"analysisKey":null,"codeLocationsFile":null,"conflict":null,"enforcedBy":null,"id":"REQ-0019","origin":"authored","siblingVcs":[],"source":"manual","subject":null,"throwsError":null} -->
