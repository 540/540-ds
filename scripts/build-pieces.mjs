import { execSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { copyFile, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import react from '@vitejs/plugin-react';
import { bundle } from 'lightningcss';
import { build } from 'vite';
import { preactAlias } from './lib/preact-alias.mjs';

const root = path.resolve(import.meta.dirname, '..');
const out = path.join(root, 'pieces');
const pkg = JSON.parse(await readFile(path.join(root, 'package.json'), 'utf8'));
const commit = execSync('git rev-parse --short HEAD', { cwd: root }).toString().trim();

const ISLANDS = ['Deck', 'Carousel', 'Count', 'Marquee', 'Steps', 'Timeline', 'Bars', 'Spotlight', 'Statements', 'Sheet', 'Schema', 'Share', 'NavMobile', 'LogoCarousel'];

const SHARED = {
  react: '__ds540.React',
  'react/jsx-runtime': '__ds540.jsxRuntime',
  'react-dom': '__ds540.ReactDOM',
  'react-dom/client': '__ds540.ReactDOMClient',
  'ds540:steps-context': '__ds540.StepsContext',
};
const STEPS_CONTEXT = path.join(root, 'src/components/organisms/Steps/StepsContext.ts');

const PREACT_ALIAS = preactAlias(root);

const FONT = 'dm-sans-latin-opsz-normal.woff2';
const FONT_DIR = path.join(root, 'node_modules/@fontsource-variable/dm-sans');

function scopedName(local, filename) {
  const file = path.relative(root, filename.split('?')[0]);
  const name = path.basename(file).replace(/\.module\.css$/, '');
  const hash = createHash('sha256').update(`${file}:${local}`).digest('base64url').slice(0, 5);
  return `${name}_${local}_${hash}`;
}

// A function, not an object: island builds run at the same time and each needs its own plugin instances
const shared = () => ({
  configFile: false,
  root,
  mode: 'production',
  logLevel: 'warn',
  publicDir: false,
  define: { 'process.env.NODE_ENV': '"production"' },
  plugins: [react()],
  css: { modules: { generateScopedName: scopedName } },
});

const withPreact = () => {
  const base = shared();
  return { ...base, resolve: { alias: PREACT_ALIAS } };
};

async function findComponents() {
  const list = [];
  for (const group of ['atoms', 'molecules', 'organisms']) {
    const dir = path.join(root, 'src/components', group);
    for (const name of (await readdir(dir, { withFileTypes: true })).filter((d) => d.isDirectory()).map((d) => d.name).sort()) {
      list.push({ name, group, entry: path.join(dir, name, 'index.ts') });
    }
  }
  const names = list.map((c) => c.name);
  const missing = ISLANDS.filter((n) => !names.includes(n));
  if (missing.length) throw new Error(`Islands with no component: ${missing.join(', ')}`);
  return list;
}

async function buildServer(components) {
  const graph = {};
  const base = withPreact();
  await build({
    ...base,
    plugins: [
      ...base.plugins,
      {
        name: 'pieces-graph',
        generateBundle(_options, bundle) {
          for (const chunk of Object.values(bundle)) {
            if (chunk.type !== 'chunk') continue;
            graph[chunk.fileName] = {
              entry: chunk.isEntry ? chunk.name : null,
              imports: chunk.imports,
              css: [...(chunk.viteMetadata?.importedCss ?? [])],
              exports: chunk.exports,
            };
          }
        },
      },
    ],
    ssr: { noExternal: true, target: 'node' },
    build: {
      ssr: true,
      ssrEmitAssets: true,
      cssCodeSplit: true,
      outDir: path.join(out, 'server'),
      emptyOutDir: true,
      minify: false,
      rollupOptions: {
        input: { ...Object.fromEntries(components.map((c) => [c.name, c.entry])), runtime: path.join(root, 'src/runtime/server.ts') },
        output: { format: 'es', entryFileNames: '[name].js', chunkFileNames: 'chunks/[name]-[hash].js', assetFileNames: 'assets/[name]-[hash][extname]' },
      },
    },
  });
  return graph;
}

async function buildIsland(component) {
  const entry = path.join(root, 'node_modules/.tmp/pieces', `${component.name}.island.ts`);
  await mkdir(path.dirname(entry), { recursive: true });
  await writeFile(entry, `import * as m from ${JSON.stringify(component.entry)};\n(globalThis as any).__ds540.register(m);\n`);
  const base = shared();
  await build({
    ...base,
    plugins: [
      ...base.plugins,
      {
        name: 'pieces-island',
        enforce: 'pre',
        async resolveId(source, importer) {
          if (source in SHARED) return { id: source, external: true };
          if (!importer || !source.startsWith('.')) return null;
          const resolved = await this.resolve(source, importer, { skipSelf: true });
          if (resolved && resolved.id === STEPS_CONTEXT) return { id: 'ds540:steps-context', external: true };
          return null;
        },
      },
    ],
    build: {
      outDir: path.join(out, 'islands'),
      emptyOutDir: false,
      cssCodeSplit: false,
      minify: true,
      lib: { entry, formats: ['iife'], name: `__ds540_${component.name}`, fileName: () => `${component.name}.js`, cssFileName: `_discard-${component.name}` },
      rollupOptions: { external: Object.keys(SHARED), output: { globals: SHARED } },
    },
  });
  const file = path.join(out, 'islands', `${component.name}.js`);
  const code = await readFile(file, 'utf8');
  if (/createContext\(/.test(code)) throw new Error(`${component.name} island bundles its own React context; share it through the runtime`);
  if (/react\.production|__SECRET_INTERNALS|__CLIENT_INTERNALS|\.__H\b|options\.__b/.test(code)) throw new Error(`${component.name} island bundles React or Preact`);
  return `islands/${component.name}.js`;
}

async function buildRuntime() {
  await build({
    ...withPreact(),
    build: {
      outDir: path.join(out, 'islands'),
      emptyOutDir: false,
      minify: true,
      lib: { entry: path.join(root, 'src/runtime/client.ts'), formats: ['iife'], name: '__ds540_runtime', fileName: () => 'runtime.js' },
    },
  });
}

async function buildBase() {
  await mkdir(path.join(out, 'css'), { recursive: true });
  await mkdir(path.join(out, 'fonts'), { recursive: true });
  await copyFile(path.join(FONT_DIR, 'files', FONT), path.join(out, 'fonts', FONT));
  await copyFile(path.join(FONT_DIR, 'LICENSE'), path.join(out, 'fonts', 'OFL.txt'));
  const { code } = bundle({ filename: path.join(root, 'src/styles/global.css'), minify: false });
  const font = `@font-face {\n  font-family: 'DM Sans';\n  font-style: normal;\n  font-display: swap;\n  font-weight: 100 1000;\n  src: url('../fonts/${FONT}') format('woff2-variations');\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\n}\n`;
  const islands = `ds-island,\nds-slot {\n  display: contents;\n}\n`;
  await writeFile(path.join(out, 'css', 'base.css'), `${font}\n${code}\n${islands}`);
}

async function writeManifest(components, graph, islands) {
  const byEntry = Object.fromEntries(Object.entries(graph).filter(([, c]) => c.entry).map(([file, c]) => [c.entry, file]));
  // One name per asset (the first chunk that lists it wins), and never two assets on one name
  const cssName = {};
  const taken = new Set();
  const entriesFirst = Object.entries(graph).sort(([a, x], [b, y]) => Number(!x.entry) - Number(!y.entry) || a.localeCompare(b));
  for (const [file, chunk] of entriesFirst) {
    chunk.css.forEach((asset, i) => {
      if (cssName[asset]) return;
      const base = `${chunk.entry ?? path.basename(file, '.js').replace(/-[\w-]{8}$/, '')}${chunk.css.length > 1 ? `-${i}` : ''}`;
      let target = `css/${base}.css`;
      for (let n = 2; taken.has(target); n++) target = `css/${base}-${n}.css`;
      taken.add(target);
      cssName[asset] = target;
    });
  }
  for (const [asset, target] of Object.entries(cssName)) await copyFile(path.join(out, 'server', asset), path.join(out, target));
  await rm(path.join(out, 'server', 'assets'), { recursive: true, force: true });
  for (const file of await readdir(path.join(out, 'islands'))) if (file.startsWith('_discard-')) await rm(path.join(out, 'islands', file));

  const cssOf = (file, seen = new Set()) => {
    if (seen.has(file)) return [];
    seen.add(file);
    const chunk = graph[file];
    if (!chunk) return [];
    return [...chunk.imports.flatMap((dep) => cssOf(dep, seen)), ...chunk.css.map((a) => cssName[a])];
  };
  const manifest = {
    name: pkg.name,
    version: `${pkg.version}+${commit}`,
    preact: JSON.parse(await readFile(path.join(root, 'node_modules/preact/package.json'), 'utf8')).version,
    base: { css: 'css/base.css', fonts: [`fonts/${FONT}`], fontLicense: 'fonts/OFL.txt' },
    runtime: { server: 'server/runtime.js', client: 'islands/runtime.js' },
    components: Object.fromEntries(
      components.map((c) => {
        const file = byEntry[c.name];
        return [c.name, { group: c.group, server: `server/${file}`, exports: graph[file].exports.filter((e) => /^[A-Z][a-z]/.test(e)), css: [...new Set(cssOf(file))], island: islands[c.name] ?? null }];
      }),
    ),
  };
  await writeFile(path.join(out, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
  return manifest;
}

const components = await findComponents();
await rm(out, { recursive: true, force: true });
const graph = await buildServer(components);
await buildRuntime();
const islandComponents = components.filter((c) => ISLANDS.includes(c.name));
const islands = Object.fromEntries(await Promise.all(islandComponents.map(async (c) => [c.name, await buildIsland(c)])));
await buildBase();
const manifest = await writeManifest(components, graph, islands);
console.log(`pieces ${manifest.version}: ${components.length} components, ${Object.keys(islands).length} islands → ${path.relative(root, out)}/`);
