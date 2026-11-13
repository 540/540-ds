import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import styles from './LogoCarousel.module.css';
import { LOGO_CAROUSEL_DEFAULTS } from './types';
import type { LogoCarouselProps } from './types';

/**
 * LogoCarousel is the strip of client logos: equal slots, an odd number so there is always one
 * in the center, at full ink and 8 % bigger. Steps by itself; pauses on hover and focus.
 */
export function LogoCarousel({ logos, label, interval = LOGO_CAROUSEL_DEFAULTS.interval, className }: LogoCarouselProps) {
  const n = logos.length;
  const [offset, setOffset] = useState(0);
  const [jump, setJump] = useState(false);
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  // Three copies: the strip advances through the middle copy and jumps back without a transition
  useEffect(() => {
    if (n < 2 || paused) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setOffset((o) => o + 1), interval);
    return () => window.clearInterval(id);
  }, [n, paused, interval]);

  useEffect(() => {
    if (offset < n) return;
    const track = trackRef.current;
    const onEnd = () => {
      setJump(true);
      setOffset((o) => o - n);
      requestAnimationFrame(() => requestAnimationFrame(() => setJump(false)));
    };
    track?.addEventListener('transitionend', onEnd, { once: true });
    return () => track?.removeEventListener('transitionend', onEnd);
  }, [offset, n]);

  const items = [...logos, ...logos, ...logos];

  return (
    <section
      className={[styles.carousel, className ?? ''].filter(Boolean).join(' ')}
      role="region"
      aria-roledescription="carrusel"
      aria-label={label}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      tabIndex={0}
    >
      <div ref={trackRef} className={styles.track} data-jump={jump ? '' : undefined} style={{ '--offset': offset } as CSSProperties}>
        {items.map((logo, i) => (
          <div key={i} className={styles.slot} data-pos={i - offset} aria-hidden={i >= n ? true : undefined}>
            <img className={styles.logo} src={logo.src} alt={i < n ? logo.name : ''} loading="lazy" />
          </div>
        ))}
      </div>
    </section>
  );
}
