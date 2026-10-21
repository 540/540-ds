import { Logo } from '../../atoms/Logo';
import { SocialIcon } from '../../atoms/SocialIcon';
import { Text } from '../../atoms/Text';
import styles from './DeckFooter.module.css';
import { DECK_FOOTER_DEFAULTS } from './types';
import type { DeckFooterProps } from './types';

/**
 * DeckFooter is the last stop of a talk: a full screen with the halo, the logo, the tagline,
 * the networks, the thanks and the signature, all centered.
 */
export function DeckFooter({
  tagline,
  networks = [],
  thanks = DECK_FOOTER_DEFAULTS.thanks,
  copyright,
  homeHref = DECK_FOOTER_DEFAULTS.homeHref,
  homeLabel = DECK_FOOTER_DEFAULTS.homeLabel,
  className,
}: DeckFooterProps) {
  const classes = [styles.pie, className ?? ''].filter(Boolean).join(' ');
  return (
    <div className={classes} data-deck-footer="">
      <div className={styles.halo} aria-hidden="true" />
      <div className={styles.column}>
        <footer className={styles.footer}>
          <div className={styles.brand}>
            <a className={styles.home} href={homeHref} aria-label={homeLabel}>
              <Logo size="xs" label="" />
            </a>
            <Text variant="body-m" tone="secondary" wrap="balance" className={styles.tagline}>
              {tagline}
            </Text>
          </div>
          {networks.length > 0 ? (
            <ul className={styles.networks}>
              {networks.map((n) => (
                <li key={n.network}>
                  <a className={styles.network} href={n.href} aria-label={n.label}>
                    <SocialIcon network={n.network} size="sm" />
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
          {thanks ? (
            <Text variant="body-l" tone="secondary" style={{ fontWeight: 'var(--540-font-weight-light)' as unknown as number }}>
              {thanks}
            </Text>
          ) : null}
          <div className={styles.closing}>
            <Text variant="micro-light" tone="secondary">
              {copyright}
            </Text>
          </div>
        </footer>
      </div>
    </div>
  );
}
