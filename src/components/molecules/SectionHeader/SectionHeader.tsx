import { Text } from '../../atoms/Text';
import styles from './SectionHeader.module.css';
import { SECTION_HEADER_DEFAULTS } from './types';
import type { SectionHeaderProps } from './types';

/**
 * SectionHeader opens a section: title and lead. The most repeated piece of the site.
 * The title style is always title-l; the heading level is chosen apart.
 */
export function SectionHeader({
  title,
  description,
  align = SECTION_HEADER_DEFAULTS.align,
  level = SECTION_HEADER_DEFAULTS.level,
  titleId,
  className,
  ...rest
}: SectionHeaderProps) {
  const classes = [styles.header, align === 'center' ? styles.center : '', className ?? ''].filter(Boolean).join(' ');
  return (
    <header className={classes} {...rest}>
      <Text as={level} variant="title-l" wrap="balance" id={titleId}>
        {title}
      </Text>
      {description ? (
        <Text variant="body-m" tone="secondary" wrap="pretty">
          {description}
        </Text>
      ) : null}
    </header>
  );
}
