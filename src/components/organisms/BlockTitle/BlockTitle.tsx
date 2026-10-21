import { Image } from '../../atoms/Image';
import { Text } from '../../atoms/Text';
import { SectionHeader } from '../../molecules/SectionHeader';
import { Slide } from '../Slide';
import styles from './BlockTitle.module.css';
import type { BlockTitleProps } from './types';

/**
 * BlockTitle is a numbered block title and, right behind it, its photo. The title is a stop;
 * the photo is not: Deck aligns the title at the top so the photo peeks under it.
 */
export function BlockTitle({ id, ordinal, title, photo, className }: BlockTitleProps) {
  return (
    <>
      <Slide id={id} full={false} className={className} aria-labelledby={`${id}-title`}>
        <div className={styles.title}>
          {ordinal ? (
            <Text as="span" variant="micro-light" tone="secondary" aria-hidden="true">
              {ordinal}
            </Text>
          ) : null}
          <SectionHeader title={title} titleId={`${id}-title`} align="center" />
        </div>
      </Slide>
      {photo ? (
        <div className={styles.photo} data-deck-photo="">
          <div className={styles.layer}>
            <Image src={photo.src} alt={photo.alt} ratio="2:1" />
          </div>
        </div>
      ) : null}
    </>
  );
}
