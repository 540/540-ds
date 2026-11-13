import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { beforeAll, describe, expect, it } from 'vitest';
import { buildMetadata } from '../scripts/build-mcp-metadata.js';
import { createServer } from './server.js';
import type { Metadata } from './types.js';

// A real MCP client talking to the server in memory, over metadata built from the current code.
let metadata: Metadata;
let client: Client;

beforeAll(async () => {
  metadata = buildMetadata();
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  await createServer(metadata).connect(serverTransport);
  client = new Client({ name: 'test', version: '0.0.0' });
  await client.connect(clientTransport);
}, 60_000);

async function call(name: string, args: Record<string, unknown> = {}) {
  const result = (await client.callTool({ name, arguments: args })) as CallToolResult;
  const first = result.content[0];
  const body = first?.type === 'text' ? first.text : '';
  return { isError: result.isError ?? false, body, json: () => JSON.parse(body) };
}

describe('metadata', () => {
  it('describes every component with its sheet and at least one story', () => {
    const components = Object.values(metadata.components);
    expect(components.length).toBeGreaterThanOrEqual(54);
    for (const c of components) {
      expect(c.description ?? c.parts[0]?.description, c.name).toBeTruthy();
      expect(c.docs, c.name).not.toBe('');
      expect(c.stories.length, c.name).toBeGreaterThan(0);
    }
  });

  it('never exposes className, style or inherited HTML attributes', () => {
    const props = Object.values(metadata.components).flatMap((c) => [...c.props, ...c.parts.flatMap((p) => p.props)]);
    const names = new Set(props.map((p) => p.name));
    for (const hidden of ['className', 'style', 'onClick', 'onMouseEnter', 'aria-label', 'tabIndex']) expect(names.has(hidden), hidden).toBe(false);
  });

  it('keeps Playground stories out', () => {
    const stories = Object.values(metadata.components).flatMap((c) => c.stories);
    expect(stories.some((s) => s.exportName === 'Playground')).toBe(false);
  });

  it('splits the talk template into stops: a cover, numbered blocks with photo, a closing', () => {
    const { stops } = metadata.templates.talk;
    expect(stops[0].component).toBe('Cover');
    expect(stops.at(-1)?.component).toBe('Closing');
    const blocks = stops.filter((s) => s.component === 'BlockTitle');
    expect(blocks.map((b) => b.block?.ordinal)).toEqual(['01', '02', '03', '04', '05']);
    expect(new Set(stops.map((s) => s.id)).size).toBe(stops.length);
    for (const s of stops) expect(s.code.split('\n').at(-1), s.id).toMatch(/^\S/); // dedented: the closing line starts at column 0
  });

  it('links every talk pattern to at least one stop', () => {
    const { patterns } = metadata.templates.talk;
    expect(patterns.length).toBeGreaterThan(15);
    for (const p of patterns) expect(p.stops.length, p.need).toBeGreaterThan(0);
  });

  it('exposes only semantic tokens', () => {
    const tokens = Object.values(metadata.tokens).flat();
    expect(tokens.length).toBeGreaterThan(100);
    expect(tokens.some((t) => t.name.startsWith('--540-'))).toBe(false);
  });
});

describe('tools', () => {
  it('lists the tools, all read-only', async () => {
    const { tools } = await client.listTools();
    expect(tools.map((t) => t.name).sort()).toEqual(
      [
        'get-component',
        'get-component-docs',
        'get-component-stories',
        'get-patterns',
        'get-rules',
        'get-template',
        'get-template-stops',
        'get-tokens',
        'list-components',
        'search-components',
      ].sort(),
    );
    for (const t of tools) expect(t.annotations?.readOnlyHint, t.name).toBe(true);
  });

  it('gives the client the usage instructions', () => {
    expect(client.getInstructions()).toContain('get-rules');
  });

  it('list-components filters by level', async () => {
    const all = (await call('list-components')).json();
    const atoms = (await call('list-components', { level: 'atom' })).json();
    expect(all.count).toBe(Object.keys(metadata.components).length);
    expect(atoms.components.every((c: { level: string }) => c.level === 'atom')).toBe(true);
    expect(atoms.components.map((c: { name: string }) => c.name)).toContain('Button');
  });

  it('get-component returns props with types, defaults and descriptions', async () => {
    const button = (await call('get-component', { component: 'button' })).json();
    const variant = button.props.find((p: { name: string }) => p.name === 'variant');
    expect(variant).toMatchObject({ type: '"primary" | "outline" | "ghost"', default: 'primary', required: false });
    expect(variant.description).toBeTruthy();
    expect(button.props.find((p: { name: string }) => p.name === 'children').type).toBe('ReactNode');
  });

  it('get-component finds parts and tag names', async () => {
    expect((await call('get-component', { component: 'GridItem' })).json()).toMatchObject({ name: 'Grid', requested: 'GridItem' });
    expect((await call('get-component', { component: 'rev-block-title' })).json().name).toBe('BlockTitle');
  });

  it('get-component suggests names when it does not find one', async () => {
    const result = await call('get-component', { component: 'Butto' });
    expect(result.isError).toBe(true);
    expect(result.body).toContain('Button');
  });

  it('get-component-docs returns the sheet in Markdown', async () => {
    const { body } = await call('get-component-docs', { component: 'Button' });
    expect(body).toMatch(/^# Button/);
    expect(body).toContain('Cuándo usarlo');
  });

  it('get-component-stories adds the code only on request', async () => {
    const plain = (await call('get-component-stories', { component: 'Button' })).json();
    const withCode = (await call('get-component-stories', { component: 'Button', includeCode: true })).json();
    expect(plain.stories[0].code).toBeUndefined();
    expect(plain.stories[0].url).toContain('https://ds.540deg.com/?path=/story/');
    expect(withCode.stories[0].code).toBeTruthy();
  });

  it('search-components finds by meaning, in Spanish too', async () => {
    const quote = (await call('search-components', { query: 'cita' })).json();
    expect(quote.results.map((r: { name: string }) => r.name)).toContain('Quote');
  });

  it('get-tokens filters by category and text', async () => {
    const text = (await call('get-tokens', { category: 'color', query: 'text-primary' })).json();
    expect(text.tokens[0]).toMatchObject({ name: '--color-text-primary', dark: { resolved: '#ffffff' } });
  });

  it('get-template gives the shell and the index of stops, without their code', async () => {
    const talk = (await call('get-template', { pieceType: 'talk' })).json();
    expect(talk.shell.code).toMatch(/^<Deck /);
    expect(talk.stops.find((s: { id: string }) => s.id === 'cifras')).toMatchObject({ block: '04 · Datos: cifras, barras y líneas', component: 'Slide' });
    expect(talk.stops[0].code).toBeUndefined();
  });

  it('get-template-stops returns code with its helpers and sample assets, and reports unknown ids', async () => {
    const result = (await call('get-template-stops', { pieceType: 'talk', stops: ['ciclo', 'portada', 'nope'] })).json();
    const [ciclo, portada] = result.stops;
    expect(ciclo.code).toMatch(/^<Slide id="ciclo">/);
    expect(ciclo.dependencies).toContain('function CycleWithPanel');
    expect(ciclo.dependencies).toContain('const PHASES');
    expect(Object.values(portada.sampleAssets)).toContain('src/assets/samples/charla-fachada.webp');
    expect(result.missing).toEqual(['nope']);
    expect((await call('get-template-stops', { pieceType: 'talk', stops: ['nope'] })).isError).toBe(true);
  });

  it('get-patterns filters by need and points to stops', async () => {
    const result = (await call('get-patterns', { pieceType: 'talk', need: 'cita' })).json();
    expect(result.patterns).toHaveLength(1);
    expect(result.patterns[0]).toMatchObject({ piece: '`Quote`', stops: ['cita'] });
  });

  it('get-rules returns the talk rules, also without pieceType', async () => {
    expect((await call('get-rules', { pieceType: 'talk' })).body).toContain('Normas para montar una charla');
    expect((await call('get-rules')).body).toContain('Normas para montar una charla');
  });

  it('serves talks only: any other piece type is refused', async () => {
    for (const tool of ['get-rules', 'get-template', 'get-patterns']) {
      const result = await call(tool, { pieceType: 'report' });
      expect(result.isError, tool).toBe(true);
    }
    const { tools } = await client.listTools();
    for (const t of tools) expect(JSON.stringify(t), t.name).not.toMatch(/report|dashboard|social/i);
  });
});
