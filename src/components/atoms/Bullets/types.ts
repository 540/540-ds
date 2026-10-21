import type { ComponentPropsWithoutRef } from 'react';

export const BULLETS_ORIENTATIONS = ['horizontal', 'vertical'] as const;
export type BulletsOrientation = (typeof BULLETS_ORIENTATIONS)[number];

export type BulletsProps = {
  /** How many pages. With one page nothing is painted. */
  count: number;
  /** The current page, starting at 1. The state lives outside. */
  current: number;
  /** Called with the page (starting at 1) the user wants to go to. */
  onSelect?: (page: number) => void;
  /** Horizontal: the dots of a carousel. Vertical: the index at the edge of the window. */
  orientation?: BulletsOrientation;
  /** Word used in each button's name: "Página 2 de 3". */
  itemLabel?: string;
  /** Name of the group for screen readers. */
  label?: string;
  className?: string;
} & Omit<ComponentPropsWithoutRef<'div'>, 'className' | 'children' | 'onSelect'>;

export const BULLETS_DEFAULTS = {
  orientation: 'horizontal',
  itemLabel: 'Página',
  label: 'Páginas',
} as const satisfies Required<Pick<BulletsProps, 'orientation' | 'itemLabel' | 'label'>>;
