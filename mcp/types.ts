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

export interface Metadata {
  version: string;
  storybookUrl: string;
  components: Record<string, ComponentMeta>;
  tokens: Record<TokenCategory, Token[]>;
  /** Composition rules per piece type, e.g. `talk`. */
  rules: Record<string, { source: string; content: string }>;
}
