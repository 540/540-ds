import type { ReactNode } from 'react';
import type { BarTone } from '../Bars';

export type ShareSegment = {
  /** What this part is ("España", "Fuera de España"). */
  label: ReactNode;
  /** Its amount. The parts are turned into percentages of their sum. */
  value: number;
  /** ink: the part that tells the story. context: the rest. accent: the one part that matters. */
  tone?: BarTone;
};

export type ShareProps = {
  /** The parts of the whole, in order from the left. Two to four. */
  segments: ShareSegment[];
  /** Accessible name ("Reparto de suscriptores"). */
  label: string;
  /** Optional name above the bar, in body-s-bold. */
  title?: ReactNode;
  /** Decimals of the percentages in the legend. */
  decimals?: number;
  className?: string;
};

export const SHARE_DEFAULTS = {
  decimals: 0,
} as const satisfies Required<Pick<ShareProps, 'decimals'>>;
