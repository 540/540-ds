import { useRef } from 'react';
import { DataTable, chartStyles, useNumberFormat } from '../../../charts';
import { useReveal } from '../../../hooks/useReveal';
import { Text } from '../../atoms/Text';
import styles from './Funnel.module.css';
import { FUNNEL_DEFAULTS } from './types';
import type { FunnelProps } from './types';

/**
 * Funnel is the steps of a process and how many reach each one: centered bars that narrow with the figure
 * (as wide as the first step at most), each with its figure, and between two steps the share that went on.
 * The bars open from the center, one after another, when the chart comes into view (or its Step lights up).
 */
export function Funnel({ steps, label, unit = FUNNEL_DEFAULTS.unit, decimals = FUNNEL_DEFAULTS.decimals, tone = FUNNEL_DEFAULTS.tone, className }: FunnelProps) {
  const ref = useRef<HTMLDivElement>(null);
  const on = useReveal(ref);
  const format = useNumberFormat(decimals, unit);
  const percent = useNumberFormat(0, ' %');
  const first = steps[0]?.value ?? 0;
  const width = (v: number) => (first > 0 ? Math.max(0, Math.min(1, v / first)) : 0) * 100;
  const conversion = (i: number) => (i > 0 && steps[i - 1].value > 0 ? percent((steps[i].value / steps[i - 1].value) * 100) : '—');
  const delay = (i: number, after = 0) => ({ transitionDelay: on ? `${i * 50 + after}ms` : '0ms' });

  return (
    <div ref={ref} role="figure" aria-label={label} className={[styles.chart, className ?? ''].filter(Boolean).join(' ')}>
      <ol className={[styles.list, chartStyles[`tone-${tone}`]].join(' ')} aria-hidden="true">
        {steps.map((step, i) => (
          <li key={i} className={styles.step}>
            {i > 0 ? (
              <span className={styles.conversion} data-on={on ? '' : undefined} style={delay(i, 600)}>
                <Text as="span" variant="micro" tone="secondary" className={chartStyles.axis}>
                  {conversion(i)}
                </Text>
              </span>
            ) : null}
            <Text as="span" variant="body-m" className={styles.label}>
              {step.label}
            </Text>
            <span className={styles.track}>
              <span className={styles.fill} style={{ inlineSize: on ? `${width(step.value)}%` : 0, ...delay(i) }} />
            </span>
            <Text as="span" variant="body-s-bold" className={[chartStyles.axis, styles.value].join(' ')}>
              {step.display ?? format(step.value)}
            </Text>
          </li>
        ))}
      </ol>
      <DataTable caption={label} columns={['', 'Cifra', 'Del paso anterior']} rows={steps.map((s, i) => [s.label, format(s.value), conversion(i)])} />
    </div>
  );
}
