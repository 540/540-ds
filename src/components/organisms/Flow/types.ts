import type { ReactNode } from 'react';

export type FlowStep = {
  /** The name of the step. Two or three words. */
  label: ReactNode;
  /** The highlighted step: filled with the inverse background. */
  highlighted?: boolean;
};

export type FlowProps = {
  /** The steps, in order. */
  steps: FlowStep[];
  /** Accessible name of the list. */
  label?: string;
  className?: string;
};

export const FLOW_DEFAULTS = {
  label: 'Pasos',
} as const satisfies Required<Pick<FlowProps, 'label'>>;
