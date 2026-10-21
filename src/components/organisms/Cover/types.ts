import type { ReactNode } from 'react';

export type CoverProps = {
  /** The stop's anchor. */
  id?: string;
  /** The title lines, one per line, in statement. */
  title: string[];
  /** The question under the title, at half the grid, balanced. */
  question?: ReactNode;
  /** The lead, at half the grid, pretty. */
  lead?: ReactNode;
  /** The event card ("Open space 2026"). */
  event?: ReactNode;
  /** A client logo, with a light and a dark file. */
  client?: { light: string; dark: string; alt: string };
  /** The full-bleed photo under everything, 2:1. */
  photo?: { src: string; alt: string };
  className?: string;
};

export const COVER_DEFAULTS = {
  id: 'portada',
} as const satisfies Required<Pick<CoverProps, 'id'>>;
