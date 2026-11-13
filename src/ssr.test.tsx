import { composeStories } from '@storybook/react-vite';
import type { Meta } from '@storybook/react-vite';
import type { ComponentType } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

/**
 * Every story must render in Node, with no browser: no `window`, `document`, `localStorage`…
 * while rendering. Browser APIs belong in effects or event handlers, which a server render never
 * runs. This is what lets a piece be pre-rendered to static HTML before it reaches the browser.
 */
const modules = import.meta.glob<{ default: Meta }>(['./components/**/*.stories.tsx', './templates/**/*.stories.tsx'], { eager: true });

describe.each(Object.entries(modules))('%s', (_path, mod) => {
  const stories = Object.entries(composeStories(mod)) as [string, ComponentType][];

  it.each(stories)('%s renders without a browser', (_name, Story) => {
    expect(typeof window).toBe('undefined');
    const html = renderToString(<Story />);
    expect(html.length).toBeGreaterThan(0);
  });
});
