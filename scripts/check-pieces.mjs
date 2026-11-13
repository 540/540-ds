import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { JSDOM, VirtualConsole } from 'jsdom';

const dir = path.resolve(import.meta.dirname, '..', 'pieces');
const manifest = JSON.parse(await readFile(path.join(dir, 'manifest.json'), 'utf8'));
const load = (file) => import(pathToFileURL(path.join(dir, file)).href);
const text = (file) => readFile(path.join(dir, file), 'utf8');

const used = ['Deck', 'Slide', 'Text', 'Steps', 'Count', 'Carousel', 'Statements'];
const rt = await load(manifest.runtime.server);
const registry = rt.registryOf(...(await Promise.all(used.map((name) => load(manifest.components[name].server)))));
const h = rt.createElement;
const get = (name) => registry.get(name);

let n = 0;
const id = () => `i${++n}-`;
const marks = {};
const mark = (html) => {
  const key = `m${Object.keys(marks).length}`;
  marks[key] = html;
  return h('ds-mark', { 'data-m': key });
};
const fill = (html) => html.replace(/<ds-mark data-m="(m\d+)"><\/ds-mark>/g, (_, key) => marks[key]);

const slots = {};
const slot = (element) => {
  const key = `s${Object.keys(slots).length}`;
  slots[key] = fill(rt.renderStatic(element, id()));
  return { $slot: key };
};
const island = (name, props) => rt.renderIsland(registry, { name, props, id: id(), slots });

const steps = island('Steps', {
  total: 1,
  children: [
    { $el: 'Step', p: { from: 0, children: slot(h(get('Text'), { variant: 'title-m' }, 'Primero')) } },
    { $el: 'Step', p: { from: 1, children: { $el: 'Count', p: { value: 1234, suffix: ' €' } } } },
  ],
});
const carousel = island('Carousel', { label: 'Casos', items: [slot(h(get('Text'), null, 'Uno')), slot(h(get('Text'), null, 'Dos'))] });
const statements = island('Statements', { sentences: ['Una idea.', slot(h('strong', null, 'Otra idea.'))] });

const slides = slot(
  h(
    'div',
    null,
    h(get('Slide'), { id: 'portada' }, h(get('Text'), { as: 'h1', variant: 'statement' }, 'Charla de prueba')),
    h(get('Slide'), { id: 'pasos' }, mark(steps)),
    h(get('Slide'), { id: 'casos' }, mark(carousel)),
    mark(statements),
  ),
);
slots[slides.$slot] = slots[slides.$slot].replace(/^<div>|<\/div>$/g, '');

const deck = island('Deck', { items: [{ href: '#pasos', label: 'Pasos' }, { href: '#casos', label: 'Casos' }], footer: { tagline: 'Fin.', copyright: '© 2026 540' }, storageKey: '', children: slides });

const cssFiles = [manifest.base.css, ...new Set(used.flatMap((name) => manifest.components[name].css))];
const css = (await Promise.all(cssFiles.map(text))).join('\n');
const scripts = [manifest.runtime.client, ...used.map((name) => manifest.components[name].island).filter(Boolean)];
const js = await Promise.all(scripts.map(text));
const page = `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>540-ds pieces demo</title><style>${css}</style></head><body>${deck}${js.map((code) => `<script>${code}</script>`).join('')}</body></html>`;

const fonts = await Promise.all(manifest.base.fonts.map(async (file) => [path.basename(file), (await readFile(path.join(dir, file))).toString('base64')]));
let demo = page;
for (const [name, b64] of fonts) demo = demo.replaceAll(`url('../fonts/${name}')`, `url(data:font/woff2;base64,${b64})`);
await writeFile(path.join(dir, 'demo.html'), demo);

const errors = [];
const virtualConsole = new VirtualConsole();
virtualConsole.on('error', (...args) => errors.push(args.map(String).join(' ')));
virtualConsole.on('jsdomError', (e) => errors.push(String(e.stack ?? e)));

const dom = new JSDOM(page, {
  runScripts: 'dangerously',
  pretendToBeVisual: true,
  url: 'http://localhost/',
  virtualConsole,
  beforeParse(win) {
    class NoopObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
      takeRecords() {
        return [];
      }
    }
    class SeenObserver extends NoopObserver {
      constructor(callback) {
        super();
        this.callback = callback;
      }
      observe(target) {
        setTimeout(() => this.callback([{ isIntersecting: true, target }], this));
      }
    }
    win.IntersectionObserver = SeenObserver;
    win.Element.prototype.getBoundingClientRect = () => ({ top: 100, bottom: 500, left: 0, right: 800, width: 800, height: 400, x: 0, y: 100 });
    win.ResizeObserver = NoopObserver;
    win.matchMedia = (media) => ({ matches: false, media, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} });
    win.scrollTo = () => {};
    win.HTMLElement.prototype.scrollTo = () => {};
    win.CSS ??= {};
    win.CSS.escape ??= (s) => String(s).replace(/[^\w-]/g, (c) => `\\${c}`);
  },
});

await new Promise((resolve) => dom.window.addEventListener('load', resolve));
await new Promise((resolve) => setTimeout(resolve, 200));

const doc = dom.window.document;
const problems = [...errors];
const islands = Array.from(doc.querySelectorAll('ds-island'));
for (const el of islands) {
  const hydrated = '__k' in el;
  if (!hydrated) problems.push(`island ${el.dataset.c} did not hydrate`);
}
if (islands.length !== 4) problems.push(`expected 4 islands, found ${islands.length}`);
if (!doc.querySelector('[data-deck] nav, [data-deck] [role="navigation"], [data-deck] ol, [data-deck] ul')) problems.push('Deck rendered no navigation');
const marksShown = doc.querySelectorAll('[data-deck] [aria-label="Recorrido de la charla"] button').length;
const expected = 3 + 2 + 1;
if (marksShown !== expected) problems.push(`Deck side index shows ${marksShown} stops, expected ${expected}: it must see slides through <ds-slot> and <ds-island>`);

const counter = () => Array.from(doc.querySelectorAll('[data-steps] span[aria-hidden="true"]')).map((el) => el.textContent).find((t) => t.includes('€'));
const before = counter();
doc.dispatchEvent(new dom.window.KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
await new Promise((resolve) => setTimeout(resolve, 1700));
const after = counter();
if (before !== '0 €' || (after !== '1234 €' && after !== '1.234 €')) problems.push(`Count did not follow its Step: "${before}" before the arrow, "${after}" after`);
else console.log(`Count followed its Step across islands: "${before}" → "${after}"`);

const sizes = { css: css.length, js: js.reduce((sum, code) => sum + code.length, 0), html: page.length };
console.log(`pieces ${manifest.version}: ${islands.length} islands (${islands.map((el) => el.dataset.c).join(', ')})`);
console.log(`page: ${(sizes.html / 1024).toFixed(0)} KB (CSS ${(sizes.css / 1024).toFixed(0)} KB, JS ${(sizes.js / 1024).toFixed(0)} KB, font not inlined)`);
if (problems.length) {
  console.error(`\n${problems.length} problem(s):\n${problems.map((p) => `- ${p.slice(0, 600)}`).join('\n')}`);
  process.exit(1);
}
console.log('every island hydrated with no errors');
console.log(`open it: pieces/demo.html (${(demo.length / 1024).toFixed(0)} KB, offline)`);
dom.window.close();
