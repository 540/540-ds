import type { ChartTone } from '../../../charts';

export const BAR_SERIES_MODES = ['grouped', 'stacked'] as const;
export type BarSeriesMode = (typeof BAR_SERIES_MODES)[number];

export type BarSeriesRow = {
  /** What the row is ("Primera categoría"). */
  label: string;
  /** One figure per series, in the same order as `series`. */
  values: number[];
};

export type BarSeriesSerie = {
  /** Name of the series, in the legend and the data table ("2025"). */
  label: string;
  /** ink (default for the first), context (default for the rest) or accent (one per chart). */
  tone?: ChartTone;
};

export type BarSeriesProps = {
  /** The rows, in the order they are read. */
  rows: BarSeriesRow[];
  /** One to three series (ink, gray and one yellow): the name and color of each figure in a row. */
  series: BarSeriesSerie[];
  /** Accessible name of the chart ("Personas por categoría y año"). */
  label: string;
  /** grouped: one thin bar per series, one under the other. stacked: one bar per row split into its series, with the total at the tip. */
  mode?: BarSeriesMode;
  /** The value of a full bar. By default, the biggest figure (grouped) or the biggest total (stacked). */
  max?: number;
  /** Text after every figure (" %"). */
  unit?: string;
  /** Decimals of the figures. */
  decimals?: number;
  className?: string;
};

export const BAR_SERIES_DEFAULTS = {
  mode: 'grouped',
  unit: '',
  decimals: 0,
} as const satisfies Required<Pick<BarSeriesProps, 'mode' | 'unit' | 'decimals'>>;
