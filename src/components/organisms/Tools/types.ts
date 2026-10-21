import type { ReactNode } from 'react';

export type Tool = {
  /** The logo file. */
  src: string;
  /** The name of the tool. */
  name: string;
  /** One short line, body-s-light secondary. Optional. */
  verdict?: ReactNode;
  /** Invert the logo in the dark theme (black logos on white). */
  invertInDark?: boolean;
  /** Optical correction: scale the logo so all look the same weight. */
  scale?: number;
};

export type ToolsProps = {
  /** The tools, in a staggered grid. */
  tools: Tool[];
  /** Columns from 1024 px: 3 or 4. */
  columns?: 3 | 4;
  className?: string;
};

export const TOOLS_DEFAULTS = {
  columns: 4,
} as const satisfies Required<Pick<ToolsProps, 'columns'>>;
