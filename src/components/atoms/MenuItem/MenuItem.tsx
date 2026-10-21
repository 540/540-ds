import styles from './MenuItem.module.css';
import { MENU_ITEM_DEFAULTS } from './types';
import type { MenuItemProps } from './types';

/**
 * MenuItem is a destination of the menu: a real link with a "current section" state.
 * The current one is bold and nothing else, plus aria-current="page" set by the component.
 */
export function MenuItem({ href, size = MENU_ITEM_DEFAULTS.size, current = MENU_ITEM_DEFAULTS.current, className, children, ...rest }: MenuItemProps) {
  const classes = [styles.item, styles[`size-${size}`], current ? styles.current : '', className ?? ''].filter(Boolean).join(' ');
  return (
    <a className={classes} href={href} aria-current={current ? 'page' : undefined} {...rest}>
      <span className={styles.label}>{children}</span>
    </a>
  );
}
