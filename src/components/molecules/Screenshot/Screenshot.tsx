import styles from './Screenshot.module.css';
import type { ScreenshotProps } from './types';

/** Screenshot is a capture of a screen: fixed height, whole image, rounded corners. */
export function Screenshot({ src, alt, width, height, className, loading = 'eager', ...rest }: ScreenshotProps) {
  return <img className={[styles.screenshot, className ?? ''].filter(Boolean).join(' ')} src={src} alt={alt} width={width} height={height} loading={loading} {...rest} />;
}
