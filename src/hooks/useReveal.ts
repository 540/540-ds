import { useEffect, useState, useSyncExternalStore } from 'react';
import type { RefObject } from 'react';
import { useStepOn } from '../components/organisms/Steps/StepsContext';

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia?.(REDUCED_MOTION);
  query?.addEventListener?.('change', onChange);
  return () => query?.removeEventListener?.('change', onChange);
}

const readReducedMotion = () => window.matchMedia?.(REDUCED_MOTION).matches ?? false;

const serverReducedMotion = () => false;

/**
 * Whether a piece should show its final state: it is on screen (a third of it, at least) and its
 * Step, if any, is on. Goes back to false when either stops, so a counter or a bar replays
 * every time the talk comes back to it. With prefers-reduced-motion it is always true.
 */
export function useReveal(ref: RefObject<Element | null>): boolean {
  const stepOn = useStepOn();
  const [seen, setSeen] = useState(false);
  const reduced = useSyncExternalStore(subscribeReducedMotion, readReducedMotion, serverReducedMotion);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced || typeof IntersectionObserver === 'undefined') {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(([entry]) => setSeen(entry.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, reduced]);

  return reduced || (seen && stepOn);
}
