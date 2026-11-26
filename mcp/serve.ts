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
  let pathname: string;
  try {
    ({ pathname } = new URL(req.url ?? '/', origin));
  } catch {
    // A request target that is not a valid URL is the client's mistake: 400, not a server failure.
    res.writeHead(400).end('Bad request: the URL is not valid.');
    return;
  }
  try {
    if (pathname !== '/mcp') {
      res.writeHead(404).end('Not found. The MCP is at /mcp.');
      return;
    }
    await sendWebResponse(res, await handleMcpRequest(toWebRequest(req, origin), metadata));
  } catch (error) {
    // A failing request answers 500 instead of leaving an unhandled rejection that stops the server.
    console.error(error);
    if (!res.headersSent) res.writeHead(500);
    res.end();
  }
}).listen(port, () => {
  console.log(`540-ds MCP on ${origin}/mcp (${Object.keys(metadata.components).length} components)`);
});
