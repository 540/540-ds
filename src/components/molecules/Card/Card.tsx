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
  title,
  level = CARD_DEFAULTS.level,
  state = CARD_DEFAULTS.state,
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
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <article className={classes} {...rest}>
      <div className={styles.header}>
        {ordinal ? (
          <Text as="span" variant={isRow ? 'micro' : 'body-s-bold'} tone={isRow ? 'secondary' : 'primary'} className={styles.ordinal} aria-hidden="true">
            {ordinal}
          </Text>
        ) : null}
        <Text as={level} variant={isRow ? 'title-m' : 'body-l'} wrap="balance">
          {title}
        </Text>
      </div>
      <div className={styles.window}>
        <div className={styles.body}>
          <Text variant="body-s-light" wrap="pretty">
            {children}
          </Text>
        </div>
      </div>
    </article>
  );
}
