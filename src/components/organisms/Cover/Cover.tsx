import { Image } from '../../atoms/Image';
import { Text } from '../../atoms/Text';
import { Slide } from '../Slide';
import styles from './Cover.module.css';
import { COVER_DEFAULTS } from './types';
import type { CoverProps } from './types';

/**
 * Cover is the first stop of a talk: the title in statement, one line per line, the question,
 * the lead, the event card, the client logo and the full-bleed photo glued to the bottom.
 */
export function Cover({ id = COVER_DEFAULTS.id, title, question, lead, event, client, photo, className }: CoverProps) {
  return (
    <Slide id={id} className={[styles.cover, className ?? ''].filter(Boolean).join(' ')}>
      <div className={styles.block}>
        <header className={styles.text}>
          <Text as="h1" variant="statement" align="center">
            {title.map((line) => (
              <span key={line} className={styles.line}>
                {line}
              </span>
            ))}
          </Text>
          {question ? (
            <Text variant="body-m" tone="secondary" align="center" wrap="balance" measure="half">
              {question}
            </Text>
          ) : null}
          {lead ? (
            <Text variant="body-m" tone="secondary" align="center" wrap="pretty" measure="half">
              {lead}
            </Text>
          ) : null}
          {event ? (
            <Text variant="body-s" tone="secondary" align="center">
              {event}
            </Text>
          ) : null}
        </header>
        {client ? (
          <div className={styles.client}>
            <img className={styles.clientLight} src={client.light} alt={client.alt} loading="eager" decoding="async" />
            <img className={styles.clientDark} src={client.dark} alt={client.alt} loading="eager" decoding="async" />
          </div>
        ) : null}
        {photo ? (
          <div className={styles.photo}>
            <Image src={photo.src} alt={photo.alt} ratio="2:1" loading="eager" />
          </div>
        ) : null}
      </div>
    </Slide>
  );
}
