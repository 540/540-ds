import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { Button } from '../../atoms/Button';
import { Image } from '../../atoms/Image';
import { Text } from '../../atoms/Text';
import styles from './Dialog.module.css';
import type { DialogProps } from './types';

/**
 * Dialog is a window that covers the page to tell one thing. A real <dialog>: focus goes in on
 * open, stays in, and returns to the opener on close. Escape closes; so does a click on the veil.
 */
export function Dialog({ open, onClose, title, media, footer, className, children }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const classes = [styles.dialog, className ?? ''].filter(Boolean).join(' ');

  return (
    <dialog
      ref={ref}
      className={classes}
      aria-labelledby="dialog-title"
      onClose={onClose}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        // A click on the veil (the dialog itself, outside the inner wrapper) closes
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={styles.inner}>
        {media ? (
          <div className={styles.media}>
            <Image src={media.src} alt={media.alt} ratio="1:1" />
          </div>
        ) : null}
        <div className={styles.body}>
          <div className={styles.header}>
            <Text as="h2" variant="title-s" wrap="balance" id="dialog-title">
              {title}
            </Text>
            <Button variant="ghost" size="sm" icon={<X />} iconOnly onClick={onClose}>
              Cerrar
            </Button>
          </div>
          <div className={styles.content}>
            <Text variant="body-m" wrap="pretty">
              {children}
            </Text>
          </div>
          {footer ? <div className={styles.footer}>{footer}</div> : null}
        </div>
      </div>
    </dialog>
  );
}
