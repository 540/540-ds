import type { ReactNode } from 'react';

export type TimelineStep = {
  /** A small line above the title: a date, "Zoom · marzo". In secondary. */
  kicker?: ReactNode;
  /** The title of the step: a month, a milestone. */
  title: ReactNode;
  /** What happened, body-m secondary. */
  body?: ReactNode;
  /** A warning step: the dot goes red. The text stays in the neutral inks. */
  alert?: boolean;
  /** Anything after the body: a Flow, a Sheet inside a Step. */
  extra?: ReactNode;
};

export type TimelineProps = {
  /** The stop's anchor. */
  id: string;
  /** The header above the axis. */
  title: ReactNode;
  /** One sentence under the header. */
  description?: ReactNode;
  /** The steps, in order. Each one is a stop of the journey. */
  steps: TimelineStep[];
  className?: string;
};

export const TIMELINE_DEFAULTS = {} as const;
