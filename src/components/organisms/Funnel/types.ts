import type { ReactNode } from 'react';
import type { ChartTone } from '../../../charts';

export type FunnelStep = {
  /** What the step is ("Visitas", "Registro"). */
  label: string;
  /** The figure, as a number: it sets the width against the first step. */
  value: number;
  /** How the figure is written, if not the number itself ("12,4 k"). */
  display?: ReactNode;
};

export type FunnelProps = {
  /** The steps of the process, in order, from the widest. */
  steps: FunnelStep[];
  /** Accessible name of the chart ("Del primer contacto a la compra"). */
  label: string;
  /** Text after every figure (" personas"). */
  unit?: string;
  /** Decimals of the figures. */
  decimals?: number;
  /** Color of the bars: ink (default), context, or accent (the whole funnel is the one series). */
  tone?: ChartTone;
  className?: string;
};

export const FUNNEL_DEFAULTS = {
  unit: '',
  decimals: 0,
  tone: 'ink',
} as const satisfies Required<Pick<FunnelProps, 'unit' | 'decimals' | 'tone'>>;
