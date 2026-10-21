import type { ComponentPropsWithoutRef } from 'react';

export type ScreenshotProps = {
  src: string;
  /** Required: what the screen shows, in words. */
  alt: string;
  /** Intrinsic size, so the layout does not jump while it loads. */
  width?: number;
  height?: number;
  className?: string;
} & Omit<ComponentPropsWithoutRef<'img'>, 'src' | 'alt' | 'className' | 'width' | 'height'>;
