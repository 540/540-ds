import type { ReactNode } from 'react';

export type MetricProps = {
  /** The figure ("0,76 %"). */
  value: ReactNode;
  /** What it measures. */
  label: ReactNode;
  /** The change ("−89 % desde el 7,06 % inicial"). */
  delta?: ReactNode;
  className?: string;
};

export type MetricNoteProps = {
  children: ReactNode;
  className?: string;
};
