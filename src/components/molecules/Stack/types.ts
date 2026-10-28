import type { ReactNode } from 'react';

export const STACK_GAPS = ['s', 'm', 'l'] as const;
export const STACK_MEASURES = ['none', 'half', 'wide'] as const;

export type StackGap = (typeof STACK_GAPS)[number];
export type StackMeasure = (typeof STACK_MEASURES)[number];

export type StackProps = {
  /** The air between pieces: s (16), m (32) or l (48). */
  gap?: StackGap;
  /** Cap the whole pile at half the grid or three quarters, centered. */
  measure?: StackMeasure;
  /** The pieces, one under the other. */
  children: ReactNode;
  className?: string;
};

export const STACK_DEFAULTS = {
  gap: 'l',
  measure: 'none',
} as const satisfies Required<Pick<StackProps, 'gap' | 'measure'>>;
