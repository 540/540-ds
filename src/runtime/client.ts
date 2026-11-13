import * as React from 'react';
import * as jsxRuntime from 'react/jsx-runtime';
import * as ReactDOM from 'react-dom';
import { hydrateRoot } from 'react-dom/client';
import * as ReactDOMClient from 'react-dom/client';
import * as StepsContext from '../components/organisms/Steps/StepsContext';
import { ISLAND_TAG, SLOT_TAG, registryOf, revive } from './islands';
import type { Encoded, Registry } from './islands';

type Hydrated = HTMLElement & { __ds540?: true };

const registry: Registry = new Map();

function register(components: Record<string, unknown>) {
  for (const [key, value] of registryOf(components)) registry.set(key, value);
  // A script that arrives after the page loaded (async, injected) hydrates its islands on its own
  if (document.readyState !== 'loading') scheduleHydrate();
}

let scheduled = false;

function scheduleHydrate() {
  if (scheduled) return;
  scheduled = true;
  setTimeout(() => {
    scheduled = false;
    hydrateIslands();
  });
}

function slotHtml(id: string): string {
  const slot = document.querySelector(`${SLOT_TAG}[data-s="${CSS.escape(id)}"]`);
  // A slot the server did not render (a conditional prop) has no HTML; the client does not render it either
  return slot ? slot.innerHTML : '';
}

function hydrateIslands() {
  for (const el of Array.from(document.querySelectorAll<Hydrated>(ISLAND_TAG))) {
    if (el.__ds540) continue;
    const name = el.dataset.c ?? '';
    const type = registry.get(name);
    // Not marked: a later hydrate(), once its script registers, picks it up
    if (!type) {
      console.warn(`540-ds: island "${name}" has no script on the page yet`);
      continue;
    }
    el.__ds540 = true;
    try {
      const props = revive(JSON.parse(el.dataset.p ?? '{}') as Encoded, registry, slotHtml) as Record<string, unknown>;
      hydrateRoot(el, React.createElement(type, props), {
        identifierPrefix: el.dataset.id ?? '',
        onRecoverableError: (error) => {
          console.error(`540-ds: island "${name}" did not match its HTML`, error);
          // React rendered it again from scratch, replacing the slots' DOM: the islands inside are new nodes
          scheduleHydrate();
        },
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
else scheduleHydrate();
