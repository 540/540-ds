import type { ReactNode } from 'react';
import type { ChartTone } from '../../../charts';

export type DumbbellRow = {
  /** What the row is ("Primera categoría"). */
  label: string;
  /** The figure before: the gray dot. */
  before: number;
  /** The figure after: the colored dot, written at the right. */
  after: number;
  /** How the after figure is written, if not the number itself ("4,2 %"). */
  display?: ReactNode;
};

export type DumbbellProps = {
  /** The rows, in the order they are read. */
  rows: DumbbellRow[];
  /** The names of the two moments, for the legend and the data table ("2025", "2026"). */
  labels: {
    /** Name of the before figure. */
    before: string;
    /** Name of the after figure. */
    after: string;
  };
  /** Accessible name of the chart ("Satisfacción antes y después"). */
  label: string;
  /** Lowest value of the scale. By default, a round number under the lowest figure. */
  min?: number;
  /** Highest value of the scale. By default, a round number above the highest figure. */
  max?: number;
  /** Text after every figure (" %"). */
  unit?: string;
  /** Decimals of the figures. */
  decimals?: number;
  /** Color of the after dot: ink (default) or accent (one per chart). The before dot is always gray. */
  tone?: ChartTone;
  /** Write the difference (after minus before) next to the after figure, in gray. */
  change?: boolean;
  className?: string;
};

export const DUMBBELL_DEFAULTS = {
  unit: '',
  decimals: 0,
  tone: 'ink',
  change: true,
} as const satisfies Required<Pick<DumbbellProps, 'unit' | 'decimals' | 'tone' | 'change'>>;
