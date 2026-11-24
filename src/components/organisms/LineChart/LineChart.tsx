import { useRef, useState } from 'react';
import type { KeyboardEvent, PointerEvent } from 'react';
import { DataTable, Legend, chartStyles, defaultTone, niceScale, position, useNumberFormat } from '../../../charts';
import { useReveal } from '../../../hooks/useReveal';
import { Text } from '../../atoms/Text';
import styles from './LineChart.module.css';
import { LINE_CHART_DEFAULTS } from './types';
import type { LineChartProps } from './types';

/**
 * LineChart is an evolution over time: one to three lines over the same categories, drawn from the left when the
 * chart comes into view (or its Step lights up). Pointing at it, or moving with the arrow keys, shows every
 * series' figure at that point.
 */
export function LineChart({ categories, series, label, area = LINE_CHART_DEFAULTS.area, min, max, unit = LINE_CHART_DEFAULTS.unit, decimals = LINE_CHART_DEFAULTS.decimals, className }: LineChartProps) {
  const ref = useRef<HTMLDivElement>(null);
  const on = useReveal(ref);
  const [active, setActive] = useState<number | null>(null);
  const format = useNumberFormat(decimals, unit);

  const values = series.flatMap((s) => s.values);
  const scale = niceScale(min ?? Math.min(0, ...values), max ?? Math.max(...values, 0));
  const last = Math.max(categories.length - 1, 1);
  const x = (i: number) => (i / last) * 100;
  const y = (v: number) => (1 - position(v, scale.min, scale.max)) * 100;
  const tones = series.map((s, i) => s.tone ?? defaultTone(i));

  const pick = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setActive(Math.min(categories.length - 1, Math.max(0, Math.round(((event.clientX - rect.left) / rect.width) * last))));
  };
  const keys = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    event.stopPropagation();
    setActive((i) => Math.max(0, Math.min(categories.length - 1, (i ?? (step > 0 ? -1 : categories.length)) + step)));
  };

  return (
    <div ref={ref} className={[styles.chart, className ?? ''].filter(Boolean).join(' ')}>
      {series.length > 1 ? <Legend items={series.map((s, i) => ({ label: s.label, tone: tones[i] }))} /> : null}
      <div className={styles.frame}>
        <div className={styles.ticks} aria-hidden="true">
          {scale.ticks.map((t) => (
            <Text key={t} as="span" variant="micro" tone="secondary" className={[chartStyles.axis, styles.tick].join(' ')} style={{ insetBlockStart: `${y(t)}%` }}>
              {format(t)}
            </Text>
          ))}
        </div>
        <div
          className={styles.plot}
          role="img"
          aria-label={label}
          tabIndex={0}
          onPointerMove={pick}
          onPointerLeave={() => setActive(null)}
          onKeyDown={keys}
          onBlur={() => setActive(null)}
        >
          {scale.ticks.map((t) => (
            <span key={t} className={styles.grid} style={{ insetBlockStart: `${y(t)}%` }} aria-hidden="true" />
          ))}
          <svg className={styles.svg} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {series.map((s, i) => {
              const points = s.values.map((v, j) => `${x(j)},${y(v)}`).join(' ');
              return (
                <g key={i} className={[styles.series, chartStyles[`tone-${tones[i]}`]].join(' ')} data-on={on ? '' : undefined} style={{ transitionDelay: on ? `${i * 150}ms` : '0ms' }}>
                  {area ? <polygon className={styles.area} points={`0,${y(Math.max(scale.min, 0))} ${points} ${x(s.values.length - 1)},${y(Math.max(scale.min, 0))}`} /> : null}
                  <polyline className={[styles.line, s.dashed ? styles.dashed : ''].join(' ')} points={points} vectorEffect="non-scaling-stroke" />
                </g>
              );
            })}
          </svg>
          {active !== null ? (
            <>
              <span className={styles.cursor} style={{ insetInlineStart: `${x(active)}%` }} aria-hidden="true" />
              {series.map((s, i) => (
                <span key={i} className={[styles.dot, chartStyles[`tone-${tones[i]}`]].join(' ')} style={{ insetInlineStart: `${x(active)}%`, insetBlockStart: `${y(s.values[active] ?? 0)}%` }} aria-hidden="true" />
              ))}
              <div className={[chartStyles.tooltip, styles.tooltip].join(' ')} data-side={x(active) > 60 ? 'start' : 'end'} style={{ insetInlineStart: `${x(active)}%` }} aria-live="polite">
                <Text as="span" variant="micro-bold" tone="secondary">
                  {categories[active]}
                </Text>
                {series.map((s, i) => (
                  <span key={i} className={[chartStyles.tooltipRow, chartStyles[`tone-${tones[i]}`]].join(' ')}>
                    <span className={chartStyles.swatch} aria-hidden="true" />
                    <Text as="span" variant="body-s">
                      {s.label}
                    </Text>
                    <Text as="span" variant="body-s-bold">
                      {s.values[active] === undefined ? '—' : format(s.values[active])}
                    </Text>
                  </span>
                ))}
              </div>
            </>
          ) : null}
        </div>
        <div className={styles.categories} aria-hidden="true">
          {categories.map((c, i) => (
            <Text key={i} as="span" variant="micro" tone="secondary" className={[chartStyles.axis, styles.category].join(' ')} style={{ insetInlineStart: `${x(i)}%` }}>
              {c}
            </Text>
          ))}
        </div>
      </div>
      <DataTable caption={label} columns={['', ...series.map((s) => s.label)]} rows={categories.map((c, i) => [c, ...series.map((s) => (s.values[i] === undefined ? '—' : format(s.values[i])))])} />
    </div>
  );
}
