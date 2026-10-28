import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export const FORM_ALIGNS = ['end', 'center'] as const;
export type FormAlign = (typeof FORM_ALIGNS)[number];

export type FormProps = {
  /** The fields, usually Field. */
  children: ReactNode;
  /** The verb and the object of the submit button: "Enviar mensaje". */
  submitLabel: string;
  /** Where the submit goes: end of the row (web) or centered (a talk, where everything is centered). */
  align?: FormAlign;
  className?: string;
} & Omit<ComponentPropsWithoutRef<'form'>, 'className' | 'children'>;

export const FORM_DEFAULTS = {
  noValidate: true,
  align: 'end',
} as const;
