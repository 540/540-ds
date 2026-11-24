import type { ReactNode } from 'react';
import type { ChartTone } from '../../../charts';

export const PROGRESS_RING_SIZES = ['s', 'm', 'l'] as const;
export type ProgressRingSize = (typeof PROGRESS_RING_SIZES)[number];

/** A single ring has no legend, so it takes no category colors: ink, gray or the yellow accent. */
export type ProgressRingTone = Extract<ChartTone, 'ink' | 'context' | 'accent'>;

export type ProgressRingProps = {
  /** The figure reached (72, or 340 of a goal of 500). */
  value: number;
  /** The goal, or the whole. The ring is full when value reaches it. */
  max?: number;
  /** Accessible name of the ring ("Proyectos entregados a tiempo"). The figure is added to it. */
  label: string;
  /** How the figure in the centre is written ("340 de 500"). By default, the percentage, counting up. */
  display?: string;
  /** Short text under the ring, in gray: what the figure measures. */
  caption?: ReactNode;
  /** ink (default), context for a ring that accompanies, or accent for the one that matters. */
  tone?: ProgressRingTone;
  /** s, m or l: the diameter of the ring and the size of its figure. */
  size?: ProgressRingSize;
  /** Decimals of the percentage. */
  decimals?: number;
  className?: string;
};

export const PROGRESS_RING_DEFAULTS = {
  max: 100,
  tone: 'ink',
  size: 'm',
  decimals: 0,
} as const satisfies Required<Pick<ProgressRingProps, 'max' | 'tone' | 'size' | 'decimals'>>;
