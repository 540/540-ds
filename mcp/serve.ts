/**
 * Local server: the same HTTP handler as the Vercel function, at http://localhost:3000/mcp,
 * with metadata built from the current code on start. To test the HTTP transport before deploying:
 *
 *   npm run mcp:serve                                          (PORT=4000 npm run mcp:serve for another port)
 *   claude mcp add --transport http 540-ds-local http://localhost:3000/mcp
 */
import { createServer as createHttpServer } from 'node:http';
import { Readable } from 'node:stream';
import { buildMetadata } from '../scripts/build-mcp-metadata.js';
import { handleMcpRequest } from './http.js';

const port = Number(process.env.PORT ?? 3000);
const metadata = buildMetadata();

createHttpServer(async (req, res) => {
  const url = new URL(req.url ?? '/', `http://localhost:${port}`);
  if (url.pathname !== '/mcp' && url.pathname !== '/api/mcp') {
    res.writeHead(404).end('Not found. The MCP is at /mcp.');
    return;
  }

  // Node request → Web Request
  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (typeof value === 'string') headers.set(key, value);
    else if (Array.isArray(value)) for (const v of value) headers.append(key, v);
  }
  const hasBody = req.method !== 'GET' && req.method !== 'HEAD';
  const request = new Request(url, {
    method: req.method,
    headers,
    body: hasBody ? (Readable.toWeb(req) as ReadableStream) : undefined,
    duplex: 'half',
  } as RequestInit);

  // Web Response → Node response
  const response = await handleMcpRequest(request, metadata);
  res.writeHead(response.status, Object.fromEntries(response.headers));
  res.end(response.body ? Buffer.from(await response.arrayBuffer()) : undefined);
}).listen(port, () => {
  console.log(`540-ds MCP on http://localhost:${port}/mcp (${Object.keys(metadata.components).length} components)`);
});
