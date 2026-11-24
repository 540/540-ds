import { useRef } from 'react';
import { Legend, chartStyles, useNumberFormat } from '../../../charts';
import { useReveal } from '../../../hooks/useReveal';
import { Count } from '../../atoms/Count';
import { Text } from '../../atoms/Text';
import styles from './Waffle.module.css';
import { WAFFLE_DEFAULTS } from './types';
import type { WaffleProps } from './types';

const CELLS = 100;
const STAGGER = 10;

/**
 * Waffle is a proportion counted in squares: a grid of 10 × 10 where the highlighted part fills in reading order,
 * one square after another, when it comes into view (or its Step lights up). Beside it, the figure counting up
 * and a short caption; with a second part, in gray, a legend.
 */
export function Waffle({
  value,
  total = WAFFLE_DEFAULTS.total,
  label,
  name,
  display,
  caption,
  tone = WAFFLE_DEFAULTS.tone,
  secondary,
  decimals = WAFFLE_DEFAULTS.decimals,
  className,
}: WaffleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const on = useReveal(ref);
  const format = useNumberFormat(decimals, ' %');
  const percent = (v: number) => (total > 0 ? (v / total) * 100 : 0);
  const main = Math.max(0, Math.min(CELLS, Math.round(percent(value))));
  const second = secondary ? Math.max(0, Math.min(CELLS - main, Math.round(percent(secondary.value)))) : 0;
  const figure = display ?? format(percent(value));
  const spoken = secondary ? `${label}: ${name ? `${name}, ` : ''}${figure}; ${secondary.label}, ${format(percent(secondary.value))}` : `${label}: ${figure}`;

  return (
    <div ref={ref} className={[styles.waffle, className ?? ''].filter(Boolean).join(' ')}>
      <div className={styles.grid} role="img" aria-label={spoken}>
        {Array.from({ length: CELLS }, (_, i) => {
          const part = i < main ? tone : i < main + second ? 'context' : null;
          return (
            <span key={i} className={styles.cell}>
              {part ? (
                <span
                  className={[styles.fill, chartStyles[`tone-${part}`]].join(' ')}
                  data-on={on ? '' : undefined}
                  style={{ transitionDelay: on ? `${i * STAGGER}ms` : '0ms' }}
                />
              ) : null}
            </span>
          );
        })}
      </div>
      <div className={styles.body}>
        <Text as="span" variant="title-l" className={styles.figure} aria-hidden="true">
          {display ?? <Count value={percent(value)} decimals={decimals} suffix=" %" />}
        </Text>
        {caption ? (
          <Text variant="body-s" tone="secondary" wrap="pretty">
            {caption}
          </Text>
        ) : null}
        {secondary ? <Legend items={[{ label: name ?? label, tone }, { label: secondary.label, tone: 'context' }]} /> : null}
      </div>
    </div>
  );
}
