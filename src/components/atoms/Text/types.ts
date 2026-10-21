import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export const TEXT_VARIANTS = [
  'statement',
  'title-l',
  'title-m',
  'title-s',
  'title-xs',
  'body-l',
  'body-m',
  'body-s',
  'body-s-light',
  'body-s-bold',
  'micro',
  'micro-light',
  'micro-bold',
] as const;

export const TEXT_TONES = ['primary', 'secondary'] as const;
export const TEXT_ALIGNS = ['start', 'center'] as const;
export const TEXT_WRAPS = ['auto', 'balance', 'pretty'] as const;
export const TEXT_MEASURES = ['none', 'half', 'wide', 'prose', 'narrow'] as const;
export const TEXT_ELEMENTS = ['p', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div', 'figcaption', 'blockquote', 'li', 'label'] as const;

export type TextVariant = (typeof TEXT_VARIANTS)[number];
export type TextTone = (typeof TEXT_TONES)[number];
export type TextAlign = (typeof TEXT_ALIGNS)[number];
export type TextWrap = (typeof TEXT_WRAPS)[number];
export type TextMeasure = (typeof TEXT_MEASURES)[number];
export type TextElement = (typeof TEXT_ELEMENTS)[number];

export type TextProps = {
  /** Which of the thirteen text styles to use. Independent from the HTML element. */
  variant?: TextVariant;
  /** Ink: primary (black) or secondary (gray). Text has no other colors, as in the talks. */
  tone?: TextTone;
  /** The HTML element to render. Choose it by document meaning, not by size. */
  as?: TextElement;
  /** Horizontal alignment. */
  align?: TextAlign;
  /** How lines are distributed: balance for titles and sentences, pretty for paragraphs. */
  wrap?: TextWrap;
  /** Maximum width with a name: half (half grid), wide (three quarters), prose (62ch), narrow (38ch). */
  measure?: TextMeasure;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<'p'>, 'children' | 'className'>;

export const TEXT_DEFAULTS = {
  variant: 'body-m',
  tone: 'primary',
  as: 'p',
  wrap: 'auto',
  measure: 'none',
} as const satisfies Required<Pick<TextProps, 'variant' | 'tone' | 'as' | 'wrap' | 'measure'>>;
