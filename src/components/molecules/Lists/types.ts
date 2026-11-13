import type { ReactNode } from 'react';

export type SimpleListProps = {
  /** The items, in order. Short: one line each. */
  items: ReactNode[];
  className?: string;
};

export type ArrowListProps = {
  /** The items, in order: each one leads somewhere. Short: one line each. */
  items: ReactNode[];
  className?: string;
};

export type Problem = {
  /** The short name of the problem, in secondary. */
  label: ReactNode;
  /** What it is, in primary. One sentence. */
  text: ReactNode;
};

export type ProblemListProps = {
  /** The pairs, in order. */
  items: Problem[];
  className?: string;
};
