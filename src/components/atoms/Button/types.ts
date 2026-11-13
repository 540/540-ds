import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export const BUTTON_VARIANTS = ['primary', 'outline', 'ghost'] as const;
export const BUTTON_SIZES = ['md', 'sm'] as const;

export type ButtonVariant = (typeof BUTTON_VARIANTS)[number];
export type ButtonSize = (typeof BUTTON_SIZES)[number];

type CommonProps = {
  /** Level of emphasis. Only one `primary` per zone. */
  variant?: ButtonVariant;
  /** Control height: md (45) or sm (36). */
  size?: ButtonSize;
  /** Icon before the label. Inherits the text color. Use a Lucide icon. */
  icon?: ReactNode;
  /** Square button that shows only the icon; the label stays for screen readers. Needs `icon`. */
  iconOnly?: boolean;
  /** The label. Always required: it is the accessible name. */
  children: ReactNode;
  className?: string;
};

type AsButton = CommonProps & {
  href?: undefined;
  /** The action is not possible right now. Never combined with `href`. */
  disabled?: boolean;
  /** The native button type. `submit` only inside a Form; elsewhere leave the default `button`. */
  type?: 'button' | 'submit' | 'reset';
} & Omit<ComponentPropsWithoutRef<'button'>, 'children' | 'className' | 'type' | 'disabled'>;

type AsLink = CommonProps & {
  /** With `href` the button navigates: it renders a real link with the same look. */
  href: string;
  disabled?: never;
  type?: never;
} & Omit<ComponentPropsWithoutRef<'a'>, 'children' | 'className' | 'href'>;

export type ButtonProps = AsButton | AsLink;

export const BUTTON_DEFAULTS = {
  variant: 'primary',
  size: 'md',
  iconOnly: false,
} as const satisfies Required<Pick<CommonProps, 'variant' | 'size' | 'iconOnly'>>;
