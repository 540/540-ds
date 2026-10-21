import type { ReactNode } from 'react';

export type MetricProps = {
  /** The figure ("0,84 %"). */
  value: ReactNode;
  /** What it measures. */
  label: ReactNode;
  /** The change ("−88 % desde el 6,94 % inicial"). */
  delta?: ReactNode;
  className?: string;
};

export type MetricNoteProps = {
  children: ReactNode;
  className?: string;
};
