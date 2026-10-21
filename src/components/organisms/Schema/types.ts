import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export type SchemaProps = {
  /** The drawing coordinates ("0 0 2560 820"). */
  viewBox: string;
  /** The accessible title and description: what the drawing says, in words. */
  title: string;
  description?: string;
  /** Data schemas: every text one step bigger. */
  data?: boolean;
  /** Guided: layers light up with the surrounding Steps; the rest dims to 18 %. */
  guided?: boolean;
  /** The layers and shapes. */
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<'svg'>, 'viewBox' | 'children' | 'className'>;

export type SchemaLayerProps = {
  /** The step from which this layer is lit (inside a Steps). */
  step?: number;
  /** What this layer says, for the live region. */
  label?: string;
  children: ReactNode;
  className?: string;
};

export type SchemaFrameProps = {
  /** The caption under the drawing, at half the grid. */
  caption?: ReactNode;
  children: ReactNode;
  className?: string;
};
