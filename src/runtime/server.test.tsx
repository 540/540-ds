import { createElement, useId } from 'react';
import { describe, expect, it } from 'vitest';
import { registryOf, revive } from './islands';
import { ISLAND_TAG, SLOT_TAG, renderIsland, renderStatic, renderToStaticMarkup, renderToString } from './server';

function Greeting({ name, children }: { name: string; children?: unknown }) {
  return createElement('p', { id: useId() }, `Hi ${name}`, children as never);
}

function Box({ items }: { items: unknown[] }) {
  return createElement('div', null, items as never);
}

const lowercase = () => null;

const registry = registryOf({ Greeting, Box, lowercase, NotAComponent: 42 });

describe('registryOf', () => {
  it('keeps only capitalised exports that are components', () => {
    expect([...registry.keys()].sort()).toEqual(['Box', 'Greeting']);
  });
});

describe('renderIsland', () => {
  it('wraps the rendered component in the island tag with its name, id and props as attributes', () => {
    const html = renderIsland(registry, { name: 'Greeting', props: { name: 'A"&<b' }, id: 'i1-' });
    expect(ISLAND_TAG).toBe('ds-island');
    expect(html.startsWith('<ds-island data-c="Greeting" data-id="i1-" data-p="{&quot;name&quot;:&quot;A\\&quot;&amp;&lt;b&quot;}">')).toBe(true);
    expect(html.endsWith('</ds-island>')).toBe(true);
    expect(html).toContain('Hi A&quot;&amp;&lt;b');
  });

  it('prefixes the ids the component generates with the island id', () => {
    const html = renderIsland(registry, { name: 'Greeting', props: { name: 'x' }, id: 'i7-' });
    expect(html).toMatch(/<p id="i7-[^"]+"/);
  });

  it('throws when the component is not registered', () => {
    expect(() => renderIsland(registry, { name: 'Missing', props: {}, id: 'i1-' })).toThrow('540-ds: component "Missing" is not registered');
  });

  it('fills a $slot prop with the slot HTML given, and throws for a slot with no HTML', () => {
    const html = renderIsland(registry, { name: 'Greeting', props: { name: 'x', children: { $slot: 's1' } }, id: 'i1-', slots: { s1: '<b>in</b>' } });
    expect(SLOT_TAG).toBe('ds-slot');
    expect(html).toContain('<ds-slot data-s="s1"><b>in</b></ds-slot>');
    expect(() => renderIsland(registry, { name: 'Greeting', props: { name: 'x', children: { $slot: 's2' } }, id: 'i1-' })).toThrow('540-ds: slot "s2" has no HTML');
  });
});

describe('revive', () => {
  const noSlots = () => '';

  it('builds elements from $el, lowercase names as HTML tags and capitalised ones from the registry', () => {
    const html = renderStatic(createElement(Box, revive({ items: [{ $el: 'em', p: { children: 'one' } }, { $el: 'Greeting', p: { name: 'two' } }] }, registry, noSlots) as never), 'p-');
    expect(html).toContain('<em>one</em>');
    expect(html).toContain('Hi two');
  });

  it('throws for an $el component that is not registered', () => {
    expect(() => revive({ $el: 'Missing' }, registry, noSlots)).toThrow('540-ds: component "Missing" is not registered; include its island');
  });

  it('returns plain values and objects unchanged in shape', () => {
    expect(revive({ a: [1, 'b', null, true], c: { d: 2 } }, registry, noSlots)).toEqual({ a: [1, 'b', null, true], c: { d: 2 } });
  });
});

describe('renderStatic and renderToString', () => {
  it('render without the island wrapper, prefixing generated ids', () => {
    const element = createElement(Greeting, { name: 'x' });
    expect(renderStatic(element, 's-')).toMatch(/^<p id="s-[^"]+">Hi x<\/p>$/);
    expect(renderToString(element, { identifierPrefix: 'r-' })).toMatch(/^<p id="r-[^"]+">Hi x<\/p>$/);
    expect(renderToString(element)).toMatch(/^<p id="[^"]+">Hi x<\/p>$/);
    expect(renderToStaticMarkup).toBe(renderToString);
  });
});
