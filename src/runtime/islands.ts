import { cloneElement, createElement, isValidElement } from 'react';
import type { ComponentType, ReactNode } from 'react';

export type Encoded = string | number | boolean | null | Encoded[] | { [key: string]: Encoded };

export type Registry = Map<string, ComponentType<Record<string, unknown>>>;

export const ISLAND_TAG = 'ds-island';
export const SLOT_TAG = 'ds-slot';

type SlotProps = { id: string; html: string };

export function Slot({ id, html }: SlotProps) {
  return createElement(SLOT_TAG, { 'data-s': id, dangerouslySetInnerHTML: { __html: html } });
}

function isObject(value: unknown): value is Record<string, Encoded> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

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
  return isValidElement(node) ? cloneElement(node, { key: String(key) }) : node;
}

function isComponent(value: unknown): value is ComponentType<Record<string, unknown>> {
  return typeof value === 'function' || (typeof value === 'object' && value !== null && '$$typeof' in value);
}

/** Collects the components (exports whose name starts with a capital) of the given modules. */
export function registryOf(...modules: Record<string, unknown>[]): Registry {
  const registry: Registry = new Map();
  for (const mod of modules) {
    for (const [key, value] of Object.entries(mod)) if (/^[A-Z]/.test(key) && isComponent(value)) registry.set(key, value);
  }
  return registry;
}
