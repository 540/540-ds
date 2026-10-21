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
};
export default config;
