import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export type MenuDestination = {
  href: string;
  label: string;
  /** The section being viewed. One per menu. */
  current?: boolean;
};

export type MenuProps = {
  /** The destinations, in order. Written normally; the style sets the uppercase. */
  items: MenuDestination[];
  /** Where the logo links to. */
  homeHref?: string;
  /** Accessible name of the logo link. */
  homeLabel?: string;
  /** Accessible name of the navigation. Two menus on a page cannot share it. */
  label?: string;
  /** What goes at the right end: the ThemeToggle. It is not a destination, so it lives outside the list. */
  end?: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<'nav'>, 'className' | 'children' | 'aria-label'>;

export const MENU_DEFAULTS = {
  homeHref: '#inicio',
  homeLabel: 'Ir al inicio',
  label: 'Principal',
} as const satisfies Required<Pick<MenuProps, 'homeHref' | 'homeLabel' | 'label'>>;
