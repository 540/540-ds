import { useEffect, useRef, useState } from 'react';
import { Text } from '../../atoms/Text';
import { useStepOn, useSteps } from '../Steps/StepsContext';
import styles from './Sheet.module.css';
import type { SheetProps } from './types';

/**
 * Sheet is a panel that rises from the bottom edge over the stop, with a veil behind.
 * Inside a Step it opens with the step; it hides as soon as its stop (the step of a timeline,
 * or the whole section) leaves the center of the window.
 */
export function Sheet({ open, kicker, title, description, children, className }: SheetProps) {
  const stepOn = useStepOn();
  const { total, guided } = useSteps();
  // Inside a Steps that has not started yet, the sheet waits closed
  const wanted = open ?? (total > 0 && !guided ? false : stepOn);
  const anchor = useRef<HTMLSpanElement>(null);
  const [onScreen, setOnScreen] = useState(true);

  // The sheet only shows while its stop holds the center of the window
  useEffect(() => {
    const check = () => {
      const stop = anchor.current?.closest('[data-stop]') ?? anchor.current?.closest('section');
      if (!stop) return setOnScreen(true);
      const r = stop.getBoundingClientRect();
      const c = window.innerHeight / 2;
      setOnScreen(r.top < c && r.bottom > c);
    };
    check();
    window.addEventListener('scroll', check, { passive: true, capture: true });
    window.addEventListener('resize', check);
    return () => {
      window.removeEventListener('scroll', check, { capture: true });
      window.removeEventListener('resize', check);
    };
  }, []);

  const isOpen = wanted && onScreen;

  return (
    <>
      <span ref={anchor} hidden />
      <div className={styles.veil} data-open={isOpen ? '' : undefined} aria-hidden="true" />
      <div className={[styles.sheet, className ?? ''].filter(Boolean).join(' ')} data-open={isOpen ? '' : undefined} data-scale="web" data-sheet="" aria-hidden={isOpen ? undefined : true}>
        <div className={styles.panel}>
          <div className={styles.header}>
            {kicker ? (
              <Text variant="body-s" tone="secondary">
                {kicker}
              </Text>
            ) : null}
            <Text as="h3" variant="title-m" wrap="balance">
              {title}
            </Text>
            {description ? (
              <Text variant="body-m" tone="secondary" wrap="pretty">
                {description}
              </Text>
            ) : null}
          </div>
          <div className={styles.body}>{children}</div>
        </div>
      </div>
    </>
  );
}
