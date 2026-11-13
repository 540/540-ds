import { readFileSync } from 'node:fs';
import path from 'node:path';
import { JSDOM, VirtualConsole } from 'jsdom';
import { describe, expect, it } from 'vitest';
import { TagError, renderTalk } from '../scripts/render/index.mjs';

const root = path.resolve(import.meta.dirname, '..');
const pieces = path.join(root, 'pieces');
const baseDir = path.join(root, 'src/assets/samples');
const render = (source: string) => renderTalk(source, { pieces, baseDir, origin: 'test' });
const kb = (html: string) => `${(Buffer.byteLength(html) / 1024).toFixed(0)} KB`;

const STATIC_TALK = `
<title>Solo piezas estáticas</title>
<rev-block-title id="bloque-1" ordinal="01" title="Lo que <strong>medimos</strong>" photo='{"src":"charla-fachada.webp","alt":"Fachada de hormigón"}'></rev-block-title>
<rev-slide id="cifras">
  <rev-section-header title="Tres cifras" description="Lo que cambió en un año."></rev-section-header>
  <rev-grid>
    <rev-grid-item span="6"><rev-metric value="20 %" label="Menos tiempo"></rev-metric></rev-grid-item>
    <rev-grid-item span="6">
      <rev-card title="Una tarjeta">
        <rev-text measure="half">Con <strong>negrita</strong> y <code>código</code>.</rev-text>
      </rev-card>
    </rev-grid-item>
  </rev-grid>
  <rev-simple-list items='["Uno", "Dos con <em>énfasis</em>"]'></rev-simple-list>
</rev-slide>`;

const DECK_TALK = `
<title>Charla con Deck</title>
<rev-deck items='[{"href":"#bloque-1","label":"Bloque"}]' footer='{"tagline":"Hacemos <strong>software</strong>.","copyright":"© 2026 540"}' storage-key="">
  <rev-cover title='["Una charla","de prueba"]' event="Open space · marzo 2026" photo='{"src":"charla-pintura.webp","alt":"Pintura"}'></rev-cover>
  <rev-block-title id="bloque-1" ordinal="01" title="El bloque" photo='{"src":"charla-fachada.webp","alt":"Fachada"}'></rev-block-title>
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
</rev-deck>`;

async function problems(source: string): Promise<string> {
  try {
    await render(source);
  } catch (error) {
    if (error instanceof TagError) return error.message;
    throw error;
  }
  throw new Error('expected the document to be rejected');
}

async function open(html: string) {
  const errors: string[] = [];
  const virtualConsole = new VirtualConsole();
  virtualConsole.on('error', (...args: unknown[]) => errors.push(args.map(String).join(' ')));
  virtualConsole.on('warn', (...args: unknown[]) => errors.push(args.map(String).join(' ')));
  virtualConsole.on('jsdomError', (e: Error) => errors.push(String(e.stack ?? e)));
  const dom = new JSDOM(html, {
    runScripts: 'dangerously',
    pretendToBeVisual: true,
    url: 'http://localhost/',
    virtualConsole,
    beforeParse(win) {
      class NoopObserver {
        observe(_target?: Element) {}
        unobserve() {}
        disconnect() {}
        takeRecords() {
          return [];
        }
      }
      class SeenObserver extends NoopObserver {
        callback: (entries: unknown[], observer: unknown) => void;
        constructor(callback: (entries: unknown[], observer: unknown) => void) {
          super();
          this.callback = callback;
        }
        observe(target: Element) {
          setTimeout(() => this.callback([{ isIntersecting: true, target }], this));
        }
      }
      const w = win as unknown as Record<string, unknown>;
      w.IntersectionObserver = SeenObserver;
      w.ResizeObserver = NoopObserver;
      w.matchMedia = (media: string) => ({ matches: false, media, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} });
      w.scrollTo = () => {};
      w.CSS = { escape: (s: string) => s.replace(/[^\w-]/g, (c) => `\\${c}`), supports: () => false };
      win.HTMLElement.prototype.scrollTo = () => {};
      win.Element.prototype.getBoundingClientRect = () => ({ top: 100, bottom: 500, left: 0, right: 800, width: 800, height: 400, x: 0, y: 100, toJSON() {} });
    },
  });
  await new Promise((resolve) => dom.window.addEventListener('load', resolve));
  await new Promise((resolve) => setTimeout(resolve, 200));
  return { dom, errors };
}

describe('renderTalk', () => {
  it('renders a talk with only static components as HTML and CSS, with no JS', async () => {
    const { html, version, islands, scripts } = await render(STATIC_TALK);
    console.log(`static talk: ${kb(html)}`);
    expect(scripts).toBe(false);
    expect(islands).toEqual([]);
    expect(html).not.toMatch(/<script/i);
    expect(html).not.toContain('<ds-island');
    expect(html).toContain(`<meta name="540-ds-version" content="${version}">`);
    expect(html).toContain('<title>Solo piezas estáticas</title>');
    expect(html).toMatch(/<h2[^>]*>Lo que <strong>medimos<\/strong><\/h2>/);
    expect(html).toContain('<li');
    expect(html).toContain('<em>énfasis</em>');
    expect(html).toMatch(/<img[^>]+src="data:image\/webp;base64,/);
    expect(html).toContain('url(data:font/woff2;base64,');
    expect(html).not.toMatch(/\.Deck_/);
  });

  it('renders a talk with a Deck that hydrates every island with no errors', async () => {
    const { html, islands, scripts, warnings } = await render(DECK_TALK);
    console.log(`deck talk: ${kb(html)}`);
    expect(scripts).toBe(true);
    expect(warnings).toEqual([]);
    expect(islands).toEqual(['Deck', 'Statements', 'Steps']);
    expect(html.match(/<script>/g)).toHaveLength(6);

    const { dom, errors } = await open(html);
    const doc = dom.window.document;
    const found = Array.from(doc.querySelectorAll<HTMLElement>('ds-island'));
    expect(errors).toEqual([]);
    expect(found.map((el) => el.dataset.c)).toEqual(['Deck', 'Steps', 'Statements']);
    for (const el of found) expect('__k' in el).toBe(true);
    expect(doc.querySelector('[data-deck] svg rect')?.getAttribute('class')).toMatch(/^Schema_node_/);

    const counter = () => Array.from(doc.querySelectorAll('[data-steps] span[aria-hidden="true"]')).map((el) => el.textContent ?? '').find((t) => t.includes('€'));
    expect(counter()).toBe('0 €');
    doc.dispatchEvent(new dom.window.KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    await new Promise((resolve) => setTimeout(resolve, 1700));
    expect(counter()).toMatch(/^1\.?234 €$/);
    dom.window.close();
  });

  it('puts what follows the steps inside the Steps island and the rest in slots', async () => {
    const { html } = await render(DECK_TALK);
    const props = JSON.parse(html.match(/<ds-island data-c="Steps"[^>]*data-p="([^"]*)"/)![1].replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&amp;/g, '&'));
    expect(props.children[0]).toEqual({ $el: 'Step', p: { from: 0, children: { $slot: expect.any(String) } } });
    expect(props.children[1]).toEqual({ $el: 'Step', p: { from: 1, children: { $el: 'Count', p: { value: 1234, suffix: ' €' } } } });
    expect(JSON.stringify(props.children[2])).toContain('{"$el":"rect"');
  });

  it('warns when a static wrapper cuts a piece off its steps', async () => {
    const { warnings } = await render('<rev-steps total="1"><rev-step><rev-stack><rev-count value="1"></rev-count></rev-stack></rev-step></rev-steps>');
    expect(warnings).toHaveLength(1);
    expect(warnings[0]).toContain('<rev-stack>');
  });

  it('fails loudly on unknown tags, props and values, listing every problem', async () => {
    const message = await problems(`
      <rev-slyde id="x"></rev-slyde>
      <rev-slide id="y" tone="loud" storageKey="a" class="c">
        <div>hola</div>
        <rev-text style="color: red">x</rev-text>
        <rev-cover title='["a"]' photo='{"src":"charla-pintura.webp","alt":"a","extra":1}'></rev-cover>
        <rev-dialog open title="x">y</rev-dialog>
        <rev-count></rev-count>
        <rev-grid-item span="13">x</rev-grid-item>
        <rev-bars label="b" rows='{"label":"x"}'></rev-bars>
        <rev-logo>texto</rev-logo>
      </rev-slide>`);
    expect(message).toContain('12 problems');
    expect(message).toContain('unknown tag <rev-slyde> (did you mean <rev-slide>?)');
    expect(message).toContain('tone is one of default, raised, not "loud"');
    expect(message).toContain('has no attribute "storageKey"');
    expect(message).toContain('has no attribute "class"');
    expect(message).toContain('<div> is not allowed');
    expect(message).toContain('<rev-text> has no attribute "style"');
    expect(message).toContain('photo has no field "extra"');
    expect(message).toContain('<rev-dialog> cannot be used from a tag');
    expect(message).toContain('<rev-count> needs "value"');
    expect(message).toContain('span is one of 1, 2, 3');
    expect(message).toContain('rows is a list');
    expect(message).toContain('<rev-logo> takes no content');
    expect(message).not.toContain('needs "rows"');
  });

  it('rejects what would not work offline', async () => {
    expect(await problems(`<rev-image src="https://example.com/a.webp" alt="a"></rev-image>`)).toContain('remote image');
    expect(await problems(`<rev-image src="no-such-photo.webp" alt="a"></rev-image>`)).toContain('image not found');
  });

  it('rejects drawing outside the Schema vocabulary', async () => {
    const message = await problems(`<rev-schema view-box="0 0 10 10" title="t"><rect class="node red" fill="#fef401"/><rev-text>x</rev-text></rev-schema>`);
    expect(message).toContain('unknown Schema class "red"');
    expect(message).toContain('takes no "fill"');
    expect(message).toContain('<rev-text> cannot go inside a Schema drawing');
  });

  it('gives every component export a tag in the manifest', () => {
    const manifest = JSON.parse(readFileSync(path.join(pieces, 'manifest.json'), 'utf8'));
    const tags = Object.values(manifest.tags as Record<string, { export: string }>).map((t) => t.export).sort();
    const exports = Object.values(manifest.components as Record<string, { exports: string[] }>).flatMap((c) => c.exports).sort();
    expect(tags).toEqual(exports);
    expect(manifest.tags['rev-grid-item']).toMatchObject({ export: 'GridItem', component: 'Grid', props: { span: { required: false } } });
  });
});
