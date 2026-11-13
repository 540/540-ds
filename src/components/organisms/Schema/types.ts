import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export type SchemaProps = {
  /** The drawing coordinates ("0 0 2560 820"). */
  viewBox: string;
  /** The accessible title: what the drawing is, in words. */
  title: string;
  /** The accessible description: what the drawing says, in words. */
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
  /** The shapes of the layer. */
  children: ReactNode;
  className?: string;
};

export type SchemaFrameProps = {
  /** The caption under the drawing, at half the grid. */
  caption?: ReactNode;
  /** The Schema to frame: it takes the full window width, with sideways scroll if it does not fit. */
  children: ReactNode;
  className?: string;
};
