export const CYCLE_MARKS = ['red', 'green', 'yellow'] as const;
export type CycleMark = (typeof CYCLE_MARKS)[number];

export type CycleProps = {
  /** The phases, in order around the ring. */
  phases: string[];
  /** The active phase (index). Earlier ones are done. */
  active?: number;
  /** All phases done. */
  all?: boolean;
  /** With all, keep the first one as active. */
  highlightFirst?: boolean;
  /** Marks by index: red (a problem), green (solved), yellow (the concern). */
  marks?: Record<number, CycleMark>;
  /** Accessible name. */
  label: string;
  className?: string;
};

export const CYCLE_DEFAULTS = {} as const;
