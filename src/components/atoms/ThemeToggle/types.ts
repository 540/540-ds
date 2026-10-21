import type { ComponentPropsWithoutRef } from 'react';

export type ThemeToggleProps = {
  /** Whether the dark theme is on. The component is presentational: the state lives in the app. */
  dark: boolean;
  /** Called when the user asks to switch. */
  onToggle: (nextDark: boolean) => void;
  /** Screen-reader label of the control. Never changes with the state: the state is `aria-pressed`. */
  label?: string;
  className?: string;
} & Omit<ComponentPropsWithoutRef<'button'>, 'className' | 'children' | 'onClick' | 'onToggle' | 'type' | 'aria-pressed'>;

export const THEME_TOGGLE_DEFAULTS = {
  label: 'Tema oscuro',
} as const satisfies Required<Pick<ThemeToggleProps, 'label'>>;
