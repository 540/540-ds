/**
 * Local server: the same HTTP handler as the Firebase function, at http://localhost:3000/mcp,
 * with metadata built from the current code on start. To test the HTTP transport quickly:
 *
 *   npm run mcp:serve                                          (PORT=4000 npm run mcp:serve for another port)
 *   claude mcp add --transport http 540-ds-local http://localhost:3000/mcp
 *
 * To test the deployed setup itself (Hosting rewrite + function), use npm run mcp:emulate.
 */
import { createServer as createHttpServer } from 'node:http';
import { buildMetadata } from '../scripts/build-mcp-metadata.js';
import { handleMcpRequest } from './http.js';
import { sendWebResponse, toWebRequest } from './node-adapter.js';

const port = Number(process.env.PORT ?? 3000);
const origin = `http://localhost:${port}`;
const metadata = buildMetadata();

createHttpServer(async (req, res) => {
  const { pathname } = new URL(req.url ?? '/', origin);
  if (pathname !== '/mcp') {
    res.writeHead(404).end('Not found. The MCP is at /mcp.');
    return;
  }
  await sendWebResponse(res, await handleMcpRequest(toWebRequest(req, origin), metadata));
}).listen(port, () => {
  console.log(`540-ds MCP on ${origin}/mcp (${Object.keys(metadata.components).length} components)`);
});
