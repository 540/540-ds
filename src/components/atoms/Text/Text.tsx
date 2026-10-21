import type { ElementType } from 'react';
import styles from './Text.module.css';
import { TEXT_DEFAULTS } from './types';
import type { TextProps } from './types';

/**
 * Text is the type scale. There is no Heading or Label component: every piece of
 * text in the system is a Text with a variant (the style) and an `as` (the element).
 */
export function Text({
  variant = TEXT_DEFAULTS.variant,
  tone = TEXT_DEFAULTS.tone,
  as = TEXT_DEFAULTS.as,
  align,
  wrap = TEXT_DEFAULTS.wrap,
  measure = TEXT_DEFAULTS.measure,
  mono = false,
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
    mono ? styles.mono : '',
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
