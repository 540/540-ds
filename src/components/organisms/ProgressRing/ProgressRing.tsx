import { useRef } from 'react';
import { chartStyles, useNumberFormat } from '../../../charts';
import { useReveal } from '../../../hooks/useReveal';
import { Count } from '../../atoms/Count';
import { Text } from '../../atoms/Text';
import styles from './ProgressRing.module.css';
import { PROGRESS_RING_DEFAULTS } from './types';
import type { ProgressRingProps } from './types';

const FIGURE_VARIANT = { s: 'title-s', m: 'title-m', l: 'title-l' } as const;

/**
 * ProgressRing is a percentage, or the way towards a goal, as a ring: a gray track and an arc that grows
 * clockwise from twelve o'clock when it comes into view (or its Step lights up), with the figure counting up
 * in the centre and an optional caption under it.
 */
export function ProgressRing({
  value,
  max = PROGRESS_RING_DEFAULTS.max,
  label,
  display,
  caption,
  tone = PROGRESS_RING_DEFAULTS.tone,
  size = PROGRESS_RING_DEFAULTS.size,
  decimals = PROGRESS_RING_DEFAULTS.decimals,
  className,
}: ProgressRingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const on = useReveal(ref);
  const format = useNumberFormat(decimals, ' %');
  const percent = max > 0 ? (value / max) * 100 : 0;
  const arc = Math.max(0, Math.min(100, percent));

  return (
    <div ref={ref} className={[styles.ring, styles[`size-${size}`], chartStyles[`tone-${tone}`], className ?? ''].filter(Boolean).join(' ')}>
      <div className={styles.dial} role="img" aria-label={`${label}: ${display ?? format(percent)}`}>
        <svg className={styles.svg} viewBox="0 0 100 100" aria-hidden="true">
          <circle className={styles.track} cx="50" cy="50" r="45" />
          <circle className={styles.arc} cx="50" cy="50" r="45" pathLength={100} transform="rotate(-90 50 50)" style={{ strokeDashoffset: String(on ? 100 - arc : 100) }} />
        </svg>
        <Text as="span" variant={FIGURE_VARIANT[size]} className={styles.figure}>
          {display ?? <Count value={percent} decimals={decimals} suffix=" %" />}
        </Text>
      </div>
      {caption ? (
        <Text variant="body-s" tone="secondary" align="center" wrap="balance">
          {caption}
        </Text>
      ) : null}
    </div>
  );
}
