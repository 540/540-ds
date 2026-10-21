import styles from './CardList.module.css';
import type { CardListProps } from './types';

/**
 * CardList is the stack of full-width bands (Card in its row variant). It leaves the column
 * to the window edge and closes the stack with the bottom line no row can draw.
 */
export function CardList({ children, className }: CardListProps) {
  return <div className={[styles.list, className ?? ''].filter(Boolean).join(' ')}>{children}</div>;
}
