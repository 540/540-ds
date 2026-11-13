/**
 * Tool registry. To add a tool: create mcp/tools/<name>.ts with defineTool(), add it here,
 * add a test in mcp/server.test.ts and document it in mcp/README.md.
 */
import { getComponent } from './get-component.js';
import { getComponentDocs } from './get-component-docs.js';
import { getComponentStories } from './get-component-stories.js';
import { getPatterns } from './get-patterns.js';
import { getRules } from './get-rules.js';
import { getTemplate } from './get-template.js';
import { getTemplateStops } from './get-template-stops.js';
import { getTokens } from './get-tokens.js';
import { listComponents } from './list-components.js';
import { searchComponents } from './search-components.js';
import type { ToolDef } from './shared.js';

export const tools: ToolDef<any>[] = [
  getRules,
  getTemplate,
  getPatterns,
  getTemplateStops,
  listComponents,
  searchComponents,
  getComponent,
  getComponentDocs,
  getComponentStories,
  getTokens,
];
