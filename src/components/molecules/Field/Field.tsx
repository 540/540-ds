import { Text } from '../../atoms/Text';
import styles from './Field.module.css';
import { FIELD_DEFAULTS } from './types';
import type { FieldProps } from './types';

/**
 * Field is a form field: the label above and the control, tied by the id.
 * The control is not a separate component: a field without a label is what this exists to avoid.
 */
export function Field(props: FieldProps) {
  const { label, id, size = FIELD_DEFAULTS.size, className, ...rest } = props;
  const classes = [styles.field, className ?? ''].filter(Boolean).join(' ');
  const controlClasses = [styles.control, styles[`size-${size}`], rest.multiline ? styles.multiline : ''].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <label className={styles.label} htmlFor={id}>
        <Text as="span" variant="micro-bold" tone="secondary">
          {label}
        </Text>
      </label>
      {rest.multiline ? (
        (() => {
          const { multiline: _m, ...textareaProps } = rest;
          return <textarea id={id} className={controlClasses} {...textareaProps} />;
        })()
      ) : (
        (() => {
          const { multiline: _m, ...inputProps } = rest;
          return <input id={id} className={controlClasses} {...inputProps} />;
        })()
      )}
    </div>
  );
}
