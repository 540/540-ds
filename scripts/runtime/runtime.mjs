// The browser runtime: renders a talk written as <rev-…> tags inside <script type="text/rev"> when the page
// opens, with the same checks and the same output as the Node renderer (render/core.mjs). Built into
// pieces/runtime/runtime.js; everything else it needs (manifest, components, styles, islands) is a module next
// to it, loaded only for the pieces the talk uses.
import { TagError, prepareTalk, renderBody } from '../render/core.mjs';
import { showProblems } from './panel.mjs';

const BLOCK = 'script[type="text/rev"]';
const pieces = new URL('../', import.meta.url);
const load = (file) => import(new URL(file, pieces).href);
const styleModule = (file) => `runtime/${file.replace(/\.css$/, '.js')}`;

async function boot() {
  const blocks = document.querySelectorAll(BLOCK);
  if (blocks.length !== 1) {
    showProblems({ title: 'La charla no se puede pintar', problems: [blocks.length ? `Hay ${blocks.length} bloques <script type="text/rev">; va uno por página.` : 'No hay ningún bloque <script type="text/rev"> con la charla.'] });
    return;
  }
  const block = blocks[0];
  const origin = 'charla';
  try {
    const { default: manifest } = await load('runtime/manifest.js');
    const talk = prepareTalk(block.textContent, { manifest, origin, image: rejectPath });
    const page = await renderBody(talk.nodes, { manifest, warnings: talk.warnings, load });
    const [css, scripts] = await Promise.all([
      Promise.all(page.css.map((file) => load(styleModule(file)).then((m) => m.default))),
      // The client runtime first: the islands register through the global it defines
      page.scripts.length ? load(page.scripts[0]).then(() => Promise.all(page.scripts.slice(1).map(load))) : null,
    ]);
    mount({ manifest, title: talk.title, lang: block.dataset.lang || document.documentElement.lang || 'es', css: css.join('\n'), body: page.body, block });
    if (scripts) globalThis.__ds540.hydrate();
    if (talk.warnings.length) showProblems({ title: 'La charla se pinta, con avisos', problems: talk.warnings, tone: 'warning' });
  } catch (error) {
    if (error instanceof TagError) {
      const [summary, ...lines] = error.message.split('\n');
      showProblems({ title: 'La charla tiene errores', summary, problems: lines.map((l) => l.replace(/^- /, '')), hint: 'Las líneas cuentan desde la etiqueta <script type="text/rev">.' });
    } else {
      showProblems({ title: 'No se ha podido cargar el sistema de diseño', problems: [String(error?.message ?? error)], hint: `Se carga desde ${pieces.href}` });
      console.error(error);
    }
  }
}

// In the runtime there is no folder next to the talk: photos go in the document as data: URIs
function rejectPath(value, file, label) {
  throw new TagError(`${label}: "${value}" is a file path, and in the browser runtime there is no folder next to the talk; embed the image as a data:image/…;base64,… URI`);
}

function mount({ manifest, title, lang, css, body, block }) {
  const html = document.documentElement;
  html.lang = lang;
  if (title) document.title = title;
  const meta = document.createElement('meta');
  meta.name = '540-ds-version';
  meta.content = manifest.version;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.append(meta, style);
  const page = document.createElement('template');
  page.innerHTML = body;
  block.remove();
  document.body.prepend(page.content);
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
else boot();
