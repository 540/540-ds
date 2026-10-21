import type { ComponentPropsWithoutRef } from 'react';

export const FIELD_SIZES = ['md', 'sm'] as const;
export type FieldSize = (typeof FIELD_SIZES)[number];

type Common = {
  /** The label. Required: it is why this molecule exists. Written in normal case. */
  label: string;
  /** Ties label and control. */
  id: string;
  /** Control height: md 45, sm 36. */
  size?: FieldSize;
  className?: string;
};

type AsInput = Common & {
  multiline?: false;
} & Omit<ComponentPropsWithoutRef<'input'>, 'id' | 'className' | 'size'>;

type AsTextarea = Common & {
  /** A textarea for messages. */
  multiline: true;
} & Omit<ComponentPropsWithoutRef<'textarea'>, 'id' | 'className'>;

export type FieldProps = AsInput | AsTextarea;

export const FIELD_DEFAULTS = {
  size: 'md',
} as const satisfies Required<Pick<Common, 'size'>>;
