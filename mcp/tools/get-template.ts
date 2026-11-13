import { defineTool, error, json, pieceTypeSchema } from './shared.js';

export const getTemplate = defineTool({
  name: 'get-template',
  title: 'Get a piece template',
  description:
    'Returns the template for a piece type: how to use it, the root shell (the Deck with its navigation and footer) ' +
    'and the index of every stop it can build, grouped by block, with the components each one uses. The template is a ' +
    'catalog of stops, not a piece to ship: pick the stops the piece needs, then call get-template-stops for their code.',
  inputSchema: {
    pieceType: pieceTypeSchema,
  },
  handler: ({ pieceType }, metadata) => {
    const template = metadata.templates[pieceType];
    if (!template) {
      const available = Object.keys(metadata.templates).join(', ') || 'none';
      return error(`No template for "${pieceType}" (available: ${available}).`);
    }
    return json({
      pieceType,
      component: template.component,
      docs: template.docs,
      shell: template.shell,
      stops: template.stops.map((s) => ({
        id: s.id,
        block: s.block ? `${s.block.ordinal} · ${s.block.title}` : null,
        component: s.component,
        title: s.title,
        components: s.components,
      })),
    });
  },
});
