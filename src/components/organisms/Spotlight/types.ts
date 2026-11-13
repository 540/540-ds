import type { ReactNode } from 'react';

export type SpotlightProps = {
  /** The pieces, one after another; only the one in the center of the window stays lit. */
  children: ReactNode;
  className?: string;
};
