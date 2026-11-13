import * as React from 'react';
import * as jsxRuntime from 'react/jsx-runtime';
import * as ReactDOM from 'react-dom';
import { hydrateRoot } from 'react-dom/client';
import * as ReactDOMClient from 'react-dom/client';
import type { ComponentType } from 'react';
import * as StepsContext from '../components/organisms/Steps/StepsContext';
import { ISLAND_TAG, SLOT_TAG, revive } from './islands';
import type { Encoded, Registry } from './islands';

type Hydrated = HTMLElement & { __ds540?: true };

const registry: Registry = new Map();

function register(components: Record<string, unknown>) {
  for (const [key, value] of Object.entries(components)) {
    if (/^[A-Z]/.test(key) && (typeof value === 'function' || (typeof value === 'object' && value !== null))) {
      registry.set(key, value as ComponentType<Record<string, unknown>>);
    }
  }
}

function slotHtml(id: string): string {
  const slot = document.querySelector(`${SLOT_TAG}[data-s="${CSS.escape(id)}"]`);
  if (!slot) throw new Error(`540-ds: slot "${id}" is missing from the page`);
  return slot.innerHTML;
}

function hydrateIslands() {
  for (const el of Array.from(document.querySelectorAll<Hydrated>(ISLAND_TAG))) {
    if (el.__ds540) continue;
    el.__ds540 = true;
    const name = el.dataset.c ?? '';
    const type = registry.get(name);
    if (!type) {
      console.error(`540-ds: island "${name}" has no script on the page`);
      continue;
    }
    try {
      const props = revive(JSON.parse(el.dataset.p ?? '{}') as Encoded, registry, slotHtml) as Record<string, unknown>;
      hydrateRoot(el, React.createElement(type, props), {
        identifierPrefix: el.dataset.id ?? '',
        onRecoverableError: (error) => console.error(`540-ds: island "${name}" did not match its HTML`, error),
      });
    } catch (error) {
      console.error(`540-ds: island "${name}" failed to hydrate`, error);
    }
  }
}

const runtime = {
  React,
  ReactDOM,
  ReactDOMClient,
  jsxRuntime,
  StepsContext,
  register,
  hydrate: hydrateIslands,
};

(globalThis as { __ds540?: typeof runtime }).__ds540 = runtime;

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', hydrateIslands, { once: true });
else setTimeout(hydrateIslands);
