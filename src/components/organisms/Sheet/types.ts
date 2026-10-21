import type { ReactNode } from 'react';

export type SheetProps = {
  /** Open or closed. Inside a Step, leave it out: the sheet follows the step. */
  open?: boolean;
  /** The small line above the title ("Zoom · marzo"). */
  kicker?: ReactNode;
  /** The title. */
  title: ReactNode;
  /** One sentence under the title. */
  description?: ReactNode;
  /** The content: a diagram, cards, a list. */
  children: ReactNode;
  className?: string;
};

export const SHEET_DEFAULTS = {} as const;
