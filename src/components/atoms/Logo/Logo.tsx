import styles from './Logo.module.css';
import { LOGO_PATHS, LOGO_VIEWBOX } from './paths';
import { LOGO_DEFAULTS } from './types';
import type { LogoProps } from './types';

/**
 * Logo is the 540 logotype: the star and the word, one block. The height rules and
 * the width follows. The drawing inherits the ink, so there is no copy per theme.
 */
export function Logo({ size = LOGO_DEFAULTS.size, label = LOGO_DEFAULTS.label, className, ...rest }: LogoProps) {
  const decorative = label === '';
  const classes = [styles.logo, styles[`size-${size}`], className ?? ''].filter(Boolean).join(' ');

  return (
    <svg
      className={classes}
      viewBox={LOGO_VIEWBOX}
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : label}
      aria-hidden={decorative ? true : undefined}
      focusable="false"
      {...rest}
    >
      {LOGO_PATHS.map((d, i) => (
        <path key={i} fill="currentColor" d={d} />
      ))}
    </svg>
  );
}
