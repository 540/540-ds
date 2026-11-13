import { z } from 'zod';
import { defineTool, findComponent, notFound, text } from './shared.ts';

export const getComponentDocs = defineTool({
  name: 'get-component-docs',
  title: 'Get component docs',
  description:
    "Returns the component's design sheet (Markdown, in Spanish): anatomy, when to use it and when not, " +
    'variants, states and the decisions behind them. Read it before using a component for the first time.',
  inputSchema: {
    component: z.string().describe('Component or part name, e.g. "Card". Case-insensitive.'),
  },
  handler: ({ component: query }, metadata) => {
    const match = findComponent(metadata, query);
    if (!match) return notFound(metadata, query);
    const c = match.component;
    const header = `# ${c.name}\n\nStorybook: ${c.docsUrl ?? '—'}\n\n`;
    return text(header + (c.docs || '(No design sheet for this component.)'));
  },
});
