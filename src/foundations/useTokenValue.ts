import { useEffect, useState } from 'react';

/** Reads the live computed value of a CSS custom property from <html>. Re-reads when the theme changes. */
export function useTokenValue(name: string): string {
  const [value, setValue] = useState('');

  useEffect(() => {
    const read = () => setValue(getComputedStyle(document.documentElement).getPropertyValue(name).trim());
    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'data-scale'] });
    window.addEventListener('resize', read);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', read);
    };
  }, [name]);

  return value;
}

/** Resolves a token to its final value (follows var() chains) using a probe element. */
export function useResolvedValue(name: string, property: string = 'background-color'): string {
  const [value, setValue] = useState('');

  useEffect(() => {
    const probe = document.createElement('div');
    probe.style.position = 'absolute';
    probe.style.visibility = 'hidden';
    probe.style.setProperty(property, `var(${name})`);
    document.body.appendChild(probe);
    const read = () => setValue(getComputedStyle(probe).getPropertyValue(property).trim());
    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'data-scale'] });
    window.addEventListener('resize', read);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', read);
      probe.remove();
    };
  }, [name, property]);

  return value;
}

/** Converts "rgb(r, g, b)" / "rgba(r, g, b, a)" to "#rrggbb" or "#rrggbbaa" for display. */
export function toHex(css: string): string {
  const m = css.match(/rgba?\(([^)]+)\)/);
  if (!m) return css;
  const parts = m[1].split(/[\s,\/]+/).filter(Boolean).map(Number);
  const [r, g, b, a = 1] = parts;
  const h = (n: number) => Math.round(n).toString(16).padStart(2, '0');
  const alpha = a < 1 ? h(a * 255) : '';
  return `#${h(r)}${h(g)}${h(b)}${alpha}`;
}
