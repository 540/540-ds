import { z } from 'zod';
import { defineTool, findComponent, json, notFound } from './shared.ts';

export const getComponentStories = defineTool({
  name: 'get-component-stories',
  title: 'Get component stories',
  description:
    'Returns the documented variants of a component: name, what each one shows and its Storybook link. ' +
    'With includeCode, also the story source, to see how the component is composed. The story code wraps ' +
    'examples in Storybook-only layout helpers with inline styles: copy the component usage, never those wrappers.',
  inputSchema: {
    component: z.string().describe('Component or part name, e.g. "Deck". Case-insensitive.'),
    includeCode: z.boolean().default(false).describe('Include the source of each story. Default false.'),
  },
  handler: ({ component: query, includeCode }, metadata) => {
    const match = findComponent(metadata, query);
    if (!match) return notFound(metadata, query);
    const c = match.component;
    return json({
      name: c.name,
      stories: c.stories.map((s) => ({
        name: s.name,
        description: s.description,
        url: s.url,
        ...(includeCode ? { code: s.code } : {}),
      })),
    });
  },
});
