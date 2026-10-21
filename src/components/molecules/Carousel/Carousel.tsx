import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Bullets } from '../../atoms/Bullets';
import { Button } from '../../atoms/Button';
import styles from './Carousel.module.css';
import { CAROUSEL_DEFAULTS } from './types';
import type { CarouselProps } from './types';

/**
 * Carousel is a strip that is paged with the dots below. It can advance by itself, but not by default.
 */
export function Carousel({
  items,
  label,
  controls = CAROUSEL_DEFAULTS.controls,
  header,
  itemWidth,
  autoplay,
  itemLabel = CAROUSEL_DEFAULTS.itemLabel,
  className,
}: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(1);
  const [paused, setPaused] = useState(false);
  const count = items.length;

  // With a header, dots alone do not exist: they go to the header row with the arrows.
  const mode = header && controls === 'dots' ? 'row' : controls;

  const goTo = useCallback(
    (page: number) => {
      const track = trackRef.current;
      if (!track) return;
      const index = ((page - 1 + count) % count) + 1;
      const slot = track.children[index - 1] as HTMLElement | undefined;
      if (slot) track.scrollTo({ left: slot.offsetLeft - track.offsetLeft, behavior: 'smooth' });
      setCurrent(index);
    },
    [count],
  );

  // Keep the current page in sync with manual scrolling (touch, trackpad)
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const slots = Array.from(track.children) as HTMLElement[];
      const left = track.scrollLeft + track.offsetLeft;
      let nearest = 0;
      let best = Infinity;
      slots.forEach((slot, i) => {
        const d = Math.abs(slot.offsetLeft - left);
        if (d < best) {
          best = d;
          nearest = i;
        }
      });
      setCurrent(nearest + 1);
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => track.removeEventListener('scroll', onScroll);
  }, []);

  // Autoplay: off by default, paused on hover/focus, off with reduced motion
  useEffect(() => {
    if (!autoplay || paused || count < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => goTo(current + 1), autoplay);
    return () => window.clearInterval(id);
  }, [autoplay, paused, current, count, goTo]);

  const arrows = (
    <div className={styles.arrows}>
      <Button variant="ghost" icon={<ChevronLeft />} iconOnly onClick={() => goTo(current - 1)}>
        Anterior
      </Button>
      <Button variant="ghost" icon={<ChevronRight />} iconOnly onClick={() => goTo(current + 1)}>
        Siguiente
      </Button>
    </div>
  );
  const dots = (
    <div className={styles.dots}>
      <Bullets count={count} current={current} onSelect={goTo} itemLabel={itemLabel} label={label} />
    </div>
  );

  const classes = [styles.carousel, mode === 'sides' ? styles.sides : '', className ?? ''].filter(Boolean).join(' ');

  return (
    <section
      className={classes}
      role="region"
      aria-roledescription="carrusel"
      aria-label={label}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {header ? (
        <div className={styles.headerRow}>
          {header}
          {mode === 'row' ? arrows : null}
        </div>
      ) : null}

      <div className={styles.window}>
        <div ref={trackRef} className={styles.track} style={itemWidth ? ({ '--carousel-item': itemWidth } as React.CSSProperties) : undefined}>
          {items.map((item, i) => (
            <div key={i} className={styles.slot} aria-roledescription="diapositiva" aria-label={`${itemLabel} ${i + 1} de ${count}`}>
              {item}
            </div>
          ))}
        </div>
      </div>

      {mode === 'sides' ? (
        <>
          <div className={[styles.side, styles.sidePrev].join(' ')}>
            <Button variant="ghost" icon={<ChevronLeft />} iconOnly onClick={() => goTo(current - 1)}>
              Anterior
            </Button>
          </div>
          <div className={[styles.side, styles.sideNext].join(' ')}>
            <Button variant="ghost" icon={<ChevronRight />} iconOnly onClick={() => goTo(current + 1)}>
              Siguiente
            </Button>
          </div>
        </>
      ) : null}

      {mode === 'dots' ? dots : null}
      {mode === 'row' && !header ? (
        <div className={styles.row}>
          {dots}
          {arrows}
        </div>
      ) : null}
    </section>
  );
}
