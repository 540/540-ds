import type { ReactNode } from 'react';
import type { ChartTone } from '../../../charts';

/** The highlighted part is ink or the yellow accent; the second part, if any, is always gray. */
export type WaffleTone = Extract<ChartTone, 'ink' | 'accent'>;

export type WafflePart = {
  /** Its amount, on the same scale as the main value (out of 100, or out of total). */
  value: number;
  /** Its name, in the legend ("Lo están probando"). */
  label: string;
};

export type WaffleProps = {
  /** The highlighted amount: out of 100, or out of total if given (37, or 18 of 48). */
  value: number;
  /** The whole the value is part of. By default 100, so value is already a percentage. */
  total?: number;
  /** Accessible name of the chart ("Equipos que ya lo usan"). The figures are added to it. */
  label: string;
  /** Name of the highlighted part in the legend. Only shown with a second part. */
  name?: string;
  /** How the figure is written ("37 de cada 100"). By default, the percentage, counting up. */
  display?: string;
  /** Short text under the figure, in gray: what it counts. */
  caption?: ReactNode;
  /** ink (default) or accent for the part that matters. */
  tone?: WaffleTone;
  /** An optional second part, in gray, after the highlighted one. Brings a legend. */
  secondary?: WafflePart;
  /** Decimals of the percentage. */
  decimals?: number;
  className?: string;
};

export const WAFFLE_DEFAULTS = {
  total: 100,
  tone: 'ink',
  decimals: 0,
} as const satisfies Required<Pick<WaffleProps, 'total' | 'tone' | 'decimals'>>;
