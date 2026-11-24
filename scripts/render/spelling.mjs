import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { parse } from './parse.mjs';

/** The 540 words the dictionaries do not know: one per line, lowercase; `#` starts a comment. */
export const WORDS_FILE = path.join(import.meta.dirname, 'palabras-540.txt');

/** Attributes that carry code, numbers or names of options, never copy: their values are not checked. */
const NOT_COPY = new Set([
  'id', 'src', 'href', 'class', 'view-box', 'd', 'points', 'transform', 'x', 'y', 'dx', 'dy', 'x1', 'y1', 'x2', 'y2',
  'cx', 'cy', 'r', 'rx', 'ry', 'width', 'height', 'text-anchor', 'dominant-baseline', 'marker-start', 'marker-mid',
  'marker-end', 'ref-x', 'ref-y', 'marker-width', 'marker-height', 'marker-units', 'orient', 'path-length', 'ratio',
  'span', 'variant', 'tone', 'align', 'measure', 'wrap', 'as', 'gap', 'layout', 'kind', 'placement', 'storage-key',
  'default-theme', 'total', 'from', 'to', 'step', 'value', 'decimals', 'columns', 'level', 'type', 'auto-complete',
]);
/** JSON keys that carry paths, links or option names. */
const NOT_COPY_KEYS = new Set(['src', 'href', 'network', 'id', 'icon', 'light', 'dark', 'kind', 'tone']);
/** Letters of Spanish and English words; anything else splits words. */
const WORD = /[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+(?:['’][A-Za-z]+)?/g;
const MIN_LENGTH = 3;
const MAX_SUGGESTIONS = 3;

let checkers;
async function loadCheckers() {
  checkers ??= (async () => {
    const [{ default: nspell }, { default: es }, { default: en }] = await Promise.all([import('nspell'), import('dictionary-es'), import('dictionary-en')]);
    return { es: nspell(es), en: nspell(en) };
  })();
  return checkers;
}

async function loadWords(file) {
  try {
    const text = await readFile(file, 'utf8');
    return new Set(
      text
        .split('\n')
        .map((line) => line.replace(/#.*/, '').trim().toLowerCase())
        .filter(Boolean),
    );
  } catch {
    return new Set();
  }
}

/** Every piece of copy in the document, with the place of the element it belongs to. */
function collectCopy(nodes) {
  const copy = [];
  const fromJson = (value, at, key) => {
    if (typeof value === 'string') {
      if (!NOT_COPY_KEYS.has(key)) copy.push({ text: value, at });
    } else if (Array.isArray(value)) value.forEach((v) => fromJson(v, at, key));
    else if (value && typeof value === 'object') for (const [k, v] of Object.entries(value)) fromJson(v, at, k);
  };
  const visit = (node, at, inCode) => {
    if (node.type === 'text') {
      if (!inCode) copy.push({ text: node.value, at });
      return;
    }
    const here = node.at ?? at;
    for (const attr of node.attrs ?? []) {
      if (attr.value == null || NOT_COPY.has(attr.name)) continue;
      const value = attr.value.trim();
      if (/^[[{]/.test(value)) {
        try {
          fromJson(JSON.parse(value), attr.at ?? here, attr.name);
          continue;
        } catch {
          // not JSON: plain copy
        }
      }
      copy.push({ text: value, at: attr.at ?? here });
    }
    for (const child of node.children ?? []) visit(child, here, inCode || node.name === 'code');
  };
  nodes.forEach((n) => visit(n, n.at ?? '1:1', false));
  return copy;
}

const plain = (text) => text.replace(/<[^>]+>/g, ' ');
const isAcronymOrCode = (word) => /[A-Z].*[A-Z]/.test(word) || /[a-z][A-Z]/.test(word);
const isCapitalized = (word) => /^[A-ZÁÉÍÓÚÜÑ]/.test(word);

/**
 * Checks the spelling of every piece of copy in a Spanish talk and returns one warning per unknown
 * word, with where it first appears and the dictionary's suggestions. A word passes if the Spanish or
 * the English dictionary knows it, or if it is in the 540 word list. Capitalized words the
 * dictionaries do not know are taken as names; acronyms and code-like words are skipped.
 */
export async function checkSpelling(source, { origin = 'document', wordsFile = WORDS_FILE } = {}) {
  const [{ es, en }, words] = await Promise.all([loadCheckers(), loadWords(wordsFile)]);
  const known = (word) => {
    const lower = word.toLowerCase();
    return words.has(lower) || es.correct(word) || es.correct(lower) || en.correct(word) || en.correct(lower);
  };
  const unknown = new Map();
  for (const { text, at } of collectCopy(parse(source, origin))) {
    for (const [word] of plain(text).matchAll(WORD)) {
      if (word.length < MIN_LENGTH || isAcronymOrCode(word) || known(word)) continue;
      if (isCapitalized(word)) continue;
      const entry = unknown.get(word) ?? { at, count: 0 };
      entry.count += 1;
      unknown.set(word, entry);
    }
  }
  return [...unknown].map(([word, { at, count }]) => {
    const suggestions = es.suggest(word).slice(0, MAX_SUGGESTIONS);
    const hint = suggestions.length ? ` (did you mean ${suggestions.map((s) => `"${s}"`).join(', ')}?)` : '';
    const times = count > 1 ? `, ${count} times` : '';
    return `${at}: "${word}" is not in the Spanish or English dictionary${times}${hint}; fix it, or add it to render/palabras-540.txt if it is right`;
  });
}
