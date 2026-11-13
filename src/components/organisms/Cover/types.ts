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
  client?: {
    /** The logo file shown on the light theme. */
    light: string;
    /** The logo file shown on the dark theme. */
    dark: string;
    /** The client's name. */
    alt: string;
  };
  /** The full-bleed photo under everything, 2:1. */
  photo?: {
    /** Path or URL of the photo. */
    src: string;
    /** What the photo shows, in words. */
    alt: string;
  };
  className?: string;
};

export const COVER_DEFAULTS = {
  id: 'portada',
} as const satisfies Required<Pick<CoverProps, 'id'>>;
