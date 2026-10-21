import type { CSSProperties } from 'react';
import styles from './foundations.module.css';
import { toHex, useResolvedValue } from './useTokenValue';

type Props = {
  /** CSS custom property, e.g. "--color-bg-default" */
  name: string;
  label: string;
  /** Extra line under the token name (e.g. which primitive it points to) */
  detail?: string;
};

/** A color chip with its label, token name and live hex value. */
export function ColorSwatch({ name, label, detail }: Props) {
  const resolved = useResolvedValue(name);
  return (
    <div className={styles.swatch}>
      <div className={styles.swatchChip} style={{ '--swatch-color': `var(${name})` } as CSSProperties} aria-hidden="true" />
      <div className={styles.swatchText}>
        <span className={styles.swatchLabel}>{label}</span>
        <span className={styles.swatchToken}>{name}</span>
        <span className={styles.swatchValue}>
          {toHex(resolved)}
          {detail ? ` · ${detail}` : ''}
        </span>
      </div>
    </div>
  );
}
