import type { CSSProperties } from 'react';
import styles from './foundations.module.css';
import type { MeasureToken } from '../tokens/manifest';
import { useTokenValue } from './useTokenValue';

function Row({ token, bar }: { token: MeasureToken; bar: boolean }) {
  const value = useTokenValue(token.name);
  const px = parseFloat(value);
  const barWidth = Number.isFinite(px) && value.endsWith('px') ? Math.min(px, 400) : 0;
  return (
    <tr>
      <td>
        {token.label}
        {token.provisional ? (
          <>
            {' '}
            <span className={styles.badge}>provisional</span>
          </>
        ) : null}
      </td>
      <td className={styles.mono}>{token.name}</td>
      <td className={styles.mono}>
        {token.mobile !== undefined && token.desktop !== undefined ? `${token.mobile} móvil · ${token.desktop} escritorio · ahora ${value}` : value}
      </td>
      {bar ? (
        <td style={{ width: '40%' }}>
          <div className={styles.bar} style={{ width: `${barWidth}px` } as CSSProperties} aria-hidden="true" />
        </td>
      ) : null}
      <td className={styles.muted}>{token.usage ?? ''}</td>
    </tr>
  );
}

type Props = { tokens: MeasureToken[]; bar?: boolean };

/** A table of measure tokens with their live value and an optional proportional bar. */
export function MeasureTable({ tokens, bar = true }: Props) {
  return (
    <div className={styles.block}>
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Token</th>
          <th>Valor</th>
          {bar ? <th>Muestra</th> : null}
          <th>Uso</th>
        </tr>
      </thead>
      <tbody>
        {tokens.map((t) => (
          <Row key={t.name} token={t} bar={bar} />
        ))}
      </tbody>
    </table>
    </div>
  );
}
