import { composeStories } from '@storybook/react-vite';
import type { Meta } from '@storybook/react-vite';
import { JSDOM } from 'jsdom';
import { act } from 'react';
import type { ComponentType } from 'react';
import { renderToString } from 'react-dom/server';
import { afterEach, describe, expect, it, vi } from 'vitest';

const modules = import.meta.glob<{ default: Meta }>(['./components/**/*.stories.tsx', './templates/**/*.stories.tsx'], { eager: true });

type Browser = { name: string; matches: boolean; theme: 'light' | 'dark' };

const BROWSERS: Browser[] = [
  { name: 'a light browser that matches no media query', matches: false, theme: 'light' },
  { name: 'a dark browser that matches every media query', matches: true, theme: 'dark' },
];

const installed: string[] = [];

function installBrowser(html: string, { matches, theme }: Browser) {
  const dom = new JSDOM(`<!doctype html><html data-theme="${theme}"><body><div id="root">${html}</div></body></html>`, { pretendToBeVisual: true, url: 'http://localhost/' });
  const win = dom.window as unknown as Record<string, unknown>;
  class NoopObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  }
  win.IntersectionObserver ??= NoopObserver;
  win.ResizeObserver ??= NoopObserver;
  win.matchMedia = (media: string) => ({ matches, media, onchange: null, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {}, dispatchEvent: () => false });
  for (const key of Object.getOwnPropertyNames(win)) {
    if (key in globalThis || key.startsWith('_')) continue;
    Object.defineProperty(globalThis, key, { configurable: true, writable: true, value: win[key] });
    installed.push(key);
  }
  for (const key of ['window', 'self', 'document', 'navigator']) {
    Object.defineProperty(globalThis, key, { configurable: true, writable: true, value: win[key === 'window' || key === 'self' ? 'window' : key] });
    installed.push(key);
  }
  return dom.window.document.getElementById('root')!;
}

function uninstallBrowser() {
  for (const key of installed.splice(0)) delete (globalThis as Record<string, unknown>)[key];
}

afterEach(() => {
  uninstallBrowser();
  vi.restoreAllMocks();
});

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

describe.each(Object.entries(modules))('%s', (_path, mod) => {
  const stories = Object.entries(composeStories(mod)) as [string, ComponentType][];

  it.each(stories)('%s renders without a browser', (_name, Story) => {
    expect(typeof window).toBe('undefined');
    const html = renderToString(<Story />);
    expect(html.length).toBeGreaterThan(0);
  });

  describe.each(BROWSERS)('hydrates in $name', (browser) => {
    it.each(stories)('%s', async (_name, Story) => {
      const html = renderToString(<Story />);
      const container = installBrowser(html, browser);
      const { hydrateRoot } = await import('react-dom/client');

      const errors: string[] = [];
      vi.spyOn(console, 'error').mockImplementation((...args: unknown[]) => errors.push(args.map(String).join(' ')));
      let root: ReturnType<typeof hydrateRoot> | undefined;
      await act(async () => {
        root = hydrateRoot(container, <Story />, { onRecoverableError: (error) => errors.push(String(error)) });
      });
      act(() => root?.unmount());

      expect(errors.filter((e) => /hydrat|didn't match/i.test(e))).toEqual([]);
    });
  });
});
