#!/usr/bin/env node
/**
 * Tries the design system of the current branch, entirely on this machine: builds the pieces (what the renderer
 * paints with) and the MCP metadata from the working copy, starts the MCP locally and asks a fresh Claude session,
 * which sees only that MCP and no skills, to build the requested piece and render it with the pieces just built.
 *
 *   node .claude/skills/prueba-540-ds/scripts/probar.mjs --pedido "una charla de 3 bloques sobre X" [--modelo sonnet]
 *
 * Leaves everything in pruebas/<fecha>-<pedido>/ (ignored by git): pieza.rev.html, pieza.html, informe.md and
 * sesion.jsonl (the whole session, for when something has to be looked at closely). Prints a JSON summary on the
 * last line. Exit codes: 0 done, 2 bad arguments, 3 the branch does not build, 4 the session failed.
 */
import { spawn, spawnSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { parseArgs } from 'node:util';

const repo = path.resolve(import.meta.dirname, '../../../..');
const say = (msg) => console.error(`· ${msg}`);

const { values } = parseArgs({
  options: { pedido: { type: 'string' }, modelo: { type: 'string' } },
});
if (!values.pedido?.trim()) {
  console.error('Falta --pedido "qué pieza montar".');
  process.exit(2);
}
const pedido = values.pedido.trim();

// ── 1. The branch, built ─────────────────────────────────────────────────────

function run(label, cmd, args) {
  say(label);
  const r = spawnSync(cmd, args, { cwd: repo, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
  if (r.status !== 0) {
    console.error(`\n✗ ${label} ha fallado:\n${(r.stdout + r.stderr).trim().split('\n').slice(-40).join('\n')}`);
    console.log(JSON.stringify({ ok: false, fase: label }));
    process.exit(3);
  }
  return r.stdout;
}

if (!existsSync(path.join(repo, 'node_modules'))) run('Instalando dependencias (npm ci)', 'npm', ['ci']);
run('Generando el paquete (las piezas que usa el render)', 'npm', ['run', 'build:pieces']);
// --strict: a component without its docs fails here exactly as it would fail when publishing.
run('Generando la metadata del MCP', 'npm', ['run', 'build-mcp-metadata', '--', '--strict']);

// ── 2. A clean place to work ─────────────────────────────────────────────────
// Outside the repo, so the session does not read the repo's CLAUDE.md: it must know only what the MCP tells it.

const work = mkdtempSync(path.join(os.tmpdir(), 'prueba-540-ds-'));
cpSync(path.join(repo, 'src/assets/samples'), path.join(work, 'muestras'), { recursive: true });

const mcpConfig = path.join(work, 'mcp.json');
writeFileSync(
  mcpConfig,
  JSON.stringify({
    mcpServers: {
      '540-ds-local': { command: path.join(repo, 'node_modules/.bin/tsx'), args: [path.join(repo, 'mcp/stdio.ts')] },
    },
  }),
);

const render = `node ${path.join(repo, 'pieces/render/cli.mjs')}`;
const brief = `You are trying out a branch of the 540 design system. Build this piece: ${pedido}

How:
- Your only source for the design system is the 540-ds-local MCP. Follow its instructions exactly as it gives them. Do not rely on anything you remember about 540.
- Write the piece as pieza.rev.html in the current folder, with <rev-…> tags. The tag contract: \`${render} --contract\`. The props of the tags you use: \`${render} --tags <Component> …\`.
- Render it with \`${render} pieza.rev.html\`. If it exits with errors or warnings, fix pieza.rev.html (never pieza.html) and render again, until it exits with 0.
- Images: there are no real photos. Use the samples in ./muestras with relative paths (muestras/textura-degradado-naranja.webp…).
- If something you need has no component, or the docs, rules or guide are unclear, missing or contradict each other, do not work around it: note it.

At the end, write informe.md in Spanish, for the designer who maintains the system (not technical), with these sections:
## Qué he montado — one paragraph.
## Qué he consultado — the MCP tools you called and what for.
## Dónde el sistema no me ha ayudado — every doubt, gap or contradiction you found in the docs, rules, guide or components, saying which file or component it is and what you would have needed. Write "Nada" if there was nothing.
## Errores del render — what the renderer rejected and how you fixed it. "Ninguno" if none.`;

// ── 3. The session ───────────────────────────────────────────────────────────

const args = [
  '-p',
  brief,
  '--strict-mcp-config', // only the local MCP: never the production connector nor any other
  '--mcp-config',
  mcpConfig,
  '--disable-slash-commands', // no skills: the piece depends only on the design system of the branch
  '--permission-mode',
  'acceptEdits',
  '--allowedTools',
  'mcp__540-ds-local',
  `Bash(${render}:*)`,
  '--output-format',
  'stream-json',
  '--verbose',
];
if (values.modelo) args.push('--model', values.modelo);

say(`Montando la pieza en una sesión limpia (tarda unos minutos): ${pedido}`);
const started = Date.now();
const lines = [];
const tools = {};
let result = null;

const child = spawn('claude', args, { cwd: work, stdio: ['ignore', 'pipe', 'inherit'] });
let buffer = '';
child.stdout.on('data', (chunk) => {
  buffer += chunk;
  let i;
  while ((i = buffer.indexOf('\n')) >= 0) {
    const line = buffer.slice(0, i);
    buffer = buffer.slice(i + 1);
    if (!line.trim()) continue;
    lines.push(line);
    let event;
    try {
      event = JSON.parse(line);
    } catch {
      continue;
    }
    for (const part of event.message?.content ?? []) {
      if (part.type !== 'tool_use') continue;
      const name = part.name.replace(/^mcp__540-ds-local__/, 'MCP ');
      tools[name] = (tools[name] ?? 0) + 1;
      say(name === 'Bash' ? 'render' : name);
    }
    if (event.type === 'result') result = event;
  }
});
const code = await new Promise((resolve) => child.on('close', resolve));

// ── 4. What is left ──────────────────────────────────────────────────────────

const stamp = new Date().toISOString().slice(0, 16).replace(/[T:]/g, '-');
const slug = pedido.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40);
const out = path.join(repo, 'pruebas', `${stamp}-${slug}`);
mkdirSync(out, { recursive: true });
writeFileSync(path.join(out, 'sesion.jsonl'), `${lines.join('\n')}\n`);
for (const f of ['pieza.rev.html', 'pieza.html', 'informe.md']) {
  if (existsSync(path.join(work, f))) cpSync(path.join(work, f), path.join(out, f));
}
// pieza.rev.html points to the samples by relative path: keep them next to it so it can be rendered again.
if (existsSync(path.join(out, 'pieza.rev.html'))) cpSync(path.join(work, 'muestras'), path.join(out, 'muestras'), { recursive: true });

const has = (f) => existsSync(path.join(out, f));
const summary = {
  ok: code === 0 && !result?.is_error && has('pieza.html'),
  carpeta: path.relative(repo, out),
  pieza: has('pieza.html') ? path.relative(repo, path.join(out, 'pieza.html')) : null,
  informe: has('informe.md') ? path.relative(repo, path.join(out, 'informe.md')) : null,
  herramientas: tools,
  minutos: Math.round((Date.now() - started) / 6000) / 10,
  coste_usd: result?.total_cost_usd ?? null,
  ultimo_mensaje: result?.result?.slice(0, 500) ?? null,
};
if (has('informe.md')) console.error(`\n${readFileSync(path.join(out, 'informe.md'), 'utf8')}`);
console.log(JSON.stringify(summary));
process.exit(summary.ok ? 0 : 4);
