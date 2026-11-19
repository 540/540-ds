// Opens talks written for the browser runtime in Chromium and checks that the runtime paints exactly what the
// Node renderer writes for the same file, that islands hydrate with no errors, and that a talk with problems
// shows them in the panel. Serves pieces/ over HTTP, as the CDN would.
import { readFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import path from 'node:path';
import { chromium } from 'playwright';
import { renderTalk } from './render/index.mjs';

const root = path.resolve(import.meta.dirname, '..');
const pieces = path.resolve(process.argv[2] ?? path.join(root, 'pieces'));
const samples = path.join(root, 'src/assets/samples');
const TYPES = { '.js': 'text/javascript', '.json': 'application/json', '.html': 'text/html', '.css': 'text/css', '.woff2': 'font/woff2' };

const photo = async (file) => `data:image/webp;base64,${(await readFile(path.join(samples, file))).toString('base64')}`;
const [pintura, fachada] = await Promise.all(['charla-pintura.webp', 'charla-fachada.webp'].map(photo));

const page = (tags, lang = 'es') => `<script type="module" src="/pieces/runtime/runtime.js"></script>
<script type="text/rev" data-lang="${lang}">
${tags}
</script>
`;

const TALKS = {
  deck: page(`<title>Charla con Deck</title>
<rev-deck items='[{"href":"#bloque-1","label":"Bloque"}]' footer='{"tagline":"Hacemos <strong>software</strong>.","copyright":"© 2026 540"}' storage-key="">
  <rev-cover title='["Una charla","de prueba"]' event="Open space · marzo 2026" photo='{"src":"${pintura}","alt":"Pintura"}'></rev-cover>
  <rev-block-title id="bloque-1" ordinal="01" title="El bloque" photo='{"src":"${fachada}","alt":"Fachada"}'></rev-block-title>
  <rev-slide id="pasos">
    <rev-steps total="2">
      <rev-step from="0"><rev-text variant="title-m">Primero</rev-text></rev-step>
      <rev-step from="1"><rev-count value="1234" suffix=" €"></rev-count></rev-step>
      <rev-step from="2">
        <rev-schema-frame caption="Un esquema">
          <rev-schema view-box="0 0 1200 300" title="Flujo" guided>
            <rev-schema-layer step="2" label="Caja">
              <rect class="node" x="10" y="10" width="300" height="90" rx="12"/>
              <text class="nodeText" x="160" y="66" text-anchor="middle">Caja</text>
            </rev-schema-layer>
          </rev-schema>
        </rev-schema-frame>
      </rev-step>
    </rev-steps>
  </rev-slide>
  <rev-slide id="tesis" tone="raised">
    <rev-statements>
      <template slot="sentences">Una idea.</template>
      <template slot="sentences">Otra <strong>idea</strong>.</template>
    </rev-statements>
  </rev-slide>
  <rev-closing sentence="Cerramos <strong>aquí</strong>." punchline="Fin."></rev-closing>
</rev-deck>`),
  static: page(`<title>Solo piezas estáticas</title>
<rev-slide id="cifras">
  <rev-section-header title="Tres cifras" description="Lo que cambió en un año."></rev-section-header>
  <rev-grid>
    <rev-grid-item span="6"><rev-metric value="20 %" label="Menos tiempo"></rev-metric></rev-grid-item>
    <rev-grid-item span="6"><rev-card title="Una tarjeta"><rev-text measure="half">Con <strong>negrita</strong>.</rev-text></rev-card></rev-grid-item>
  </rev-grid>
</rev-slide>`, 'en'),
  broken: page(`<rev-slide id="x">
  <rev-metirc value="1"></rev-metirc>
  <rev-text tone="yellow">Hola</rev-text>
  <rev-block-title ordinal="01" title="Sin foto" photo='{"src":"fachada.webp","alt":"Fachada"}'></rev-block-title>
</rev-slide>`),
};

const server = createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  try {
    if (url.pathname.startsWith('/talk/')) {
      res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' }).end(TALKS[url.pathname.slice(6)]);
      return;
    }
    if (!url.pathname.startsWith('/pieces/')) throw new Error('not found');
    const file = path.join(pieces, decodeURIComponent(url.pathname.slice(8)));
    if (!file.startsWith(pieces)) throw new Error('outside');
    const ext = path.extname(file);
    res.writeHead(200, { 'content-type': Object.hasOwn(TYPES, ext) ? TYPES[ext] : 'application/octet-stream', 'access-control-allow-origin': '*' }).end(await readFile(file));
  } catch {
    res.writeHead(404).end();
  }
});
await new Promise((resolve) => server.listen(0, resolve));
const origin = `http://localhost:${server.address().port}`;

const browser = await chromium.launch();
const failures = [];
const check = (ok, message) => ok || failures.push(message);

async function open(load) {
  const tab = await browser.newPage();
  const errors = [];
  tab.on('console', (m) => ['error', 'warning'].includes(m.type()) && errors.push(m.text()));
  tab.on('pageerror', (e) => errors.push(String(e)));
  tab.on('requestfailed', (r) => errors.push(`request failed: ${r.url()}`));
  await load(tab);
  await tab.waitForLoadState('networkidle');
  await tab.waitForTimeout(300);
  return { tab, errors };
}

// What the page shows, without the scripts the Node renderer inlines
const snapshot = (tab) =>
  tab.evaluate(() => {
    const body = document.body.cloneNode(true);
    body.querySelectorAll('script, ds-problems').forEach((n) => n.remove());
    return { body: body.innerHTML.trim(), title: document.title, lang: document.documentElement.lang, fonts: [...document.fonts].filter((f) => f.status === 'loaded').map((f) => f.family), islands: [...document.querySelectorAll('ds-island')].map((el) => [el.dataset.c, Boolean(el.__ds540)]) };
  });

for (const name of ['deck', 'static']) {
  const runtime = await open((tab) => tab.goto(`${origin}/talk/${name}`));
  const rendered = await renderTalk(TALKS[name], { pieces, origin: name });
  const node = await open((tab) => tab.setContent(rendered.html));
  const [a, b] = await Promise.all([snapshot(runtime.tab), snapshot(node.tab)]);
  check(!runtime.errors.length, `${name}: runtime console: ${runtime.errors.join(' | ')}`);
  check(!node.errors.length, `${name}: rendered console: ${node.errors.join(' | ')}`);
  check(a.body === b.body, `${name}: the runtime paints a different body than the renderer`);
  check(a.title === b.title && a.lang === b.lang, `${name}: title/lang differ: ${JSON.stringify([a.title, a.lang])} vs ${JSON.stringify([b.title, b.lang])}`);
  check(a.islands.every(([, ok]) => ok), `${name}: islands not hydrated: ${a.islands.filter(([, ok]) => !ok).map(([c]) => c).join(', ')}`);
  check(a.fonts.includes('DM Sans') || !a.body.trim(), `${name}: DM Sans did not load`);
  if (a.body !== b.body) {
    let at = 0;
    while (at < a.body.length && a.body[at] === b.body[at]) at++;
    console.error(`  lengths: runtime ${a.body.length}, rendered ${b.body.length}`);
    console.error(`  first difference at ${at}:\n  runtime:  …${a.body.slice(at - 80, at + 80)}\n  rendered: …${b.body.slice(at - 80, at + 80)}`);
  }
  console.log(`${name}: ${a.islands.length} islands, ${(a.body.length / 1024).toFixed(0)} KB of body`);
}

// The arrow keys walk the deck forward to the end (the Statements sit inside a raised Slide, as the rules ask)
{
  const { tab } = await open((t) => t.goto(`${origin}/talk/deck`));
  await tab.emulateMedia({ reducedMotion: 'reduce' });
  const ys = [await tab.evaluate(() => scrollY)];
  for (let i = 0; i < 12; i++) {
    await tab.keyboard.press('ArrowDown');
    await tab.waitForTimeout(100);
    ys.push(await tab.evaluate(() => Math.round(scrollY)));
  }
  const max = await tab.evaluate(() => document.documentElement.scrollHeight - innerHeight);
  check(ys.every((y, i) => i === 0 || y >= ys[i - 1]), `deck: the arrow keys go back: ${ys.join(' → ')}`);
  check(ys.at(-1) >= max - 1, `deck: the arrow keys do not reach the end (${ys.at(-1)} of ${max})`);
  console.log(`deck: arrows ${ys.join(' → ')}`);
}

const broken = await open((tab) => tab.goto(`${origin}/talk/broken`));
const panel = await broken.tab.evaluate(() => [...(document.querySelector('ds-problems')?.shadowRoot?.querySelectorAll('li') ?? [])].map((li) => li.textContent));
check(panel.length === 4, `broken: expected 4 problems in the panel, got ${panel.length}: ${panel.join(' | ')}`);
check(panel.some((p) => p.includes('did you mean <rev-metric>')), 'broken: no suggestion for <rev-metirc>');
check(panel.some((p) => p.includes('data:image')), 'broken: no hint to embed the photo');
check(panel[0]?.startsWith('charla 3:'), `broken: lines should count from the block (got "${panel[0]}")`);
console.log(`broken: panel with ${panel.length} problems`);

await browser.close();
server.close();
if (failures.length) {
  console.error(`\n${failures.length} check(s) failed:\n${failures.map((f) => `- ${f}`).join('\n')}`);
  process.exit(1);
}
console.log('runtime: OK');
