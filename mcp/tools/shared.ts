import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import type { z } from 'zod';
import type { ComponentMeta, Metadata } from '../types.ts';

/**
 * One MCP tool: its contract (name, description, input) and a pure handler over the metadata.
 * Each tool lives in its own file under mcp/tools/ and is listed in mcp/tools/index.ts.
 */
export interface ToolDef<Shape extends z.ZodRawShape = z.ZodRawShape> {
  /** kebab-case, unique. */
  name: string;
  title: string;
  /** What the agent reads to decide when to call it. */
  description: string;
  inputSchema: Shape;
  handler: (input: z.infer<z.ZodObject<Shape>>, metadata: Metadata) => CallToolResult;
}

export const defineTool = <Shape extends z.ZodRawShape>(tool: ToolDef<Shape>) => tool;

export const json = (value: unknown): CallToolResult => ({ content: [{ type: 'text', text: JSON.stringify(value) }] });

export const text = (value: string): CallToolResult => ({ content: [{ type: 'text', text: value }] });

export const error = (message: string): CallToolResult => ({ isError: true, content: [{ type: 'text', text: message }] });

/** `BlockTitle`, `block-title`, `rev-block-title`, `blocktitle` → `blocktitle` */
const normalize = (name: string) =>
  name
    .trim()
    .toLowerCase()
    .replace(/^<?\/?rev-/, '')
    .replace(/[^a-z0-9]/g, '');

export type ComponentMatch = { component: ComponentMeta; part: string | null };

/**
 * Finds a component by id, name or tag name, case-insensitive. A part name (GridItem, SchemaFrame…)
 * resolves to the folder that exports it.
 */
export function findComponent(metadata: Metadata, query: string): ComponentMatch | null {
  const key = normalize(query);
  for (const component of Object.values(metadata.components)) {
    if (normalize(component.name) === key) return { component, part: null };
  }
  for (const component of Object.values(metadata.components)) {
    const part = component.parts.find((p) => normalize(p.name) === key);
    if (part) return { component, part: part.name };
  }
  return null;
}

export function notFound(metadata: Metadata, query: string): CallToolResult {
  const key = normalize(query);
  const names = Object.values(metadata.components).flatMap((c) => [c.name, ...c.parts.map((p) => p.name)]);
  const close = names.filter((n) => normalize(n).includes(key) || (key.length > 2 && key.includes(normalize(n))));
  const hint = close.length ? ` Did you mean: ${close.slice(0, 5).join(', ')}?` : '';
  return error(`No component "${query}" in the 540 design system.${hint} Call list-components or search-components to see what exists.`);
}

/** First sentence of a description, for lists. */
export const summary = (description: string | null) => description?.split(/(?<=\.)\s|\n/)[0] ?? null;
