import { useCallback, useEffect, useRef, useState } from 'react';
import { Bullets } from '../../atoms/Bullets';
import { ThemeToggle } from '../../atoms/ThemeToggle';
import { Menu } from '../../molecules/Menu';
import { NavMobile } from '../../molecules/NavMobile';
import { Blobs } from '../Blobs';
import { DeckFooter } from '../DeckFooter';
import styles from './Deck.module.css';
import { DECK_DEFAULTS } from './types';
import type { DeckProps, DeckTheme } from './types';
import { useDeckNavigation } from './useDeckNavigation';

function readTheme(key: string, fallback: DeckTheme): DeckTheme {
  if (!key) return fallback;
  try {
    const v = localStorage.getItem(key);
    if (v === 'claro') return 'light';
    if (v === 'oscuro') return 'dark';
  } catch {
    /* storage unavailable */
  }
  return fallback;
}

/**
 * Deck is the frame of a talk: the blobs behind, the top bar that hides while navigating,
 * the stops (Slides), the side index, keyboard navigation, the remembered theme and the footer.
 */
export function Deck({
  items,
  children,
  footer,
  defaultTheme = DECK_DEFAULTS.defaultTheme,
  storageKey = DECK_DEFAULTS.storageKey,
  navLabel = DECK_DEFAULTS.navLabel,
  indexLabel = DECK_DEFAULTS.indexLabel,
  blobs = DECK_DEFAULTS.blobs,
  homeHref = DECK_DEFAULTS.homeHref,
  homeLabel = DECK_DEFAULTS.homeLabel,
  className,
}: DeckProps) {
  const mainRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState<DeckTheme>(() => readTheme(storageKey, defaultTheme));
  const [barHidden, setBarHidden] = useState(false);
  const [indexVisible, setIndexVisible] = useState(false);
  const { stops, current, goTo } = useDeckNavigation(mainRef, footerRef);

  const toggleTheme = (dark: boolean) => {
    const next: DeckTheme = dark ? 'dark' : 'light';
    setTheme(next);
    if (storageKey) {
      try {
        localStorage.setItem(storageKey, dark ? 'oscuro' : 'claro');
      } catch {
        /* storage unavailable */
      }
    }
  };

  // The bar: fixed on the cover. While navigating it hides; it only comes back when the pointer
  // reaches the top edge (120 px) and hides again 1 s after leaving, unless busy (menu, focus, hover).
  const wakeAt = useRef(0);
  const pointerTop = useRef(false);
  const atCover = useCallback(() => window.scrollY < window.innerHeight * 0.6, []);
  useEffect(() => {
    const WAIT = 1000;
    let raf = 0;
    const busy = () => {
      const bar = barRef.current;
      return pointerTop.current || Boolean(document.querySelector('dialog[open]')) || Boolean(bar && (bar.contains(document.activeElement) || bar.matches(':hover')));
    };
    const watch = (now: number) => {
      if (atCover()) setBarHidden(false);
      else if (busy()) wakeAt.current = now;
      else if (now - wakeAt.current > WAIT) setBarHidden(true);
      setIndexVisible(window.scrollY > window.innerHeight * 0.6);
      raf = requestAnimationFrame(watch);
    };
    raf = requestAnimationFrame(watch);
    const hide = () => {
      if (!atCover() && !pointerTop.current) setBarHidden(true);
    };
    const onMove = (e: PointerEvent) => {
      pointerTop.current = e.clientY < 120;
      if (pointerTop.current) {
        wakeAt.current = performance.now();
        setBarHidden(false);
      }
    };
    const onLeave = () => {
      pointerTop.current = false;
    };
    document.addEventListener('keydown', hide, true);
    window.addEventListener('scroll', hide, { passive: true });
    document.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('keydown', hide, true);
      window.removeEventListener('scroll', hide);
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, [atCover]);

  const toggle = <ThemeToggle dark={theme === 'dark'} onToggle={toggleTheme} />;
  const classes = [styles.deck, className ?? ''].filter(Boolean).join(' ');

  return (
    <div className={classes} data-theme={theme} data-deck="">
      {blobs ? <Blobs /> : null}

      <div ref={barRef} className={styles.bar} data-hidden={barHidden ? '' : undefined}>
        <div className={styles.row}>
          <div className={styles.wide}>
            <Menu items={items} homeHref={homeHref} homeLabel={homeLabel} label={navLabel} end={toggle} />
          </div>
          <div className={styles.narrow}>
            <NavMobile items={items} homeHref={homeHref} homeLabel={homeLabel} label={navLabel} end={toggle} />
          </div>
        </div>
      </div>

      <main ref={mainRef} className={styles.main} data-scale="projection" data-deck-stops="">
        {children}
      </main>

      <div ref={footerRef}>
        <DeckFooter homeHref={homeHref} homeLabel={homeLabel} {...footer} />
      </div>

      {stops.length > 2 ? (
        <div className={styles.index} data-visible={indexVisible ? '' : undefined}>
          <Bullets
            orientation="vertical"
            count={stops.length}
            current={current + 1}
            onSelect={(page) => goTo(page - 1)}
            label={indexLabel}
            itemLabel="Parada"
            aria-label={indexLabel}
          />
        </div>
      ) : null}
    </div>
  );
}
