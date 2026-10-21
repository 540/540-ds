import styles from './Image.module.css';
import { IMAGE_DEFAULTS } from './types';
import type { ImageProps } from './types';

const RATIO_CLASS = {
  '2:1': styles['ratio-2-1'],
  '1:1': styles['ratio-1-1'],
  fill: styles['ratio-fill'],
  auto: styles['ratio-auto'],
} as const;

/**
 * Image is the content image. It crops to fill its box and never deforms,
 * except when asked to let the file's proportion rule (`ratio="auto"`).
 */
export function Image({ src, alt, ratio = IMAGE_DEFAULTS.ratio, loading = IMAGE_DEFAULTS.loading, className, ...rest }: ImageProps) {
  const classes = [styles.image, RATIO_CLASS[ratio], className ?? ''].filter(Boolean).join(' ');
  return <img className={classes} src={src} alt={alt} loading={loading} {...rest} />;
}
