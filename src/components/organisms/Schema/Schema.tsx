import { useId } from 'react';
import { Text } from '../../atoms/Text';
import { useSteps } from '../Steps/StepsContext';
import styles from './Schema.module.css';
import type { SchemaFrameProps, SchemaLayerProps, SchemaProps } from './types';

/**
 * The drawing vocabulary of the talks, as class names: shapes (node, highlighted, note, pill),
 * lines (line, lineStrong, lineDashed, arrowhead), chart series and the six text sizes.
 */
export const schema = {
  node: styles.node,
  highlighted: styles.highlighted,
  note: styles.note,
  pill: styles.pill,
  inverse: styles.inverse,
  dot: styles.dot,
  arc: styles.arc,
  icon: styles.icon,
  iconBox: styles.iconBox,
  iconFill: styles.iconFill,
  line: styles.line,
  lineStrong: styles.lineStrong,
  lineDashed: styles.lineDashed,
  arrowhead: styles.arrowhead,
  arrowheadFill: styles.arrowheadFill,
  series: styles.series,
  seriesDashed: styles.seriesDashed,
  accent: styles.accent,
  accentThin: styles.accentThin,
  accentDashed: styles.accentDashed,
  accentDotted: styles.accentDotted,
  accentDot: styles.accentDot,
  title: styles.title,
  nodeText: styles.nodeText,
  nodeSub: styles.nodeSub,
  circleText: styles.circleText,
  pillText: styles.pillText,
  inverseText: styles.inverseText,
  noteText: styles.noteText,
  label: styles.label,
  coreTitle: styles.coreTitle,
  coreSub: styles.coreSub,
  micro: styles.micro,
  sideText: styles.sideText,
} as const;

/**
 * Schema is a drawing of the talk: an SVG with an accessible title and description, built from
 * the vocabulary above. Inside a Steps, its layers light up step by step.
 */
export function Schema({ viewBox, title, description, data = false, guided = false, children, className, ...rest }: SchemaProps) {
  const id = useId();
  const { current, guided: stepsGuided } = useSteps();
  const isGuided = guided || stepsGuided;
  return (
    <svg
      className={[styles.schema, data ? styles.data : '', isGuided ? styles.guided : '', className ?? ''].filter(Boolean).join(' ')}
      viewBox={viewBox}
      role="img"
      aria-labelledby={description ? `${id}-t ${id}-d` : `${id}-t`}
      data-current={isGuided && Number.isFinite(current) ? current : undefined}
      {...rest}
    >
      <title id={`${id}-t`}>{title}</title>
      {description ? <desc id={`${id}-d`}>{description}</desc> : null}
      {children}
    </svg>
  );
}

/** SchemaLayer is a group of the drawing lit from a step on. */
export function SchemaLayer({ step = 0, label, children, className }: SchemaLayerProps) {
  const { current } = useSteps();
  const on = current >= step;
  return (
    <g className={[styles.layer, className ?? ''].filter(Boolean).join(' ')} data-step={step} data-label={label} data-on={on ? '' : undefined}>
      {children}
    </g>
  );
}

/** SchemaFrame gives the drawing the whole window width (scrolling sideways if needed) and a caption. */
export function SchemaFrame({ caption, children, className }: SchemaFrameProps) {
  return (
    <>
      <div className={[styles.frame, className ?? ''].filter(Boolean).join(' ')}>{children}</div>
      {caption ? (
        <Text variant="body-m" tone="secondary" align="center" wrap="pretty" className={styles.caption}>
          {caption}
        </Text>
      ) : null}
    </>
  );
}

/** SchemaVoice is the live region that reads the label of the lit layer. */
export function SchemaVoice({ labels }: { labels: string[] }) {
  const { current } = useSteps();
  const text = Number.isFinite(current) ? labels[Math.min(current, labels.length - 1)] : '';
  return (
    <p className={styles.voice} aria-live="polite">
      {text}
    </p>
  );
}
