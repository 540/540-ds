import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export type FormProps = {
  /** The fields, usually Field. */
  children: ReactNode;
  /** The verb and the object of the submit button: "Enviar mensaje". */
  submitLabel: string;
  className?: string;
} & Omit<ComponentPropsWithoutRef<'form'>, 'className' | 'children'>;

export const FORM_DEFAULTS = {
  noValidate: true,
} as const;
