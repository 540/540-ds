import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export const SLIDE_TONES = ['default', 'raised'] as const;
export type SlideTone = (typeof SLIDE_TONES)[number];

export type SlideProps = {
  /** The id: the stop's anchor (#portada, #cierre…). */
  id: string;
  /** default paints nothing; raised lifts the band one step (stories, objections, quotes). */
  tone?: SlideTone;
  /** Fill the screen (min-height 100svh) and center the content. Off for block titles that go with a photo. */
  full?: boolean;
  /** The content, centered on a 16:9 stage inside the column. */
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<'section'>, 'id' | 'className' | 'children'>;

export const SLIDE_DEFAULTS = {
  tone: 'default',
  full: true,
} as const satisfies Required<Pick<SlideProps, 'tone' | 'full'>>;
