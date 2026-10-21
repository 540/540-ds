import { useEffect, useRef, useState } from 'react';
import { Menu as MenuIcon, X } from 'lucide-react';
import { Button } from '../../atoms/Button';
import { Logo } from '../../atoms/Logo';
import { MenuItem } from '../../atoms/MenuItem';
import styles from './NavMobile.module.css';
import { NAV_MOBILE_DEFAULTS } from './types';
import type { NavMobileProps } from './types';

/**
 * NavMobile is the narrow-screen navigation: the logo and a button that opens the menu
 * full screen. The state is internal; choosing a destination closes the panel.
 */
export function NavMobile({
  items,
  homeHref = NAV_MOBILE_DEFAULTS.homeHref,
  homeLabel = NAV_MOBILE_DEFAULTS.homeLabel,
  label = NAV_MOBILE_DEFAULTS.label,
  end,
  className,
  ...rest
}: NavMobileProps) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDialogElement>(null);

  // A real modal dialog: focus trapped inside, Escape closes, focus returns to the opener.
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    if (open && !panel.open) panel.showModal();
    if (!open && panel.open) panel.close();
  }, [open]);

  // The page behind does not scroll while the panel is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const classes = [styles.nav, className ?? ''].filter(Boolean).join(' ');

  return (
    <nav className={classes} aria-label={label} {...rest}>
      <a className={styles.home} href={homeHref} aria-label={homeLabel}>
        <Logo size="xs" label="" />
      </a>
      <div className={styles.end}>
        {end}
        <Button variant="ghost" icon={<MenuIcon />} iconOnly aria-expanded={open} onClick={() => setOpen(true)}>
          Abrir menú
        </Button>
      </div>

      <dialog ref={panelRef} className={styles.panel} aria-label={label} onClose={() => setOpen(false)}>
        <div className={styles.panelBar}>
          <a className={styles.home} href={homeHref} aria-label={homeLabel} onClick={() => setOpen(false)}>
            <Logo size="xs" label="" />
          </a>
          <Button variant="ghost" icon={<X />} iconOnly onClick={() => setOpen(false)}>
            Cerrar menú
          </Button>
        </div>
        <ul className={styles.list}>
          {items.map((item) => (
            <li key={item.href}>
              <MenuItem href={item.href} size="lg" current={item.current} onClick={() => setOpen(false)}>
                {item.label}
              </MenuItem>
            </li>
          ))}
        </ul>
      </dialog>
    </nav>
  );
}
