import type { ReactNode } from 'react';

export type ClosingProps = {
  id?: string;
  /** The closing sentence, in statement, three quarters wide. May contain <strong>. */
  sentence: ReactNode;
  /** Optional paragraphs under it, at half the grid, body-l secondary. */
  body?: ReactNode[];
  /** The last line, body-l primary. */
  punchline?: ReactNode;
  className?: string;
};

export const CLOSING_DEFAULTS = {
  id: 'cierre',
} as const satisfies Required<Pick<ClosingProps, 'id'>>;
