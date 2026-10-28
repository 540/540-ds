import type { ComponentPropsWithoutRef } from 'react';

export type CountProps = {
  /** The final figure, as a number (68415, 43.7). */
  value: number;
  /** Decimals to show, with the Spanish comma (43,7). */
  decimals?: number;
  /** Text before the figure ("+", "−"). */
  prefix?: string;
  /** Text after the figure (" %", " k"). Write the space if it goes: "20 %". */
  suffix?: string;
  className?: string;
} & Omit<ComponentPropsWithoutRef<'span'>, 'className' | 'children' | 'prefix'>;

export const COUNT_DEFAULTS = {
  decimals: 0,
  prefix: '',
  suffix: '',
} as const satisfies Required<Pick<CountProps, 'decimals' | 'prefix' | 'suffix'>>;
