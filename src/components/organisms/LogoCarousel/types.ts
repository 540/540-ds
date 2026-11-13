export type ClientLogo = {
  /** Path or URL of the logo file. */
  src: string;
  /** The name of the client. */
  name: string;
};

export type LogoCarouselProps = {
  /** The client logos, in order. */
  logos: ClientLogo[];
  /** Accessible name of the carousel. */
  label: string;
  /** Milliseconds between steps. Off with prefers-reduced-motion. */
  interval?: number;
  className?: string;
};

export const LOGO_CAROUSEL_DEFAULTS = {
  interval: 2400,
} as const satisfies Required<Pick<LogoCarouselProps, 'interval'>>;
