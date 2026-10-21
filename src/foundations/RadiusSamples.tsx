import styles from './foundations.module.css';
import { Surface } from './Surface';
import { radiusTokens } from '../tokens/manifest';
import { useTokenValue } from './useTokenValue';

function Sample({ name, label, usage }: { name: string; label: string; usage?: string }) {
  const value = useTokenValue(name);
  return (
    <div className={styles.swatch}>
      <div className={styles.radiusSample} style={{ borderRadius: `var(${name})` }} aria-hidden="true" />
      <div className={styles.swatchText}>
        <span className={styles.swatchLabel}>{label}</span>
        <span className={styles.swatchToken}>{name}</span>
        <span className={styles.swatchValue}>
          {value}
          {usage ? ` · ${usage}` : ''}
        </span>
      </div>
    </div>
  );
}

/** The two radii of the system. */
export function RadiusSamples() {
  return (
    <Surface>
      <div className={styles.grid}>
        {radiusTokens.map((t) => (
          <Sample key={t.name} name={t.name} label={t.label} usage={t.usage} />
        ))}
      </div>
    </Surface>
  );
}
