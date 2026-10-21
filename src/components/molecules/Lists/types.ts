import type { ReactNode } from 'react';

export type SimpleListProps = {
  items: ReactNode[];
  className?: string;
};

export type ArrowListProps = {
  items: ReactNode[];
  className?: string;
};

export type Problem = { label: ReactNode; text: ReactNode };

export type ProblemListProps = {
  items: Problem[];
  className?: string;
};
