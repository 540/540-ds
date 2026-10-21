import { Image } from '../../atoms/Image';
import { Text } from '../../atoms/Text';
import styles from './TeamMember.module.css';
import { TEAM_MEMBER_DEFAULTS } from './types';
import type { TeamMemberProps } from './types';

/**
 * TeamMember is a person's card: portrait 1:1, role, name and, if any, two lines of bio.
 * Aligned to the margin the role goes first; centered, the name first and the role as a caption.
 */
export function TeamMember({ src, name, role, bio, align = TEAM_MEMBER_DEFAULTS.align, href, level = TEAM_MEMBER_DEFAULTS.level, className }: TeamMemberProps) {
  const classes = [styles.member, align === 'center' ? styles.center : '', className ?? ''].filter(Boolean).join(' ');

  const nameNode = (
    <Text as={level} variant="title-xs" wrap="balance">
      {href ? (
        <a className={styles.link} href={href}>
          {name}
        </a>
      ) : (
        name
      )}
    </Text>
  );
  const roleNode = (
    <Text as="p" variant="micro-bold" tone="secondary">
      {role}
    </Text>
  );

  return (
    <article className={classes}>
      <div className={styles.portrait}>
        <Image src={src} alt="" ratio="1:1" />
      </div>
      {align === 'center' ? (
        <>
          {nameNode}
          {roleNode}
        </>
      ) : (
        <>
          {roleNode}
          {nameNode}
        </>
      )}
      {bio ? (
        <Text variant="body-s" tone="secondary" wrap="pretty">
          {bio}
        </Text>
      ) : null}
    </article>
  );
}
