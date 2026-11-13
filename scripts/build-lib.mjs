import { execFileSync } from 'node:child_process';
import { copyFile, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { bundle } from 'lightningcss';
import { build } from 'vite';

const root = path.resolve(import.meta.dirname, '..');
const out = path.join(root, 'dist');

const FONT = 'dm-sans-latin-opsz-normal.woff2';
const FONT_DIR = path.join(root, 'node_modules/@fontsource-variable/dm-sans');

await build({ configFile: path.join(root, 'vite.lib.config.ts'), root, logLevel: 'warn' });

execFileSync(process.execPath, [path.join(root, 'node_modules/typescript/bin/tsc'), '-p', path.join(root, 'tsconfig.lib.json')], { stdio: 'inherit' });

await mkdir(path.join(out, 'fonts'), { recursive: true });
await copyFile(path.join(FONT_DIR, 'files', FONT), path.join(out, 'fonts', FONT));
await copyFile(path.join(FONT_DIR, 'LICENSE'), path.join(out, 'fonts', 'OFL.txt'));

const font = `@font-face {\n  font-family: 'DM Sans';\n  font-style: normal;\n  font-display: swap;\n  font-weight: 100 1000;\n  src: url('./fonts/${FONT}') format('woff2-variations');\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\n}\n`;
const { code: base } = bundle({ filename: path.join(root, 'src/styles/global.css'), minify: false });
const components = path.join(out, 'components.css');
await writeFile(path.join(out, 'styles.css'), `${font}\n${base}\n${await readFile(components, 'utf8')}`);
await rm(components);
