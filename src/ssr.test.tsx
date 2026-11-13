import { composeStories } from '@storybook/react-vite';
import type { Meta } from '@storybook/react-vite';
import type { ComponentType } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

const modules = import.meta.glob<{ default: Meta }>(['./components/**/*.stories.tsx', './templates/**/*.stories.tsx'], { eager: true });

describe.each(Object.entries(modules))('%s', (_path, mod) => {
  const stories = Object.entries(composeStories(mod)) as [string, ComponentType][];

  it.each(stories)('%s renders without a browser', (_name, Story) => {
    expect(typeof window).toBe('undefined');
    const html = renderToString(<Story />);
    expect(html.length).toBeGreaterThan(0);
  });
});
