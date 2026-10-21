import type { ComponentPropsWithoutRef } from 'react';

export const IMAGE_RATIOS = ['2:1', '1:1', 'fill', 'auto'] as const;
export type ImageRatio = (typeof IMAGE_RATIOS)[number];

export type ImageProps = {
  /** The image file. */
  src: string;
  /** Required. Describe the image, or pass "" to mark it decorative (different from forgetting it). */
  alt: string;
  /** Who owns the height: 2:1 and 1:1 the box, fill the container, auto the file (no crop). */
  ratio?: ImageRatio;
  className?: string;
} & Omit<ComponentPropsWithoutRef<'img'>, 'src' | 'alt' | 'className'>;

export const IMAGE_DEFAULTS = {
  ratio: '2:1',
  loading: 'lazy',
} as const satisfies Required<Pick<ImageProps, 'ratio' | 'loading'>>;
