import { z } from 'zod';
import type { LibraryImage } from '../types.js';
import { defineTool, json } from './shared.js';

const fold = (s: string) =>
  s
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase();

/** Spanish plural and gender endings, so `caminos` finds `camino` and `oscuras` finds `oscura`. */
const stem = (word: string) => word.replace(/(es|s)$/, '').replace(/[ao]$/, '');

function score(image: LibraryImage, terms: string[]): number {
  const topics = image.topics.map(fold);
  const words = fold(`${image.id.replace(/-/g, ' ')} ${image.description}`).split(/[^a-z0-9ñ]+/);
  let total = 0;
  for (const term of terms) {
    const t = stem(term);
    if (topics.some((topic) => topic === term || stem(topic) === t)) total += 3;
    else if (topics.some((topic) => topic.split(' ').some((w) => stem(w) === t))) total += 2;
    else if (words.some((w) => w.length > 2 && stem(w) === t)) total += 1;
  }
  return total;
}

export const searchImages = defineTool({
  name: 'search-images',
  title: 'Search the image library',
  description:
    "Finds photos in 540's image library by theme. Every photo a piece uses comes from here: write its `ref` " +
    '(`biblioteca:<id>`) as the `src` of the photo and base the `alt` on its `description`. `imagen` photos are scenes ' +
    '(roads, landscapes, architecture, technology, payments); `textura` photos are abstract backgrounds (light, blur, ' +
    'lines). Themes and descriptions are in Spanish: search with Spanish words for what the part of the piece is ' +
    'about (e.g. "camino proceso", "pagos", "arquitectura", "luz"). Pass the ids already used in `exclude`: a photo ' +
    'never repeats in a piece.',
  inputSchema: {
    query: z.string().optional().describe('Spanish words for the theme, e.g. "hoja de ruta", "equipo", "arquitectura". Omit to list the whole library.'),
    kind: z.enum(['imagen', 'textura']).optional().describe('`imagen` (a scene) or `textura` (an abstract background). Omit for both.'),
    orientation: z.enum(['horizontal', 'vertical']).optional().describe('Covers and block titles (2:1) need `horizontal`.'),
    tone: z.enum(['oscura', 'clara', 'cálida', 'neutra']).optional(),
    exclude: z.array(z.string()).optional().describe('Ids or refs already used in the piece.'),
    limit: z.number().int().min(1).max(60).default(8),
  },
  handler: ({ query, kind, orientation, tone, exclude, limit }, metadata) => {
    const skip = new Set((exclude ?? []).map((id) => id.replace(/^biblioteca:/, '')));
    const terms = query ? fold(query).split(/[^a-z0-9ñ]+/).filter((t) => t.length > 2 && !['del', 'las', 'los', 'con', 'para', 'una', 'que'].includes(t)) : [];
    const pool = metadata.images.filter(
      (image) => !skip.has(image.id) && (!kind || image.kind === kind) && (!orientation || image.orientation === orientation) && (!tone || image.tone === tone),
    );
    const ranked = terms.length
      ? pool
          .map((image) => ({ image, score: score(image, terms) }))
          .filter((r) => r.score > 0)
          .sort((a, b) => b.score - a.score || a.image.id.localeCompare(b.image.id))
          .map((r) => r.image)
      : pool;
    const images = ranked.slice(0, limit).map(({ id, ref, kind, topics, description, tone, orientation, width, height, author, preview }) => ({
      id,
      ref,
      kind,
      topics,
      description,
      tone,
      orientation,
      size: `${width}×${height}`,
      author,
      preview,
    }));
    return json({
      total: ranked.length,
      images,
      ...(images.length
        ? {}
        : { hint: `No photo matched. Try broader words or no filters; the library has ${metadata.images.length} photos, with topics such as ${[...new Set(metadata.images.flatMap((i) => i.topics))].slice(0, 20).join(', ')}.` }),
    });
  },
});
