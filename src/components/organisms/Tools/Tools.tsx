import type { CSSProperties } from 'react';
import { Text } from '../../atoms/Text';
import styles from './Tools.module.css';
import { TOOLS_DEFAULTS } from './types';
import type { ToolsProps } from './types';

/**
 * Tools is a grid of tools: a logo in a common 52 px box (optically corrected per brand),
 * the name in title-s and an optional one-line verdict.
 */
export function Tools({ tools, columns = TOOLS_DEFAULTS.columns, className }: ToolsProps) {
  return (
    <ul className={[styles.grid, styles[`cols-${columns}`], className ?? ''].filter(Boolean).join(' ')}>
      {tools.map((tool) => (
        <li key={tool.name} className={styles.item}>
          <div className={styles.tool}>
            <img
              className={[styles.logo, tool.invertInDark ? styles.invert : ''].filter(Boolean).join(' ')}
              src={tool.src}
              alt=""
              loading="lazy"
              style={tool.scale ? ({ '--tool-scale': tool.scale } as CSSProperties) : undefined}
            />
            <Text as="h3" variant="title-s" wrap="balance">
              {tool.name}
            </Text>
            {tool.verdict ? (
              <Text variant="body-s-light" tone="secondary" wrap="pretty">
                {tool.verdict}
              </Text>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
}
