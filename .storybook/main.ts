import type { StorybookConfig } from '@storybook/react-vite';
import remarkGfm from 'remark-gfm';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: [
    {
      name: '@storybook/addon-docs', // Documentation pages (MDX) and autodocs
      options: { mdxPluginOptions: { mdxCompileOptions: { remarkPlugins: [remarkGfm] } } }, // Markdown tables in MDX
    },
    '@storybook/addon-a11y', // Accessibility checks panel
    '@storybook/addon-vitest', // Runs stories as tests
    '@storybook/addon-mcp', // Lets AI agents read this Storybook
  ],
  // Controls, Viewport and Backgrounds are built into Storybook core since v9.
  framework: '@storybook/react-vite',
  staticDirs: ['../public'], // favicon, brand logo and other static files
  core: {
    disableWhatsNewNotifications: true, // no Storybook news banner in the sidebar
  },
  features: {
    sidebarOnboardingChecklist: false, // no "Get started" widget: this is a branded catalogue
    menuOnboardingChecklist: false,
  },
};
export default config;
