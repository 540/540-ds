import { Text } from '../../atoms/Text';
import { SectionHeader } from '../../molecules/SectionHeader';
import { Slide } from '../Slide';
import styles from './Timeline.module.css';
import type { TimelineProps } from './types';

/**
 * Timeline is a vertical axis at half the grid: a dot, a title and a body per step,
 * joined by a continuous line. Each step is a stop of the journey.
 */
export function Timeline({ id, title, description, steps, className }: TimelineProps) {
  return (
    <Slide id={id} className={className} aria-labelledby={`${id}-title`}>
      <SectionHeader title={title} description={description} titleId={`${id}-title`} align="center" />
      <ol className={styles.list}>
        {steps.map((step, i) => (
          <li key={i} className={styles.step} data-stop="">
            <span className={styles.dot} aria-hidden="true" />
            <div className={styles.text}>
              <Text as="h3" variant="title-s" wrap="balance">
                {step.title}
              </Text>
              <Text variant="body-m" tone="secondary" wrap="pretty">
                {step.body}
              </Text>
            </div>
          </li>
        ))}
      </ol>
    </Slide>
  );
}
