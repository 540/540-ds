import { defineTool, error, text } from './shared.js';

export const getDesignGuide = defineTool({
  name: 'get-design-guide',
  title: 'Get design guide',
  description:
    "Returns 540's design guide (Markdown, in Spanish): the criteria for a good piece of any kind, templated or free " +
    '(what to tell first, hierarchy, rhythm, images, tone, reference pieces). The rules of a piece type say what is ' +
    'forbidden; this guide says how to choose among what is allowed. Call it FIRST, before designing any piece.',
  inputSchema: {},
  handler: (_input, metadata) => {
    const guide = metadata.designGuide;
    if (!guide.content) return error(`No design guide yet (expected at ${guide.source}).`);
    return text(`Source: ${guide.source} (design system ${metadata.version})\n\n${guide.content}`);
  },
});
