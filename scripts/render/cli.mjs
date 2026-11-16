#!/usr/bin/env node
import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { parseArgs } from 'node:util';
import { TagError, renderTalk } from './index.mjs';

const usage = `usage: 540-ds-render <talk.rev.html> [-o talk.html] [--lang es] [--pieces <folder with manifest.json>]
       540-ds-render --contract           print the <rev-…> tag contract (CONTRATO.md)
       540-ds-render --tags [tag…]        print the props of every tag, or of the ones named (rev-grid-item, grid-item or GridItem)
       540-ds-render --version            print the design system version`;

let args;
try {
  args = parseArgs({
    allowPositionals: true,
    options: {
      out: { type: 'string', short: 'o' },
      lang: { type: 'string', default: 'es' },
      pieces: { type: 'string' },
      contract: { type: 'boolean' },
      tags: { type: 'boolean' },
      version: { type: 'boolean', short: 'v' },
      help: { type: 'boolean', short: 'h' },
    },
  });
} catch (error) {
  console.error(`${error.message}\n${usage}`);
  process.exit(2);
}
const { values, positionals } = args;
if (values.help) {
  console.log(usage);
  process.exit(0);
}

const pieces = path.resolve(values.pieces ?? [path.join(import.meta.dirname, '..'), path.join(import.meta.dirname, '..', '..', 'pieces')].find((dir) => existsSync(path.join(dir, 'manifest.json'))) ?? '.');
const readManifest = async () => JSON.parse(await readFile(path.join(pieces, 'manifest.json'), 'utf8'));

if (values.contract) {
  process.stdout.write(await readFile(path.join(import.meta.dirname, 'CONTRATO.md'), 'utf8'));
  process.exit(0);
}

if (values.version) {
  console.log((await readManifest()).version);
  process.exit(0);
}

if (values.tags) {
  const { tags } = await readManifest();
  if (!positionals.length) {
    console.log(JSON.stringify(tags, null, 2));
    process.exit(0);
  }
  const kebab = (name) => name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
  const picked = {};
  const unknown = [];
  for (const name of positionals) {
    const tag = name.startsWith('rev-') ? name : `rev-${kebab(name)}`;
    if (tags[tag]) picked[tag] = tags[tag];
    else unknown.push(name);
  }
  if (unknown.length) {
    console.error(`unknown tag${unknown.length > 1 ? 's' : ''}: ${unknown.join(', ')}. Known: ${Object.keys(tags).join(', ')}`);
    process.exit(1);
  }
  console.log(JSON.stringify(picked, null, 2));
  process.exit(0);
}

if (positionals.length !== 1) {
  console.error(usage);
  process.exit(2);
}

const input = path.resolve(positionals[0]);
const out = path.resolve(values.out ?? input.replace(/(\.rev)?\.html?$/i, '') + '.html');
if (out === input) {
  console.error(`the output would overwrite ${input}; name it with -o`);
  process.exit(2);
}

try {
  const result = await renderTalk(await readFile(input, 'utf8'), { pieces, baseDir: path.dirname(input), lang: values.lang, origin: path.basename(input) });
  await writeFile(out, result.html);
  for (const warning of result.warnings) console.error(`warning: ${warning}`);
  const kb = (Buffer.byteLength(result.html) / 1024).toFixed(0);
  console.error(`${path.relative(process.cwd(), out)}: ${kb} KB, ${result.version}, ${result.components.length} components, ${result.islands.length ? `islands: ${result.islands.join(', ')}` : 'no JS'}`);
} catch (error) {
  if (!(error instanceof TagError)) throw error;
  console.error(error.message);
  process.exit(1);
}
