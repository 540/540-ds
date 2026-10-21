import styles from './Blobs.module.css';
import type { BlobsProps } from './types';

/** Blobs are the two soft yellow stains that drift behind the whole talk. Pure decoration. */
export function Blobs({ className }: BlobsProps) {
  const classes = [styles.blobs, className ?? ''].filter(Boolean).join(' ');
  return (
    <div className={classes} aria-hidden="true">
      <div className={styles.a} />
      <div className={styles.b} />
    </div>
  );
}
