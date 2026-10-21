import type { ReactNode } from 'react';

export type PunchlineProps = {
  /** The sentence, in statement at three quarters. */
  sentence: ReactNode;
  /** The transition to what comes next, body-m secondary. */
  transition?: ReactNode;
  /** inside: at the end of a slide, under a line. standalone: its own stop. */
  placement?: 'inside' | 'standalone';
  /** Only for standalone. */
  id?: string;
  className?: string;
};

export const PUNCHLINE_DEFAULTS = {
  placement: 'inside',
} as const satisfies Required<Pick<PunchlineProps, 'placement'>>;
