import type { ReactNode } from 'react';
import type { MenuDestination } from '../../molecules/Menu';
import type { DeckFooterProps } from '../DeckFooter';

export const DECK_THEMES = ['dark', 'light'] as const;
export type DeckTheme = (typeof DECK_THEMES)[number];

export type DeckProps = {
  /** The destinations of the top bar: the main stops of the talk. */
  items: MenuDestination[];
  /** The stops: Slides (and the photos that go with a block title). */
  children: ReactNode;
  /** The last stop. */
  footer: DeckFooterProps;
  /** Theme at first visit. Talks default to dark. */
  defaultTheme?: DeckTheme;
  /** localStorage key where the viewer's theme is remembered. Empty string disables it. */
  storageKey?: string;
  /** Accessible name of the top navigation. */
  navLabel?: string;
  /** Accessible name of the side index. */
  indexLabel?: string;
  /** Paint the background blobs. */
  blobs?: boolean;
  homeHref?: string;
  homeLabel?: string;
  className?: string;
};

export const DECK_DEFAULTS = {
  defaultTheme: 'dark',
  storageKey: '540:tema',
  navLabel: 'Paradas de la charla',
  indexLabel: 'Recorrido de la charla',
  blobs: true,
  homeHref: '#portada',
  homeLabel: '540, ir al inicio',
} as const satisfies Required<Pick<DeckProps, 'defaultTheme' | 'storageKey' | 'navLabel' | 'indexLabel' | 'blobs' | 'homeHref' | 'homeLabel'>>;
