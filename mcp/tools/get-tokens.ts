import { z } from 'zod';
import { defineTool, json } from './shared.ts';

export const getTokens = defineTool({
  name: 'get-tokens',
  title: 'Get design tokens',
  description:
    'Returns the semantic design tokens (CSS custom properties) with their value, the resolved raw value and, ' +
    'when they change, their dark-theme, desktop (>= 1024px) and projection values. Reference only: pieces never ' +
    'use tokens or raw values directly; the components apply them. Useful to explain a color or a size, or to build a new component.',
  inputSchema: {
    category: z.enum(['color', 'measure', 'typography']).optional().describe('color, measure (space, padding, sizes, grid, radius) or typography. Omit for all.'),
    query: z.string().optional().describe('Only tokens whose name or group contains this text, e.g. "text", "space", "title".'),
  },
  handler: ({ category, query }, metadata) => {
    const q = query?.toLowerCase();
    const tokens = (category ? metadata.tokens[category] : Object.values(metadata.tokens).flat()).filter(
      (t) => !q || t.name.toLowerCase().includes(q) || (t.group ?? '').toLowerCase().includes(q),
    );
    return json({ version: metadata.version, count: tokens.length, tokens });
  },
});
