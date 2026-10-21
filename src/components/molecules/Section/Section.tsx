import styles from './Section.module.css';
import { SECTION_DEFAULTS } from './types';
import type { SectionProps } from './types';

/**
 * Section is a band of the page: the background reaches edge to edge and the content stays
 * in the column. It gives the vertical rhythm to every section.
 */
export function Section({ tone = SECTION_DEFAULTS.tone, className, children, ...rest }: SectionProps) {
  const classes = [styles.section, styles[`tone-${tone}`], className ?? ''].filter(Boolean).join(' ');
  return (
    <section className={classes} {...rest}>
      <div className={styles.column}>{children}</div>
    </section>
  );
}
