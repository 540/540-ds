import { useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Preview } from '@storybook/react-vite';
import { DocsContainer } from '@storybook/addon-docs/blocks';
import type { DocsContainerProps } from '@storybook/addon-docs/blocks';
import { DocsCover } from './DocsCover';
import { addons } from 'storybook/preview-api';
import { GLOBALS_UPDATED } from 'storybook/internal/core-events';
import '../src/styles/global.css';
import './docs.css';

type Theme = 'light' | 'dark';
type Scale = 'web' | 'projection';

/** Apply the theme to <html data-theme>, which is what the semantic color tokens read. */
function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
}

/** Apply the type scale to <html data-scale> ('projection' grows text for a talk). */
function applyScale(scale: Scale) {
  if (scale === 'projection') document.documentElement.dataset.scale = 'projection';
  else delete document.documentElement.dataset.scale;
}

// Docs pages (MDX) do not run decorators, so we also listen to the toolbar directly.
addons.getChannel().on(GLOBALS_UPDATED, ({ globals }: { globals: { theme?: Theme; scale?: Scale } }) => {
  if (globals?.theme) applyTheme(globals.theme);
  if (globals?.scale) applyScale(globals.scale);
});

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // 'todo' shows violations in the a11y panel without failing tests
      test: 'todo',
    },
    docs: {
      // Every docs page opens with the level kicker and the 540 logo
      container: ({ context, children }: DocsContainerProps & { children?: ReactNode }) => (
        <DocsContainer context={context}>
          <DocsCover context={context} />
          {children}
        </DocsContainer>
      ),
    },
    viewport: {
      // The three reference widths the system is designed at (Figma → Anchos de pantalla)
      options: {
        mobile: { name: 'Móvil (375)', styles: { width: '375px', height: '812px' }, type: 'mobile' },
        tablet: { name: 'Tablet (768)', styles: { width: '768px', height: '1024px' }, type: 'tablet' },
        desktop: { name: 'Escritorio (1440)', styles: { width: '1440px', height: '900px' }, type: 'desktop' },
      },
    },
    backgrounds: {
      options: {
        light: { name: 'Claro (bg-default)', value: '#f5f5f3' },
        dark: { name: 'Oscuro (bg-default)', value: '#000000' },
        white: { name: 'Blanco', value: '#ffffff' },
      },
    },
    options: {
      // Sidebar order: top-level sections first, then alphabetical inside each
      storySort: {
        order: ['Introducción', ['Bienvenida', 'Normas para charlas'], 'Fundamentos', ['Color', 'Tipografía', 'Espaciado', 'Tamaños', 'Radios', 'Anchos de pantalla'], 'Átomos', 'Moléculas', 'Organismos'],
      },
    },
  },
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
};

export default preview;
