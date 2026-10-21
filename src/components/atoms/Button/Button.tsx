import styles from './Button.module.css';
import { BUTTON_DEFAULTS } from './types';
import type { ButtonProps } from './types';

/**
 * Button is the action that triggers something: send, open, confirm.
 * With `href` it navigates and renders a real link with the same look.
 */
export function Button(props: ButtonProps) {
  const {
    variant = BUTTON_DEFAULTS.variant,
    size = BUTTON_DEFAULTS.size,
    icon,
    iconOnly = BUTTON_DEFAULTS.iconOnly,
    className,
    children,
    ...rest
  } = props;

  // Without an icon there is no icon-only button: it falls back to the labeled one.
  const isIconOnly = iconOnly && Boolean(icon);

  const classes = [styles.button, styles[`variant-${variant}`], styles[`size-${size}`], isIconOnly ? styles.iconOnly : '', className ?? '']
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {icon ? (
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      ) : null}
      <span className={isIconOnly ? styles.srOnly : undefined}>{children}</span>
    </>
  );

  if ('href' in rest && rest.href !== undefined) {
    const { href, ...anchorRest } = rest;
    return (
      <a className={classes} href={href} {...anchorRest}>
        {content}
      </a>
    );
  }

  const { type = 'button', disabled, ...buttonRest } = rest as Extract<ButtonProps, { href?: undefined }>;
  return (
    <button className={classes} type={type} disabled={disabled} {...buttonRest}>
      {content}
    </button>
  );
}
