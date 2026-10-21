import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export const SECTION_HEADER_ALIGNS = ['start', 'center'] as const;
export const SECTION_HEADER_LEVELS = ['h1', 'h2', 'h3', 'h4'] as const;

export type SectionHeaderAlign = (typeof SECTION_HEADER_ALIGNS)[number];
export type SectionHeaderLevel = (typeof SECTION_HEADER_LEVELS)[number];

export type SectionHeaderProps = {
  /** The title. Always title-l; the level is chosen apart. */
  title: ReactNode;
  /** Optional lead, one or two sentences in body-m secondary. */
  description?: ReactNode;
  /** start fills the column; center caps at half the grid and centers. */
  align?: SectionHeaderAlign;
  /** Heading level. One h1 per page; the rest of sections go down a level. */
  level?: SectionHeaderLevel;
  /** id for the title, so the Section can point to it with aria-labelledby. */
  titleId?: string;
  className?: string;
} & Omit<ComponentPropsWithoutRef<'header'>, 'className' | 'children' | 'title'>;

export const SECTION_HEADER_DEFAULTS = {
  align: 'start',
  level: 'h2',
} as const satisfies Required<Pick<SectionHeaderProps, 'align' | 'level'>>;
