import { readFileSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { TagError, extractTalk, prepareTalk, renderBody } from './core.mjs';
import { MIME } from './rules.mjs';

export { TagError };

/**
 * Turns a document written with <rev-…> tags into one self-contained HTML page.
 * Also takes a talk written for the browser runtime (tags inside <script type="text/rev">).
 * Throws a TagError listing every problem (unknown tags or props, wrong values, missing images).
 */
export async function renderTalk(source, { pieces, baseDir = process.cwd(), lang, origin = 'document' } = {}) {
  if (!pieces) throw new Error('renderTalk needs the pieces folder');
  const manifest = JSON.parse(await readFile(path.join(pieces, 'manifest.json'), 'utf8'));
  const talk = extractTalk(source, origin);
  const { title, nodes, warnings } = prepareTalk(talk.source, { manifest, origin, image: (value, file, label) => readImage(baseDir, file, label) });

  const page = await renderBody(nodes, { manifest, warnings, load: (file) => import(pathToFileURL(path.join(pieces, file)).href) });
  const text = (file) => readFile(path.join(pieces, file), 'utf8');
  let css = (await Promise.all(page.css.map(text))).join('\n');
  for (const font of manifest.base.fonts) {
    const b64 = (await readFile(path.join(pieces, font))).toString('base64');
    css = css.replaceAll(`url('../fonts/${path.basename(font)}')`, `url(data:font/woff2;base64,${b64})`);
  }
  css = css.replace(/<\/(style)/gi, '<\\/$1');
  const scripts = (await Promise.all(page.scripts.map(text))).map((code) => code.replace(/<\/(script)/gi, '<\\/$1'));

  const head = [
    '<meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1">',
    `<meta name="generator" content="${escapeHtml(`${manifest.name} ${manifest.version}`)}">`,
    `<meta name="540-ds-version" content="${escapeHtml(manifest.version)}">`,
    `<title>${escapeHtml(title)}</title>`,
    `<style>${css}</style>`,
  ].join('');
  const html = `<!doctype html><html lang="${escapeHtml(lang ?? talk.lang ?? 'es')}"><head>${head}</head><body>${page.body}${scripts.map((code) => `<script>${code}</script>`).join('')}</body></html>\n`;
  checkOffline(css, page.body);
  return { html, version: manifest.version, components: page.components, islands: page.islands, scripts: scripts.length > 0, warnings };
}

function readImage(baseDir, file, label) {
  const full = path.resolve(baseDir, decodeURIComponent(file));
  let bytes;
  try {
    bytes = readFileSync(full);
  } catch {
    throw new TagError(`${label}: image not found: ${full}`);
  }
  const ext = path.extname(full).slice(1).toLowerCase();
  if (!Object.hasOwn(MIME, ext)) throw new TagError(`${label}: unsupported image type: ${full}`);
  const mime = MIME[ext];
  return `data:${mime};base64,${bytes.toString('base64')}`;
}

function checkOffline(styles, body) {
  const css = [...styles.matchAll(/url\(\s*['"]?(?!data:|#)([^'")]+)/g)].map((m) => m[1]);
  const media = [...body.matchAll(/<(?:img|source|image)\b[^>]*?\s(?:src|srcset|href)="(?!data:|#)([^"]+)"/g)].map((m) => m[1]);
  const missing = [...new Set([...css, ...media])];
  if (missing.length) throw new TagError(`the page would need files from outside: ${missing.join(', ')}`);
}

function escapeHtml(value) {
  return String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}
