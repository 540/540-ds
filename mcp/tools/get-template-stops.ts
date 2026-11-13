import { z } from 'zod';
import { defineTool, error, json, pieceTypeSchema } from './shared.js';

export const getTemplateStops = defineTool({
  name: 'get-template-stops',
  title: 'Get template stops',
  description:
    'Returns the source of some stops of a template, ready to copy: the JSX of each stop, the local constants and ' +
    'functions it needs, and the sample images it uses (replace those with the piece\'s own). Change only the copy ' +
    'and the images; keep the components and props. Get the stop ids from get-template or get-patterns.',
  inputSchema: {
    pieceType: pieceTypeSchema,
    stops: z.array(z.string()).min(1).max(12).describe('Stop ids, e.g. ["portada", "cifras", "cita"]. Up to 12 per call.'),
  },
  handler: ({ pieceType, stops: ids }, metadata) => {
    const template = metadata.templates[pieceType];
    if (!template) return error(`No template for "${pieceType}".`);

    const byId = new Map(template.stops.map((s) => [s.id, s]));
    const missing = ids.filter((id) => !byId.has(id));
    if (missing.length === ids.length) {
      return error(`No stops ${missing.map((m) => `"${m}"`).join(', ')} in the ${pieceType} template. Call get-template for the list.`);
    }
    return json({
      pieceType,
      stops: ids.flatMap((id) => {
        const s = byId.get(id);
        if (!s) return [];
        return [
          {
            id: s.id,
            block: s.block,
            components: s.components,
            code: s.code,
            ...(s.dependencies ? { dependencies: s.dependencies } : {}),
            ...(Object.keys(s.sampleAssets).length ? { sampleAssets: s.sampleAssets } : {}),
          },
        ];
      }),
      ...(missing.length ? { missing } : {}),
    });
  },
});
