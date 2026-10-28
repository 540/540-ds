import { useRef } from 'react';
import type { ReactNode } from 'react';
import { useCenterState } from '../../../hooks/useCenterState';
import { Text } from '../../atoms/Text';
import { Slide } from '../Slide';
import styles from './Statements.module.css';
import { STATEMENTS_DEFAULTS } from './types';
import type { StatementsProps } from './types';

/**
 * Statements are the sentences of the journey, stacked: one stop each (Deck splits the slide
 * with data-stop), in statement, three quarters wide, with an optional ordinal in front.
 * The sentence holding the center is lit; the told ones dim to 14 % and the ones to come stay hidden.
 */
export function Statements({ id = STATEMENTS_DEFAULTS.id, sentences, numbered = STATEMENTS_DEFAULTS.numbered, className }: StatementsProps) {
  return (
    <Slide id={id} full={false} className={[styles.section, className ?? ''].filter(Boolean).join(' ')}>
      <div className={styles.stack}>
        {sentences.map((sentence, i) => (
          <Sentence key={i} ordinal={numbered ? String(i + 1).padStart(2, '0') : undefined}>
            {sentence}
          </Sentence>
        ))}
      </div>
    </Slide>
  );
}

function Sentence({ ordinal, children }: { ordinal?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const state = useCenterState(ref);
  return (
    <div ref={ref} className={styles.stop} data-stop="" data-state={state}>
      <Text as="p" variant="statement" align="center" wrap="balance" measure="wide">
        {ordinal ? <span aria-hidden="true">{ordinal} </span> : null}
        {children}
      </Text>
    </div>
  );
}
