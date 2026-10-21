import type { ReactNode } from 'react';

export type StepsProps = {
  /** How many steps the block has (the arrow advances up to this number). */
  total: number;
  /** The content, with Step children that appear at their step. */
  children: ReactNode;
  /** Called every time the current step changes. */
  onStep?: (step: number) => void;
  className?: string;
};

export type StepProps = {
  /** Visible from this step (inclusive). */
  from?: number;
  /** Hidden from this step on. Omit to stay visible. */
  to?: number;
  /** Take no room at all while hidden (for stacked versions of a block). */
  collapse?: boolean;
  children: ReactNode;
  className?: string;
};

export const STEPS_DEFAULTS = {} as const;
