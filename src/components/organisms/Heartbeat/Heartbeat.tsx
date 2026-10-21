import styles from './Heartbeat.module.css';
import type { HeartbeatProps } from './types';

/** Heartbeat is a red heart that beats with a wave around it: "la maquineta" alive. Decoration. */
export function Heartbeat({ className }: HeartbeatProps) {
  return (
    <div className={[styles.heartbeat, className ?? ''].filter(Boolean).join(' ')} aria-hidden="true">
      <span className={styles.wave} />
      <svg viewBox="0 0 48 44" className={styles.heart}>
        <path d="M24 41C24 41 3 27.5 3 14.5C3 7.6 8.6 2 15.5 2C19.8 2 22.6 4.2 24 6.6C25.4 4.2 28.2 2 32.5 2C39.4 2 45 7.6 45 14.5C45 27.5 24 41 24 41Z" />
      </svg>
    </div>
  );
}
