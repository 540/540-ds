import type { ReactNode } from 'react';

export const BAR_TONES = ['ink', 'context', 'accent'] as const;
export type BarTone = (typeof BAR_TONES)[number];

export type Bar = {
  /** What the row is ("España", "#3 Título del post"). */
  label: ReactNode;
  /** The figure, as a number: it sets the length. */
  value: number;
  /** How the figure is written at the tip, if not the number itself ("45,9 %"). */
  display?: ReactNode;
  /** An extra column on the right ("45,9 % · 12 altas"). */
  detail?: ReactNode;
  /** ink: the series that tells the story. context: the rest, in gray. accent: the one row that matters (one per chart). */
  tone?: BarTone;
  /** Fade the row to 30 %, to point at the others. */
  dimmed?: boolean;
};

export type BarsProps = {
  /** The rows, in the order they are read (usually from the biggest). */
  rows: Bar[];
  /** Accessible name of the chart ("Suscriptores por país"). */
  label: string;
  /** Optional column headings, in micro: the label, the figure and the detail. */
  header?: {
    /** Heading of the label column. */
    label: ReactNode;
    /** Heading of the figure column. */
    value?: ReactNode;
    /** Heading of the detail column. */
    detail?: ReactNode;
  };
  /** The value of a full bar. By default, the biggest row. */
  max?: number;
  /** Text after every figure when there is no display (" %"). */
  unit?: string;
  /** Decimals for the figures written from the number. */
  decimals?: number;
  className?: string;
};

export const BARS_DEFAULTS = {
  unit: '',
  decimals: 0,
} as const satisfies Required<Pick<BarsProps, 'unit' | 'decimals'>>;
