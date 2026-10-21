import { Logo } from '../../atoms/Logo';
import { SocialIcon } from '../../atoms/SocialIcon';
import { Text } from '../../atoms/Text';
import styles from './Footer.module.css';
import { FOOTER_DEFAULTS } from './types';
import type { FooterProps } from './types';

/**
 * Footer closes the page: the brand with its tagline, the columns of links, the networks
 * and the signature. The top only exists if there is something to put in it.
 */
export function Footer({
  tagline,
  groups = [],
  networks = [],
  networksTitle = FOOTER_DEFAULTS.networksTitle,
  copyright,
  legal = [],
  homeHref = FOOTER_DEFAULTS.homeHref,
  homeLabel = FOOTER_DEFAULTS.homeLabel,
  className,
  ...rest
}: FooterProps) {
  const hasTop = Boolean(tagline) || groups.length > 0 || networks.length > 0;
  const classes = [styles.footer, className ?? ''].filter(Boolean).join(' ');

  return (
    <footer className={classes} {...rest}>
      {hasTop ? (
        <div className={styles.top}>
          <div className={styles.brand}>
            <a className={styles.home} href={homeHref} aria-label={homeLabel}>
              <Logo size="sm" label="" />
            </a>
            {tagline ? (
              <Text variant="body-s-light" tone="secondary" wrap="pretty" className={styles.tagline}>
                {tagline}
              </Text>
            ) : null}
          </div>
          <div className={styles.groups}>
            {groups.map((group) => (
              <div key={group.title} className={styles.group}>
                <Text as="p" variant="micro-bold" tone="secondary" className={styles.groupTitle}>
                  {group.title}
                </Text>
                <ul className={styles.list}>
                  {group.items.map((item, i) => (
                    <li key={`${item.href}-${i}`}>
                      <Text as="span" variant="body-s">
                        <a className={styles.link} href={item.href}>
                          {item.label}
                        </a>
                      </Text>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {networks.length > 0 ? (
              <div className={styles.group}>
                <Text as="p" variant="micro-bold" tone="secondary" className={styles.groupTitle}>
                  {networksTitle}
                </Text>
                <ul className={[styles.list, styles.networks].join(' ')}>
                  {networks.map((n) => (
                    <li key={n.network}>
                      <a className={styles.network} href={n.href} aria-label={n.label}>
                        <SocialIcon network={n.network} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
      <div className={styles.closing}>
        <Text as="p" variant="micro-light" tone="secondary">
          {copyright}
        </Text>
        {legal.length > 0 ? (
          <ul className={styles.legal}>
            {legal.map((item, i) => (
              <li key={`${item.href}-${i}`}>
                <Text as="span" variant="micro-light" tone="secondary">
                  <a className={styles.link} href={item.href}>
                    {item.label}
                  </a>
                </Text>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </footer>
  );
}
