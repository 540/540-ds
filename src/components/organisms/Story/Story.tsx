import { Text } from '../../atoms/Text';
import { Slide } from '../Slide';
import styles from './Story.module.css';
import { STORY_DEFAULTS } from './types';
import type { StoryProps } from './types';

/**
 * Story is a story or an objection: a title, paragraphs in body-l secondary and an optional
 * bridge in primary, all at half the grid, on a raised band.
 */
export function Story({ id, title, paragraphs, bridge, kind = STORY_DEFAULTS.kind, tone = STORY_DEFAULTS.tone, className }: StoryProps) {
  return (
    <Slide id={id} tone={tone} className={className} aria-labelledby={`${id}-title`}>
      <div className={styles.story}>
        <Text as="h2" variant={kind === 'objection' ? 'title-s' : 'title-m'} wrap="balance" id={`${id}-title`}>
          {title}
        </Text>
        {paragraphs.map((p, i) => (
          <Text key={i} variant="body-l" tone="secondary" wrap="pretty">
            {p}
          </Text>
        ))}
        {bridge ? (
          <Text variant="body-l" wrap="pretty">
            {bridge}
          </Text>
        ) : null}
      </div>
    </Slide>
  );
}
