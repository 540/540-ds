/**
 * Tool registry. To add a tool: create mcp/tools/<name>.ts with defineTool(), add it here,
 * add a test in mcp/server.test.ts and document it in mcp/README.md.
 */
import { getComponent } from './get-component.ts';
import { getComponentDocs } from './get-component-docs.ts';
import { getComponentStories } from './get-component-stories.ts';
import { getRules } from './get-rules.ts';
import { getTokens } from './get-tokens.ts';
import { listComponents } from './list-components.ts';
import { searchComponents } from './search-components.ts';
import type { ToolDef } from './shared.ts';

export const tools: ToolDef<any>[] = [
  getRules,
  listComponents,
  searchComponents,
  getComponent,
  getComponentDocs,
  getComponentStories,
  getTokens,
];
