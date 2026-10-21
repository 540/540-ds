import styles from './foundations.module.css';
import { Surface } from './Surface';
import { BREAKPOINTS, DESIGN_WIDTHS } from '../tokens/breakpoints';

const RANGES = [
  { label: 'Móvil', range: `hasta ${BREAKPOINTS.tablet - 1}`, design: DESIGN_WIDTHS.mobile, note: 'Una columna. Escala de texto pequeña. La navegación es un panel que se abre.' },
  { label: 'Tablet', range: `${BREAKPOINTS.tablet} – ${BREAKPOINTS.desktop - 1}`, design: DESIGN_WIDTHS.tablet, note: 'Nada baja de media fila. Escala pequeña. Sigue el panel.' },
  { label: 'Escritorio', range: `desde ${BREAKPOINTS.desktop}`, design: DESIGN_WIDTHS.desktop, note: 'El reparto que se escribe. Escala grande. Fila de destinos.' },
];

/** The three ranges and the two breakpoints. */
export function Breakpoints() {
  return (
    <Surface>
      {RANGES.map((r) => (
        <div key={r.label} className={styles.rangeRow}>
          <div>
            <div className={styles.swatchLabel}>
              {r.label} · {r.range}
            </div>
            <div className={styles.swatchValue}>Se mira a {r.design}</div>
          </div>
          <div>
            <div className={styles.rangeBar} style={{ width: `${(r.design / DESIGN_WIDTHS.desktop) * 100}%` }} aria-hidden="true" />
            <div className={styles.specimenNote}>{r.note}</div>
          </div>
        </div>
      ))}
    </Surface>
  );
}
