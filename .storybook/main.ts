import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-docs', // Documentation pages (MDX) and autodocs
    '@storybook/addon-a11y', // Accessibility checks panel
    '@storybook/addon-vitest', // Runs stories as tests
    '@storybook/addon-mcp', // Lets AI agents read this Storybook
  ],
  // Controls, Viewport and Backgrounds are built into Storybook core since v9.
  framework: '@storybook/react-vite',
};
export default config;
