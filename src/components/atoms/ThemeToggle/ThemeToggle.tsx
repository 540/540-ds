import { Moon, Sun } from 'lucide-react';
import styles from './ThemeToggle.module.css';
import { THEME_TOGGLE_DEFAULTS } from './types';
import type { ThemeToggleProps } from './types';

/**
 * ThemeToggle switches the dark theme on and off. The icon is the theme you go to,
 * not the one that is on: moon in light, sun in dark. Presentational: the state lives outside.
 */
export function ThemeToggle({ dark, onToggle, label = THEME_TOGGLE_DEFAULTS.label, className, title, ...rest }: ThemeToggleProps) {
  const classes = [styles.toggle, className ?? ''].filter(Boolean).join(' ');
  return (
    <button
      type="button"
      className={classes}
      aria-pressed={dark}
      title={title ?? (dark ? 'Cambiar al tema claro' : 'Cambiar al tema oscuro')}
      onClick={() => onToggle(!dark)}
      {...rest}
    >
      <span className={styles.icon} aria-hidden="true">
        {dark ? <Sun /> : <Moon />}
      </span>
      <span className={styles.srOnly}>{label}</span>
    </button>
  );
}
