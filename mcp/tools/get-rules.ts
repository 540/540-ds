import { defineTool, error, pieceTypeSchema, text } from './shared.js';

export const getRules = defineTool({
  name: 'get-rules',
  title: 'Get composition rules',
  description:
    'Returns the mandatory composition rules for a piece type (Markdown, in Spanish): structure, which component ' +
    'for each need, what is forbidden and the final checklist. Call it BEFORE building a piece and follow it as hard ' +
    'rules.',
  inputSchema: {
    pieceType: pieceTypeSchema,
  },
  handler: ({ pieceType }, metadata) => {
    const rules = metadata.rules[pieceType];
    if (!rules) {
      const available = Object.keys(metadata.rules).join(', ') || 'none';
      return error(`No rules for "${pieceType}" (available: ${available}).`);
    }
    return text(`Source: ${rules.source} (design system ${metadata.version})\n\n${rules.content}`);
  },
});
