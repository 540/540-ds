import { Text } from '../../atoms/Text';
import styles from './Lists.module.css';
import type { ArrowListProps, ProblemListProps, SimpleListProps } from './types';

/** SimpleList is a centered list without bullets: the air separates the items. */
export function SimpleList({ items, className }: SimpleListProps) {
  return (
    <ul className={[styles.simple, className ?? ''].filter(Boolean).join(' ')}>
      {items.map((item, i) => (
        <li key={i}>
          <Text as="span" variant="body-m" wrap="pretty">
            {item}
          </Text>
        </li>
      ))}
    </ul>
  );
}

/** ArrowList is a centered list with an arrow before each item, for things that lead somewhere. */
export function ArrowList({ items, className }: ArrowListProps) {
  return (
    <ul className={[styles.arrows, className ?? ''].filter(Boolean).join(' ')}>
      {items.map((item, i) => (
        <li key={i}>
          <span className={styles.arrow} aria-hidden="true">
            →
          </span>
          <Text as="span" variant="body-m" wrap="pretty">
            {item}
          </Text>
        </li>
      ))}
    </ul>
  );
}

/** ProblemList is a list of label + text pairs: the label in secondary, the text in primary. */
export function ProblemList({ items, className }: ProblemListProps) {
  return (
    <ul className={[styles.problems, className ?? ''].filter(Boolean).join(' ')}>
      {items.map((item, i) => (
        <li key={i} className={styles.problem}>
          <Text as="span" variant="body-s" tone="secondary">
            {item.label}
          </Text>
          <Text as="span" variant="body-m" wrap="pretty">
            {item.text}
          </Text>
        </li>
      ))}
    </ul>
  );
}
