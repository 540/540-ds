import { Text } from '../../atoms/Text';
import { Slide } from '../Slide';
import styles from './Closing.module.css';
import { CLOSING_DEFAULTS } from './types';
import type { ClosingProps } from './types';

/**
 * Closing is the last slide before the footer: the closing sentence in statement,
 * with an optional body at half the grid and a final line.
 */
export function Closing({ id = CLOSING_DEFAULTS.id, sentence, body = [], punchline, className }: ClosingProps) {
  return (
    <Slide id={id} className={[styles.closing, className ?? ''].filter(Boolean).join(' ')}>
      <Text as="p" variant="statement" align="center" wrap="balance" measure="wide">
        {sentence}
      </Text>
      {body.length > 0 || punchline ? (
        <div className={styles.body}>
          {body.map((p, i) => (
            <Text key={i} variant="body-l" tone="secondary" align="center" wrap="pretty" measure="half">
              {p}
            </Text>
          ))}
          {punchline ? (
            <Text variant="body-l" align="center" wrap="pretty" measure="half">
              {punchline}
            </Text>
          ) : null}
        </div>
      ) : null}
    </Slide>
  );
}
