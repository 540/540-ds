import { useRef, useState } from 'react';
import type { KeyboardEvent, PointerEvent } from 'react';
import { DataTable, Legend, chartStyles, defaultTone, niceScale, position, useNumberFormat } from '../../../charts';
import { useReveal } from '../../../hooks/useReveal';
import { Text } from '../../atoms/Text';
import styles from './Scatter.module.css';
import { SCATTER_DEFAULTS } from './types';
import type { ScatterProps } from './types';

/**
 * Scatter is the relation between two figures: one dot per item, placed by its x and y over a frame of round
 * figures. The dots pop in from left to right when the chart comes into view (or its Step lights up). Pointing at
 * it, or moving with the arrow keys, shows the nearest point's name and figures. One point can be highlighted in
 * yellow, with its name always written.
 */
export function Scatter({
  groups,
  label,
  xLabel,
  yLabel,
  highlight,
  xMin,
  xMax,
  yMin,
  yMax,
  xUnit = SCATTER_DEFAULTS.xUnit,
  yUnit = SCATTER_DEFAULTS.yUnit,
  decimals = SCATTER_DEFAULTS.decimals,
  className,
}: ScatterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const on = useReveal(ref);
  const [active, setActive] = useState<number | null>(null);
  const formatX = useNumberFormat(decimals, xUnit);
  const formatY = useNumberFormat(decimals, yUnit);

  const tones = groups.map((g, i) => g.tone ?? defaultTone(i));
  // Every point, left to right: the order of the reveal and of the arrow keys.
  const points = groups.flatMap((g, group) => g.points.map((p) => ({ ...p, group }))).sort((a, b) => a.x - b.x || a.y - b.y);
  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);
  const xScale = niceScale(xMin ?? Math.min(...xs), xMax ?? Math.max(...xs));
  const yScale = niceScale(yMin ?? Math.min(...ys), yMax ?? Math.max(...ys));
  const x = (v: number) => position(v, xScale.min, xScale.max) * 100;
  const y = (v: number) => (1 - position(v, yScale.min, yScale.max)) * 100;
  const stagger = Math.min(40, 900 / Math.max(points.length, 1));
  const name = (p: (typeof points)[number]) => p.label ?? groups[p.group].label;

  const pick = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const px = event.clientX - rect.left;
    const py = event.clientY - rect.top;
    let best: number | null = null;
    let distance = Infinity;
    points.forEach((p, i) => {
      const d = ((x(p.x) / 100) * rect.width - px) ** 2 + ((y(p.y) / 100) * rect.height - py) ** 2;
      if (d < distance) {
        distance = d;
        best = i;
      }
    });
    setActive(best);
  };
  const keys = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = event.key === 'ArrowRight' || event.key === 'ArrowUp' ? 1 : event.key === 'ArrowLeft' || event.key === 'ArrowDown' ? -1 : 0;
    if (!step || !points.length) return;
    event.preventDefault();
    event.stopPropagation();
    setActive((i) => (i === null ? (step > 0 ? 0 : points.length - 1) : (i + step + points.length) % points.length));
  };

  const current = active === null ? null : points[active];

  return (
    <div ref={ref} className={[styles.chart, className ?? ''].filter(Boolean).join(' ')}>
      {groups.length > 1 ? <Legend items={groups.map((g, i) => ({ label: g.label, tone: tones[i] }))} /> : null}
      <div className={styles.frame}>
        <Text as="span" variant="micro-bold" tone="secondary" className={styles.yLabel} aria-hidden="true">
          {yLabel}
        </Text>
        <div className={styles.ticks} aria-hidden="true">
          {yScale.ticks.map((t) => (
            <Text key={t} as="span" variant="micro" tone="secondary" className={[chartStyles.axis, styles.tick].join(' ')} style={{ insetBlockStart: `${y(t)}%` }}>
              {formatY(t)}
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
          {yScale.ticks.map((t) => (
            <span key={`y${t}`} className={styles.gridY} style={{ insetBlockStart: `${y(t)}%` }} aria-hidden="true" />
          ))}
          {xScale.ticks.map((t) => (
            <span key={`x${t}`} className={styles.gridX} style={{ insetInlineStart: `${x(t)}%` }} aria-hidden="true" />
          ))}
          {points.map((p, i) => {
            const isHighlight = highlight !== undefined && p.label === highlight;
            return (
              <span
                key={i}
                className={[styles.dot, chartStyles[`tone-${isHighlight ? 'accent' : tones[p.group]}`]].join(' ')}
                data-on={on ? '' : undefined}
                data-highlight={isHighlight ? '' : undefined}
                data-active={active === i ? '' : undefined}
                style={{ insetInlineStart: `${x(p.x)}%`, insetBlockStart: `${y(p.y)}%`, transitionDelay: on ? `${Math.round(i * stagger)}ms` : '0ms' }}
                aria-hidden="true"
              />
            );
          })}
          {points.map((p, i) =>
            highlight !== undefined && p.label === highlight ? (
              <Text key={`h${i}`} as="span" variant="micro-bold" className={styles.name} data-on={on ? '' : undefined} data-side={x(p.x) > 70 ? 'start' : 'end'} style={{ insetInlineStart: `${x(p.x)}%`, insetBlockStart: `${y(p.y)}%` }} aria-hidden="true">
                {p.label}
              </Text>
            ) : null,
          )}
          {current ? (
            <div className={[chartStyles.tooltip, styles.tooltip].join(' ')} data-side={x(current.x) > 60 ? 'start' : 'end'} style={{ insetInlineStart: `${x(current.x)}%`, insetBlockStart: `${y(current.y)}%` }} aria-live="polite">
              <span className={[chartStyles.tooltipRow, chartStyles[`tone-${current.label !== undefined && current.label === highlight ? 'accent' : tones[current.group]}`]].join(' ')}>
                <span className={chartStyles.swatch} aria-hidden="true" />
                <Text as="span" variant="micro-bold" tone="secondary">
                  {groups.length > 1 && current.label ? `${current.label} · ${groups[current.group].label}` : name(current)}
                </Text>
              </span>
              <span className={chartStyles.tooltipRow}>
                <Text as="span" variant="body-s">
                  {xLabel}
                </Text>
                <Text as="span" variant="body-s-bold">
                  {formatX(current.x)}
                </Text>
              </span>
              <span className={chartStyles.tooltipRow}>
                <Text as="span" variant="body-s">
                  {yLabel}
                </Text>
                <Text as="span" variant="body-s-bold">
                  {formatY(current.y)}
                </Text>
              </span>
            </div>
          ) : null}
        </div>
        <div className={styles.xTicks} aria-hidden="true">
          {xScale.ticks.map((t) => (
            <Text key={t} as="span" variant="micro" tone="secondary" className={[chartStyles.axis, styles.xTick].join(' ')} style={{ insetInlineStart: `${x(t)}%` }}>
              {formatX(t)}
            </Text>
          ))}
        </div>
        <Text as="span" variant="micro-bold" tone="secondary" className={styles.xLabel} aria-hidden="true">
          {xLabel}
        </Text>
      </div>
      <DataTable
        caption={label}
        columns={['', xLabel, yLabel]}
        rows={points.map((p) => [groups.length > 1 && p.label ? `${p.label} · ${groups[p.group].label}` : name(p), formatX(p.x), formatY(p.y)])}
      />
    </div>
  );
}
