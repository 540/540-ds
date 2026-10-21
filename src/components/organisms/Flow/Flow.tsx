import { Text } from '../../atoms/Text';
import styles from './Flow.module.css';
import { FLOW_DEFAULTS } from './types';
import type { FlowProps } from './types';

/**
 * Flow is a chain of steps: pills with an arrow centered in the gap between them.
 * A column on narrow screens, a row from 600 px. One step can be highlighted.
 */
export function Flow({ steps, label = FLOW_DEFAULTS.label, className }: FlowProps) {
  return (
    <ol className={[styles.flow, className ?? ''].filter(Boolean).join(' ')} aria-label={label}>
      {steps.map((step, i) => (
        <li key={i} className={[styles.step, step.highlighted ? styles.highlighted : ''].filter(Boolean).join(' ')}>
          <Text as="span" variant="body-s" className={styles.label}>
            {step.label}
          </Text>
        </li>
      ))}
    </ol>
  );
}
