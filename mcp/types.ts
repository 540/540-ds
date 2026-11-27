/**
 * Shape of mcp/metadata.json, written by scripts/build-mcp-metadata.ts and served by the MCP tools.
 */

export type ComponentLevel = 'atom' | 'molecule' | 'organism' | 'template';

export interface PropDef {
  name: string;
  /** TypeScript type as text, e.g. `'primary' | 'outline' | 'ghost'`. */
  type: string;
  required: boolean;
  /** Value from the component's *_DEFAULTS constant, or null when it has none. */
  default: unknown;
  /** JSDoc of the prop. */
  description: string | null;
}

export interface StoryDef {
  /** Export name in the stories file, e.g. `ConIcono`. */
  exportName: string;
  /** Name shown in Storybook, e.g. `Con icono`. */
  name: string;
  /** Storybook story id, e.g. `átomos-button--con-icono`. */
  id: string;
  url: string;
  description: string | null;
  /** Source of the story object: shows how the component is composed. */
  code: string;
}

/** A secondary component exported from the same folder (GridItem, SchemaFrame…). */
export interface ComponentPart {
  name: string;
  description: string | null;
  props: PropDef[];
}

export interface ComponentMeta {
  /** Lowercase folder name, e.g. `button`. */
  id: string;
  /** Exported name, e.g. `Button`. */
  name: string;
  level: ComponentLevel;
  /** Folder in the repo, e.g. `src/components/atoms/Button`. */
  path: string;
  storybookTitle: string | null;
  /** The component's Docs page in the published Storybook. */
  docsUrl: string | null;
  /** JSDoc of the component. */
  description: string | null;
  props: PropDef[];
  parts: ComponentPart[];
  /** Exported constants with the allowed values (BUTTON_VARIANTS…). */
  constants: Record<string, unknown>;
  /** Other exported values: the `schema` class vocabulary, hooks… */
  helpers: Array<{ name: string; description: string | null; keys: string[] | null }>;
  stories: StoryDef[];
  /** _docs/<Name>.md, in Spanish. */
  docs: string;
}

export type TokenCategory = 'color' | 'measure' | 'typography';

export interface TokenValue {
  /** As written in the CSS, e.g. `var(--540-neutral-950)`. */
  value: string;
  /** With the primitives resolved, e.g. `#0d0d0d`. */
  resolved: string;
}

export interface Token extends TokenValue {
  name: string;
  category: TokenCategory;
  /** Group comment above it in the CSS, e.g. `Text`. */
  group: string | null;
  note: string | null;
  /** Value in the dark theme, when it changes. */
  dark?: TokenValue;
  /** Value from 1024px, when it changes. */
  desktop?: TokenValue;
  /** Value in the projection scale (talks), when it changes. */
  projection?: TokenValue;
}

/** One stop of a template: a direct child of its Deck, ready to copy. */
export interface StopDef {
  /** The stop's anchor, e.g. `cifras`. */
  id: string;
  /** The numbered block it belongs to; null for the cover and the closing. */
  block: { ordinal: string; title: string } | null;
  /** Root component, e.g. `Slide`, `Quote`, `BlockTitle`. */
  component: string;
  /** Catalog components used anywhere in the stop, helpers included. */
  components: string[];
  title: string | null;
  /** JSX source of the stop. */
  code: string;
  /** Source of the template's local constants and functions the stop uses. */
  dependencies: string;
  /** Sample images it uses: identifier → file. Replace them with the piece's own. */
  sampleAssets: Record<string, string>;
}

/** A row of the rules' patterns table: what to tell → which piece → what never to do. */
export interface PatternDef {
  need: string;
  piece: string;
  never: string;
  components: string[];
  /** Template stops that show it. */
  stops: string[];
}

export interface TemplateMeta {
  pieceType: string;
  /** Template component, e.g. `TalkTemplate`. */
  component: string;
  path: string;
  /** _docs/<Template>.md, in Spanish. */
  docs: string;
  /** The root (Deck) with its props, and the constants it uses. */
  shell: { code: string; dependencies: string };
  stops: StopDef[];
  patterns: PatternDef[];
}

/** A Markdown file of src/docs served as is: its path in the repo and its text, without the leading comment. */
export interface DocFile {
  source: string;
  content: string;
}

/** One file of a skill: SKILL.md or a supporting file, served as `skill://<skill>/<path>`. */
export interface SkillFile {
  /** Relative to the skill's folder, with forward slashes, e.g. `SKILL.md`, `referencias/react.md`. */
  path: string;
  mimeType: string;
  content: string;
  /** `sha256:<64 hex>` of the content, as the MCP skills extension asks. */
  digest: string;
  /** Bytes, UTF-8. */
  size: number;
}

/** An Agent Skill served by the MCP, from src/docs/skills/<name>/. */
export interface SkillMeta {
  /** The folder name, equal to the `name` of its frontmatter. */
  name: string;
  description: string;
  /** The SKILL.md frontmatter, its fields as written. */
  frontmatter: Record<string, string>;
  /** The skill's folder, e.g. `src/docs/skills/540-ds`. */
  source: string;
  /** SKILL.md first, then the supporting files by path. */
  files: SkillFile[];
}

/** A photo of the image library, from src/images/catalog.json. */
export interface LibraryImage {
  /** File name without extension, e.g. `carretera-costa-atardecer`. */
  id: string;
  /** What goes in a photo's `src`: `biblioteca:<id>`. */
  ref: string;
  /** `imagen`: a scene that tells something; `textura`: an abstract background. */
  kind: 'imagen' | 'textura';
  /** Themes it fits, in Spanish, e.g. `carretera`, `proceso`, `hoja de ruta`. */
  topics: string[];
  /** What it shows, in Spanish: the base for its `alt`. */
  description: string;
  tone: 'oscura' | 'clara' | 'cálida' | 'neutra';
  orientation: 'horizontal' | 'vertical';
  width: number;
  height: number;
  author: string;
  /** The original photo. */
  source: string;
  license: string;
  /** The photo in the published Storybook, to look at it. */
  preview: string;
}

export interface Metadata {
  version: string;
  storybookUrl: string;
  /** What every client reads on connecting, from src/docs/instrucciones-mcp.md. */
  instructions: DocFile;
  /** 540's design criteria, from src/docs/diseno.md: served by get-design-guide. */
  designGuide: DocFile;
  /** The skills in src/docs/skills/: served as skill:// resources, by skills/list and skills/get, and by get-skill. */
  skills: SkillMeta[];
  components: Record<string, ComponentMeta>;
  tokens: Record<TokenCategory, Token[]>;
  /** Composition rules per piece type, e.g. `talk`. */
  rules: Record<string, DocFile>;
  /** Template per piece type, split into stops. */
  templates: Record<string, TemplateMeta>;
  /** The image library, from src/images/catalog.json: served by search-images. */
  images: LibraryImage[];
}
