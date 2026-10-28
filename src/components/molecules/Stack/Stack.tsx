import styles from './Stack.module.css';
import { STACK_DEFAULTS } from './types';
import type { StackProps } from './types';

/**
 * Stack puts the pieces of a stop one under the other with the system's air between them:
 * a header over a grid, a row of metrics over its note, a few questions in a column.
 */
export function Stack({ gap = STACK_DEFAULTS.gap, measure = STACK_DEFAULTS.measure, children, className }: StackProps) {
  const classes = [styles.stack, styles[`gap-${gap}`], measure !== 'none' ? styles[`measure-${measure}`] : '', className ?? ''].filter(Boolean).join(' ');
  return <div className={classes}>{children}</div>;
}
