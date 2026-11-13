/**
 * Bridges Node's HTTP objects and the Web Request/Response the MCP handler speaks.
 * Used by the local server (mcp/serve.ts) and the Firebase function (mcp/firebase.ts).
 */
import type { IncomingMessage, ServerResponse } from 'node:http';
import { Readable } from 'node:stream';

/**
 * Node request → Web Request. `rawBody` is the body already read by the platform
 * (Firebase reads it before the handler runs); without it, the body is streamed from the request.
 */
export function toWebRequest(req: IncomingMessage, origin: string, rawBody?: Buffer): Request {
  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (typeof value === 'string') headers.set(key, value);
    else if (Array.isArray(value)) for (const v of value) headers.append(key, v);
  }
  const hasBody = req.method !== 'GET' && req.method !== 'HEAD';
  const body = !hasBody ? undefined : rawBody ? new Uint8Array(rawBody) : (Readable.toWeb(req) as ReadableStream);
  return new Request(new URL(req.url ?? '/', origin), { method: req.method, headers, body, duplex: 'half' } as RequestInit);
}

/** Web Response → Node response. The MCP answers are small JSON, so the body is sent in one go. */
export async function sendWebResponse(res: ServerResponse, response: Response): Promise<void> {
  res.writeHead(response.status, Object.fromEntries(response.headers));
  res.end(response.body ? Buffer.from(await response.arrayBuffer()) : undefined);
}
