import type { ReactNode } from 'react';

export type StatementsProps = {
  /** The stop's anchor. */
  id?: string;
  /** The sentences, in order. Each one is a stop of the journey. */
  sentences: ReactNode[];
  /** Show the ordinal ("01 ") before each sentence. Decorative. */
  numbered?: boolean;
  className?: string;
};

export const STATEMENTS_DEFAULTS = {
  id: 'tesis',
  numbered: true,
} as const satisfies Required<Pick<StatementsProps, 'id' | 'numbered'>>;
