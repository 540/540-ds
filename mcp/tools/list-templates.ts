import { PIECE_TYPES } from '../piece-types.js';
import type { Metadata } from '../types.js';
import { defineTool, json } from './shared.js';

/** The template tools that have data for a piece type, so the agent never calls one that would fail. */
function toolsFor(pieceType: string, metadata: Metadata): string[] {
  const template = metadata.templates[pieceType];
  return [
    metadata.rules[pieceType] && 'get-rules',
    template && 'get-template',
    template?.patterns.length && 'get-patterns',
    template?.stops.length && 'get-template-stops',
  ].filter((t): t is string => typeof t === 'string');
}

export const listTemplates = defineTool({
  name: 'list-templates',
  title: 'List templates',
  description:
    'Lists the piece templates of the 540 design system (a talk…): for each one, the pieceType the other tools take, ' +
    'what it produces and when to use it, the words people use to ask for it (triggers), the tools that have data for ' +
    'it and its status. Call it FIRST when about to build a piece. Use a template only when the user asks for that kind ' +
    'of piece; otherwise compose with the catalog components. Names and descriptions are in Spanish.',
  inputSchema: {},
  handler: (_input, metadata) => {
    const templates = Object.entries(PIECE_TYPES).map(([pieceType, def]) => ({
      pieceType,
      name: def.name,
      description: def.description,
      triggers: def.triggers,
      tools: toolsFor(pieceType, metadata),
      status: def.status,
    }));
    return json({ version: metadata.version, count: templates.length, templates });
  },
});
