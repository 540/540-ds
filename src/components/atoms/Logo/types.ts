import type { ComponentPropsWithoutRef } from 'react';

export const LOGO_SIZES = ['md', 'sm', 'xs'] as const;
export type LogoSize = (typeof LOGO_SIZES)[number];

export type LogoProps = {
  /** Height of the logotype: md 48, sm 32, xs 24. The width follows the drawing's proportion. */
  size?: LogoSize;
  /** Accessible name. Empty string makes it decorative (hidden from screen readers). */
  label?: string;
  className?: string;
} & Omit<ComponentPropsWithoutRef<'svg'>, 'className' | 'children' | 'viewBox' | 'role' | 'aria-label' | 'aria-hidden'>;

export const LOGO_DEFAULTS = {
  size: 'md',
  label: '540',
} as const satisfies Required<Pick<LogoProps, 'size' | 'label'>>;
