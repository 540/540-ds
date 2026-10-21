import { Text } from '../../atoms/Text';
import { Slide } from '../Slide';
import styles from './Quote.module.css';
import { QUOTE_DEFAULTS } from './types';
import type { QuoteProps } from './types';

/** Quote is a sentence someone said: statement at three quarters, with the attribution under it. */
export function Quote({ id, sentence, author, tone = QUOTE_DEFAULTS.tone, className }: QuoteProps) {
  return (
    <Slide id={id} tone={tone} className={className}>
      <figure className={styles.figure}>
        <Text as="blockquote" variant="statement" align="center" wrap="balance" measure="wide" style={{ margin: 0 }}>
          {sentence}
        </Text>
        <Text as="figcaption" variant="micro-light" tone="secondary">
          {author}
        </Text>
      </figure>
    </Slide>
  );
}
