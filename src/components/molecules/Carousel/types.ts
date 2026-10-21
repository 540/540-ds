import type { ReactNode } from 'react';

export const CAROUSEL_CONTROLS = ['dots', 'row', 'sides'] as const;
export type CarouselControls = (typeof CAROUSEL_CONTROLS)[number];

export type CarouselProps = {
  /** The pieces, one per slot. */
  items: ReactNode[];
  /** Accessible name of the carousel. */
  label: string;
  /** dots: centered dots. row: dots and arrows in a row. sides: arrows over the strip, no dots. */
  controls?: CarouselControls;
  /** A header above the strip; with it, the controls move up to its row (dots alone do not exist there). */
  header?: ReactNode;
  /** Width of each slot, as CSS. Default: half the grid from 600 px, full width below. */
  itemWidth?: string;
  /** Advance by itself every n milliseconds. Off by default; pauses on hover and focus. */
  autoplay?: number;
  /** Word for the dot names: "Página 2 de 5". */
  itemLabel?: string;
  className?: string;
};

export const CAROUSEL_DEFAULTS = {
  controls: 'dots',
  itemLabel: 'Página',
} as const satisfies Required<Pick<CarouselProps, 'controls' | 'itemLabel'>>;
