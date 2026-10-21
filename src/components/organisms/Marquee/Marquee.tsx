import type { CSSProperties } from 'react';
import { Text } from '../../atoms/Text';
import styles from './Marquee.module.css';
import { MARQUEE_DEFAULTS } from './types';
import type { MarqueeProps } from './types';

/**
 * Marquee is a strip of short pieces that scrolls endlessly between two hairlines.
 * The pieces are repeated once (hidden from screen readers) to make the loop seamless.
 */
export function Marquee({ items, duration = MARQUEE_DEFAULTS.duration, className }: MarqueeProps) {
  const pieces = (hidden: boolean) =>
    items.map((item, i) => (
      <Text key={`${hidden ? 'b' : 'a'}-${i}`} as="span" variant="body-m" tone="secondary" className={styles.piece} aria-hidden={hidden ? true : undefined}>
        {item}
      </Text>
    ));
  return (
    <div className={[styles.marquee, className ?? ''].filter(Boolean).join(' ')}>
      <div className={styles.strip} style={{ '--marquee-duration': `${duration}s` } as CSSProperties}>
        {pieces(false)}
        {pieces(true)}
      </div>
    </div>
  );
}
