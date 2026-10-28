import { useEffect, useState } from 'react';
import type { RefObject } from 'react';

export type CenterState = 'before' | 'on' | 'after';

/**
 * Where a piece is against the center line of the window: already passed (before), holding it
 * (on) or still to come (after). The sentences of the journey and the steps of a timeline use it
 * to light the one being told, dim the told ones and hide the ones to come. With
 * prefers-reduced-motion it is always on.
 */
export function useCenterState(ref: RefObject<Element | null>): CenterState {
  const [state, setState] = useState<CenterState>('on');

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0;
    const measure = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const c = window.innerHeight / 2;
      setState(r.bottom <= c ? 'before' : r.top > c ? 'after' : 'on');
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener('scroll', schedule, { passive: true, capture: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule, { capture: true });
      window.removeEventListener('resize', schedule);
    };
  }, [ref]);

  return state;
}
