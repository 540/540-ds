#!/usr/bin/env node
import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { parseArgs } from 'node:util';
import { TagError, renderTalk } from './index.mjs';

const usage = 'usage: node render/cli.mjs <talk.rev.html> [-o talk.html] [--lang es] [--pieces <folder with manifest.json>]';

let args;
try {
  args = parseArgs({ allowPositionals: true, options: { out: { type: 'string', short: 'o' }, lang: { type: 'string', default: 'es' }, pieces: { type: 'string' }, help: { type: 'boolean', short: 'h' } } });
} catch (error) {
  console.error(`${error.message}\n${usage}`);
  process.exit(2);
}
if (args.values.help || args.positionals.length !== 1) {
  console.error(usage);
  process.exit(args.values.help ? 0 : 2);
}

const input = path.resolve(args.positionals[0]);
const out = path.resolve(args.values.out ?? input.replace(/(\.rev)?\.html?$/i, '') + '.html');
if (out === input) {
  console.error(`the output would overwrite ${input}; name it with -o`);
  process.exit(2);
}
const pieces = path.resolve(args.values.pieces ?? [path.join(import.meta.dirname, '..'), path.join(import.meta.dirname, '..', '..', 'pieces')].find((dir) => existsSync(path.join(dir, 'manifest.json'))) ?? '.');

try {
  const result = await renderTalk(await readFile(input, 'utf8'), { pieces, baseDir: path.dirname(input), lang: args.values.lang, origin: path.basename(input) });
  await writeFile(out, result.html);
  for (const warning of result.warnings) console.error(`warning: ${warning}`);
  const kb = (Buffer.byteLength(result.html) / 1024).toFixed(0);
  console.error(`${path.relative(process.cwd(), out)}: ${kb} KB, ${result.version}, ${result.components.length} components, ${result.islands.length ? `islands: ${result.islands.join(', ')}` : 'no JS'}`);
} catch (error) {
  if (!(error instanceof TagError)) throw error;
  console.error(error.message);
  process.exit(1);
}
