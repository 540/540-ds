import { createElement } from 'react';
import type { ComponentType, ReactElement } from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { ISLAND_TAG, revive } from './islands';
import type { Encoded, Registry } from './islands';

export { ISLAND_TAG, SLOT_TAG, Slot, revive } from './islands';
export type { Encoded, Registry } from './islands';
export { createElement, renderToStaticMarkup, renderToString };

type IslandOptions = {
  /** Name the component is registered under in the browser. */
  name: string;
  /** Props, encoded (see islands.ts). */
  props: Encoded;
  /** Unique per page: the useId prefix of this root. */
  id: string;
  /** HTML of each slot the props point to. */
  slots?: Record<string, string>;
};

/**
 * Renders an interactive component as its own root, inside <ds-island>, ready to hydrate.
 * The registry holds every component the encoded props name.
 */
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

/** Renders static content (no JavaScript in the browser) with its own useId prefix. */
export function renderStatic(element: ReactElement, id: string): string {
  return renderToStaticMarkup(element, { identifierPrefix: id });
}

/** Builds a registry from component modules: every capitalized function export. */
export function registryOf(...modules: Record<string, unknown>[]): Registry {
  const registry: Registry = new Map();
  for (const mod of modules) {
    for (const [key, value] of Object.entries(mod)) {
      if (/^[A-Z]/.test(key) && typeof value === 'function') registry.set(key, value as ComponentType<Record<string, unknown>>);
    }
  }
  return registry;
}

function escapeAttr(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}
