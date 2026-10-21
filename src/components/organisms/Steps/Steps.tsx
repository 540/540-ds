import { useCallback, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import styles from './Steps.module.css';
import { StepOnContext, StepsContext, useSteps } from './StepsContext';
import type { StepProps, StepsProps } from './types';

/**
 * Steps is a block the keyboard walks through, step by step, while it is on screen: the same
 * arrow that moves between stops first lights the next step; when the steps run out, it moves on.
 * Ported from the talks' [data-pasos] mechanic.
 */
export function Steps({ total, children, onStep, className }: StepsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(-1);
  const [guided, setGuided] = useState(false);

  const go = useCallback(
    (n: number) => {
      setCurrent(n);
      onStep?.(n);
    },
    [onStep],
  );

  // Light step 0 when the block arrives (80 % of the window); the rest waits for the arrow
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting) && !guided) {
          setGuided(true);
          go(0);
        }
      },
      { rootMargin: '0px 0px -20% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [guided, go]);

  // Capture-phase keys: before the deck's own navigation
  useEffect(() => {
    const inView = () => {
      const el = ref.current;
      if (!el) return false;
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight * 0.75 && r.bottom > window.innerHeight * 0.25;
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
      if (document.querySelector('dialog[open]')) return;
      if (!inView()) return;
      const k = e.key;
      const space = k === ' ' || k === 'Spacebar';
      const fwd = k === 'ArrowRight' || k === 'ArrowDown' || k === 'PageDown' || (space && !e.shiftKey);
      const back = k === 'ArrowLeft' || k === 'ArrowUp' || k === 'PageUp' || (space && e.shiftKey);
      if (!fwd && !back) return;
      const stop = () => {
        e.preventDefault();
        e.stopImmediatePropagation();
      };
      if (!guided) {
        setGuided(true);
        go(0);
        stop();
        return;
      }
      if (fwd && current < total) {
        go(current + 1);
        stop();
      } else if (back && current > 0) {
        go(current - 1);
        stop();
      }
    };
    document.addEventListener('keydown', onKey, true);
    return () => document.removeEventListener('keydown', onKey, true);
  }, [guided, current, total, go]);

  return (
    <StepsContext.Provider value={{ current: guided ? current : Infinity, total, guided }}>
      <div ref={ref} className={[styles.steps, className ?? ''].filter(Boolean).join(' ')} data-steps="" data-guided={guided ? '' : undefined} data-current={guided ? current : undefined}>
        {children}
      </div>
    </StepsContext.Provider>
  );
}

/** Step is a piece of a Steps block that shows from a step on (and, optionally, until another). */
export function Step({ from = 0, to, collapse = false, children, className }: StepProps) {
  const { current } = useSteps();
  const on = current >= from && (to === undefined || current < to);
  return (
    <StepOnContext.Provider value={on}>
      <div className={[styles.step, collapse ? styles.collapse : '', className ?? ''].filter(Boolean).join(' ')} data-on={on ? '' : undefined} aria-hidden={on ? undefined : true}>
        {children}
      </div>
    </StepOnContext.Provider>
  );
}

/** PanelStack puts several Steps in the same cell: only the one of the step shows. */
export function PanelStack({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={[styles.stack, className ?? ''].filter(Boolean).join(' ')}>{children}</div>;
}
