import type { ReactNode } from 'react';

export type QuestionProps = {
  /** The question, in primary. Start with its number: "Q1 · ¿…?" */
  question: ReactNode;
  /** The answer, in secondary. */
  answer?: ReactNode;
  className?: string;
};
