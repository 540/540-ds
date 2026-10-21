import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export const SECTION_TONES = ['default', 'raised'] as const;
export type SectionTone = (typeof SECTION_TONES)[number];

export type SectionProps = {
  /** default paints nothing; raised lifts the band one step. */
  tone?: SectionTone;
  /** What goes inside the column. */
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<'section'>, 'className' | 'children'>;

export const SECTION_DEFAULTS = {
  tone: 'default',
} as const satisfies Required<Pick<SectionProps, 'tone'>>;
