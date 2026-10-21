import { Image } from '../../atoms/Image';
import { Text } from '../../atoms/Text';
import styles from './CaseItem.module.css';
import { CASE_ITEM_DEFAULTS } from './types';
import type { CaseItemProps } from './types';

/**
 * CaseItem is a portfolio case: the photo, and over it the name and the sentence,
 * anchored at the bottom on a veil. With href, one link wraps the whole piece.
 */
export function CaseItem({ src, alt = CASE_ITEM_DEFAULTS.alt, title, description, href, level = CASE_ITEM_DEFAULTS.level, className }: CaseItemProps) {
  const classes = [styles.item, href ? styles.linked : '', className ?? ''].filter(Boolean).join(' ');

  const content = (
    <>
      <div className={styles.frame}>
        <Image src={src} alt={alt} ratio="fill" />
      </div>
      <div className={styles.veil} aria-hidden="true" />
      <div className={styles.data}>
        <Text as={level} variant="title-s" wrap="balance">
          {title}
        </Text>
        {description ? (
          <Text variant="body-s" wrap="pretty">
            {description}
          </Text>
        ) : null}
      </div>
    </>
  );

  return href ? (
    <a className={classes} href={href}>
      {content}
    </a>
  ) : (
    <article className={classes}>{content}</article>
  );
}
