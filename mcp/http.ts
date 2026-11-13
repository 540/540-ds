/**
 * The MCP over Streamable HTTP, as a Web-standard handler: Request in, Response out.
 * Shared by the Vercel function (api/mcp.ts) and the local server (mcp/serve.ts).
 *
 * Stateless: every POST gets its own server and transport, answered as plain JSON.
 * There are no sessions to keep, so GET (the server-to-client stream) and DELETE answer 405.
 */
import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js';
import { createServer } from './server.js';
import type { Metadata } from './types.js';

/** Open CORS: the server is read-only and its content is public. */
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept, Authorization, Mcp-Session-Id, Mcp-Protocol-Version, Last-Event-ID',
  'Access-Control-Expose-Headers': 'Mcp-Session-Id, Mcp-Protocol-Version',
};

function withCors(response: Response): Response {
  const headers = new Headers(response.headers);
  for (const [key, value] of Object.entries(CORS_HEADERS)) headers.set(key, value);
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

export async function handleMcpRequest(request: Request, metadata: Metadata): Promise<Response> {
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS_HEADERS });

  if (request.method !== 'POST') {
    return withCors(
      Response.json(
        { jsonrpc: '2.0', error: { code: -32000, message: 'Method not allowed: this MCP server is stateless and only accepts POST.' }, id: null },
        { status: 405, headers: { Allow: 'POST, OPTIONS' } },
      ),
    );
  }

  const server = createServer(metadata);
  const transport = new WebStandardStreamableHTTPServerTransport({ sessionIdGenerator: undefined, enableJsonResponse: true });
  try {
    await server.connect(transport);
    const response = await transport.handleRequest(request);
    // Read the whole JSON before closing, so closing cannot cut the body short.
    const body = response.body ? await response.text() : null;
    return withCors(new Response(body, { status: response.status, statusText: response.statusText, headers: response.headers }));
  } finally {
    await server.close();
  }
}
