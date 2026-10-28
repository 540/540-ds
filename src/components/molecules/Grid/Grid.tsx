import styles from './Grid.module.css';
import { GRID_DEFAULTS } from './types';
import type { GridItemProps, GridProps } from './types';

/** Grid is the twelve-column grid of the system, with the two gutters, and its two five-up layouts. */
export function Grid({ layout = GRID_DEFAULTS.layout, compact = false, align = GRID_DEFAULTS.align, children, className }: GridProps) {
  const classes = [styles.grid, layout === 'five' ? styles.five : '', layout === 'fiveCentered' ? styles.fiveCentered : '', compact ? styles.compact : '', align === 'center' ? styles.center : '', className ?? '']
    .filter(Boolean)
    .join(' ');
  return <div className={classes}>{children}</div>;
}

/** GridItem is a cell of the Grid: its span is the desktop one; the grid deduces the other two. */
export function GridItem({ span = GRID_DEFAULTS.span, children, className }: GridItemProps) {
  return <div className={[styles.item, styles[`span-${span}`], className ?? ''].filter(Boolean).join(' ')}>{children}</div>;
}
