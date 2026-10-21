import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export const MENU_ITEM_SIZES = ['sm', 'lg'] as const;
export type MenuItemSize = (typeof MENU_ITEM_SIZES)[number];

export type MenuItemProps = {
  /** Where it goes. Required: a menu item always navigates. */
  href: string;
  /** sm for the desktop bar (uppercase micro), lg for the mobile panel (title-m). */
  size?: MenuItemSize;
  /** The section being viewed. Bold plus aria-current="page". One per menu. */
  current?: boolean;
  /** The label, written normally ("Servicios"); sm makes it uppercase by style. */
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<'a'>, 'href' | 'className' | 'children' | 'aria-current'>;

export const MENU_ITEM_DEFAULTS = {
  size: 'sm',
  current: false,
} as const satisfies Required<Pick<MenuItemProps, 'size' | 'current'>>;
