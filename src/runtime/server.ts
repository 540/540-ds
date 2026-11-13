import { createElement } from 'react';
import type { ReactElement } from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { ISLAND_TAG, revive } from './islands';
import type { Encoded, Registry } from './islands';

export { ISLAND_TAG, SLOT_TAG, Slot, registryOf, revive } from './islands';
export type { Encoded, Registry } from './islands';
export { createElement, renderToStaticMarkup, renderToString };

type IslandOptions = {
  name: string;
  props: Encoded;
  id: string;
  slots?: Record<string, string>;
};

export function renderIsland(registry: Registry, { name, props, id, slots = {} }: IslandOptions): string {
  const type = registry.get(name);
  if (!type) throw new Error(`540-ds: component "${name}" is not registered`);
  const slotHtml = (key: string) => {
    if (!(key in slots)) throw new Error(`540-ds: slot "${key}" has no HTML`);
    return slots[key];
  };
  const element = createElement(type, revive(props, registry, slotHtml) as Record<string, unknown>);
  const inner = renderToString(element, { identifierPrefix: id });
  return `<${ISLAND_TAG} data-c="${escapeAttr(name)}" data-id="${escapeAttr(id)}" data-p="${escapeAttr(JSON.stringify(props))}">${inner}</${ISLAND_TAG}>`;
}

export function renderStatic(element: ReactElement, id: string): string {
  return renderToStaticMarkup(element, { identifierPrefix: id });
}

function escapeAttr(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}
