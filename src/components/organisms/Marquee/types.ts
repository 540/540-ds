import type { ReactNode } from 'react';

export type MarqueeProps = {
  /** The pieces that scroll. They are repeated to loop. */
  items: ReactNode[];
  /** Seconds for a full loop. */
  duration?: number;
  className?: string;
};

export const MARQUEE_DEFAULTS = {
  duration: 40,
} as const satisfies Required<Pick<MarqueeProps, 'duration'>>;
