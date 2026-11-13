import { createElement } from 'react';
import type { ReactElement } from 'react';
import { renderToString as renderPreact } from 'preact-render-to-string';
import type { VNode } from 'preact';
import { IdPrefix } from './compat/react';
import { ISLAND_TAG, revive } from './islands';
import type { Encoded, Registry } from './islands';

export { ISLAND_TAG, SLOT_TAG, Slot, registryOf, revive } from './islands';
export type { Encoded, Registry } from './islands';
export { createElement };

type IslandOptions = {
  name: string;
  props: Encoded;
  id: string;
  slots?: Record<string, string>;
};

function render(element: ReactElement, id: string): string {
  return renderPreact(createElement(IdPrefix.Provider as never, { value: id }, element) as unknown as VNode);
}

export function renderIsland(registry: Registry, { name, props, id, slots = {} }: IslandOptions): string {
  const type = registry.get(name);
  if (!type) throw new Error(`540-ds: component "${name}" is not registered`);
  const slotHtml = (key: string) => {
    if (!(key in slots)) throw new Error(`540-ds: slot "${key}" has no HTML`);
    return slots[key];
  };
  const inner = render(createElement(type, revive(props, registry, slotHtml) as Record<string, unknown>), id);
  return `<${ISLAND_TAG} data-c="${escapeAttr(name)}" data-id="${escapeAttr(id)}" data-p="${escapeAttr(JSON.stringify(props))}">${inner}</${ISLAND_TAG}>`;
}

export function renderStatic(element: ReactElement, id: string): string {
  return render(element, id);
}

type RenderOptions = { identifierPrefix?: string };

/** Kept from the React runtime, so talk builds that call them keep working. */
export function renderToString(element: ReactElement, options: RenderOptions = {}): string {
  return render(element, options.identifierPrefix ?? '');
}

export const renderToStaticMarkup = renderToString;

function escapeAttr(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}
