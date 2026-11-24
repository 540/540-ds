import { useRef } from 'react';
import { DataTable, Legend, chartStyles, defaultTone, useNumberFormat } from '../../../charts';
import { useReveal } from '../../../hooks/useReveal';
import { Text } from '../../atoms/Text';
import styles from './BarSeries.module.css';
import { BAR_SERIES_DEFAULTS } from './types';
import type { BarSeriesProps } from './types';

const share = (value: number, top: number) => (top > 0 ? Math.max(0, Math.min(1, value / top)) : 0);
const sum = (values: number[]) => values.reduce((total, v) => total + Math.max(0, v), 0);

/**
 * BarSeries is a horizontal bar chart with several series per row: grouped, one thin bar per series with its
 * figure at the tip, or stacked, one bar split into its series with the total at the tip. The bars grow from
 * the left, one after another, when the chart comes into view (or its Step lights up).
 */
export function BarSeries({ rows, series, label, mode = BAR_SERIES_DEFAULTS.mode, max, unit = BAR_SERIES_DEFAULTS.unit, decimals = BAR_SERIES_DEFAULTS.decimals, className }: BarSeriesProps) {
  const ref = useRef<HTMLDivElement>(null);
  const on = useReveal(ref);
  const format = useNumberFormat(decimals, unit);
  const stacked = mode === 'stacked';
  const tones = series.map((s, i) => s.tone ?? defaultTone(i));
  const top = max ?? Math.max(0, ...rows.map((r) => (stacked ? sum(r.values) : Math.max(0, ...r.values))));
  const delay = (n: number) => ({ transitionDelay: on ? `${n * 50}ms` : '0ms' });

  return (
    <div ref={ref} role="figure" aria-label={label} className={[styles.chart, className ?? ''].filter(Boolean).join(' ')}>
      {series.length > 1 ? <Legend items={series.map((s, i) => ({ label: s.label, tone: tones[i] }))} /> : null}
      <ul className={styles.list} aria-hidden="true">
        {rows.map((row, i) => (
          <li key={i} className={styles.row}>
            <Text as="span" variant="body-m" className={styles.label}>
              {row.label}
            </Text>
            {stacked ? (
              <span className={[styles.track, styles.stacked].join(' ')}>
                <span className={[styles.fill, styles.stack].join(' ')} style={{ inlineSize: on ? `${share(sum(row.values), top) * 100}%` : 0, ...delay(i) }}>
                  {series.map((_, j) =>
                    (row.values[j] ?? 0) > 0 ? <span key={j} className={[styles.segment, chartStyles[`tone-${tones[j]}`]].join(' ')} style={{ flexGrow: row.values[j] }} /> : null,
                  )}
                </span>
                <Text as="span" variant="body-s-bold" className={styles.value}>
                  {format(sum(row.values))}
                </Text>
              </span>
            ) : (
              <span className={styles.group}>
                {series.map((_, j) => (
                  <span key={j} className={styles.track}>
                    <span
                      className={[styles.fill, styles.thin, chartStyles[`tone-${tones[j]}`]].join(' ')}
                      style={{ inlineSize: on ? `${share(row.values[j] ?? 0, top) * 100}%` : 0, ...delay(i * series.length + j) }}
                    />
                    <Text as="span" variant="body-s-bold" className={styles.value}>
                      {row.values[j] === undefined ? '—' : format(row.values[j])}
                    </Text>
                  </span>
                ))}
              </span>
            )}
          </li>
        ))}
      </ul>
      <DataTable
        caption={label}
        columns={['', ...series.map((s) => s.label), ...(stacked ? ['Total'] : [])]}
        rows={rows.map((r) => [r.label, ...series.map((_, j) => (r.values[j] === undefined ? '—' : format(r.values[j]))), ...(stacked ? [format(sum(r.values))] : [])])}
      />
    </div>
  );
}
