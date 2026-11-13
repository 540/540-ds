export class TagError extends Error {}

export type RenderOptions = {
  /** Folder with the built pieces (manifest.json). */
  pieces: string;
  /** Where relative image paths are read from. */
  baseDir?: string;
  lang?: string;
  /** Name used in error messages. */
  origin?: string;
};

export type RenderResult = {
  html: string;
  version: string;
  components: string[];
  islands: string[];
  scripts: boolean;
  warnings: string[];
};

export function renderTalk(source: string, options: RenderOptions): Promise<RenderResult>;
