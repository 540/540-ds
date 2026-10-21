import { Text } from '../../atoms/Text';
import styles from './Question.module.css';
import type { QuestionProps } from './types';

/** Question is a question and its answer under a hairline: the Q&A of a decision tree. */
export function Question({ question, answer, className }: QuestionProps) {
  return (
    <div className={[styles.question, className ?? ''].filter(Boolean).join(' ')}>
      <Text variant="body-m" wrap="pretty">
        {question}
      </Text>
      {answer ? (
        <Text variant="body-m" tone="secondary" wrap="pretty">
          {answer}
        </Text>
      ) : null}
    </div>
  );
}
