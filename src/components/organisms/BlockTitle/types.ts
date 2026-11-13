import type { ReactNode } from 'react';

export type BlockTitleProps = {
  /** The stop's anchor ("#bloque-1"). The title takes it too, with -title. */
  id: string;
  /** The ordinal of the block ("01"). Decorative. */
  ordinal?: string;
  /** The title. */
  title: ReactNode;
  /** The photo that goes right behind the title, 2:1. Not a stop: it goes with its title. */
  photo?: {
    /** Path or URL of the photo. */
    src: string;
    /** What the photo shows, in words. */
    alt: string;
  };
  className?: string;
};

export const BLOCK_TITLE_DEFAULTS = {} as const;
