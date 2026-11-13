import type { ReactNode } from 'react';

export const GRID_LAYOUTS = ['twelve', 'five', 'fiveCentered'] as const;
export type GridLayout = (typeof GRID_LAYOUTS)[number];

export const GRID_ALIGNS = ['stretch', 'center'] as const;
export type GridAlign = (typeof GRID_ALIGNS)[number];

export type GridProps = {
  /** twelve: the 12-column grid with spans. five: five equal columns. fiveCentered: three on top, two centered below. */
  layout?: GridLayout;
  /** Compact density: smaller text and padding inside. */
  compact?: boolean;
  /** stretch: cells as tall as the row (cards). center: each cell centered in height (a drawing and its panel). */
  align?: GridAlign;
  /** The cells: GridItems with their span in twelve; the five pieces directly in five and fiveCentered. */
  children: ReactNode;
  className?: string;
};

export type GridItemProps = {
  /** Columns of twelve from 1024 px. From 600 px spans up to 6 take half; below, everything takes the row. */
  span?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  /** The content of the cell. */
  children: ReactNode;
  className?: string;
};

export const GRID_DEFAULTS = {
  layout: 'twelve',
  align: 'stretch',
  span: 12,
} as const;
