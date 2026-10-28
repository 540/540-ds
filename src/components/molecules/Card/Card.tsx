import { Image } from '../../atoms/Image';
import { Text } from '../../atoms/Text';
import styles from './Card.module.css';
import { CARD_DEFAULTS } from './types';
import type { CardProps } from './types';

/**
 * Card is a title and its explanation, with an optional ordinal. The same piece in two forms:
 * boxed (a bordered box) and row (a band edge to edge, inside a CardList).
 */
export function Card({
  variant = CARD_DEFAULTS.variant,
  align = CARD_DEFAULTS.align,
  ordinal,
  kicker,
  portrait,
  title,
  level = CARD_DEFAULTS.level,
  state = CARD_DEFAULTS.state,
  footer,
  after,
  emphasis = CARD_DEFAULTS.emphasis,
  className,
  children,
  ...rest
}: CardProps) {
  const isRow = variant === 'row';
  const classes = [
    styles.card,
    isRow ? styles.row : '',
    align === 'center' ? styles.center : '',
    isRow && state === 'folded' ? styles.folded : '',
    isRow && state === 'active' ? styles.active : '',
    emphasis === 'highlighted' ? styles.highlighted : '',
    emphasis === 'dimmed' ? styles.dimmed : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <article className={classes} {...rest}>
      {portrait ? <Image src={portrait.src} alt={portrait.alt} ratio="1:1" className={styles.portrait} /> : null}
      <div className={styles.header}>
        {ordinal ? (
          <Text as="span" variant={isRow ? 'micro' : 'body-s-bold'} tone={isRow ? 'secondary' : 'primary'} className={styles.ordinal} aria-hidden="true">
            {ordinal}
          </Text>
        ) : null}
        {kicker ? (
          <Text as="span" variant="body-s" tone="secondary">
            {kicker}
          </Text>
        ) : null}
        <Text as={level} variant={isRow ? 'title-m' : 'body-l'} wrap="balance">
          {title}
        </Text>
      </div>
      <div className={styles.window}>
        <div className={styles.body}>
          {/* A div, not a p: the body may hold a list (ArrowList, SimpleList) */}
          <Text as="div" variant="body-s-light" wrap="pretty">
            {children}
          </Text>
        </div>
      </div>
      {footer ? <div className={styles.footer}>{footer}</div> : null}
      {after ? <div className={styles.after}>{after}</div> : null}
    </article>
  );
}
