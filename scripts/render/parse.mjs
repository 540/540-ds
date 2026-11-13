import { VOID } from './rules.mjs';

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', laquo: '«', raquo: '»', mdash: '—', ndash: '–', hellip: '…', iexcl: '¡', iquest: '¿', euro: '€', copy: '©', middot: '·', thinsp: ' ', shy: '­' };

export class TagError extends Error {}

export function decode(text, where) {
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (whole, ref) => {
    if (ref[0] === '#') return String.fromCodePoint(ref[1] === 'x' || ref[1] === 'X' ? parseInt(ref.slice(2), 16) : Number(ref.slice(1)));
    if (ref in ENTITIES) return ENTITIES[ref];
    throw new TagError(`${where}: unknown entity ${whole}`);
  });
}

/**
 * Parses a tag document into a tree of { type: 'element', name, attrs, children, at } and { type: 'text', value }.
 * Tag names are case-insensitive; attribute names keep their case. `at` is "line:column".
 */
export function parse(source, origin = 'document') {
  let i = 0;
  const root = { type: 'element', name: '#root', attrs: [], children: [], at: '1:1' };
  const stack = [root];
  const where = (pos = i) => {
    const before = source.slice(0, pos).split('\n');
    return `${origin} ${before.length}:${before.at(-1).length + 1}`;
  };
  const top = () => stack.at(-1);

  while (i < source.length) {
    if (source.startsWith('<!--', i)) {
      const end = source.indexOf('-->', i + 4);
      if (end < 0) throw new TagError(`${where()}: comment never closed`);
      i = end + 3;
      continue;
    }
    if (source.startsWith('</', i)) {
      const match = /^<\/([a-zA-Z][\w-]*)\s*>/.exec(source.slice(i));
      if (!match) throw new TagError(`${where()}: malformed closing tag`);
      const name = match[1].toLowerCase();
      if (top().name !== name) throw new TagError(`${where()}: </${name}> closes <${top().name}>, opened at ${top().at}`);
      stack.pop();
      i += match[0].length;
      continue;
    }
    if (source[i] === '<' && /[a-zA-Z!]/.test(source[i + 1] ?? '')) {
      if (/^<!doctype/i.test(source.slice(i, i + 9))) throw new TagError(`${where()}: a tag document is a fragment; the renderer writes the page shell`);
      const start = i;
      const nameMatch = /^<([a-zA-Z][\w-]*)/.exec(source.slice(i));
      const element = { type: 'element', name: nameMatch[1].toLowerCase(), attrs: [], children: [], at: where(start) };
      i += nameMatch[0].length;
      let closed = false;
      for (;;) {
        const space = /^\s*/.exec(source.slice(i))[0];
        i += space.length;
        if (i >= source.length) throw new TagError(`${element.at}: <${element.name}> never ends`);
        if (source.startsWith('/>', i)) {
          closed = true;
          i += 2;
          break;
        }
        if (source[i] === '>') {
          i += 1;
          break;
        }
        if (!space && element.attrs.length) throw new TagError(`${where()}: attributes of <${element.name}> need spaces between them`);
        const attr = /^([^\s"'<>/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/.exec(source.slice(i));
        if (!attr) throw new TagError(`${where()}: malformed attribute in <${element.name}>`);
        const at = where();
        const raw = attr[2] ?? attr[3] ?? attr[4];
        if (element.attrs.some((a) => a.name === attr[1])) throw new TagError(`${at}: <${element.name}> repeats the attribute ${attr[1]}`);
        element.attrs.push({ name: attr[1], value: raw === undefined ? null : decode(raw, at), at });
        i += attr[0].length;
      }
      top().children.push(element);
      if (!closed && !VOID.has(element.name)) stack.push(element);
      continue;
    }
    const next = source.indexOf('<', i + 1);
    const end = next < 0 ? source.length : next;
    const value = decode(source.slice(i, end), where());
    top().children.push({ type: 'text', value });
    i = end;
  }
  if (stack.length > 1) throw new TagError(`${top().at}: <${top().name}> is never closed`);
  return root.children;
}

/** Collapses whitespace like HTML does and drops what is only formatting between tags. */
export function tidy(nodes) {
  const out = [];
  for (const node of nodes) {
    if (node.type === 'text') {
      const value = node.value.replace(/[ \t\r\n\f]+/g, ' ');
      if (value === ' ' && (!out.length || out.at(-1).type === 'element')) {
        out.push({ type: 'space', value });
        continue;
      }
      out.push({ type: 'text', value });
    } else out.push(node);
  }
  const kept = out.filter((node, i) => node.type !== 'space' || (isInline(out[i - 1]) && isInline(out[i + 1])));
  if (kept[0]?.type === 'text') kept[0] = { ...kept[0], value: kept[0].value.trimStart() };
  if (kept.at(-1)?.type === 'text') kept[kept.length - 1] = { ...kept.at(-1), value: kept.at(-1).value.trimEnd() };
  return kept.filter((node) => node.type !== 'text' || node.value !== '').map((node) => (node.type === 'space' ? { type: 'text', value: ' ' } : node));
}

function isInline(node) {
  return node && (node.type === 'text' || (node.type === 'element' && !node.name.startsWith('rev-') && node.name !== 'template'));
}
