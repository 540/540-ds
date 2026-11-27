import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { registerSkills, SKILLS_EXTENSION } from './skills.js';
import { tools } from './tools/index.js';
import type { Metadata } from './types.js';

/**
 * One server per request: the metadata is read-only, so every request gets the same tools. The instructions
 * every client reads on connecting come from src/docs/instrucciones-mcp.md, through the metadata, and the skills
 * of src/docs/skills/ are served as skill:// resources (see mcp/skills.ts).
 */
export function createServer(metadata: Metadata): McpServer {
  const server = new McpServer({ name: '540-ds', title: '540 design system', version: metadata.version }, {
    instructions: metadata.instructions.content,
    capabilities: { resources: {}, extensions: { [SKILLS_EXTENSION]: {} } },
  });

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
  registerSkills(server, metadata);
  return server;
}
