import { Text } from '../../atoms/Text';
import { Slide } from '../Slide';
import styles from './Statements.module.css';
import { STATEMENTS_DEFAULTS } from './types';
import type { StatementsProps } from './types';

/**
 * Statements are the sentences of the journey, stacked: one stop each (Deck splits the slide
 * with data-stop), in statement, three quarters wide, with an optional ordinal in front.
 */
export function Statements({ id = STATEMENTS_DEFAULTS.id, sentences, numbered = STATEMENTS_DEFAULTS.numbered, className }: StatementsProps) {
  return (
    <Slide id={id} full={false} className={[styles.section, className ?? ''].filter(Boolean).join(' ')}>
      <div className={styles.stack}>
        {sentences.map((sentence, i) => (
          <div key={i} className={styles.stop} data-stop="">
            <Text as="p" variant="statement" align="center" wrap="balance" measure="wide">
              {numbered ? <span aria-hidden="true">{String(i + 1).padStart(2, '0')} </span> : null}
              {sentence}
            </Text>
          </div>
        ))}
      </div>
    </Slide>
  );
}
