import { Text } from '../../atoms/Text';
import styles from './Metric.module.css';
import type { MetricNoteProps, MetricProps } from './types';

/** Metric is a figure in a box: the number big, what it measures in gray, the change in bold. */
export function Metric({ value, label, delta, className }: MetricProps) {
  return (
    <div className={[styles.metric, className ?? ''].filter(Boolean).join(' ')}>
      <Text as="h3" variant="title-l">
        {value}
      </Text>
      <div className={styles.body}>
        <Text variant="body-s" tone="secondary" wrap="pretty">
          {label}
        </Text>
        {delta ? (
          <Text variant="body-s-bold" wrap="pretty">
            {delta}
          </Text>
        ) : null}
      </div>
    </div>
  );
}

/** MetricNote is the small note under a row of metrics: where the numbers come from. */
export function MetricNote({ children, className }: MetricNoteProps) {
  return (
    <Text variant="body-s" tone="secondary" align="center" wrap="pretty" className={[styles.note, className ?? ''].filter(Boolean).join(' ')}>
      {children}
    </Text>
  );
}
