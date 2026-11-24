import type { ChartTone } from '../../../charts';

export type LineSeries = {
  /** Name of the series, in the legend and the tooltip ("Altas"). */
  label: string;
  /** One figure per category, in the same order. */
  values: number[];
  /** ink (default for the first), context (default for the rest) or accent (one per chart). */
  tone?: ChartTone;
  /** Dashed: a forecast or a target, not a measure. */
  dashed?: boolean;
};

export type LineChartProps = {
  /** The points on the horizontal axis, in order ("Ene", "Feb"…). */
  categories: string[];
  /** One to three series (ink, gray and one yellow). */
  series: LineSeries[];
  /** Accessible name of the chart ("Altas por mes"). */
  label: string;
  /** Fill the area under each line, faint: for volumes rather than trends. */
  area?: boolean;
  /** Lowest value of the vertical axis. By default 0, or the lowest value if it is negative. */
  min?: number;
  /** Highest value of the vertical axis. By default, a round number above the highest value. */
  max?: number;
  /** Text after every figure (" %"). */
  unit?: string;
  /** Decimals of the figures. */
  decimals?: number;
  className?: string;
};

export const LINE_CHART_DEFAULTS = {
  area: false,
  unit: '',
  decimals: 0,
} as const satisfies Required<Pick<LineChartProps, 'area' | 'unit' | 'decimals'>>;
