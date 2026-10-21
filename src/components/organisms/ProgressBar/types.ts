import type { ReactNode } from 'react';

export type ProgressBarProps = {
  /** Fill from 0 to 1. */
  value: number;
  /** Labels at both ends ("Feb 2025", "Hoy"). */
  start?: ReactNode;
  end?: ReactNode;
  /** Intermediate milestones: how many, and how many reached. */
  milestones?: number;
  reached?: number;
  /** Accessible name. */
  label: string;
  className?: string;
};

export const PROGRESS_BAR_DEFAULTS = {
  milestones: 0,
  reached: 0,
} as const;
