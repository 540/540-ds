import type { ReactNode } from 'react';

export type CardListProps = {
  /** Only Card in its row variant: it is the only thing that brings the line between bands. */
  children: ReactNode;
  className?: string;
};
