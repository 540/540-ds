import styles from './SocialIcon.module.css';
import { SOCIAL_PATHS, SOCIAL_VIEWBOX } from './paths';
import { SOCIAL_ICON_DEFAULTS } from './types';
import type { SocialIconProps } from './types';

/**
 * SocialIcon is the logotype of a social network, filled and in its original canvas.
 * It is always hidden from screen readers: the name belongs to the link that wraps it.
 */
export function SocialIcon({ network, size = SOCIAL_ICON_DEFAULTS.size, className, ...rest }: SocialIconProps) {
  const classes = [styles.icon, styles[`size-${size}`], className ?? ''].filter(Boolean).join(' ');
  return (
    <svg className={classes} viewBox={SOCIAL_VIEWBOX} aria-hidden="true" focusable="false" {...rest}>
      {SOCIAL_PATHS[network].map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}
