import { Logo } from '../../atoms/Logo';
import { MenuItem } from '../../atoms/MenuItem';
import styles from './Menu.module.css';
import { MENU_DEFAULTS } from './types';
import type { MenuProps } from './types';

/**
 * Menu is the desktop navigation bar: the logo on one side, the destinations in the middle,
 * and an optional end slot (the theme toggle) that is not a destination.
 */
export function Menu({
  items,
  homeHref = MENU_DEFAULTS.homeHref,
  homeLabel = MENU_DEFAULTS.homeLabel,
  label = MENU_DEFAULTS.label,
  end,
  className,
  ...rest
}: MenuProps) {
  const classes = [styles.menu, className ?? ''].filter(Boolean).join(' ');
  return (
    <nav className={classes} aria-label={label} {...rest}>
      <a className={styles.home} href={homeHref} aria-label={homeLabel}>
        <Logo size="xs" label="" />
      </a>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.href}>
            <MenuItem href={item.href} current={item.current}>
              {item.label}
            </MenuItem>
          </li>
        ))}
      </ul>
      <div className={styles.end}>{end}</div>
    </nav>
  );
}
