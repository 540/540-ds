import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium } from 'playwright';

const dir = path.resolve(process.argv[2] ?? path.join(import.meta.dirname, '..', 'pieces'));
const manifest = JSON.parse(await readFile(path.join(dir, 'manifest.json'), 'utf8'));
const load = (file) => import(pathToFileURL(path.join(dir, file)).href);
const text = (file) => readFile(path.join(dir, file), 'utf8');

const ISLANDS = Object.entries(manifest.components).filter(([, c]) => c.island).map(([name]) => name);
const used = [...new Set([...ISLANDS, 'Slide', 'Text', 'SectionHeader', 'Card', 'CaseItem', 'Metric', 'Grid', 'Stack'])];
const modules = Object.fromEntries(await Promise.all(used.map(async (name) => [name, await load(manifest.components[name].server)])));
const rt = await load(manifest.runtime.server);
const registry = rt.registryOf(...Object.values(modules));
const h = rt.createElement;
const get = (name) => registry.get(name);
const S = modules.Schema.schema;

// The stories' sample photos and logos, next to the page so it stays offline
const samples = path.join(import.meta.dirname, '..', 'src', 'assets', 'samples');
await mkdir(path.join(dir, 'samples', 'logos'), { recursive: true });
const sample = async (file) => (await copyFile(path.join(samples, file), path.join(dir, 'samples', file)), `samples/${file}`);

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
const island = (name, props) => mark(rt.renderIsland(registry, { name, props, id: id(), slots }));
const el = (name, p) => ({ $el: name, p });
const t = (children, props = {}) => h(get('Text'), props, children);
const header = (props) => h(get('SectionHeader'), { align: 'center', ...props });
const card = (ordinal, title, children) => h(get('Card'), { ordinal, title, align: 'center' }, children);
// Which component and story each stop shows, to compare it with Storybook
const label = (text) => t(text, { variant: 'body-s', tone: 'secondary', align: 'center', style: { marginBlockEnd: 'var(--space-xl)' } });
const slide = (slideId, story, ...children) => h(get('Slide'), { id: slideId }, label(story), ...children);
const grid = (columns, children, style = {}) => h('div', { style: { display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: 'var(--grid-gutter)', textAlign: 'start', ...style } }, ...children);

const [pintura, david, fachada] = await Promise.all(['charla-pintura.webp', 'charla-david.webp', 'charla-fachada.webp'].map(sample));
const logos = await Promise.all(Array.from({ length: 9 }, (_, i) => sample(`logos/cliente-${i + 1}.svg`)));
const NODES = ['Primero', 'Segundo', 'Tercero', 'Cuarto', 'Quinto'];
const chain = (y, kind) =>
  NODES.flatMap((name, i) => {
    const x = 300 + i * 420;
    return [
      el('rect', { className: S[kind], x, y, width: 300, height: 90, rx: 12 }),
      el('text', { className: S.nodeText, x: x + 150, y: y + 56, textAnchor: 'middle', children: name }),
      ...(i < NODES.length - 1 ? [el('path', { className: S.line, d: `M${x + 310},${y + 45} L${x + 410},${y + 45}`, markerEnd: 'url(#head)' })] : []),
    ];
  });
const ROWS = [
  { label: 'Primera categoría', value: 412 },
  { label: 'Segunda categoría', value: 268 },
  { label: 'Tercera categoría', value: 154 },
  { label: 'Cuarta categoría', value: 97 },
  { label: 'Quinta categoría', value: 61, tone: 'context' },
  { label: 'El resto', value: 38, tone: 'context' },
];
const DESTINOS = [
  { href: '#manifiesto', label: 'Manifiesto' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#formacion', label: 'Formación' },
  { href: '#servicios', label: 'Servicios', current: true },
  { href: '#equipo', label: 'Equipo' },
  { href: '#contacto', label: 'Contacto' },
];

const body = slot(
  h(
    'div',
    null,
    slide(
      'portada',
      'Deck · las 14 islas, cada una con el contenido de su story',
      t('Las 14 islas', { as: 'h1', variant: 'statement', align: 'center' }),
      t('Cada parada dice arriba qué componente y qué story enseña, para compararla con Storybook.', { variant: 'body-m', tone: 'secondary', align: 'center', style: { marginBlock: 'var(--space-xl)' } }),
      h('div', { style: { width: 375, marginInline: 'auto' } }, label('NavMobile · Barra'), island('NavMobile', { items: DESTINOS })),
    ),
    slide(
      'pasos',
      'Steps · Cuatro tarjetas (usa →)',
      island('Steps', {
        total: 4,
        children: [
          el('PanelStack', {
            children: [el('Step', { from: 0, to: 3, children: slot(header({ title: 'Título que presenta las tarjetas' })) }), el('Step', { from: 3, children: slot(header({ title: 'Otro título cuando ya están todas' })) })],
          }),
          el('div', {
            style: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--grid-gutter)', marginTop: 'var(--space-2xl)', textAlign: 'start' },
            children: [1, 2, 3, 4].map((k) => el('Step', { from: k, children: slot(card(`0${k}`, `Tarjeta ${k}`, `Aparece en el paso ${k}.`)) })),
          }),
          el('Step', {
            from: 4,
            children: slot(t('Y al final, una frase que cierra. La siguiente flecha ya pasa de parada.', { variant: 'body-l', tone: 'secondary', align: 'center', wrap: 'pretty', measure: 'half', style: { marginTop: 'var(--space-2xl)' } })),
          }),
        ],
      }),
    ),
    slide(
      'cifras',
      'Count · En una fila de datos',
      h(
        get('Stack'),
        { gap: 's' },
        h(
          get('Grid'),
          null,
          ...[
            { value: island('Count', { value: 1240 }), label: 'Lo que mide la primera cifra' },
            { value: island('Count', { value: 45.9, decimals: 1, suffix: ' %' }), label: 'Lo que mide la segunda', delta: '+6 puntos desde el inicio' },
            { value: island('Count', { value: 79592 }), label: 'Lo que mide la tercera' },
            { value: island('Count', { value: 312, prefix: '+' }), label: 'Lo que mide la cuarta' },
          ].map((m) => h(get('GridItem'), { span: 3 }, h(get('Metric'), m))),
        ),
        h(get('MetricNote'), null, 'De dónde salen las cifras: qué se midió, cuándo y cómo.'),
      ),
    ),
    slide(
      'casos',
      'Carousel · Puntos',
      island('Carousel', {
        label: 'Casos del portfolio',
        controls: 'dots',
        items: [
          [pintura, 'Primer caso', 'Una frase que cuenta de qué iba el caso.'],
          [david, 'Segundo caso', 'Una frase que cuenta de qué iba este otro.'],
          [fachada, 'Tercer caso', 'Una frase más, igual de corta.'],
          [pintura, 'Cuarto caso', 'Y una cuarta pieza para que la tira se pase.'],
        ].map(([src, title, description], i) => slot(h(get('CaseItem'), { src, title, description, href: `#caso-${i + 1}` }))),
      }),
    ),
    h('div', null, label('Statements · Tres tesis'), island('Statements', { id: 'tesis', sentences: ['La primera tesis de la charla.', 'La segunda tesis, en una línea.', 'La tercera tesis, que cierra.'] })),
    h(
      'div',
      null,
      label('Timeline · Cuatro pasos'),
      island('Timeline', {
        id: 'recorrido',
        title: 'Título de la cronología',
        description: 'Una entradilla corta que la presenta.',
        steps: [
          { title: 'Primer paso', body: 'Lo que pasó en el primer paso, en una o dos frases.' },
          { title: 'Segundo paso', body: 'Lo que pasó después, igual de corto.' },
          { title: 'Tercer paso', body: 'Un tercer hito, con su frase.' },
          { title: 'Cuarto paso', body: 'Y el último, que cierra la cronología.' },
        ],
      }),
    ),
    slide('barras', 'Bars · Ranking', island('Bars', { label: 'Personas por categoría', rows: ROWS })),
    slide(
      'reparto',
      'Share · Dos partes',
      island('Share', {
        label: 'Reparto del total',
        title: 'Reparto del total',
        segments: [
          { label: 'La parte que importa', value: 64 },
          { label: 'El resto', value: 36 },
        ],
      }),
    ),
    slide(
      'foco',
      'Spotlight · Una pila de frases',
      h(
        'div',
        { style: { display: 'grid', gap: '40svh', paddingBlock: '20svh', justifyItems: 'center' } },
        ...['Primera frase de la pila.', 'Segunda frase de la pila.', 'Tercera frase de la pila.', 'Cuarta frase de la pila.'].map((f) =>
          island('Spotlight', { children: slot(t(f, { variant: 'statement', align: 'center', wrap: 'balance', measure: 'wide' })) }),
        ),
      ),
    ),
    slide(
      'esquema',
      'Schema · Entero',
      header({ title: 'Un esquema' }),
      h(
        modules.Schema.SchemaFrame,
        { caption: 'Un pie que explica el dibujo, a media rejilla.' },
        island('Schema', {
          viewBox: '0 0 2560 820',
          title: 'Dos cadenas de cinco pasos',
          description: 'Una cadena arriba, con el primer y el último paso destacados; una nota discontinua une el segundo paso con la cadena de abajo.',
          data: true,
          children: [
            el('defs', {
              children: el('marker', { id: 'head', viewBox: '0 0 12 12', refX: 10, refY: 6, markerWidth: 12, markerHeight: 12, orient: 'auto', children: el('path', { className: S.arrowhead, d: 'M2 2 L10 6 L2 10.5' }) }),
            }),
            el('SchemaLayer', {
              step: 0,
              label: 'Antes: una cadena de cinco pasos',
              children: [
                el('text', { className: S.title, x: 300, y: 200, children: 'Antes' }),
                ...chain(240, 'node'),
                ...NODES.map((_, i) => el('text', { className: S.label, x: 450 + i * 420, y: 380, textAnchor: 'middle', children: 'etiqueta' })),
              ],
            }),
            el('SchemaLayer', {
              step: 1,
              label: 'Una nota que explica el cambio',
              children: [el('path', { className: S.lineDashed, d: 'M870,400 L870,560', markerEnd: 'url(#head)' }), el('text', { className: S.noteText, x: 910, y: 490, children: 'Una nota que explica el cambio.' })],
            }),
            el('SchemaLayer', {
              step: 2,
              label: 'Ahora: la misma cadena, con dos pasos destacados',
              children: [
                el('text', { className: S.title, x: 300, y: 600, children: 'Ahora' }),
                ...chain(640, 'highlighted'),
                el('rect', { className: S.pill, x: 1900, y: 560, width: 220, height: 50, rx: 25 }),
                el('text', { className: S.pillText, x: 2010, y: 594, textAnchor: 'middle', children: 'píldora' }),
              ],
            }),
          ],
        }),
      ),
    ),
    slide('clientes', 'LogoCarousel · Tira', island('LogoCarousel', { label: 'Clientes', logos: logos.map((src, i) => ({ src, name: `Cliente ${i + 1}` })) })),
    slide('cinta', 'Marquee · Tira', island('Marquee', { items: ['uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez'].map((w) => `Palabra ${w} ·`) })),
    slide(
      'hoja',
      'Sheet · En un paso (usa →)',
      island('Steps', {
        total: 2,
        children: [
          slot(header({ title: 'Una parada que se recorre', description: 'Paso 0: la cabecera. Paso 1: la hoja. Paso 2: la hoja se cierra.' })),
          el('Step', {
            from: 1,
            to: 2,
            children: el('Sheet', {
              kicker: 'Zoom · antetítulo',
              title: 'Título de la hoja',
              description: 'Una frase que dice qué se amplía aquí.',
              children: slot(grid(3, [1, 2, 3].map((k) => card(`0${k}`, `Detalle ${k}`, 'Dos o tres frases sobre este detalle ampliado.')))),
            }),
          }),
        ],
      }),
    ),
  ),
);
slots[body.$slot] = slots[body.$slot].replace(/^<div>|<\/div>$/g, '');
const deck = rt.renderIsland(registry, {
  name: 'Deck',
  props: {
    items: [
      { href: '#pasos', label: 'Pasos' },
      { href: '#barras', label: 'Datos' },
      { href: '#esquema', label: 'Esquema' },
      { href: '#hoja', label: 'Hoja' },
    ],
    footer: { tagline: 'Una línea que resume de qué iba la charla.', copyright: '© 2026 540' },
    storageKey: '',
    children: body,
  },
  id: id(),
  slots,
});

const cssFiles = [manifest.base.css, ...new Set(used.flatMap((name) => manifest.components[name].css))];
const css = (await Promise.all(cssFiles.map(text))).join('\n');
const js = await Promise.all([manifest.runtime.client, ...ISLANDS.map((name) => manifest.components[name].island)].map(text));
let page = `<!doctype html><html lang="es" data-theme="light"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>540-ds islands</title><style>${css}</style></head><body>${deck}${js.map((code) => `<script>${code}</script>`).join('')}</body></html>`;
for (const file of manifest.base.fonts) page = page.replaceAll(`url('../fonts/${path.basename(file)}')`, `url(data:font/woff2;base64,${(await readFile(path.join(dir, file))).toString('base64')})`);
const out = path.join(dir, 'islands.html');
await writeFile(out, page);

const browser = await chromium.launch();
const tab = await browser.newPage({ viewport: { width: 1280, height: 800 } });
const errors = [];
tab.on('console', (msg) => msg.type() === 'error' && errors.push(msg.text()));
tab.on('pageerror', (error) => errors.push(String(error)));
await tab.route(/^(?!file:|data:)/, (route) => (errors.push(`network request: ${route.request().url()}`), route.abort()));

const problems = [];
// Each check on a fresh page, so one check's keys and scroll never leak into the next
const check = async (name, run) => {
  try {
    await tab.goto(pathToFileURL(out).href);
    await tab.waitForTimeout(300);
    const failure = await run();
    if (failure) problems.push(`${name}: ${failure}`);
    else console.log(`ok  ${name}`);
  } catch (error) {
    problems.push(`${name}: ${error.message.split('\n')[0]}`);
  }
};
// An island is display: contents and has no box of its own: scroll its first element
const center = (selector) =>
  tab.evaluate((s) => {
    const el = document.querySelector(s);
    const box = el.localName === 'ds-island' ? el.firstElementChild : el;
    box.scrollIntoView({ block: 'center', behavior: 'instant' });
  }, selector);
const island$ = (name) => `ds-island[data-c="${name}"]`;

await check('every island hydrated', async () => {
  const state = await tab.$$eval('ds-island', (els) => els.map((el) => [el.dataset.c, '__k' in el || Object.keys(el).some((k) => k.startsWith('__reactContainer'))]));
  const missing = state.filter(([, ok]) => !ok).map(([c]) => c);
  const nested = ['Sheet'];
  const absent = ISLANDS.filter((name) => !nested.includes(name) && !state.some(([c]) => c === name));
  return missing.length ? `not hydrated: ${missing.join(', ')}` : absent.length ? `no island for ${absent.join(', ')}` : null;
});

await check('Deck walks the stops with the keyboard', async () => {
  await center('#portada');
  await tab.waitForTimeout(500);
  await tab.keyboard.press('ArrowDown');
  await tab.waitForTimeout(900);
  // With more than 20 stops the index groups them in sections, so look at the stop itself
  const at = await tab.evaluate(() => document.elementFromPoint(innerWidth / 2, innerHeight / 2)?.closest('section[id]')?.id ?? null);
  return at === 'pasos' ? null : `the arrow from the cover reached "${at}" instead of "pasos"`;
});

await check('Deck stops on each thesis and each timeline step', async () => {
  await center('#casos');
  await tab.waitForTimeout(500);
  const seen = [];
  for (let i = 0; i < 9; i++) {
    await tab.keyboard.press('ArrowDown');
    await tab.waitForTimeout(700);
    seen.push(
      await tab.evaluate(() => {
        const hit = document.elementFromPoint(innerWidth / 2, innerHeight / 2)?.closest('[data-stop]');
        return hit ? `${hit.closest('[id]').id}:${Array.from(hit.parentElement.querySelectorAll(':scope > [data-stop]')).indexOf(hit)}` : null;
      }),
    );
  }
  const wanted = ['tesis:0', 'tesis:1', 'tesis:2', 'recorrido:0', 'recorrido:1', 'recorrido:2', 'recorrido:3'];
  return wanted.every((stop) => seen.includes(stop)) ? null : `stops seen: ${seen.join(', ')}`;
});

await check('Deck stops on each sentence of the Spotlight pile', async () => {
  await center('#reparto');
  await tab.waitForTimeout(500);
  const lit = [];
  for (let i = 0; i < 4; i++) {
    await tab.keyboard.press('ArrowDown');
    await tab.waitForTimeout(900);
    lit.push(await tab.evaluate(() => Array.from(document.querySelectorAll('#foco [data-stop]')).findIndex((s) => s.matches('[data-on]') && s.getBoundingClientRect().top < innerHeight / 2 && s.getBoundingClientRect().bottom > innerHeight / 2)));
  }
  return lit.join() === '0,1,2,3' ? null : `sentence in the center after each arrow: ${lit.join(', ')}`;
});

await check('Steps shows a card on each arrow', async () => {
  await center('#pasos');
  await tab.waitForTimeout(300);
  const on = () => tab.$$eval('#pasos [data-on]', (els) => els.length);
  const before = await on();
  await tab.keyboard.press('ArrowRight');
  await tab.waitForTimeout(500);
  await tab.keyboard.press('ArrowRight');
  await tab.waitForTimeout(500);
  const after = await on();
  return after === before + 2 ? null : `${before} → ${after} steps on`;
});

await check('Count climbs to its value when it comes into view', async () => {
  const counts = () => tab.$$eval('#cifras span[aria-hidden="true"]', (els) => els.map((el) => el.textContent));
  const before = await counts();
  await center('#cifras');
  await tab.waitForTimeout(2000);
  const after = await counts();
  return before.includes('0') && after.some((t) => /^79\.?592$/.test(t)) ? null : `${JSON.stringify(before)} → ${JSON.stringify(after)}`;
});

await check('Carousel moves to the next case', async () => {
  await center('#casos');
  const current = () => tab.$eval(`${island$('Carousel')} [aria-current="true"]`, (el) => el.getAttribute('aria-label'));
  const before = await current();
  await tab.$eval(`${island$('Carousel')} [role="group"] button:nth-child(2)`, (el) => el.click());
  await tab.waitForTimeout(800);
  const after = await current();
  return after !== before ? null : `still on "${after}"`;
});

for (const [name, selector] of [
  ['Statements', '#tesis [data-stop]'],
  ['Timeline', '#recorrido [data-stop]'],
]) {
  await check(`${name} lights the stop in the center`, async () => {
    await center(selector);
    await tab.waitForTimeout(500);
    const state = await tab.$eval(selector, (el) => el.dataset.state);
    return state && state !== 'next' ? null : `data-state="${state}"`;
  });
}

for (const name of ['Bars', 'Share']) {
  await check(`${name} grows when it comes into view`, async () => {
    await center(island$(name));
    await tab.waitForTimeout(800);
    const widths = await tab.$$eval(`${island$(name)} span[style]`, (els) => els.map((el) => el.style.inlineSize).filter(Boolean));
    return widths.some((w) => w !== '0px' && w !== '0') ? null : `widths ${JSON.stringify(widths)}`;
  });
}

await check('Spotlight lights in the center', async () => {
  await center(island$('Spotlight'));
  await tab.waitForTimeout(300);
  return (await tab.$eval(`${island$('Spotlight')} > div`, (el) => el.hasAttribute('data-on'))) ? null : 'no data-on';
});

await check('Schema keeps its accessible SVG', async () => {
  const label = await tab.$eval(`${island$('Schema')} svg`, (el) => el.querySelector('title')?.textContent ?? el.getAttribute('aria-label'));
  return label === 'Dos cadenas de cinco pasos' ? null : `title "${label}"`;
});

await check('LogoCarousel advances on its interval', async () => {
  await center(island$('LogoCarousel'));
  const pos = () => tab.$eval(`${island$('LogoCarousel')} [data-pos]`, (el) => el.dataset.pos);
  const before = await pos();
  await tab.waitForTimeout(3000);
  const after = await pos();
  return after !== before ? null : `data-pos stayed ${after}`;
});

await check('Marquee repeats its items', async () => {
  const copies = await tab.$$eval(`${island$('Marquee')} [aria-hidden="true"]`, (els) => els.length);
  return copies > 0 ? null : 'no copies';
});

await check('Sheet opens on the arrow and closes on the next', async () => {
  await center('#hoja');
  await tab.waitForTimeout(500);
  const open = () => tab.$$eval('#hoja [data-scale][data-open]', (els) => els.length > 0);
  const states = [await open()];
  for (let i = 0; i < 2; i++) {
    await tab.keyboard.press('ArrowRight');
    await tab.waitForTimeout(600);
    states.push(await open());
  }
  if (states.join() !== 'false,true,false') return `open: ${states.join(' → ')}`;
  // Closed, it waits below the window, not stuck to its Step halfway up the screen
  await tab.waitForTimeout(600);
  const top = await tab.$eval('#hoja [data-sheet]', (el) => [Math.round(el.getBoundingClientRect().top), innerHeight]);
  return top[0] >= top[1] ? null : `closed, the sheet sits at ${top[0]} px of a ${top[1]} px window`;
});

await check('NavMobile opens its menu', async () => {
  await tab.$eval(`${island$('NavMobile')} button[aria-expanded]`, (el) => el.click());
  await tab.waitForTimeout(200);
  const open = await tab.$eval(`${island$('NavMobile')}`, (el) => [el.querySelector('button[aria-expanded]').getAttribute('aria-expanded'), el.querySelector('dialog').open]);
  return open[0] === 'true' && open[1] ? null : `aria-expanded=${open[0]}, dialog open=${open[1]}`;
});

await check('with reduced motion, Bars shows its final widths after hydrating', async () => {
  await tab.emulateMedia({ reducedMotion: 'reduce' });
  await tab.reload();
  await tab.waitForTimeout(300);
  const widths = await tab.$$eval(`${island$('Bars')} span[style]`, (els) => els.map((el) => el.style.inlineSize));
  await tab.emulateMedia({ reducedMotion: null });
  return widths.length && widths.every((w) => w.endsWith('%') && w !== '0%') ? null : `widths ${JSON.stringify(widths)}`;
});

const bytes = { runtime: (await text(manifest.runtime.client)).length, islands: js.slice(1).reduce((sum, code) => sum + code.length, 0), page: page.length };
await browser.close();
problems.push(...errors);
console.log(`\nChromium, ${ISLANDS.length} islands on ${manifest.preact ? `Preact ${manifest.preact}` : `React ${manifest.react}`}: runtime ${(bytes.runtime / 1024).toFixed(0)} KB, all 14 islands ${(bytes.islands / 1024).toFixed(0)} KB, page ${(bytes.page / 1024).toFixed(0)} KB with the font (photos apart, in pieces/samples)`);
if (problems.length) {
  console.error(`\n${problems.length} problem(s):\n${problems.map((p) => `- ${p.slice(0, 600)}`).join('\n')}`);
  process.exit(1);
}
console.log(`no errors; open it: pieces/islands.html`);
