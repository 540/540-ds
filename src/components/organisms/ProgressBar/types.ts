import type { ReactNode } from 'react';

export type ProgressBarProps = {
  /** Fill from 0 to 1. */
  value: number;
  /** Label at the left end ("Feb 2025"). */
  start?: ReactNode;
  /** Label at the right end ("Hoy"). */
  end?: ReactNode;
  /** How many intermediate milestones, spread evenly along the bar. */
  milestones?: number;
  /** How many of those milestones are reached: they light up from the left. */
  reached?: number;
  /** Accessible name. */
  label: string;
  className?: string;
};

export const PROGRESS_BAR_DEFAULTS = {
  milestones: 0,
  reached: 0,
} as const;
