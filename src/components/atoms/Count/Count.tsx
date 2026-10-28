import { useEffect, useMemo, useRef, useState } from 'react';
import { useReveal } from '../../../hooks/useReveal';
import styles from './Count.module.css';
import { COUNT_DEFAULTS } from './types';
import type { CountProps } from './types';

const DURATION = 1400;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Count is a figure that counts up from zero when it comes into view (or its Step lights up),
 * in 1.4 s, with the Spanish number format. It goes back to zero when it leaves, so it replays.
 */
export function Count({ value, decimals = COUNT_DEFAULTS.decimals, prefix = COUNT_DEFAULTS.prefix, suffix = COUNT_DEFAULTS.suffix, className, ...rest }: CountProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const on = useReveal(ref);
  const [shown, setShown] = useState(0);
  const format = useMemo(() => new Intl.NumberFormat('es-ES', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }), [decimals]);

  useEffect(() => {
    if (!on) {
      setShown(0);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION);
      setShown(value * easeOut(t));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [on, value]);

  const final = `${prefix}${format.format(value)}${suffix}`;
  return (
    <span ref={ref} className={[styles.count, className ?? ''].filter(Boolean).join(' ')} {...rest}>
      <span aria-hidden="true">{`${prefix}${format.format(shown)}${suffix}`}</span>
      <span className={styles.voice}>{final}</span>
    </span>
  );
}
