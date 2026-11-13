import { z } from 'zod';
import { defineTool, json, summary } from './shared.js';

export const listComponents = defineTool({
  name: 'list-components',
  title: 'List components',
  description:
    'Lists every component of the 540 design system with a one-line description, grouped by atomic level ' +
    '(atom, molecule, organism, template). Start here to see what exists; then call get-component for props.',
  inputSchema: {
    level: z.enum(['atom', 'molecule', 'organism', 'template']).optional().describe('Only this level. Omit for all.'),
  },
  handler: ({ level }, metadata) => {
    const components = Object.values(metadata.components)
      .filter((c) => !level || c.level === level)
      .map((c) => ({
        name: c.name,
        level: c.level,
        description: summary(c.description) ?? summary(c.parts[0]?.description ?? null),
        ...(c.parts.length ? { parts: c.parts.map((p) => p.name) } : {}),
      }));
    return json({ version: metadata.version, count: components.length, components });
  },
});
