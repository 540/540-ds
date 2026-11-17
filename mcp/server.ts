import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { tools } from './tools/index.js';
import type { Metadata } from './types.js';

/** What every client reads on connecting: how to use this server well. */
const INSTRUCTIONS = `The 540 design system: the React components, composition rules, templates and tokens 540 uses to build its pieces.

How to build a piece:
1. Call list-templates first. Use a template only when the user asks for that kind of piece (its name or one of its triggers, e.g. "charla", "slides"): then follow steps 2 to 4 with its pieceType. If not, skip to step 5 and compose with the catalog alone; do not pick a template on your own.
2. Call get-rules for the piece type and follow it as hard rules.
3. Call get-template for the structure and the stops it can build, and get-patterns to choose the piece for each part of the content.
4. Copy the chosen stops with get-template-stops and change only the copy and the images.
5. Use only catalog components and their props (list-components, search-components, get-component). Never custom CSS, inline styles, className, hand-written colors or sizes, or extra libraries.
6. Read get-component-docs before using a component for the first time: it says when to use it and when not.
7. If something the user asks for has no component, say so and propose the closest one; do not build it by hand.

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
