import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import path from 'node:path';
import pkg from './package.json' with { type: 'json' };

const dirname = import.meta.dirname;
const external = [...Object.keys(pkg.peerDependencies), ...Object.keys(pkg.dependencies)];

export default defineConfig({
  plugins: [react()],
  publicDir: false,
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    copyPublicDir: false,
    minify: false,
    cssCodeSplit: false,
    lib: {
      entry: path.join(dirname, 'src/index.ts'),
      formats: ['es'],
      cssFileName: 'components',
    },
    rollupOptions: {
      external: (id) => external.some((dep) => id === dep || id.startsWith(`${dep}/`)),
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js',
        assetFileNames: (asset) => (asset.names.some((n) => n.endsWith('.css')) ? '[name][extname]' : 'assets/[name]-[hash][extname]'),
      },
    },
  },
});
