import type { ComponentPropsWithoutRef } from 'react';

export type ScreenshotProps = {
  /** Path or URL of the capture. */
  src: string;
  /** Required: what the screen shows, in words. */
  alt: string;
  /** Intrinsic width in px, so the layout does not jump while it loads. */
  width?: number;
  /** Intrinsic height in px, so the layout does not jump while it loads. */
  height?: number;
  className?: string;
} & Omit<ComponentPropsWithoutRef<'img'>, 'src' | 'alt' | 'className' | 'width' | 'height'>;
