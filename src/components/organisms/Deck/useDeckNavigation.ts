import { useCallback, useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';

const WRAPPERS = new Set(['DS-SLOT', 'DS-ISLAND']);

/** The Slides under parent, at any depth: a wrapper (a div with a label, an island) does not hide them. Other sections are not stops. */
function slidesOf(parent: Element): HTMLElement[] {
  return Array.from(parent.querySelectorAll<HTMLElement>('[data-slide]'));
}

/** The element after el, looking through the ds-slot/ds-island wrappers (not other wrappers: a photo goes next to its title). */
function nextThroughWrappers(el: Element): Element | null {
  let cur: Element = el;
  while (!cur.nextElementSibling && cur.parentElement && WRAPPERS.has(cur.parentElement.tagName)) cur = cur.parentElement;
  let next = cur.nextElementSibling;
  while (next && WRAPPERS.has(next.tagName)) next = next.firstElementChild ?? next.nextElementSibling;
  return next;
}

function photoAfter(el: Element): HTMLElement | null {
  const next = nextThroughWrappers(el) as HTMLElement | null;
  return next && next.hasAttribute('data-deck-photo') ? next : null;
}

/**
 * The journey of a talk, ported from the talks' navegacion-540.js (without GSAP):
 * - stops are the Slides inside <main> (at any depth), split by their outermost [data-stop] descendants, plus the footer;
 * - the keyboard moves between stops (and pages inside a stop taller than the window);
 * - the current stop is the one holding the center of the window.
 */
export function useDeckNavigation(mainRef: RefObject<HTMLElement | null>, footerRef: RefObject<HTMLElement | null>) {
  const [stops, setStops] = useState<HTMLElement[]>([]);
  const [current, setCurrent] = useState(0);
  const rangesRef = useRef<Array<[number, number]>>([]);

  const collect = useCallback(() => {
    const main = mainRef.current;
    if (!main) return;
    let list: HTMLElement[] = slidesOf(main);
    // A section with [data-stop] descendants is replaced by them (one stop per sentence, per month…).
    // Only the outermost count: a Spotlight inside a timeline step is the same stop as its step.
    list = list.flatMap((section) => {
      const inner = Array.from(section.querySelectorAll<HTMLElement>(':scope [data-stop]:not([data-stop] [data-stop])'));
      return inner.length ? inner : [section];
    });
    if (footerRef.current) list.push(footerRef.current);
    setStops(list);
  }, [mainRef, footerRef]);

  const measure = useCallback(() => {
    rangesRef.current = stops.map((el) => {
      const r = el.getBoundingClientRect();
      const top = r.top + window.scrollY;
      return [top, top + r.height];
    });
  }, [stops]);

  const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const slide = useCallback((y: number) => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const top = Math.max(0, Math.min(Math.round(y), max));
    window.scrollTo({ top, behavior: reduced() ? 'auto' : 'smooth' });
  }, []);

  const photoOf = (el: HTMLElement) => (el.tagName === 'SECTION' ? photoAfter(el) : null);

  const goTo = useCallback(
    (i: number) => {
      const n = Math.max(0, Math.min(stops.length - 1, i));
      const el = stops[n];
      if (!el) return;
      if (n === stops.length - 1) {
        slide(document.documentElement.scrollHeight);
        return;
      }
      const vh = window.innerHeight;
      const top = el.getBoundingClientRect().top + window.scrollY;
      if (photoOf(el)) {
        slide(top);
        return;
      }
      // Center the CONTENT (the stage), not the section box: padding does not misalign the stop
      const stage = el.querySelector<HTMLElement>('[data-slide-stage]') ?? el;
      const r = stage.getBoundingClientRect();
      const t = r.top + window.scrollY;
      slide(r.height < vh ? t - (vh - r.height) / 2 : top);
    },
    [stops, slide],
  );

  const currentIndex = useCallback(() => {
    if (!rangesRef.current.length) measure();
    const yc = window.scrollY + window.innerHeight / 2;
    const ranges = rangesRef.current;
    for (let i = 0; i < ranges.length; i++) if (yc >= ranges[i][0] && yc < ranges[i][1]) return i;
    let best = 0;
    let min = Infinity;
    ranges.forEach(([a, b], j) => {
      const d = Math.abs((a + b) / 2 - yc);
      if (d < min) {
        min = d;
        best = j;
      }
    });
    return best;
  }, [measure]);

  // Advance inside the stop while content is still out of view; otherwise go to the next one.
  const box = (i: number): [number, number] => {
    const el = stops[i];
    const stage = el.querySelector<HTMLElement>('[data-slide-stage]') ?? el;
    const r = stage.getBoundingClientRect();
    return [r.top + window.scrollY, r.bottom + window.scrollY];
  };
  const next = useCallback(() => {
    const i = currentIndex();
    const [, bottom] = box(i);
    const y = window.scrollY;
    const vh = window.innerHeight;
    if (i > 0 && bottom - (y + vh) > 12) {
      slide(Math.min(y + vh * 0.84, bottom - vh));
      return;
    }
    goTo(i + 1);
  }, [currentIndex, goTo, slide, stops]); // eslint-disable-line react-hooks/exhaustive-deps
  const prev = useCallback(() => {
    const i = currentIndex();
    const [top] = box(i);
    const y = window.scrollY;
    const vh = window.innerHeight;
    if (i > 0 && y - top > 12) {
      slide(Math.max(top, y - vh * 0.84));
      return;
    }
    goTo(i - 1);
  }, [currentIndex, goTo, slide, stops]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    collect();
  }, [collect]);

  useEffect(() => {
    if (!stops.length) return;
    measure();
    let lastY = -1;
    let lastH = -1;
    let raf = 0;
    const tick = () => {
      const y = window.scrollY;
      const h = document.documentElement.scrollHeight;
      if (h !== lastH) {
        lastH = h;
        measure();
        lastY = -1;
      }
      if (y !== lastY) {
        lastY = y;
        setCurrent(currentIndex());
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const onResize = () => {
      measure();
      setCurrent(currentIndex());
    };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, [stops, measure, currentIndex]);

  // Keyboard: arrows, space, page keys, Home and End. Not while typing or with a dialog open.
  useEffect(() => {
    const editing = (t: EventTarget | null) => {
      const el = t as HTMLElement | null;
      if (!el || !el.tagName) return false;
      return el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey) return;
      if (document.querySelector('dialog[open]')) return;
      if (editing(e.target)) return;
      const k = e.key;
      if (k === 'ArrowRight' || k === 'ArrowDown' || k === 'PageDown') {
        e.preventDefault();
        next();
      } else if (k === ' ' || k === 'Spacebar') {
        e.preventDefault();
        if (e.shiftKey) prev();
        else next();
      } else if (k === 'ArrowLeft' || k === 'ArrowUp' || k === 'PageUp') {
        e.preventDefault();
        prev();
      } else if (k === 'Home') {
        e.preventDefault();
        goTo(0);
      } else if (k === 'End') {
        e.preventDefault();
        goTo(stops.length - 1);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [next, prev, goTo, stops.length]);

  const nameOf = (el: HTMLElement, i: number) => {
    const t = el.querySelector('h1,h2,h3') ?? el.querySelector('p');
    const txt = t?.textContent?.trim() ?? el.id ?? '';
    return `${i + 1} de ${stops.length}${txt ? `. ${txt.slice(0, 44)}` : ''}`;
  };

  return { stops, current, goTo, next, prev, nameOf };
}
