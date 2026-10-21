import styles from './Bullets.module.css';
import { BULLETS_DEFAULTS } from './types';
import type { BulletsProps } from './types';

/**
 * Bullets are the dots that say which page a paginated strip is on, and jump to it.
 * The active one gets longer instead of changing color. With one page, nothing is painted.
 */
export function Bullets({
  count,
  current,
  onSelect,
  orientation = BULLETS_DEFAULTS.orientation,
  itemLabel = BULLETS_DEFAULTS.itemLabel,
  label = BULLETS_DEFAULTS.label,
  className,
  ...rest
}: BulletsProps) {
  if (count < 2) return null;

  const classes = [styles.bullets, orientation === 'vertical' ? styles.vertical : '', className ?? ''].filter(Boolean).join(' ');

  return (
    <div className={classes} role="group" aria-label={label} {...rest}>
      {Array.from({ length: count }, (_, i) => i + 1).map((page) => {
        const isCurrent = page === current;
        return (
          <button
            key={page}
            type="button"
            className={[styles.bullet, isCurrent ? styles.active : ''].filter(Boolean).join(' ')}
            aria-label={`${itemLabel} ${page} de ${count}`}
            aria-current={isCurrent ? 'true' : undefined}
            onClick={() => onSelect?.(page)}
          />
        );
      })}
    </div>
  );
}
