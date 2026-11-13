import { composeStories } from '@storybook/react-vite';
import type { Meta } from '@storybook/react-vite';
import { JSDOM } from 'jsdom';
import { hydrate, render } from 'preact';
import type { VNode } from 'preact';
import { act } from 'preact/test-utils';
import { renderToString } from 'preact-render-to-string';
import { createElement } from 'react';
import type { ComponentType } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { IdPrefix, whileHydrating } from './runtime/compat/react';

// The 14 components that ship an island, run on Preact (this project aliases react to preact/compat)
const modules = import.meta.glob<{ default: Meta }>(
  [
    './components/organisms/Deck/Deck.stories.tsx',
    './components/molecules/Carousel/Carousel.stories.tsx',
    './components/atoms/Count/Count.stories.tsx',
    './components/organisms/Marquee/Marquee.stories.tsx',
    './components/organisms/Steps/Steps.stories.tsx',
    './components/organisms/Timeline/Timeline.stories.tsx',
    './components/organisms/Bars/Bars.stories.tsx',
    './components/organisms/Spotlight/Spotlight.stories.tsx',
    './components/organisms/Statements/Statements.stories.tsx',
    './components/organisms/Sheet/Sheet.stories.tsx',
    './components/organisms/Schema/Schema.stories.tsx',
    './components/organisms/Share/Share.stories.tsx',
    './components/molecules/NavMobile/NavMobile.stories.tsx',
    './components/organisms/LogoCarousel/LogoCarousel.stories.tsx',
  ],
  { eager: true },
);

type Browser = { name: string; matches: boolean; theme: 'light' | 'dark' };

const BROWSERS: Browser[] = [
  { name: 'a light browser that matches no media query', matches: false, theme: 'light' },
  { name: 'a dark browser that matches every media query', matches: true, theme: 'dark' },
];

const installed: string[] = [];

function installBrowser({ matches, theme }: Browser) {
  const dom = new JSDOM(`<!doctype html><html data-theme="${theme}"><body></body></html>`, { pretendToBeVisual: true, url: 'http://localhost/' });
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
  (dom.window.HTMLElement.prototype as unknown as { scrollTo: () => void }).scrollTo = () => {};
  win.scrollTo = () => {};
  for (const key of Object.getOwnPropertyNames(win)) {
    if (key in globalThis || key.startsWith('_')) continue;
    Object.defineProperty(globalThis, key, { configurable: true, writable: true, value: win[key] });
    installed.push(key);
  }
  for (const key of ['window', 'self', 'document', 'navigator']) {
    Object.defineProperty(globalThis, key, { configurable: true, writable: true, value: win[key === 'window' || key === 'self' ? 'window' : key] });
    installed.push(key);
  }
  return dom.window.document;
}

function uninstallBrowser() {
  for (const key of installed.splice(0)) delete (globalThis as Record<string, unknown>)[key];
}

/** The DOM as a comparable string: attributes sorted, styles parsed, so serializer quirks don't count. */
function canonical(node: Node): string {
  if (node.nodeType === 3) return node.textContent ?? '';
  if (node.nodeType !== 1) return '';
  const el = node as HTMLElement;
  const attrs = Array.from(el.attributes)
    .map((a) => (a.name === 'style' ? `style="${el.style.cssText}"` : `${a.name}="${a.value}"`))
    .sort()
    .join(' ');
  const tag = el.tagName.toLowerCase();
  return `<${tag}${attrs ? ` ${attrs}` : ''}>${Array.from(el.childNodes).map(canonical).join('')}</${tag}>`;
}

const island = (Story: ComponentType, id = 'i1-') => createElement(IdPrefix.Provider as never, { value: id }, createElement(Story)) as unknown as VNode;

const idsOf = (html: string) => new Set(Array.from(html.matchAll(/\sid="([^"]+)"/g), (m) => m[1]));

afterEach(() => {
  uninstallBrowser();
  vi.restoreAllMocks();
});

describe.each(Object.entries(modules))('%s', (_path, mod) => {
  const stories = Object.entries(composeStories(mod)) as [string, ComponentType][];

  it.each(stories)('%s renders on Preact without a browser', (_name, Story) => {
    expect(typeof window).toBe('undefined');
    expect(renderToString(island(Story)).length).toBeGreaterThan(0);
  });

  it.each(stories)('%s twice on a page never repeats a generated id', (_name, Story) => {
    const first = idsOf(renderToString(island(Story, 'i1-')));
    const second = idsOf(renderToString(island(Story, 'i2-')));
    const shared = [...first].filter((id) => second.has(id) && /P\d/.test(id));
    expect(shared).toEqual([]);
  });

  describe.each(BROWSERS)('hydrates on Preact in $name', (browser) => {
    it.each(stories)('%s', async (_name, Story) => {
      const html = renderToString(island(Story));
      const doc = installBrowser(browser);
      const errors: string[] = [];
      vi.spyOn(console, 'error').mockImplementation((...args: unknown[]) => errors.push(args.map(String).join(' ')));

      const server = doc.createElement('div');
      server.innerHTML = html;
      const client = doc.createElement('div');
      whileHydrating(() => render(island(Story), client));
      // Preact does not patch a mismatch while hydrating: the first client render must equal the HTML
      expect(canonical(client)).toBe(canonical(server));
      render(null, client);

      const root = doc.createElement('div');
      root.innerHTML = html;
      doc.body.appendChild(root);
      const before = root.firstElementChild;
      await act(() => {
        whileHydrating(() => hydrate(island(Story), root));
      });
      expect(root.firstElementChild).toBe(before);
      await act(() => render(null, root));

      expect(errors).toEqual([]);
    });
  });
});
