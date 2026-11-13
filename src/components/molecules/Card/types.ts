import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export const CARD_VARIANTS = ['boxed', 'row'] as const;
export const CARD_ALIGNS = ['start', 'center'] as const;
export const CARD_STATES = ['open', 'folded', 'active'] as const;
export const CARD_EMPHASES = ['none', 'highlighted', 'dimmed'] as const;

export type CardVariant = (typeof CARD_VARIANTS)[number];
export type CardAlign = (typeof CARD_ALIGNS)[number];
export type CardState = (typeof CARD_STATES)[number];
export type CardEmphasis = (typeof CARD_EMPHASES)[number];

export type CardProps = {
  /** boxed: a bordered box. row: a full-width band inside a CardList. */
  variant?: CardVariant;
  /** Text alignment inside. */
  align?: CardAlign;
  /** Optional ordinal ("01"). Decorative: hidden from screen readers. */
  ordinal?: string;
  /** A small line above the title ("Cliente", "Lo que medimos"), in secondary. */
  kicker?: ReactNode;
  /** A round 160 px portrait above the header. */
  portrait?: {
    /** Path or URL of the portrait. */
    src: string;
    /** What the portrait shows, in words. */
    alt: string;
  };
  /** The title (an h3 by default). */
  title: ReactNode;
  /** Heading level of the title. */
  level?: 'h2' | 'h3' | 'h4';
  /** Only for row: open shows the body, folded hides it visually, active opens it on the active-row background. */
  state?: CardState;
  /** The explanation: two or three sentences. */
  children: ReactNode;
  /** A footer under a hairline: a source, a date. */
  footer?: ReactNode;
  /** An "after" block under a strong line: what changed. */
  after?: ReactNode;
  /** Among several cards: highlighted grows 4 % with a strong border; dimmed fades to 25 %. */
  emphasis?: CardEmphasis;
  className?: string;
} & Omit<ComponentPropsWithoutRef<'article'>, 'className' | 'children' | 'title'>;

export const CARD_DEFAULTS = {
  variant: 'boxed',
  align: 'start',
  level: 'h3',
  state: 'open',
  emphasis: 'none',
} as const satisfies Required<Pick<CardProps, 'variant' | 'align' | 'level' | 'state' | 'emphasis'>>;
