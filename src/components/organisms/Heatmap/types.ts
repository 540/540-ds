import type { ChartTone } from '../../../charts';

export type HeatmapProps = {
  /** The names of the rows, top to bottom ("Lun", "Mar"…). */
  rows: string[];
  /** The names of the columns, left to right ("0 h", "1 h"…). With more than 12, only every other one (or every third…) is written. */
  columns: string[];
  /** One list of figures per row, one figure per column, in the same order. */
  values: number[][];
  /** Accessible name of the chart ("Visitas por día y hora"). */
  label: string;
  /** Color of the cells: ink (default) or accent (when the map is the one thing that matters on the slide). */
  tone?: ChartTone;
  /** Figure that gets the faintest cell. By default, the lowest value. */
  min?: number;
  /** Figure that gets the full color. By default, the highest value. */
  max?: number;
  /** Text after every figure (" %"). */
  unit?: string;
  /** Decimals of the figures. */
  decimals?: number;
  /** The words at both ends of the color key ("Poca", "Mucha"). By default, the figures `min` and `max`. */
  scale?: { low: string; high: string };
  className?: string;
};

export const HEATMAP_DEFAULTS = {
  tone: 'ink',
  unit: '',
  decimals: 0,
} as const satisfies Required<Pick<HeatmapProps, 'tone' | 'unit' | 'decimals'>>;
