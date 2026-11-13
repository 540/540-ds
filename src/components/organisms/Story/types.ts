import type { ReactNode } from 'react';

export type StoryProps = {
  /** The stop's anchor. */
  id: string;
  /** The title: title-m for a story, title-s for an objection. */
  title: ReactNode;
  /** The paragraphs, body-l secondary. */
  paragraphs: ReactNode[];
  /** The bridge to the next stop, body-l primary. */
  bridge?: ReactNode;
  /** story (title-m) or objection (title-s). */
  kind?: 'story' | 'objection';
  /** The band tone; stories and objections usually go raised. */
  tone?: 'default' | 'raised';
  className?: string;
};

export const STORY_DEFAULTS = {
  kind: 'story',
  tone: 'raised',
} as const satisfies Required<Pick<StoryProps, 'kind' | 'tone'>>;
