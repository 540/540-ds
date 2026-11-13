import { z } from 'zod';
import { defineTool, error, text } from './shared.ts';

/** Every piece type the 540 skill makes; rules exist only for those already written. */
export const PIECE_TYPES = ['talk', 'report', 'dashboard', 'post'] as const;

export const getRules = defineTool({
  name: 'get-rules',
  title: 'Get composition rules',
  description:
    'Returns the mandatory composition rules for a piece type (Markdown, in Spanish): structure, which component ' +
    'for each need, what is forbidden and the final checklist. Call it BEFORE building a piece and follow it as hard ' +
    'rules. Today only "talk" has rules.',
  inputSchema: {
    pieceType: z.enum(PIECE_TYPES).describe('talk (presentation), report, dashboard or post (social media).'),
  },
  handler: ({ pieceType }, metadata) => {
    const rules = metadata.rules[pieceType];
    if (!rules) {
      const available = Object.keys(metadata.rules).join(', ') || 'none';
      return error(`There are no rules for "${pieceType}" yet (available: ${available}). The design system cannot build this piece type yet.`);
    }
    return text(`Source: ${rules.source} (design system ${metadata.version})\n\n${rules.content}`);
  },
});
