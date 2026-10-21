import styles from './Slide.module.css';
import { SLIDE_DEFAULTS } from './types';
import type { SlideProps } from './types';

/**
 * Slide is a stop of the talk: a section that fills the screen and centers its content on a
 * 16:9 stage inside the column. Deck collects every Slide as a stop of the journey.
 */
export function Slide({ id, tone = SLIDE_DEFAULTS.tone, full = SLIDE_DEFAULTS.full, className, children, ...rest }: SlideProps) {
  const classes = [styles.slide, styles[`tone-${tone}`], full ? styles.full : '', className ?? ''].filter(Boolean).join(' ');
  return (
    <section id={id} className={classes} data-slide="" {...rest}>
      <div className={styles.stage} data-slide-stage="">
        {children}
      </div>
    </section>
  );
}
