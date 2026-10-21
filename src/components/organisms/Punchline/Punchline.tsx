import { Text } from '../../atoms/Text';
import { Slide } from '../Slide';
import styles from './Punchline.module.css';
import { PUNCHLINE_DEFAULTS } from './types';
import type { PunchlineProps } from './types';

/**
 * Punchline is the sentence that closes a block: statement at three quarters under a hairline,
 * with an optional transition. Inside a slide, or as its own stop.
 */
export function Punchline({ sentence, transition, placement = PUNCHLINE_DEFAULTS.placement, id, className }: PunchlineProps) {
  const body = (
    <div className={[styles.punchline, placement === 'inside' ? styles.inside : '', className ?? ''].filter(Boolean).join(' ')}>
      <Text as="p" variant="statement" align="center" wrap="balance" measure="wide">
        {sentence}
      </Text>
      {transition ? (
        <Text variant="body-m" tone="secondary" align="center" wrap="pretty" measure="half" className={styles.transition}>
          {transition}
        </Text>
      ) : null}
    </div>
  );
  return placement === 'standalone' ? <Slide id={id ?? 'remate'}>{body}</Slide> : body;
}
