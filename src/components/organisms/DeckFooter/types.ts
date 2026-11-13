import type { ReactNode } from 'react';
import type { FooterNetwork } from '../../molecules/Footer';

export type DeckFooterProps = {
  /** One line about the talk, at 38 characters. */
  tagline: ReactNode;
  /** The networks, each with its name. */
  networks?: FooterNetwork[];
  /** The thanks line. */
  thanks?: ReactNode;
  /** The signature. */
  copyright: ReactNode;
  /** Where the logo links to: the cover. */
  homeHref?: string;
  /** Accessible name of the logo link. */
  homeLabel?: string;
  className?: string;
};

export const DECK_FOOTER_DEFAULTS = {
  thanks: '¡Gracias!',
  homeHref: '#portada',
  homeLabel: '540, ir al inicio',
} as const satisfies Required<Pick<DeckFooterProps, 'thanks' | 'homeHref' | 'homeLabel'>>;
