import { useRef } from 'react';
import { DataTable, Legend, chartStyles, niceScale, position, useNumberFormat } from '../../../charts';
import { useReveal } from '../../../hooks/useReveal';
import { Text } from '../../atoms/Text';
import styles from './Dumbbell.module.css';
import { DUMBBELL_DEFAULTS } from './types';
import type { DumbbellProps } from './types';

/**
 * Dumbbell is a before and after per row: a gray dot for before, a colored dot for after and a line between
 * them. When the chart comes into view (or its Step lights up) each after dot travels from the before figure
 * to its own, drawing the line behind it. The after figure, and the change, are written at the right.
 */
export function Dumbbell({ rows, labels, label, min, max, unit = DUMBBELL_DEFAULTS.unit, decimals = DUMBBELL_DEFAULTS.decimals, tone = DUMBBELL_DEFAULTS.tone, change = DUMBBELL_DEFAULTS.change, className }: DumbbellProps) {
  const ref = useRef<HTMLDivElement>(null);
  const on = useReveal(ref);
  const format = useNumberFormat(decimals, unit);
  const signed = (d: number) => `${d > 0 ? '+' : d < 0 ? '−' : ''}${format(Math.abs(d))}`;

  const values = rows.flatMap((r) => [r.before, r.after]);
  const scale = niceScale(min ?? Math.min(...values), max ?? Math.max(...values));
  const x = (v: number) => Math.max(0, Math.min(1, position(v, scale.min, scale.max))) * 100;

  return (
    <div ref={ref} role="figure" aria-label={label} className={[styles.chart, className ?? ''].filter(Boolean).join(' ')}>
      <Legend
        items={[
          { label: labels.before, tone: 'context' },
          { label: labels.after, tone },
        ]}
      />
      <ul className={styles.list} aria-hidden="true">
        {rows.map((row, i) => {
          const from = x(row.before);
          const to = x(row.after);
          const timing = { transitionDelay: on ? `${i * 50}ms` : '0ms' };
          return (
            <li key={i} className={styles.row}>
              <Text as="span" variant="body-m" className={styles.label}>
                {row.label}
              </Text>
              <span className={styles.track}>
                <span className={styles.scale}>
                  {scale.ticks.map((t) => (
                    <span key={t} className={styles.grid} style={{ insetInlineStart: `${x(t)}%` }} />
                  ))}
                  <span
                    className={styles.line}
                    data-on={on ? '' : undefined}
                    data-back={to < from ? '' : undefined}
                    style={{ insetInlineStart: `${Math.min(from, to)}%`, inlineSize: `${Math.abs(to - from)}%`, ...timing }}
                  />
                  <span className={[styles.dot, chartStyles['tone-context']].join(' ')} style={{ insetInlineStart: `${from}%` }} />
                  <span className={[styles.dot, styles.after, chartStyles[`tone-${tone}`]].join(' ')} style={{ insetInlineStart: `${on ? to : from}%`, ...timing }} />
                </span>
              </span>
              <span className={styles.figure}>
                <Text as="span" variant="body-s-bold" className={chartStyles.axis}>
                  {row.display ?? format(row.after)}
                </Text>
                {change ? (
                  <Text as="span" variant="body-s" tone="secondary" className={chartStyles.axis}>
                    {signed(row.after - row.before)}
                  </Text>
                ) : null}
              </span>
            </li>
          );
        })}
        <li className={styles.row}>
          <span className={styles.track}>
            <span className={[styles.scale, styles.ticks].join(' ')}>
              {scale.ticks.map((t) => (
                <Text key={t} as="span" variant="micro" tone="secondary" className={[chartStyles.axis, styles.tick].join(' ')} style={{ insetInlineStart: `${x(t)}%` }}>
                  {format(t)}
                </Text>
              ))}
            </span>
          </span>
        </li>
      </ul>
      <DataTable
        caption={label}
        columns={['', labels.before, labels.after, 'Diferencia']}
        rows={rows.map((r) => [r.label, format(r.before), format(r.after), signed(r.after - r.before)])}
      />
    </div>
  );
}
