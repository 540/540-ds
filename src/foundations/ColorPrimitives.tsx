import styles from './foundations.module.css';
import { ColorSwatch } from './ColorSwatch';
import { colorPrimitives } from '../tokens/manifest';

/** All primitive colors, grouped as in Figma. */
export function ColorPrimitives() {
  return (
    <div className={styles.block}>
      {colorPrimitives.map((group) => (
        <section key={group.title} className={styles.section}>
          <h3 className={styles.sectionTitle}>{group.title}</h3>
          <p className={styles.sectionDescription}>{group.description}</p>
          <div className={styles.grid}>
            {group.items.map((item) => (
              <ColorSwatch key={item.name} name={item.name} label={item.label} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
