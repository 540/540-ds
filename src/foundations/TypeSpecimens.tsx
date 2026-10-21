import type { CSSProperties } from 'react';
import styles from './foundations.module.css';
import { textStyles } from '../tokens/manifest';
import { useTokenValue } from './useTokenValue';

const SAMPLE = 'Diseño que trasciende';

function Specimen({ style }: { style: (typeof textStyles)[number] }) {
  const size = useTokenValue(`${style.tokenPrefix}-size`);
  const css: CSSProperties = {
    fontSize: `var(${style.tokenPrefix}-size)`,
    fontWeight: `var(${style.tokenPrefix}-weight)` as CSSProperties['fontWeight'],
    lineHeight: `var(${style.tokenPrefix}-line-height)`,
    letterSpacing: `var(${style.tokenPrefix}-letter-spacing)`,
  };
  return (
    <div className={styles.specimen}>
      <div className={styles.specimenMeta}>
        <span className={styles.specimenLabel}>{style.label}</span>
        <span className={styles.mono}>{style.tokenPrefix}-*</span>
        <span>
          {style.fluid
            ? `${style.fluid}`
            : style.sizeMobile === style.sizeDesktop
              ? `${style.sizeDesktop}px`
              : `${style.sizeMobile}px móvil · ${style.sizeDesktop}px escritorio`}
          {style.projection && style.projection !== style.sizeDesktop ? ` · ${style.projection}px proyección` : ''} · ahora {size}
        </span>
        <span>DM Sans {style.weightName}</span>
        <span>Interlineado {style.lineHeight}</span>
        <span>Tracking {style.letterSpacing}</span>
      </div>
      <p className={styles.specimenSample} style={css}>
        {style.key === 'statement' ? '540°' : SAMPLE}
      </p>
      <p className={styles.specimenNote}>
        {style.usage}
        {style.note ? ` ${style.note}` : ''}
      </p>
    </div>
  );
}

/** The thirteen text styles rendered with their live tokens. */
export function TypeSpecimens() {
  return (
    <>
      {textStyles.map((s) => (
        <Specimen key={s.key} style={s} />
      ))}
    </>
  );
}
