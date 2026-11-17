/**
 * The piece types the MCP serves: the single source for the `pieceType` enum of the tools, for
 * list-templates and for which rules file and template folder the metadata build reads.
 * To add a piece type, add an entry here; see "Añadir un tipo de pieza" in mcp/README.md.
 */

export type PieceTypeStatus = 'stable' | 'draft';

export interface PieceTypeDef {
  /** Readable name, in Spanish, e.g. `Charla`. */
  name: string;
  /** What piece it produces and when to use it, in Spanish. One or two sentences. */
  description: string;
  /** Words and phrases people use to ask for it, lowercase: the agent uses a template only when asked for. */
  triggers: string[];
  status: PieceTypeStatus;
  /** Its rules, in src/docs. */
  rulesFile: string;
  /** Its template folder, in src/templates. */
  templateDir: string;
}

export const PIECE_TYPES = {
  talk: {
    name: 'Charla',
    description:
      'Una charla de 540 para proyectar: portada, de uno a seis bloques numerados con foto y cierre, entre 12 y 30 paradas. ' +
      'Úsala cuando pidan una charla, una presentación o unas slides para contar en público; no para posts, stories, infografías ni .pptx.',
    triggers: ['charla', 'presentación', 'slides', 'diapositivas', 'deck', 'ponencia', 'talk', 'presentation'],
    status: 'stable',
    rulesFile: 'normas-charlas.md',
    templateDir: 'TalkTemplate',
  },
} as const satisfies Record<string, PieceTypeDef>;

export type PieceType = keyof typeof PIECE_TYPES;

export const PIECE_TYPE_IDS = Object.keys(PIECE_TYPES) as [PieceType, ...PieceType[]];
