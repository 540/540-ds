import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { tools } from './tools/index.ts';
import type { Metadata } from './types.ts';

/** What every client reads on connecting: how to use this server well. */
const INSTRUCTIONS = `The 540 design system: the React components, rules and tokens 540 uses to build its pieces (talks today; reports, dashboards and social posts later).

How to build a piece:
1. Call get-rules for the piece type first and follow it as hard rules.
2. Use only catalog components and their props (list-components, search-components, get-component). Never custom CSS, inline styles, className, hand-written colors or sizes, or extra libraries.
3. Read get-component-docs before using a component for the first time: it says when to use it and when not.
4. If something the user asks for has no component, say so and propose the closest one; do not build it by hand.

Docs and rules are in Spanish; write the piece in the user's language.`;

/** One server per request: the metadata is read-only, so every request gets the same tools. */
export function createServer(metadata: Metadata): McpServer {
  const server = new McpServer({ name: '540-ds', title: '540 design system', version: metadata.version }, { instructions: INSTRUCTIONS });

  for (const tool of tools) {
    server.registerTool(
      tool.name,
      {
        title: tool.title,
        description: tool.description,
        inputSchema: tool.inputSchema,
        annotations: { readOnlyHint: true, openWorldHint: false },
      },
      (input: Record<string, unknown>) => tool.handler(input, metadata),
    );
  }
  return server;
}
