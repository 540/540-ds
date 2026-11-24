import type { ChartTone } from '../../../charts';

export type ScatterPoint = {
  /** Horizontal figure. */
  x: number;
  /** Vertical figure. */
  y: number;
  /** Name of the point, in the tooltip and the data table ("Tienda 4"). The one named in `highlight` is written next to it. */
  label?: string;
};

export type ScatterGroup = {
  /** Name of the group, in the legend and the tooltip ("Norte"). */
  label: string;
  /** The points of the group. */
  points: ScatterPoint[];
  /** ink (default for the first) or context (default for the rest). The accent is for one point: see `highlight`. */
  tone?: ChartTone;
};

export type ScatterProps = {
  /** One to three groups of points (ink, gray and one yellow). With more than one, a legend appears. */
  groups: ScatterGroup[];
  /** Accessible name of the chart ("Precio frente a ventas"). */
  label: string;
  /** Title of the horizontal axis ("Precio"). */
  xLabel: string;
  /** Title of the vertical axis ("Ventas"). */
  yLabel: string;
  /** The `label` of the one point that matters: drawn in yellow, larger, with its name always written. One per chart. */
  highlight?: string;
  /** Lowest value of the horizontal axis. By default, a round number below the lowest value. */
  xMin?: number;
  /** Highest value of the horizontal axis. By default, a round number above the highest value. */
  xMax?: number;
  /** Lowest value of the vertical axis. By default, a round number below the lowest value. */
  yMin?: number;
  /** Highest value of the vertical axis. By default, a round number above the highest value. */
  yMax?: number;
  /** Text after every horizontal figure (" €"). */
  xUnit?: string;
  /** Text after every vertical figure (" %"). */
  yUnit?: string;
  /** Decimals of the figures, on both axes. */
  decimals?: number;
  className?: string;
};

export const SCATTER_DEFAULTS = {
  xUnit: '',
  yUnit: '',
  decimals: 0,
} as const satisfies Required<Pick<ScatterProps, 'xUnit' | 'yUnit' | 'decimals'>>;
