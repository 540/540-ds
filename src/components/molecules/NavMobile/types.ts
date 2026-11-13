import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { MenuDestination } from '../Menu';

export type NavMobileProps = {
  /** The same destinations as Menu: the same objects, built once. */
  items: MenuDestination[];
  /** Where the logo links to. */
  homeHref?: string;
  /** Accessible name of the logo link. */
  homeLabel?: string;
  /** Accessible name of the navigation. */
  label?: string;
  /** What goes next to the button: the ThemeToggle. Not a destination. */
  end?: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<'nav'>, 'className' | 'children' | 'aria-label'>;

export const NAV_MOBILE_DEFAULTS = {
  homeHref: '#inicio',
  homeLabel: 'Ir al inicio',
  label: 'Principal',
} as const satisfies Required<Pick<NavMobileProps, 'homeHref' | 'homeLabel' | 'label'>>;
