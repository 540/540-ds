import { beforeAll, describe, expect, it } from 'vitest';
import { buildMetadata } from '../scripts/build-mcp-metadata.js';
import { handleMcpRequest } from './http.js';
import type { Metadata } from './types.js';

// The HTTP handler the Firebase function uses, driven with Web Requests as a remote client would send them.
let metadata: Metadata;

beforeAll(() => {
  metadata = buildMetadata();
}, 60_000);

const URL_MCP = 'https://example.test/mcp';

const resultOf = async (response: Response) => ((await response.json()) as { result: any }).result;

function rpc(method: string, params: Record<string, unknown> = {}, id = 1) {
  return new Request(URL_MCP, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json, text/event-stream', 'Mcp-Protocol-Version': '2025-06-18' },
    body: JSON.stringify({ jsonrpc: '2.0', id, method, params }),
  });
}

describe('handleMcpRequest', () => {
  it('answers initialize with the server info and instructions, as JSON', async () => {
    const response = await handleMcpRequest(
      rpc('initialize', { protocolVersion: '2025-06-18', capabilities: {}, clientInfo: { name: 'test', version: '0' } }),
      metadata,
    );
    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toContain('application/json');
    expect(response.headers.get('mcp-session-id')).toBeNull();
    const result = await resultOf(response);
    expect(result.serverInfo.name).toBe('540-ds');
    expect(result.instructions).toContain('get-rules');
  });

  it('lists and calls tools without a session (stateless)', async () => {
    const list = await resultOf(await handleMcpRequest(rpc('tools/list'), metadata));
    expect(list.tools.map((t: { name: string }) => t.name)).toContain('get-template');

    const call = await resultOf(await handleMcpRequest(rpc('tools/call', { name: 'get-component', arguments: { component: 'Quote' } }, 2), metadata));
    expect(JSON.parse(call.content[0].text).name).toBe('Quote');
  });

  it('answers 405 to GET and DELETE: there is no session stream', async () => {
    for (const method of ['GET', 'DELETE']) {
      const response = await handleMcpRequest(new Request(URL_MCP, { method }), metadata);
      expect(response.status, method).toBe(405);
      expect(response.headers.get('allow')).toBe('POST, OPTIONS');
    }
  });

  it('sends open CORS headers, also on the preflight', async () => {
    const preflight = await handleMcpRequest(new Request(URL_MCP, { method: 'OPTIONS' }), metadata);
    expect(preflight.status).toBe(204);
    expect(preflight.headers.get('access-control-allow-origin')).toBe('*');

    const response = await handleMcpRequest(rpc('tools/list'), metadata);
    expect(response.headers.get('access-control-allow-origin')).toBe('*');
  });
});
