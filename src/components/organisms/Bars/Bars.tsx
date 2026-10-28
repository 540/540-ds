import { useMemo, useRef } from 'react';
import { useReveal } from '../../../hooks/useReveal';
import { Text } from '../../atoms/Text';
import styles from './Bars.module.css';
import { BARS_DEFAULTS } from './types';
import type { BarsProps } from './types';

/**
 * Bars is a horizontal bar chart: each row its label, a bar that grows from the left when it
 * comes into view (or its Step lights up) and its figure at the tip. Ported from the newsletter talk.
 */
export function Bars({ rows, label, header, max, unit = BARS_DEFAULTS.unit, decimals = BARS_DEFAULTS.decimals, className }: BarsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const on = useReveal(ref);
  const top = max ?? Math.max(...rows.map((r) => r.value), 0);
  const format = useMemo(() => new Intl.NumberFormat('es-ES', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }), [decimals]);

  return (
    <div ref={ref} className={[styles.bars, className ?? ''].filter(Boolean).join(' ')}>
      {header ? (
        <div className={styles.head} aria-hidden="true">
          <Text as="span" variant="micro-bold" tone="secondary" className={styles.label}>
            {header.label}
          </Text>
          <Text as="span" variant="micro-bold" tone="secondary" className={styles.track}>
            {header.value}
          </Text>
          <Text as="span" variant="micro-bold" tone="secondary" className={styles.detail}>
            {header.detail}
          </Text>
        </div>
      ) : null}
      <ul className={styles.list} aria-label={label}>
        {rows.map((row, i) => {
          const share = top > 0 ? Math.max(0, Math.min(1, row.value / top)) : 0;
          return (
            <li key={i} className={styles.row} data-dimmed={row.dimmed ? '' : undefined}>
              <Text as="span" variant="body-m" className={styles.label}>
                {row.label}
              </Text>
              <span className={styles.track}>
                <span
                  className={[styles.fill, styles[`tone-${row.tone ?? 'ink'}`]].join(' ')}
                  style={{ inlineSize: on ? `${share * 100}%` : 0, transitionDelay: on ? `${i * 50}ms` : '0ms' }}
                  aria-hidden="true"
                />
                <Text as="span" variant="body-s-bold" className={styles.value}>
                  {row.display ?? `${format.format(row.value)}${unit}`}
                </Text>
              </span>
              {row.detail ? (
                <Text as="span" variant="body-s" tone="secondary" className={styles.detail}>
                  {row.detail}
                </Text>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
