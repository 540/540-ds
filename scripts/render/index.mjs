import { readFileSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { TagError, parse, tidy } from './parse.mjs';
import { IMAGE, MIME, PHRASING, SVG, SVG_CONTAINERS } from './rules.mjs';

export { TagError };

const camel = (name) => name.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
const kebab = (name) => name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
const REMOTE = /^([a-z][a-z0-9+.-]*:)?\/\//i;

/**
 * Turns a document written with <rev-…> tags into one self-contained HTML page.
 * Throws a TagError listing every problem (unknown tags or props, wrong values, missing images).
 */
export async function renderTalk(source, { pieces, baseDir = process.cwd(), lang = 'es', origin = 'document' } = {}) {
  if (!pieces) throw new Error('renderTalk needs the pieces folder');
  const manifest = JSON.parse(await readFile(path.join(pieces, 'manifest.json'), 'utf8'));
  const errors = [];
  const warnings = [];

  let nodes;
  try {
    nodes = parse(source, origin);
  } catch (error) {
    if (error instanceof TagError) throw new TagError(`${origin} has 1 problem:\n- ${error.message}`);
    throw error;
  }

  let title = '';
  nodes = nodes.filter((node) => {
    if (node.type !== 'element' || node.name !== 'title') return true;
    if (title) errors.push(`${node.at}: only one <title>`);
    if (node.attrs.length || node.children.some((c) => c.type !== 'text')) errors.push(`${node.at}: <title> takes plain text only`);
    title = node.children.map((c) => c.value ?? '').join('').replace(/\s+/g, ' ').trim();
    return false;
  });

  const resolved = resolveNodes(nodes, { svg: false }, { manifest, errors, warnings, baseDir });
  if (errors.length) throw new TagError(`${origin} has ${errors.length} problem${errors.length > 1 ? 's' : ''}:\n${errors.map((e) => `- ${e}`).join('\n')}`);

  const page = await renderPage(resolved, { manifest, pieces, warnings });
  const head = [
    '<meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1">',
    `<meta name="generator" content="${escapeHtml(`${manifest.name} ${manifest.version}`)}">`,
    `<meta name="540-ds-version" content="${escapeHtml(manifest.version)}">`,
    `<title>${escapeHtml(title)}</title>`,
    `<style>${page.css}</style>`,
  ].join('');
  const html = `<!doctype html><html lang="${escapeHtml(lang)}"><head>${head}</head><body>${page.body}${page.scripts.map((code) => `<script>${code}</script>`).join('')}</body></html>\n`;
  checkOffline(page.css, page.body);
  return { html, version: manifest.version, components: page.components, islands: page.islands, scripts: page.scripts.length > 0, warnings };
}

function resolveNodes(nodes, ctx, env) {
  const out = [];
  for (const node of tidy(nodes)) {
    if (node.type === 'text') {
      if (!(ctx.svg && !ctx.text && !node.value.trim())) out.push(node.value);
      continue;
    }
    const element = resolveElement(node, ctx, env);
    if (element) out.push(element);
  }
  return out;
}

function resolveElement(node, ctx, env) {
  const { errors } = env;
  if (node.name.startsWith('rev-')) {
    if (ctx.svg && !SVG_CONTAINERS.includes(node.name)) {
      errors.push(`${node.at}: <${node.name}> cannot go inside a Schema drawing; only SVG shapes and <rev-schema-layer>`);
      return null;
    }
    return resolveComponent(node, ctx, env);
  }
  if (node.name === 'template') {
    errors.push(`${node.at}: <template slot="…"> goes directly inside a <rev-…> tag`);
    return null;
  }
  if (ctx.svg) {
    if (!SVG.elements.includes(node.name)) {
      errors.push(`${node.at}: <${node.name}> is not part of the Schema drawing vocabulary (${SVG.elements.join(', ')})`);
      return null;
    }
    const attrs = {};
    for (const attr of node.attrs) {
      if (!SVG.attributes.includes(attr.name)) {
        errors.push(`${attr.at}: <${node.name}> takes no "${attr.name}" (allowed: ${SVG.attributes.join(', ')}); colors and sizes come from the classes`);
        continue;
      }
      if (attr.name === 'class') {
        const tokens = (attr.value ?? '').split(/\s+/).filter(Boolean);
        const unknown = tokens.filter((t) => !env.manifest.svg.classes.includes(t));
        if (unknown.length) errors.push(`${attr.at}: unknown Schema class ${unknown.map((t) => `"${t}"`).join(', ')} (allowed: ${env.manifest.svg.classes.join(', ')})`);
        attrs.class = tokens;
      } else attrs[attr.name] = attr.value ?? '';
    }
    return { kind: 'html', name: node.name, attrs, svg: true, children: resolveNodes(node.children, { svg: true, text: node.name === 'text' || node.name === 'tspan' }, env), at: node.at };
  }
  const allowed = PHRASING[node.name];
  if (!allowed) {
    errors.push(`${node.at}: <${node.name}> is not allowed; use a <rev-…> component (plain HTML is only ${Object.keys(PHRASING).join(', ')})`);
    return null;
  }
  const attrs = {};
  for (const attr of node.attrs) {
    if (!allowed.includes(attr.name)) errors.push(`${attr.at}: <${node.name}> takes no "${attr.name}"${allowed.length ? ` (only ${allowed.join(', ')})` : ''}`);
    else attrs[attr.name] = attr.value ?? '';
  }
  return { kind: 'html', name: node.name, attrs, svg: false, children: resolveNodes(node.children, { svg: false }, env), at: node.at };
}

function resolveComponent(node, ctx, env) {
  const { manifest, errors } = env;
  const spec = manifest.tags[node.name];
  const label = `<${node.name}>`;
  if (!spec) {
    const near = closest(node.name, Object.keys(manifest.tags));
    errors.push(`${node.at}: unknown tag ${label}${near ? ` (did you mean <${near}>?)` : ''}`);
    return null;
  }
  if (spec.unavailable) {
    errors.push(`${node.at}: ${label} cannot be used from a tag: it ${spec.unavailable}`);
    return null;
  }
  const inner = { svg: ctx.svg || SVG_CONTAINERS.includes(node.name) };
  const props = {};
  const given = new Set(node.attrs.map((a) => camel(a.name)));
  const attrNames = () => Object.keys(spec.props).filter((p) => p !== 'children').map(kebab).join(', ') || 'none';

  for (const attr of node.attrs) {
    const prop = camel(attr.name);
    if (attr.name !== kebab(prop) || !(prop in spec.props) || prop === 'children') {
      const hint = kebab(attr.name) in spec.props || camel(kebab(attr.name)) in spec.props ? ` (write it as ${kebab(attr.name)})` : '';
      errors.push(`${attr.at}: ${label} has no attribute "${attr.name}"${hint}; it takes: ${attrNames()}`);
      continue;
    }
    try {
      props[prop] = fromAttr(attr.value, spec.props[prop].type, `${label} ${attr.name}`, attr.at, env);
    } catch (error) {
      if (!(error instanceof TagError)) throw error;
      errors.push(`${attr.at}: ${error.message}`);
    }
  }

  const content = [];
  for (const child of node.children) {
    if (child.type !== 'element' || child.name !== 'template') {
      content.push(child);
      continue;
    }
    const slotAttr = child.attrs.find((a) => a.name === 'slot');
    if (!slotAttr?.value || child.attrs.length > 1) {
      errors.push(`${child.at}: <template> inside ${label} takes exactly one attribute, slot="prop-name"`);
      continue;
    }
    const prop = camel(slotAttr.value);
    const type = spec.props[prop]?.type;
    const isList = type?.array === 'node';
    if (slotAttr.value !== kebab(prop) || !(type === 'node' || isList) || prop === 'children') {
      const slots = Object.entries(spec.props).filter(([p, d]) => p !== 'children' && (d.type === 'node' || d.type?.array === 'node')).map(([p]) => kebab(p));
      errors.push(`${child.at}: ${label} has no content slot "${slotAttr.value}"; its slots are: ${slots.join(', ') || 'none'}`);
      continue;
    }
    const value = { $nodes: resolveNodes(child.children, inner, env) };
    if (isList) {
      if (prop in props && !Array.isArray(props[prop]?.templates)) errors.push(`${child.at}: ${label} gets ${slotAttr.value} both as an attribute and as templates`);
      else (props[prop] ??= { templates: [] }).templates.push(value);
    } else if (prop in props) errors.push(`${child.at}: ${label} gets ${slotAttr.value} twice`);
    else props[prop] = value;
  }
  for (const [prop, value] of Object.entries(props)) if (Array.isArray(value?.templates)) props[prop] = value.templates;

  const children = resolveNodes(content, inner, env);
  if (children.length) {
    if (spec.props.children) props.children = { $nodes: children };
    else errors.push(`${node.at}: ${label} takes no content; it takes: ${attrNames()}`);
  }

  for (const [prop, def] of Object.entries(spec.props)) {
    if (def.required && !(prop in props) && !given.has(prop)) errors.push(`${node.at}: ${label} needs ${prop === 'children' ? 'content' : `"${kebab(prop)}"`}`);
  }
  return { kind: 'component', tag: node.name, export: spec.export, component: spec.component, props, at: node.at };
}

function fromAttr(raw, type, label, at, env) {
  if (raw === null) {
    if (type === 'boolean') return true;
    throw new TagError(`${label} needs a value`);
  }
  if (type === 'string') return asImage(raw, label, env);
  if (type === 'number') return asNumber(raw, label);
  if (type === 'boolean') {
    if (raw === 'true' || raw === '') return true;
    if (raw === 'false') return false;
    throw new TagError(`${label} is true or false, not "${raw}"`);
  }
  if (type === 'node') return markup(raw, label, at, env);
  if (type.enum) {
    const value = type.enum.every((v) => typeof v === 'number') ? Number(raw) : raw;
    if (!type.enum.includes(value)) throw new TagError(`${label} is one of ${type.enum.join(', ')}, not "${raw}"`);
    return value;
  }
  let value;
  try {
    value = JSON.parse(raw);
  } catch {
    if (type.union?.includes('string')) return asImage(raw, label, env);
    throw new TagError(`${label} takes JSON (${describe(type)}); could not read "${raw.slice(0, 60)}"`);
  }
  return fromJson(value, type, label, at, env);
}

function fromJson(value, type, label, at, env) {
  if (type === 'json') return value;
  if (type === 'string') {
    if (typeof value !== 'string') throw new TagError(`${label} is a string, not ${JSON.stringify(value)}`);
    return asImage(value, label, env);
  }
  if (type === 'number') {
    if (typeof value !== 'number' || !Number.isFinite(value)) throw new TagError(`${label} is a number, not ${JSON.stringify(value)}`);
    return value;
  }
  if (type === 'boolean') {
    if (typeof value !== 'boolean') throw new TagError(`${label} is true or false, not ${JSON.stringify(value)}`);
    return value;
  }
  if (type === 'node') {
    if (typeof value !== 'string' && typeof value !== 'number') throw new TagError(`${label} is text (markup allowed), not ${JSON.stringify(value)}`);
    return markup(String(value), label, at, env);
  }
  if (type.enum) {
    if (!type.enum.includes(value)) throw new TagError(`${label} is one of ${type.enum.map((v) => JSON.stringify(v)).join(', ')}, not ${JSON.stringify(value)}`);
    return value;
  }
  if (type.array) {
    if (!Array.isArray(value)) throw new TagError(`${label} is a list (${describe(type)})`);
    return value.map((item, i) => fromJson(item, type.array, `${label}[${i}]`, at, env));
  }
  if (type.object || type.record) {
    if (typeof value !== 'object' || value === null || Array.isArray(value)) throw new TagError(`${label} is an object (${describe(type)})`);
    const out = {};
    for (const [key, item] of Object.entries(value)) {
      if (type.object && !(key in type.object)) throw new TagError(`${label} has no field "${key}"; it takes: ${Object.keys(type.object).join(', ')}`);
      out[key] = fromJson(item, type.record ?? type.object[key], `${label}.${key}`, at, env);
    }
    for (const key of type.required ?? []) if (!(key in value)) throw new TagError(`${label} needs the field "${key}"`);
    return out;
  }
  if (type.union) {
    const problems = [];
    for (const option of type.union) {
      try {
        return fromJson(value, option, label, at, env);
      } catch (error) {
        if (!(error instanceof TagError)) throw error;
        problems.push(error.message);
      }
    }
    throw new TagError(problems.join('; or '));
  }
  throw new TagError(`${label}: unsupported type ${JSON.stringify(type)}`);
}

function markup(text, label, at, env) {
  let parsed;
  try {
    parsed = parse(text, `${label} (${at})`);
  } catch (error) {
    if (error instanceof TagError) throw new TagError(error.message);
    throw error;
  }
  const before = env.errors.length;
  const nodes = resolveNodes(parsed, { svg: false }, env);
  if (env.errors.length > before) {
    const inner = env.errors.splice(before);
    throw new TagError(`${label}: ${inner.join('; ')}`);
  }
  return { $nodes: nodes };
}

function asNumber(raw, label) {
  const value = Number(raw);
  if (raw.trim() === '' || !Number.isFinite(value)) throw new TagError(`${label} is a number, not "${raw}"`);
  return value;
}

function asImage(value, label, env) {
  const file = value.split(/[?#]/)[0];
  if (!IMAGE.test(file) || value.startsWith('data:')) return value;
  if (REMOTE.test(value)) throw new TagError(`${label} points to a remote image (${value}); the page must work offline: save the file next to the document and use its path`);
  const full = path.resolve(env.baseDir, decodeURIComponent(file));
  let bytes;
  try {
    bytes = readFileSync(full);
  } catch {
    throw new TagError(`${label}: image not found: ${full}`);
  }
  const mime = MIME[path.extname(full).slice(1).toLowerCase()];
  return `data:${mime};base64,${bytes.toString('base64')}`;
}

function describe(type) {
  if (typeof type === 'string') return type;
  if (type.enum) return type.enum.map((v) => JSON.stringify(v)).join(' | ');
  if (type.array) return `[${describe(type.array)}]`;
  if (type.record) return `{ key: ${describe(type.record)} }`;
  if (type.object) return `{ ${Object.entries(type.object).map(([k, t]) => `${k}${type.required.includes(k) ? '' : '?'}: ${describe(t)}`).join(', ')} }`;
  if (type.union) return type.union.map(describe).join(' | ');
  return 'json';
}

function closest(name, names) {
  let best = null;
  let score = Infinity;
  for (const candidate of names) {
    const d = distance(name, candidate);
    if (d < score) [best, score] = [candidate, d];
  }
  return score <= Math.max(2, name.length / 4) ? best : null;
}

function distance(a, b) {
  const row = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let prev = row[0];
    row[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const next = row[j];
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = next;
    }
  }
  return row[b.length];
}

async function renderPage(nodes, { manifest, pieces, warnings }) {
  const load = (file) => import(pathToFileURL(path.join(pieces, file)).href);
  const used = new Set();
  walk(nodes, (n) => n.kind === 'component' && used.add(n.component));
  const modules = Object.fromEntries(await Promise.all([...used].map(async (name) => [name, await load(manifest.components[name].server)])));
  const rt = await load(manifest.runtime.server);
  const registry = rt.registryOf(...Object.values(modules));
  const h = rt.createElement;
  const info = (n) => manifest.components[n.component];
  const isIsland = (n) => n.kind === 'component' && Boolean(info(n).island) && n.export === n.component;
  const onClient = (n) => n.kind === 'html' || Boolean(info(n).island);
  const readsSteps = (n) => {
    let found = false;
    walk([n], (m) => {
      if (m.kind === 'component' && info(m).readsSteps) found = true;
    });
    return found;
  };

  let counter = 0;
  const nextId = () => `r${++counter}-`;
  const marks = {};
  const slots = {};
  const client = new Set();
  const islands = [];
  const fill = (html) => html.replace(/<ds-mark data-m="(m\d+)"><\/ds-mark>/g, (_, key) => marks[key]);

  const svgClass = (tokens) => tokens.map((t) => modules.Schema.schema[t]).join(' ');
  const htmlProps = (n) => {
    const props = {};
    for (const [key, value] of Object.entries(n.attrs)) props[key === 'class' ? 'className' : key] = key === 'class' ? svgClass(value) : value;
    return props;
  };

  const toElement = (n) => {
    if (typeof n === 'string') return n;
    if (n.kind === 'html') return h(n.name, htmlProps(n), ...n.children.map(toElement));
    if (isIsland(n)) {
      const key = `m${Object.keys(marks).length}`;
      marks[key] = renderIsland(n);
      return h('ds-mark', { 'data-m': key });
    }
    return h(registry.get(n.export), toProps(n.props));
  };
  const toNodes = (list) => (list.length === 1 ? toElement(list[0]) : list.map(toElement));
  const toProps = (value) => {
    if (Array.isArray(value)) return value.map(toProps);
    if (value && typeof value === 'object') {
      if (value.$nodes) return toNodes(value.$nodes);
      return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, toProps(v)]));
    }
    return value;
  };

  const slot = (list) => {
    const key = `s${Object.keys(slots).length}`;
    slots[key] = fill(rt.renderStatic(toNodes(list), nextId()));
    return { $slot: key };
  };
  const encodeNodes = (list, ctx) => {
    const items = [];
    let run = [];
    const flush = () => {
      if (!run.length) return;
      items.push(run.every((n) => typeof n === 'string') ? run.join('') : slot(run));
      run = [];
    };
    for (const n of list) {
      const inTree = typeof n !== 'string' && (ctx.svg || (ctx.steps && readsSteps(n) && onClient(n)));
      if (typeof n !== 'string' && ctx.steps && !inTree && readsSteps(n)) {
        warnings.push(`${n.at}: <${n.tag ?? n.name}> holds pieces that follow the steps of their <rev-steps>, but it has no island, so they run on their own; put them directly inside <rev-step>`);
      }
      if (!inTree) run.push(n);
      else {
        flush();
        items.push(encodeElement(n, ctx));
      }
    }
    flush();
    return items.length === 1 ? items[0] : items;
  };
  const encode = (value, ctx) => {
    if (Array.isArray(value)) return value.map((v) => encode(v, ctx));
    if (value && typeof value === 'object') {
      if (value.$nodes) return encodeNodes(value.$nodes, ctx);
      return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, encode(v, ctx)]));
    }
    return value;
  };
  const encodeElement = (n, ctx) => {
    if (n.kind === 'html') {
      const p = htmlProps(n);
      if (n.children.length) p.children = encodeNodes(n.children, { ...ctx, svg: n.svg });
      return { $el: n.name, p };
    }
    client.add(n.component);
    return { $el: n.export, p: encode(n.props, contextOf(n, ctx)) };
  };
  const contextOf = (n, ctx = { steps: false, svg: false }) => ({ steps: ctx.steps || n.export === 'Steps', svg: ctx.svg || SVG_CONTAINERS.includes(n.tag) });
  const renderIsland = (n) => {
    client.add(n.component);
    islands.push(n.export);
    const props = encode(n.props, contextOf(n));
    return rt.renderIsland(registry, { name: n.export, props, id: nextId(), slots });
  };

  const body = fill(rt.renderStatic(toNodes(nodes), nextId()));
  if (body.includes('<ds-mark')) throw new Error('540-ds renderer: an island was left unplaced');

  const text = (file) => readFile(path.join(pieces, file), 'utf8');
  const cssFiles = [manifest.base.css, ...new Set([...used].flatMap((name) => manifest.components[name].css))];
  let css = (await Promise.all(cssFiles.map(text))).join('\n');
  for (const font of manifest.base.fonts) {
    const b64 = (await readFile(path.join(pieces, font))).toString('base64');
    css = css.replaceAll(`url('../fonts/${path.basename(font)}')`, `url(data:font/woff2;base64,${b64})`);
  }
  css = css.replace(/<\/(style)/gi, '<\\/$1');

  const scriptFiles = client.size ? [manifest.runtime.client, ...[...client].map((name) => manifest.components[name].island)] : [];
  const scripts = (await Promise.all(scriptFiles.map(text))).map((code) => code.replace(/<\/(script)/gi, '<\\/$1'));
  return { body, css, scripts, components: [...used].sort(), islands: [...new Set(islands)].sort() };
}

function walk(nodes, visit) {
  const values = (value) => {
    if (Array.isArray(value)) value.forEach(values);
    else if (value && typeof value === 'object') {
      if (value.$nodes) walk(value.$nodes, visit);
      else Object.values(value).forEach(values);
    }
  };
  for (const n of nodes) {
    if (typeof n === 'string') continue;
    visit(n);
    if (n.kind === 'html') walk(n.children, visit);
    else values(n.props);
  }
}

function checkOffline(styles, body) {
  const css = [...styles.matchAll(/url\(\s*['"]?(?!data:|#)([^'")]+)/g)].map((m) => m[1]);
  const media = [...body.matchAll(/<(?:img|source|image)\b[^>]*?\s(?:src|srcset|href)="(?!data:|#)([^"]+)"/g)].map((m) => m[1]);
  const missing = [...new Set([...css, ...media])];
  if (missing.length) throw new TagError(`the page would need files from outside: ${missing.join(', ')}`);
}

function escapeHtml(value) {
  return String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}
