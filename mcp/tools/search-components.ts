import { z } from 'zod';
import { defineTool, json, summary } from './shared.js';

/** Accents off and lowercase, so "cita" finds "Cita" and "parada" finds "parada". */
const fold = (s: string) =>
  s
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase();

export const searchComponents = defineTool({
  name: 'search-components',
  title: 'Search components',
  description:
    'Finds the components that fit a need, searching names, descriptions, props and design sheets. ' +
    'Use it when you know what you want to show but not which component does it, e.g. "quote", "big number", ' +
    '"timeline", "cita", "cifra". The sheets are in Spanish, so Spanish words also match.',
  inputSchema: {
    query: z.string().min(2).describe('What you need, in a few words (English or Spanish).'),
  },
  handler: ({ query }, metadata) => {
    const terms = fold(query).split(/\s+/).filter((t) => t.length > 1);
    const results = Object.values(metadata.components)
      .map((c) => {
        const name = fold([c.name, ...c.parts.map((p) => p.name)].join(' '));
        const description = fold([c.description, ...c.parts.map((p) => p.description)].join(' '));
        const props = fold([...c.props, ...c.parts.flatMap((p) => p.props)].map((p) => `${p.name} ${p.description ?? ''}`).join(' '));
        const docs = fold(c.docs);
        let score = 0;
        for (const t of terms) {
          if (name.includes(t)) score += 10;
          if (description.includes(t)) score += 4;
          if (props.includes(t)) score += 2;
          score += Math.min(docs.split(t).length - 1, 5);
        }
        return { c, score };
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map(({ c }) => ({ name: c.name, level: c.level, description: summary(c.description) ?? summary(c.parts[0]?.description ?? null) }));

    return json({ query, results, ...(results.length ? {} : { hint: 'Nothing matched. Call list-components to see everything.' }) });
  },
});
