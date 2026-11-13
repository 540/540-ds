/**
 * Local entry point: the MCP server over stdio, with metadata built from the current code on start,
 * so every change in src/ shows up after a restart without rebuilding anything.
 *
 *   npm run mcp:inspect                     opens MCP Inspector on it
 *   claude mcp add 540-ds -- npx tsx mcp/stdio.ts   connects it to Claude Code
 *
 * Never write to stdout here: it is the protocol channel. Logs go to stderr.
 */
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { buildMetadata } from '../scripts/build-mcp-metadata.js';
import { createServer } from './server.js';

const metadata = buildMetadata();
await createServer(metadata).connect(new StdioServerTransport());
console.error(`540-ds MCP on stdio: ${Object.keys(metadata.components).length} components`);
