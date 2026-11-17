// The problems panel of the browser runtime: what the Node renderer prints to the terminal, shown over the page,
// with a button that copies it as text to paste back to whoever wrote the talk. It lives in a shadow root, so
// neither the talk's styles nor the panel's own touch each other.

const STYLE = `
:host { all: initial; position: fixed; inset: auto 16px 16px 16px; z-index: 2147483647; display: block; }
.panel { max-width: 880px; max-height: 70vh; margin-inline: auto; overflow: auto; box-sizing: border-box; padding: 20px 24px;
  border-radius: 12px; background: #1b1b1f; color: #f4f4f5; font: 14px/1.5 ui-sans-serif, system-ui, sans-serif;
  box-shadow: 0 12px 40px rgb(0 0 0 / 0.35); border-inline-start: 4px solid var(--tone); }
.panel[data-tone="error"] { --tone: #f87171; }
.panel[data-tone="warning"] { --tone: #fbbf24; }
header { display: flex; gap: 12px; align-items: baseline; justify-content: space-between; }
h1 { margin: 0; font-size: 16px; font-weight: 600; }
p { margin: 4px 0 0; color: #a1a1aa; }
ol { margin: 12px 0 0; padding-inline-start: 20px; }
li { margin-block: 6px; font: 13px/1.5 ui-monospace, SFMono-Regular, Menlo, monospace; white-space: pre-wrap; overflow-wrap: anywhere; }
.actions { display: flex; gap: 8px; flex: none; }
button { font: inherit; font-size: 13px; padding: 4px 12px; border-radius: 6px; border: 1px solid #3f3f46; background: #27272a; color: inherit; cursor: pointer; }
button:hover { background: #3f3f46; }
`;

export function showProblems({ title, summary = '', problems, hint = '', tone = 'error' }) {
  const host = document.createElement('ds-problems');
  const root = host.attachShadow({ mode: 'open' });
  const text = [title, summary, ...problems.map((p) => `- ${p}`), hint].filter(Boolean).join('\n');

  const style = document.createElement('style');
  style.textContent = STYLE;
  const panel = el('section', { class: 'panel', 'data-tone': tone, role: tone === 'error' ? 'alert' : 'status' });
  const copy = el('button', { type: 'button' }, 'Copiar');
  copy.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(text);
      copy.textContent = 'Copiado';
    } catch {
      // The clipboard can be blocked inside a sandboxed frame: select the text so it can be copied by hand
      getSelection()?.selectAllChildren(panel);
      copy.textContent = 'Seleccionado';
    }
  });
  const actions = el('div', { class: 'actions' }, copy);
  if (tone !== 'error') {
    const close = el('button', { type: 'button', 'aria-label': 'Cerrar' }, 'Cerrar');
    close.addEventListener('click', () => host.remove());
    actions.append(close);
  }
  panel.append(
    el('header', {}, el('h1', {}, title), actions),
    ...(summary ? [el('p', {}, summary)] : []),
    el('ol', {}, ...problems.map((p) => el('li', {}, p))),
    ...(hint ? [el('p', {}, hint)] : []),
  );
  root.append(style, panel);
  document.body.append(host);
  console[tone === 'error' ? 'error' : 'warn'](text);
}

function el(name, attrs, ...children) {
  const node = document.createElement(name);
  for (const [key, value] of Object.entries(attrs)) node.setAttribute(key, value);
  node.append(...children);
  return node;
}
