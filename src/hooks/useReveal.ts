import { useEffect, useState } from 'react';
import type { RefObject } from 'react';
import { useStepOn } from '../components/organisms/Steps';

/**
 * Whether a piece should show its final state: it is on screen (a third of it, at least) and its
 * Step, if any, is on. Goes back to false when either stops, so a counter or a bar replays
 * every time the talk comes back to it. With prefers-reduced-motion it is always true.
 */
export function useReveal(ref: RefObject<Element | null>): boolean {
  const stepOn = useStepOn();
  const [seen, setSeen] = useState(false);
  const [reduced] = useState(() => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches);

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
