import { useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { DataTable, chartStyles, position, useNumberFormat } from '../../../charts';
import { useReveal } from '../../../hooks/useReveal';
import { Text } from '../../atoms/Text';
import styles from './Heatmap.module.css';
import { HEATMAP_DEFAULTS } from './types';
import type { HeatmapProps } from './types';

/** The five opacities a cell can take: discrete steps, so two neighbours either look the same or clearly don't on a projector. */
const LEVELS = [0.08, 0.25, 0.45, 0.7, 1];

/** Column names written at most: past this, every other one (or every third…) is left blank. */
const MAX_COLUMN_LABELS = 12;

const KEYS: Record<string, [number, number]> = { ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1] };

/**
 * Heatmap is intensity in a table: rows × columns (days × hours, teams × weeks), each cell darker the higher its
 * figure, in five steps. The cells fade in diagonally from the top left when the map comes into view (or its Step
 * lights up). Pointing at a cell, or moving with the arrow keys, shows its row, column and figure.
 */
export function Heatmap({ rows, columns, values, label, tone = HEATMAP_DEFAULTS.tone, min, max, unit = HEATMAP_DEFAULTS.unit, decimals = HEATMAP_DEFAULTS.decimals, scale, className }: HeatmapProps) {
  const ref = useRef<HTMLDivElement>(null);
  const on = useReveal(ref);
  const [active, setActive] = useState<[number, number] | null>(null);
  const format = useNumberFormat(decimals, unit);

  const all = values.flat();
  const lo = min ?? Math.min(...all);
  const hi = max ?? Math.max(...all);
  const level = (v: number) => Math.min(LEVELS.length - 1, Math.floor(Math.max(0, Math.min(1, position(v, lo, hi))) * LEVELS.length));
  const every = Math.ceil(columns.length / MAX_COLUMN_LABELS);
  const stagger = Math.min(40, 800 / Math.max(rows.length + columns.length, 1));

  const keys = (event: KeyboardEvent<HTMLDivElement>) => {
    const move = KEYS[event.key];
    if (!move) return;
    event.preventDefault();
    event.stopPropagation();
    setActive((cell) => {
      if (!cell) return [0, 0];
      return [Math.max(0, Math.min(rows.length - 1, cell[0] + move[0])), Math.max(0, Math.min(columns.length - 1, cell[1] + move[1]))];
    });
  };

  return (
    <div ref={ref} className={[styles.chart, chartStyles[`tone-${tone}`], className ?? ''].filter(Boolean).join(' ')}>
      <div
        className={styles.grid}
        style={{ gridTemplateColumns: `auto repeat(${columns.length}, minmax(0, 1fr))` }}
        role="img"
        aria-label={label}
        tabIndex={0}
        onPointerLeave={() => setActive(null)}
        onKeyDown={keys}
        onBlur={() => setActive(null)}
      >
        <span aria-hidden="true" />
        {columns.map((c, j) => (
          <Text key={j} as="span" variant="micro" tone="secondary" className={[chartStyles.axis, styles.column].join(' ')} aria-hidden="true">
            {j % every === 0 ? c : ''}
          </Text>
        ))}
        {rows.map((row, r) => [
          <Text key={`row-${r}`} as="span" variant="micro" tone="secondary" className={[chartStyles.axis, styles.row].join(' ')} aria-hidden="true">
            {row}
          </Text>,
          ...columns.map((column, c) => {
            const v = values[r]?.[c];
            const isActive = active?.[0] === r && active?.[1] === c;
            return (
              <span
                key={`${r}-${c}`}
                className={styles.cell}
                data-on={on ? '' : undefined}
                data-active={isActive ? '' : undefined}
                style={{ transitionDelay: on ? `${Math.round((r + c) * stagger)}ms` : '0ms' }}
                onPointerEnter={() => setActive([r, c])}
              >
                {v === undefined ? null : <span className={styles.fill} style={{ opacity: LEVELS[level(v)] }} aria-hidden="true" />}
                {isActive ? (
                  <span className={[chartStyles.tooltip, styles.tooltip].join(' ')} data-side={c / columns.length > 0.6 ? 'start' : 'end'} data-below={r < rows.length / 2 ? '' : undefined} aria-live="polite">
                    <Text as="span" variant="micro-bold" tone="secondary">
                      {`${row} · ${column}`}
                    </Text>
                    <Text as="span" variant="body-s-bold">
                      {v === undefined ? '—' : format(v)}
                    </Text>
                  </span>
                ) : null}
              </span>
            );
          }),
        ])}
      </div>
      <div className={styles.key} aria-hidden="true">
        <Text as="span" variant="micro" tone="secondary" className={chartStyles.axis}>
          {scale?.low ?? format(lo)}
        </Text>
        <span className={styles.steps}>
          {LEVELS.map((opacity) => (
            <span key={opacity} className={styles.step} style={{ opacity }} />
          ))}
        </span>
        <Text as="span" variant="micro" tone="secondary" className={chartStyles.axis}>
          {scale?.high ?? format(hi)}
        </Text>
      </div>
      <DataTable caption={label} columns={['', ...columns]} rows={rows.map((row, r) => [row, ...columns.map((_, c) => (values[r]?.[c] === undefined ? '—' : format(values[r][c])))])} />
    </div>
  );
}
