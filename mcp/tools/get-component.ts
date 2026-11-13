import { z } from 'zod';
import { defineTool, findComponent, json, notFound } from './shared.ts';

export const getComponent = defineTool({
  name: 'get-component',
  title: 'Get a component',
  description:
    'Returns the API of one component: description, props (type, required, default, what each one is for), ' +
    'its parts (GridItem, SchemaFrame…), the constants with the allowed values and the names of its stories. ' +
    'Use only these props: className and style do not exist for pieces. For when and how to use it, call get-component-docs.',
  inputSchema: {
    component: z.string().describe('Component or part name, e.g. "Button", "BlockTitle", "GridItem". Case-insensitive.'),
  },
  handler: ({ component: query }, metadata) => {
    const match = findComponent(metadata, query);
    if (!match) return notFound(metadata, query);
    const c = match.component;
    return json({
      name: c.name,
      ...(match.part ? { requested: match.part, note: `${match.part} is a part of ${c.name}; its props are under parts.` } : {}),
      level: c.level,
      description: c.description,
      props: c.props,
      parts: c.parts,
      ...(Object.keys(c.constants).length ? { constants: c.constants } : {}),
      ...(c.helpers.length ? { helpers: c.helpers } : {}),
      stories: c.stories.map((s) => s.name),
      docsUrl: c.docsUrl,
      path: c.path,
    });
  },
});
