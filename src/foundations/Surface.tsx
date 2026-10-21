import type { ReactNode } from 'react';
import styles from './foundations.module.css';

/** Wraps documentation visuals in a box painted with the active theme's background and text color. */
export function Surface({ children }: { children: ReactNode }) {
  return <div className={styles.surface}>{children}</div>;
}
