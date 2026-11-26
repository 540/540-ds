import { IncomingMessage, ServerResponse } from 'node:http';
import { Socket } from 'node:net';
import { describe, expect, it } from 'vitest';
import { sendWebResponse, toWebRequest } from './node-adapter.js';

// The bridge between Node's HTTP objects and the Web Request/Response the MCP handler speaks.
function nodeRequest(method: string, url: string, headers: Record<string, string | string[]>, chunks: string[] = []) {
  const req = new IncomingMessage(new Socket());
  req.method = method;
  req.url = url;
  req.headers = headers as IncomingMessage['headers'];
  for (const chunk of chunks) req.push(chunk);
  req.push(null);
  return req;
}

describe('toWebRequest', () => {
  it('keeps the method, the URL against the origin and every header, repeated ones included', () => {
    const req = nodeRequest('GET', '/mcp?x=1', { accept: 'application/json', 'x-many': ['a', 'b'] });
    const request = toWebRequest(req, 'https://example.test');
    expect(request.method).toBe('GET');
    expect(request.url).toBe('https://example.test/mcp?x=1');
    expect(request.headers.get('accept')).toBe('application/json');
    expect(request.headers.get('x-many')).toBe('a, b');
    expect(request.body).toBeNull();
  });

  it('uses the body the platform already read when it is given', async () => {
    const req = nodeRequest('POST', '/mcp', { 'content-type': 'application/json' });
    const request = toWebRequest(req, 'https://example.test', Buffer.from('{"read":"before"}'));
    expect(await request.text()).toBe('{"read":"before"}');
  });

  it('streams the body from the request when none was read before', async () => {
    const req = nodeRequest('POST', '/mcp', { 'content-type': 'application/json' }, ['{"streamed":', 'true}']);
    const request = toWebRequest(req, 'https://example.test');
    expect(await request.text()).toBe('{"streamed":true}');
  });
});

describe('sendWebResponse', () => {
  it('writes the status, the headers and the whole body to the Node response', async () => {
    const res = new ServerResponse(nodeRequest('POST', '/mcp', {}));
    const written: { status?: number; headers?: Record<string, string>; body?: Buffer } = {};
    res.writeHead = ((status: number, headers: Record<string, string>) => {
      written.status = status;
      written.headers = headers;
      return res;
    }) as typeof res.writeHead;
    res.end = ((body?: Buffer) => {
      written.body = body;
      return res;
    }) as typeof res.end;
    await sendWebResponse(res, new Response('{"ok":true}', { status: 202, headers: { 'content-type': 'application/json' } }));
    expect(written.status).toBe(202);
    expect(written.headers?.['content-type']).toBe('application/json');
    expect(written.body?.toString()).toBe('{"ok":true}');
  });
});
