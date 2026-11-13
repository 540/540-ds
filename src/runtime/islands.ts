import { createElement } from 'react';
import type { ComponentType, ReactNode } from 'react';

/**
 * The island contract, shared by the server render and the browser runtime.
 *
 * An island is an interactive component rendered to static HTML and hydrated in the browser.
 * In the page it is a <ds-island> element: `data-c` names the component, `data-p` carries its
 * props as JSON, `data-id` is the useId prefix it was rendered with. Its content is the
 * component's own HTML, rendered as a separate React root.
 *
 * Props that are React nodes travel encoded:
 * - `{ "$slot": "s1" }` is static HTML already in the page, inside `<ds-slot data-s="s1">`;
 *   React keeps it as is and never touches it, so islands nested in it hydrate on their own.
 * - `{ "$el": "Step", "p": { … } }` is a component (capitalized, from the registry) or an HTML
 *   element (lowercase) that must join the island's React tree, because it reads the context
 *   of a parent (Step and Count inside Steps).
 * - Strings, numbers, booleans, null, arrays and plain objects travel as they are.
 */

export type Encoded = string | number | boolean | null | Encoded[] | { [key: string]: Encoded };

export type Registry = Map<string, ComponentType<Record<string, unknown>>>;

export const ISLAND_TAG = 'ds-island';
export const SLOT_TAG = 'ds-slot';

type SlotProps = { id: string; html: string };

/** Static HTML React must leave alone: rendered on the server, adopted untouched in the browser. */
export function Slot({ id, html }: SlotProps) {
  return createElement(SLOT_TAG, { 'data-s': id, dangerouslySetInnerHTML: { __html: html } });
}

function isObject(value: unknown): value is Record<string, Encoded> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/** Turns encoded props back into React props. `slotHtml` finds the HTML of each slot. */
export function revive(value: Encoded, registry: Registry, slotHtml: (id: string) => string): unknown {
  if (Array.isArray(value)) {
    return value.map((item, i) => {
      const node = revive(item, registry, slotHtml);
      return isObject(item) && ('$slot' in item || '$el' in item) ? withKey(node as ReactNode, i) : node;
    });
  }
  if (!isObject(value)) return value;
  if (typeof value.$slot === 'string') return createElement(Slot, { id: value.$slot, html: slotHtml(value.$slot) });
  if (typeof value.$el === 'string') {
    const name = value.$el;
    const type = /^[a-z]/.test(name) ? name : registry.get(name);
    if (!type) throw new Error(`540-ds: component "${name}" is not registered; include its island`);
    const props = revive(value.p ?? {}, registry, slotHtml) as Record<string, unknown>;
    return createElement(type, props);
  }
  const out: Record<string, unknown> = {};
  for (const [key, item] of Object.entries(value)) out[key] = revive(item, registry, slotHtml);
  return out;
}

function withKey(node: ReactNode, key: number): ReactNode {
  return node && typeof node === 'object' && 'type' in node ? { ...node, key: String(key) } : node;
}
