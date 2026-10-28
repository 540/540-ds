import { useMemo, useRef } from 'react';
import { useReveal } from '../../../hooks/useReveal';
import { Text } from '../../atoms/Text';
import styles from './Share.module.css';
import { SHARE_DEFAULTS } from './types';
import type { ShareProps } from './types';

/**
 * Share is a whole split into its parts: one bar at 100 %, its segments growing from the left
 * when it comes into view (or its Step lights up), and a legend with each part's percentage.
 */
export function Share({ segments, label, title, decimals = SHARE_DEFAULTS.decimals, className }: ShareProps) {
  const ref = useRef<HTMLDivElement>(null);
  const on = useReveal(ref);
  const total = segments.reduce((sum, s) => sum + s.value, 0);
  const format = useMemo(() => new Intl.NumberFormat('es-ES', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }), [decimals]);
  const share = (v: number) => (total > 0 ? (v / total) * 100 : 0);

  return (
    <div ref={ref} className={[styles.share, className ?? ''].filter(Boolean).join(' ')}>
      {title ? <Text variant="body-s-bold">{title}</Text> : null}
      <div className={styles.bar} aria-hidden="true">
        {segments.map((s, i) => (
          <span
            key={i}
            className={[styles.segment, styles[`tone-${s.tone ?? (i === 0 ? 'ink' : 'context')}`]].join(' ')}
            style={{ inlineSize: on ? `calc(${share(s.value)}% - ${((segments.length - 1) * 2) / segments.length}px)` : 0, transitionDelay: on ? `${i * 100}ms` : '0ms' }}
          />
        ))}
      </div>
      <ul className={styles.legend} aria-label={label}>
        {segments.map((s, i) => (
          <li key={i} className={styles.item}>
            <span className={[styles.swatch, styles[`tone-${s.tone ?? (i === 0 ? 'ink' : 'context')}`]].join(' ')} aria-hidden="true" />
            <Text as="span" variant="body-s">
              {s.label}
            </Text>
            <Text as="span" variant="body-s-bold" className={styles.percent}>
              {`${format.format(share(s.value))} %`}
            </Text>
          </li>
        ))}
      </ul>
    </div>
  );
}
