import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { SocialNetwork } from '../../atoms/SocialIcon';

export type FooterLink = { label: ReactNode; href: string };
export type FooterGroup = { title: string; items: FooterLink[] };
export type FooterNetwork = { network: SocialNetwork; href: string; label: string };

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
  homeLabel?: string;
  className?: string;
} & Omit<ComponentPropsWithoutRef<'footer'>, 'className' | 'children'>;

export const FOOTER_DEFAULTS = {
  homeHref: '#inicio',
  homeLabel: 'Ir al inicio',
  networksTitle: 'Síguenos',
} as const satisfies Required<Pick<FooterProps, 'homeHref' | 'homeLabel' | 'networksTitle'>>;
