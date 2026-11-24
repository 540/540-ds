import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

// Components may only use semantic tokens (--color-*, --space-*…), never the --540-* primitives.
// These files still use primitives and are waiting for their semantic tokens. The list can only
// shrink: once a file is clean it must leave the list, and no file may be added to it.
const allowlist = [
  'atoms/Text/Text.module.css',
  'molecules/Field/Field.module.css',
  'molecules/Grid/Grid.module.css',
  'molecules/Metric/Metric.module.css',
  'organisms/Cycle/Cycle.module.css',
  'organisms/DeckFooter/DeckFooter.tsx',
  'organisms/Heartbeat/Heartbeat.module.css',
  'organisms/Schema/Schema.module.css',
  'organisms/Timeline/Timeline.module.css',
];

const root = path.resolve(import.meta.dirname, '..', 'src', 'components');
const primitive = /--540-[\w-]+/g;

const isChecked = (file) =>
  /\.(css|tsx?)$/.test(file) && !/\.(stories|test)\.tsx?$/.test(file) && !file.split('/').includes('_docs');

const files = (await readdir(root, { recursive: true }))
  .map((file) => file.split(path.sep).join('/'))
  .filter(isChecked)
  .sort();

const offenders = new Map();
for (const file of files) {
  const lines = (await readFile(path.join(root, file), 'utf8')).split('\n');
  const hits = lines.flatMap((line, i) => (line.match(primitive) ?? []).map((token) => `${i + 1}: ${token}`));
  if (hits.length) offenders.set(file, hits);
}

const errors = [];
for (const [file, hits] of offenders) {
  if (allowlist.includes(file)) continue;
  errors.push(`src/components/${file} uses primitive tokens; use semantic tokens instead:\n${hits.map((h) => `    ${h}`).join('\n')}`);
}
for (const file of allowlist) {
  if (!offenders.has(file)) {
    errors.push(`src/components/${file} no longer uses primitive tokens; remove it from the allowlist in scripts/check-primitives.mjs.`);
  }
}

if (errors.length) {
  console.error(errors.map((e) => `✗ ${e}`).join('\n'));
  process.exit(1);
}
console.log(`✓ No primitive tokens in src/components (${allowlist.length} files still allowlisted).`);
