import { Text } from '../components/atoms/Text';
import styles from './charts.module.css';
import type { ChartTone } from './tones';

/** The key of a chart: a swatch and a name per series. Decorative: the data table already names them. */
export function Legend({ items }: { items: { label: string; tone: ChartTone }[] }) {
  return (
    <ul className={styles.legend} aria-hidden="true">
      {items.map((item, i) => (
        <li key={i} className={[styles.legendItem, styles[`tone-${item.tone}`]].join(' ')}>
          <span className={styles.swatch} />
          <Text as="span" variant="body-s">
            {item.label}
          </Text>
        </li>
      ))}
    </ul>
  );
}
