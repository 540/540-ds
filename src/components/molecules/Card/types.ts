import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export const CARD_VARIANTS = ['boxed', 'row'] as const;
export const CARD_ALIGNS = ['start', 'center'] as const;
export const CARD_STATES = ['open', 'folded', 'active'] as const;

export type CardVariant = (typeof CARD_VARIANTS)[number];
export type CardAlign = (typeof CARD_ALIGNS)[number];
export type CardState = (typeof CARD_STATES)[number];

export type CardProps = {
  /** boxed: a bordered box. row: a full-width band inside a CardList. */
  variant?: CardVariant;
  /** Text alignment inside. */
  align?: CardAlign;
  /** Optional ordinal ("01"). Decorative: hidden from screen readers. */
  ordinal?: string;
  /** The title (an h3 by default). */
  title: ReactNode;
  /** Heading level of the title. */
  level?: 'h2' | 'h3' | 'h4';
  /** Only for row: open shows the body, folded hides it visually, active opens it on the active-row background. */
  state?: CardState;
  /** The explanation: two or three sentences. */
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<'article'>, 'className' | 'children' | 'title'>;

export const CARD_DEFAULTS = {
  variant: 'boxed',
  align: 'start',
  level: 'h3',
  state: 'open',
} as const satisfies Required<Pick<CardProps, 'variant' | 'align' | 'level' | 'state'>>;
