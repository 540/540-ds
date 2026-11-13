import { useEffect } from 'react';
import type { Preview } from '@storybook/react-vite';

export type Theme = 'light' | 'dark';
export type Scale = 'web' | 'projection';

/** Apply the theme to <html data-theme>, which is what the semantic color tokens read. */
export function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
}

/** Apply the type scale to <html data-scale> ('projection' grows text for a talk). */
export function applyScale(scale: Scale) {
  if (scale === 'projection') document.documentElement.dataset.scale = 'projection';
  else delete document.documentElement.dataset.scale;
}

export const renderAnnotations = {
  globalTypes: {
    theme: {
      description: 'Tema de color',
      toolbar: {
        title: 'Tema',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Claro', icon: 'sun' },
          { value: 'dark', title: 'Oscuro', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
    scale: {
      description: 'Escala tipográfica',
      toolbar: {
        title: 'Escala',
        icon: 'zoom',
        items: [
          { value: 'web', title: 'Web' },
          { value: 'projection', title: 'Proyección' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
    scale: 'web',
  },
  decorators: [
    (Story, context) => {
      const theme = (context.globals.theme as Theme) ?? 'light';
      const scale = (context.globals.scale as Scale) ?? 'web';
      useEffect(() => applyTheme(theme), [theme]);
      useEffect(() => applyScale(scale), [scale]);
      return <Story />;
    },
  ],
} satisfies Preview;
