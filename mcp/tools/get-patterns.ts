import { z } from 'zod';
import { defineTool, error, json, pieceTypeSchema } from './shared.ts';

const fold = (s: string) =>
  s
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase();

export const getPatterns = defineTool({
  name: 'get-patterns',
  title: 'Get composition patterns',
  description:
    'Returns the patterns of a piece type, from its rules: for each thing to tell (a quote, figures, a timeline…), ' +
    'the piece that tells it, what never to do instead, and the template stops that show it. Use it to choose the ' +
    'component for each part of the content; then get-template-stops for the code. The needs are in Spanish.',
  inputSchema: {
    pieceType: pieceTypeSchema,
    need: z.string().optional().describe('Only patterns whose need or piece mentions this, e.g. "cita", "cifras", "Timeline". Omit for all.'),
  },
  handler: ({ pieceType, need }, metadata) => {
    const template = metadata.templates[pieceType];
    if (!template?.patterns.length) return error(`No patterns for "${pieceType}".`);

    const terms = need ? fold(need).split(/\s+/).filter((t) => t.length > 2) : [];
    const patterns = template.patterns.filter((p) => !terms.length || terms.some((t) => fold(`${p.need} ${p.piece}`).includes(t)));
    return json({
      pieceType,
      patterns,
      ...(patterns.length ? {} : { hint: 'No pattern matched. Call get-patterns without need to see them all.' }),
    });
  },
});
