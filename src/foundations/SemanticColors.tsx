import { useEffect, useState } from 'react';
import styles from './foundations.module.css';
import { ColorSwatch } from './ColorSwatch';
import { effectTokens, semanticColors } from '../tokens/manifest';

function useTheme(): 'light' | 'dark' {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  useEffect(() => {
    const read = () => setTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);
  return theme;
}

/** Semantic colors. Chips follow the active theme; the table lists both aliases. */
export function SemanticColors() {
  const theme = useTheme();
  return (
    <>
      <p className={styles.sectionDescription}>
        Tema activo: <strong>{theme === 'dark' ? 'Oscuro' : 'Claro'}</strong>. Cámbialo con el selector «Tema» de la barra superior.
      </p>
      {semanticColors.map((group) => (
        <section key={group.title} className={styles.section}>
          <h3 className={styles.sectionTitle}>{group.title}</h3>
          <div className={styles.grid}>
            {group.items.map((item) => (
              <ColorSwatch key={item.name} name={item.name} label={item.label} detail={theme === 'dark' ? item.dark : item.light} />
            ))}
          </div>
        </section>
      ))}

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Tabla de alias</h3>
        <p className={styles.sectionDescription}>Lo que cambia con el tema es el alias, nunca el nombre.</p>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Token</th>
              <th>Claro</th>
              <th>Oscuro</th>
              <th>Uso</th>
            </tr>
          </thead>
          <tbody>
            {semanticColors.flatMap((g) => g.items).map((item) => (
              <tr key={item.name}>
                <td className={styles.mono}>{item.name}</td>
                <td className={styles.mono}>{item.light}</td>
                <td className={styles.mono}>{item.dark}</td>
                <td className={styles.muted}>{item.usage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Degradados y filtros</h3>
        <p className={styles.sectionDescription}>Vienen del código de las charlas, no de Figma. También cambian con el tema.</p>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Token</th>
              <th>Claro</th>
              <th>Oscuro</th>
              <th>Uso</th>
            </tr>
          </thead>
          <tbody>
            {effectTokens.map((item) => (
              <tr key={item.name}>
                <td>{item.label}</td>
                <td className={styles.mono}>{item.name}</td>
                <td className={styles.mono}>{item.light}</td>
                <td className={styles.mono}>{item.dark}</td>
                <td className={styles.muted}>{item.usage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
