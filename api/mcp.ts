/**
 * Vercel function: the 540 design system MCP at /api/mcp (and /mcp, see vercel.json).
 * Node runtime, not Edge: it reads mcp/metadata.json from disk, built by `npm run build-mcp-metadata`
 * during the Vercel build and shipped with the function (includeFiles in vercel.json).
 */
import { readFileSync } from 'node:fs';
import { handleMcpRequest } from '../mcp/http.js';
import type { Metadata } from '../mcp/types.js';

let metadata: Metadata | undefined;

/** Read once per instance; every request after the first reuses it. */
function loadMetadata(): Metadata {
  metadata ??= JSON.parse(readFileSync(new URL('../mcp/metadata.json', import.meta.url), 'utf-8')) as Metadata;
  return metadata;
}

const handle = (request: Request) => handleMcpRequest(request, loadMetadata());

export const POST = handle;
export const GET = handle;
export const DELETE = handle;
export const OPTIONS = handle;
