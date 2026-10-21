import type { ReactNode } from 'react';

export type TimelineStep = {
  /** The title of the step: a month, a milestone. */
  title: ReactNode;
  /** What happened, body-m secondary. */
  body: ReactNode;
};

export type TimelineProps = {
  id: string;
  /** The header above the axis. */
  title: ReactNode;
  description?: ReactNode;
  /** The steps, in order. Each one is a stop of the journey. */
  steps: TimelineStep[];
  className?: string;
};

export const TIMELINE_DEFAULTS = {} as const;
