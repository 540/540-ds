import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { Text } from '../../atoms/Text';
import styles from './Marquee.module.css';
import { MARQUEE_DEFAULTS } from './types';
import type { MarqueeProps } from './types';

/**
 * Marquee is a strip of short pieces that scrolls endlessly between two hairlines, edge to edge.
 * The pieces are repeated until one round covers the window, then doubled (the copies hidden from
 * screen readers), so the loop never shows its end. The speed stays the same however many repeats.
 */
export function Marquee({ items, duration = MARQUEE_DEFAULTS.duration, className }: MarqueeProps) {
  const frame = useRef<HTMLDivElement>(null);
  const round = useRef<HTMLDivElement>(null);
  const [repeats, setRepeats] = useState(1);

  // One round must be at least as wide as the frame: otherwise the end of the strip shows
  useEffect(() => {
    const f = frame.current;
    const r = round.current;
    if (!f || !r || typeof ResizeObserver === 'undefined') return;
    const fit = () => {
      const one = r.scrollWidth / repeats;
      if (one > 0) setRepeats(Math.max(1, Math.ceil(f.clientWidth / one)));
    };
    const ro = new ResizeObserver(fit);
    ro.observe(f);
    fit();
    return () => ro.disconnect();
  }, [repeats, items]);

  const pieces = (copy: number) =>
    items.map((item, i) => (
      <Text key={`${copy}-${i}`} as="span" variant="body-m" tone="secondary" className={styles.piece} aria-hidden={copy > 0 ? true : undefined}>
        {item}
      </Text>
    ));
  const roundOf = (offset: number) => Array.from({ length: repeats }, (_, k) => pieces(offset + k));

  return (
    <div ref={frame} className={[styles.marquee, className ?? ''].filter(Boolean).join(' ')}>
      <div className={styles.strip} style={{ '--marquee-duration': `${duration * repeats}s` } as CSSProperties}>
        <div ref={round} className={styles.round}>
          {roundOf(0)}
        </div>
        <div className={styles.round} aria-hidden="true">
          {roundOf(repeats)}
        </div>
      </div>
    </div>
  );
}
