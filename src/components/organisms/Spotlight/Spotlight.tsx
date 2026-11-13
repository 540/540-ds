import { useEffect, useRef, useState } from 'react';
import styles from './Spotlight.module.css';
import type { SpotlightProps } from './types';

/**
 * Spotlight lights the piece that holds the center of the window and dims the others to 14 %,
 * like the sentences of the journey and the months of a timeline. Each one is a stop of the Deck
 * (data-stop), so the arrow stops on every piece of a pile instead of paging over them.
 */
export function Spotlight({ children, className }: SpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const tick = () => {
      const el = ref.current;
      if (el) {
        const r = el.getBoundingClientRect();
        const c = window.innerHeight / 2;
        const inside = r.top < c && r.bottom > c;
        const near = Math.abs((r.top + r.bottom) / 2 - c) < window.innerHeight * 0.3;
        setOn(inside || near);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div ref={ref} className={[styles.spotlight, className ?? ''].filter(Boolean).join(' ')} data-stop="" data-on={on ? '' : undefined}>
      {children}
    </div>
  );
}
