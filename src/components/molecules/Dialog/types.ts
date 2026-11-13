import type { ReactNode } from 'react';

export type DialogProps = {
  /** Whether it is open. The state lives outside: only the screen knows whom it is showing. */
  open: boolean;
  /** Called when the user closes: Escape, the cross, or a click on the veil. */
  onClose: () => void;
  /** The title: the heading that is seen and the name of the dialog. */
  title: ReactNode;
  /** Optional portrait, full bleed at the top, cropped to 1:1. */
  media?: {
    /** Path or URL of the portrait. */
    src: string;
    /** What the portrait shows, in words. */
    alt: string;
  };
  /** Optional actions row at the bottom. */
  footer?: ReactNode;
  /** The text. The only thing that scrolls if it does not fit. */
  children: ReactNode;
  className?: string;
};

export const DIALOG_DEFAULTS = {} as const;
