import { Button } from '../../atoms/Button';
import styles from './Form.module.css';
import { FORM_DEFAULTS } from './types';
import type { FormProps } from './types';

/**
 * Form is the wrapper of a form: it places the fields and puts the submit. The fields come
 * from whoever uses it. noValidate by default so the system's messages win over the browser's.
 */
export function Form({ children, submitLabel, align = FORM_DEFAULTS.align, className, noValidate = FORM_DEFAULTS.noValidate, ...rest }: FormProps) {
  return (
    <form className={[styles.form, className ?? ''].filter(Boolean).join(' ')} noValidate={noValidate} {...rest}>
      <div className={styles.fields}>{children}</div>
      <div className={[styles.submit, align === 'center' ? styles.center : ''].filter(Boolean).join(' ')}>
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
}
