import type { ComponentPropsWithoutRef } from 'react';

export const SOCIAL_NETWORKS = ['linkedin', 'x', 'youtube', 'instagram'] as const;
export const SOCIAL_ICON_SIZES = ['md', 'sm'] as const;

export type SocialNetwork = (typeof SOCIAL_NETWORKS)[number];
export type SocialIconSize = (typeof SOCIAL_ICON_SIZES)[number];

export type SocialIconProps = {
  /** One of the four networks the system keeps. The path is never passed from outside. */
  network: SocialNetwork;
  /** md 18 px (the default control icon), sm 16 px (a compact control). */
  size?: SocialIconSize;
  className?: string;
} & Omit<ComponentPropsWithoutRef<'svg'>, 'className' | 'children' | 'viewBox' | 'aria-hidden' | 'role'>;

export const SOCIAL_ICON_DEFAULTS = {
  size: 'md',
} as const satisfies Required<Pick<SocialIconProps, 'size'>>;
