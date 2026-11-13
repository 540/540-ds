import type { ReactNode } from 'react';

export type QuoteProps = {
  /** The stop's anchor. */
  id: string;
  /** The quoted sentence, in statement. */
  sentence: ReactNode;
  /** Who said it. */
  author: ReactNode;
  /** The band tone; quotes usually go raised. */
  tone?: 'default' | 'raised';
  className?: string;
};

export const QUOTE_DEFAULTS = {
  tone: 'raised',
} as const satisfies Required<Pick<QuoteProps, 'tone'>>;
