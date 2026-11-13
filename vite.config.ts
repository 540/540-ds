/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
import path from 'node:path';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
const dirname = import.meta.dirname;

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [react()],
  test: {
    projects: [{
      extends: true,
      test: {
        name: 'ssr',
        environment: 'node',
        include: ['src/ssr.test.tsx'],
        setupFiles: ['src/ssr.setup.ts'],
      },
    }, {
      extends: true,
      // The islands ship on Preact: same stories, with react resolved to preact/compat
      resolve: {
        alias: [
          { find: /^react$/, replacement: path.join(dirname, 'src/runtime/compat/react.ts') },
          { find: /^react-dom$/, replacement: path.join(dirname, 'src/runtime/compat/react.ts') },
          { find: /^react-dom\/client$/, replacement: 'preact/compat/client' },
          { find: /^react\/jsx-(dev-)?runtime$/, replacement: 'preact/compat/jsx-runtime' },
          { find: /^lucide-react$/, replacement: path.join(dirname, 'node_modules/lucide-react/dist/esm/lucide-react.mjs') },
        ],
      },
      test: {
        name: 'islands',
        environment: 'node',
        include: ['src/islands.test.tsx'],
        setupFiles: ['src/ssr.setup.ts'],
        server: { deps: { inline: [/storybook/, /lucide-react/] } },
      },
    }, {
      extends: true,
      plugins: [
      // The plugin will run tests for the stories defined in your Storybook config
      // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
      storybookTest({
        configDir: path.join(dirname, '.storybook')
      })],
      test: {
        name: 'storybook',
        browser: {
          enabled: true,
          headless: true,
          provider: playwright({}),
          instances: [{
            browser: 'chromium'
          }]
        }
      }
    }]
  }
});