import { useRef } from 'react';
import { useCenterState } from '../../../hooks/useCenterState';
import { Text } from '../../atoms/Text';
import { SectionHeader } from '../../molecules/SectionHeader';
import { Slide } from '../Slide';
import styles from './Timeline.module.css';
import type { TimelineProps, TimelineStep } from './types';

/**
 * Timeline is a vertical axis at half the grid: a dot, a title and a body per step,
 * joined by a continuous line. Each step is a stop of the journey: the one holding the center is
 * lit, the told ones dim to 14 % and the ones to come stay hidden.
 */
export function Timeline({ id, title, description, steps, className }: TimelineProps) {
  return (
    <Slide id={id} className={className} aria-labelledby={`${id}-title`}>
      <SectionHeader title={title} description={description} titleId={`${id}-title`} align="center" />
      <ol className={styles.list}>
        {steps.map((step, i) => (
          <Step key={i} step={step} />
        ))}
      </ol>
    </Slide>
  );
}

function Step({ step }: { step: TimelineStep }) {
  const ref = useRef<HTMLLIElement>(null);
  const state = useCenterState(ref);
  return (
    <li ref={ref} className={[styles.step, step.alert ? styles.alert : ''].filter(Boolean).join(' ')} data-stop="" data-state={state}>
      <span className={styles.dot} aria-hidden="true" />
      <div className={styles.text}>
        {step.kicker ? (
          <Text variant="body-s" tone="secondary">
            {step.kicker}
          </Text>
        ) : null}
        <Text as="h3" variant="title-s" wrap="balance">
          {step.title}
        </Text>
        {step.body ? (
          <Text variant="body-m" tone="secondary" wrap="pretty">
            {step.body}
          </Text>
        ) : null}
        {step.extra}
      </div>
    </li>
  );
}
