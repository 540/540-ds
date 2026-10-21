import { Text } from '../../atoms/Text';
import styles from './ProgressBar.module.css';
import { PROGRESS_BAR_DEFAULTS } from './types';
import type { ProgressBarProps } from './types';

/**
 * ProgressBar is a time bar or an adoption bar: a track with a fill that grows from the left,
 * labels at both ends and, optionally, milestones that light up as they are reached.
 */
export function ProgressBar({ value, start, end, milestones = PROGRESS_BAR_DEFAULTS.milestones, reached = PROGRESS_BAR_DEFAULTS.reached, label, className }: ProgressBarProps) {
  const v = Math.max(0, Math.min(1, value));
  return (
    <div className={[styles.bar, className ?? ''].filter(Boolean).join(' ')} role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(v * 100)}>
      <div className={styles.track}>
        <div className={styles.fill} style={{ transform: `scaleX(${v})` }} />
        <span className={styles.dot} style={{ left: 0 }} aria-hidden="true" />
        {Array.from({ length: milestones }, (_, i) => (
          <span key={i} className={[styles.dot, styles.milestone].join(' ')} style={{ left: `${((i + 1) / (milestones + 1)) * 100}%` }} data-on={i < reached ? '' : undefined} aria-hidden="true" />
        ))}
        <span className={styles.dot} style={{ left: '100%' }} aria-hidden="true" />
      </div>
      {start || end ? (
        <div className={styles.ends}>
          <Text variant="body-s">{start}</Text>
          <Text variant="body-s">{end}</Text>
        </div>
      ) : null}
    </div>
  );
}
