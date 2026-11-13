import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

/** Reads the manifest of a pieces folder, with helpers to import a module and read a file from it. */
export async function openPieces(dir) {
  const manifest = JSON.parse(await readFile(path.join(dir, 'manifest.json'), 'utf8'));
  const load = (file) => import(pathToFileURL(path.join(dir, file)).href);
  const text = (file) => readFile(path.join(dir, file), 'utf8');
  return { manifest, load, text };
}

/**
 * Renders a talk the way the 540 skill does: islands with their props, slots with static HTML,
 * and marks that hold an island's HTML inside a static tree until fill() puts it back.
 */
export function createHarness(rt, registry) {
  const h = rt.createElement;
  const get = (name) => registry.get(name);
  let n = 0;
  const id = () => `i${++n}-`;
  const marks = {};
  const mark = (html) => {
    const key = `m${Object.keys(marks).length}`;
    marks[key] = html;
    return h('ds-mark', { 'data-m': key });
  };
  const fill = (html) => html.replace(/<ds-mark data-m="(m\d+)"><\/ds-mark>/g, (_, key) => marks[key]);
  const slots = {};
  const slot = (element) => {
    const key = `s${Object.keys(slots).length}`;
    slots[key] = fill(rt.renderStatic(element, id()));
    return { $slot: key };
  };
  const island = (name, props) => rt.renderIsland(registry, { name, props, id: id(), slots });
  return { h, get, id, mark, fill, slots, slot, island };
}
