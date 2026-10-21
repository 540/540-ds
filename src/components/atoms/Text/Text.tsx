import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import styles from './Text.module.css';

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

export const TEXT_TONES = ['primary', 'secondary', 'tertiary', 'inverse', 'accent', 'error', 'success'] as const;
export const TEXT_ALIGNS = ['start', 'center'] as const;
export const TEXT_WRAPS = ['auto', 'balance', 'pretty'] as const;
export const TEXT_MEASURES = ['none', 'half', 'wide', 'prose', 'narrow'] as const;

export type TextVariant = (typeof TEXT_VARIANTS)[number];
export type TextTone = (typeof TEXT_TONES)[number];
export type TextAlign = (typeof TEXT_ALIGNS)[number];
export type TextWrap = (typeof TEXT_WRAPS)[number];
export type TextMeasure = (typeof TEXT_MEASURES)[number];

type TextElement = 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'figcaption' | 'blockquote' | 'li' | 'label';

export type TextProps = {
  /** Which of the thirteen text styles to use. Independent from the HTML element. */
  variant?: TextVariant;
  /** Color of the text, by meaning. */
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

/**
 * Text is the type scale. There is no Heading or Label component: every piece of
 * text in the system is a Text with a variant (the style) and an `as` (the element).
 */
export function Text({
  variant = 'body-m',
  tone = 'primary',
  as = 'p',
  align,
  wrap = 'auto',
  measure = 'none',
  className,
  children,
  ...rest
}: TextProps) {
  const Tag = as as ElementType;
  const classes = [
    styles.text,
    styles[`variant-${variant}`],
    styles[`tone-${tone}`],
    align ? styles[`align-${align}`] : '',
    wrap !== 'auto' ? styles[`wrap-${wrap}`] : '',
    measure !== 'none' ? styles[`measure-${measure}`] : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
}
