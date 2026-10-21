import type { ReactNode } from 'react';

export type CaseItemProps = {
  /** The photo, always cropped to 2:1. The image is half the piece. */
  src: string;
  /** Alt of the photo. Usually "" because the title says what it is. */
  alt?: string;
  /** The name of the case. */
  title: ReactNode;
  /** One sentence about what the case was. */
  description?: ReactNode;
  /** With href the whole piece is one link named by the title; without it, nothing is pressed. */
  href?: string;
  /** Heading level of the title. */
  level?: 'h2' | 'h3' | 'h4';
  className?: string;
};

export const CASE_ITEM_DEFAULTS = {
  alt: '',
  level: 'h3',
} as const satisfies Required<Pick<CaseItemProps, 'alt' | 'level'>>;
