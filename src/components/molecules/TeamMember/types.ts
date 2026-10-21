import type { ReactNode } from 'react';

export const TEAM_MEMBER_ALIGNS = ['start', 'center'] as const;
export type TeamMemberAlign = (typeof TEAM_MEMBER_ALIGNS)[number];

export type TeamMemberProps = {
  /** The portrait. Follows the width of the card and crops to 1:1. */
  src: string;
  /** The name: an h3. */
  name: ReactNode;
  /** The role: uppercase by style. */
  role: ReactNode;
  /** Two or three lines about the person. Optional. */
  bio?: ReactNode;
  /** start: role before the name. center: name first, the role as a caption. */
  align?: TeamMemberAlign;
  /** When the person has a page, the name is the link, not the whole card. */
  href?: string;
  /** Heading level of the name. */
  level?: 'h2' | 'h3' | 'h4';
  className?: string;
};

export const TEAM_MEMBER_DEFAULTS = {
  align: 'start',
  level: 'h3',
} as const satisfies Required<Pick<TeamMemberProps, 'align' | 'level'>>;
