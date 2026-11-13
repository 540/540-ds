import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { SocialNetwork } from '../../atoms/SocialIcon';

export type FooterLink = {
  /** The visible text of the link. */
  label: ReactNode;
  /** Where it goes. */
  href: string;
};

export type FooterGroup = {
  /** The column heading. */
  title: string;
  /** The links of the column, in order. */
  items: FooterLink[];
};

export type FooterNetwork = {
  /** Which network: sets the icon. */
  network: SocialNetwork;
  /** The profile URL. */
  href: string;
  /** The network's name, read on the link ("LinkedIn"). */
  label: string;
};

export type FooterProps = {
  /** One line about the brand. Optional. */
  tagline?: ReactNode;
  /** Columns of links: the ones people look for when they reach the bottom. */
  groups?: FooterGroup[];
  /** The networks 540 publishes. Each a 24 px box with its name on the link. */
  networks?: FooterNetwork[];
  /** Label of the networks group. */
  networksTitle?: string;
  /** The signature, e.g. "© 2026 540". */
  copyright: ReactNode;
  /** Legal links on the right of the signature. */
  legal?: FooterLink[];
  /** Where the logo links to. */
  homeHref?: string;
  /** Accessible name of the logo link. */
  homeLabel?: string;
  className?: string;
} & Omit<ComponentPropsWithoutRef<'footer'>, 'className' | 'children'>;

export const FOOTER_DEFAULTS = {
  homeHref: '#inicio',
  homeLabel: 'Ir al inicio',
  networksTitle: 'Síguenos',
} as const satisfies Required<Pick<FooterProps, 'homeHref' | 'homeLabel' | 'networksTitle'>>;
