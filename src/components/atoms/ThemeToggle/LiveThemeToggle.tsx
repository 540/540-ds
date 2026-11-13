import { useSyncExternalStore } from 'react';
import { ThemeToggle } from './ThemeToggle';

function subscribeTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  return () => observer.disconnect();
}

const readDark = () => document.documentElement.dataset.theme === 'dark';

const serverDark = () => false;

export function LiveThemeToggle() {
  const dark = useSyncExternalStore(subscribeTheme, readDark, serverDark);
  return (
    <ThemeToggle
      dark={dark}
      onToggle={(next) => {
        document.documentElement.dataset.theme = next ? 'dark' : 'light';
      }}
    />
  );
}
