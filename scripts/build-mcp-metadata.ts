/**
 * Builds mcp/metadata.json: everything the MCP server knows about the design system,
 * extracted from the code at build time so requests never parse TypeScript.
 *
 *   npm run build-mcp-metadata            writes the file and prints the gaps report
 *   npm run build-mcp-metadata -- --strict  also exits with 1 when there are gaps (for CI)
 *
 * Sources (all inside this repo):
 *   - components: src/components/{atoms,molecules,organisms}/<Name>/ and src/templates/<Name>/
 *       description  JSDoc of the exported function in <Name>.tsx
 *       props        exported <Export>Props types, only the props declared in src/ (not the native HTML ones)
 *       defaults     the <NAME>_DEFAULTS constant in types.ts
 *       stories      exported stories of <Name>.stories.tsx, without the ones tagged 'dev' (Playground)
 *       docs         _docs/<Name>.md
 *   - tokens: the semantic CSS files in src/tokens (never the --540-* primitives)
 *   - rules:  src/docs/normas-*.md, one per piece type
 */
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import ts from 'typescript';
import type { ComponentLevel, ComponentMeta, Metadata, PropDef, StoryDef, Token, TokenCategory } from '../mcp/types.ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = path.join(root, 'src');
const outputPath = path.join(root, 'mcp', 'metadata.json');
const STORYBOOK_URL = 'https://ds.540deg.com';

const LEVEL_DIRS: Array<{ level: ComponentLevel; dir: string }> = [
  { level: 'atom', dir: path.join(src, 'components', 'atoms') },
  { level: 'molecule', dir: path.join(src, 'components', 'molecules') },
  { level: 'organism', dir: path.join(src, 'components', 'organisms') },
  { level: 'template', dir: path.join(src, 'templates') },
];

/** Rules file → piece type it governs. */
const RULE_FILES: Record<string, string> = {
  'normas-charlas.md': 'talk',
};

const read = (file: string) => fs.readFileSync(file, 'utf-8');
const rel = (file: string) => path.relative(root, file).split(path.sep).join('/');
const isOwnSource = (file: string) => file.startsWith(src) && !file.includes('node_modules');

// ── TypeScript program ───────────────────────────────────────────────────────

function createProgram(files: string[]): ts.Program {
  const configPath = path.join(root, 'tsconfig.app.json');
  const config = ts.readConfigFile(configPath, ts.sys.readFile);
  const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, root);
  return ts.createProgram(files, { ...parsed.options, noEmit: true });
}

function docComment(symbol: ts.Symbol, checker: ts.TypeChecker): string | null {
  const text = ts.displayPartsToString(symbol.getDocumentationComment(checker)).trim();
  return text || null;
}

function resolveAlias(symbol: ts.Symbol, checker: ts.TypeChecker): ts.Symbol {
  return symbol.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(symbol) : symbol;
}

/** `X as const`, `X satisfies T`, `(X)` → X */
function unwrap(expr: ts.Expression): ts.Expression {
  while (ts.isAsExpression(expr) || ts.isSatisfiesExpression(expr) || ts.isParenthesizedExpression(expr)) {
    expr = expr.expression;
  }
  return expr;
}

function propertyName(name: ts.PropertyName): string {
  return ts.isIdentifier(name) || ts.isStringLiteral(name) ? name.text : name.getText();
}

/** A literal as plain JSON when possible, else its source text. */
function literalValue(expr: ts.Expression): unknown {
  expr = unwrap(expr);
  if (ts.isStringLiteral(expr) || ts.isNoSubstitutionTemplateLiteral(expr)) return expr.text;
  if (ts.isNumericLiteral(expr)) return Number(expr.text);
  if (expr.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (expr.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (expr.kind === ts.SyntaxKind.NullKeyword) return null;
  if (ts.isPrefixUnaryExpression(expr) && expr.operator === ts.SyntaxKind.MinusToken && ts.isNumericLiteral(expr.operand)) {
    return -Number(expr.operand.text);
  }
  if (ts.isArrayLiteralExpression(expr)) return expr.elements.map(literalValue);
  if (ts.isObjectLiteralExpression(expr)) {
    const out: Record<string, unknown> = {};
    for (const p of expr.properties) {
      if (ts.isPropertyAssignment(p)) out[propertyName(p.name)] = literalValue(p.initializer);
    }
    return out;
  }
  return expr.getText();
}

const toConstantCase = (name: string) => name.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toUpperCase();

// ── Props ────────────────────────────────────────────────────────────────────

const TYPE_FLAGS = ts.TypeFormatFlags.NoTruncation | ts.TypeFormatFlags.UseAliasDefinedOutsideCurrentScope;

/** Props the MCP never shows: a piece is built with the components' own props, never with custom classes or styles. */
const HIDDEN_PROPS = new Set(['className', 'style']);

/**
 * A type written as a reference to something outside src/ (ReactNode, ReactElement, MouseEvent…)
 * is kept as written; expanding it would print React's internals. Our own aliases are expanded,
 * so the agent sees `"primary" | "outline"` instead of `ButtonVariant`.
 */
function externalTypeText(prop: ts.Symbol, checker: ts.TypeChecker): string | null {
  for (const decl of prop.getDeclarations() ?? []) {
    if (!ts.isPropertySignature(decl) || !decl.type) continue;
    const nodes = ts.isUnionTypeNode(decl.type) ? decl.type.types : [decl.type];
    const allExternal = nodes.every((node) => {
      if (node.kind === ts.SyntaxKind.UndefinedKeyword) return true;
      if (!ts.isTypeReferenceNode(node)) return false;
      const symbol = checker.getSymbolAtLocation(node.typeName);
      const target = symbol && resolveAlias(symbol, checker);
      return !(target?.getDeclarations() ?? []).some((d) => isOwnSource(d.getSourceFile().fileName));
    });
    if (allExternal) {
      return nodes
        .filter((n) => n.kind !== ts.SyntaxKind.UndefinedKeyword)
        .map((n) => n.getText())
        .join(' | ');
    }
  }
  return null;
}

/**
 * Props of a (possibly union) props type, keeping only the ones declared in src/.
 * In a union a prop is required only when every member requires it, and its type
 * is the union of what each member allows (minus `undefined` and `never`).
 */
function extractProps(propsType: ts.Type, checker: ts.TypeChecker, defaults: Record<string, unknown>): PropDef[] {
  const members = propsType.isUnion() ? propsType.types : [propsType];
  const byName = new Map<string, { types: Set<string>; requiredIn: number; presentIn: number; description: string | null }>();

  for (const member of members) {
    for (const prop of checker.getPropertiesOfType(member)) {
      const decls = prop.getDeclarations() ?? [];
      if (HIDDEN_PROPS.has(prop.name) || !decls.some((d) => isOwnSource(d.getSourceFile().fileName))) continue;

      const entry = byName.get(prop.name) ?? { types: new Set<string>(), requiredIn: 0, presentIn: 0, description: null };
      entry.presentIn += 1;
      if (!(prop.flags & ts.SymbolFlags.Optional)) entry.requiredIn += 1;
      entry.description ??= docComment(prop, checker);

      const external = externalTypeText(prop, checker);
      if (external) {
        entry.types.add(external);
      } else {
        const propType = checker.getNonNullableType(checker.getTypeOfSymbol(prop));
        const parts = propType.isUnion() && !propType.aliasSymbol ? propType.types : [propType];
        for (const part of parts) {
          const text = checker.typeToString(part, undefined, TYPE_FLAGS);
          if (text !== 'undefined' && text !== 'never') entry.types.add(text);
        }
      }
      byName.set(prop.name, entry);
    }
  }

  return [...byName].map(([name, e]) => ({
    name,
    type: collapseBooleans([...e.types]).join(' | ') || 'never',
    required: e.requiredIn === members.length,
    default: name in defaults ? defaults[name] : null,
    description: e.description,
  }));
}

/** `false | true` → `boolean` */
function collapseBooleans(types: string[]): string[] {
  if (!types.includes('true') || !types.includes('false')) return types;
  return [...types.filter((t) => t !== 'true' && t !== 'false'), 'boolean'];
}

// ── Stories ──────────────────────────────────────────────────────────────────

/** Storybook's sanitize() and storyNameFromExport(), so ids match the published Storybook. */
const sanitize = (s: string) =>
  s
    .toLowerCase()
    .replace(/[ ’–—―′¿'`~!@#$%^&*()_|+\-=?;:'",.<>{}[\]\\/]/gi, '-')
    .replace(/-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
const startCase = (s: string) =>
  s
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .replace(/([a-zA-Z])(\d)/g, '$1 $2')
    .replace(/^./, (c) => c.toUpperCase());

function objectProp(obj: ts.ObjectLiteralExpression, key: string): ts.Expression | undefined {
  for (const p of obj.properties) {
    if (ts.isPropertyAssignment(p) && propertyName(p.name) === key) return p.initializer;
  }
  return undefined;
}

function pathProp(expr: ts.Expression | undefined, keys: string[]): ts.Expression | undefined {
  for (const key of keys) {
    if (!expr) return undefined;
    expr = unwrap(expr);
    if (!ts.isObjectLiteralExpression(expr)) return undefined;
    expr = objectProp(expr, key);
  }
  return expr;
}

function stringOf(expr: ts.Expression | undefined): string | null {
  if (!expr) return null;
  const v = literalValue(expr);
  return typeof v === 'string' ? v : null;
}

function leadingJsDoc(node: ts.Node, sf: ts.SourceFile): string | null {
  const ranges = ts.getLeadingCommentRanges(sf.text, node.getFullStart()) ?? [];
  const last = ranges.at(-1);
  if (!last) return null;
  const text = sf.text.slice(last.pos, last.end);
  if (!text.startsWith('/**')) return null;
  return text
    .replace(/^\/\*\*|\*\/$/g, '')
    .split('\n')
    .map((l) => l.replace(/^\s*\* ?/, ''))
    .join('\n')
    .trim();
}

function extractStories(file: string, sf: ts.SourceFile): { title: string | null; stories: StoryDef[] } {
  let title: string | null = null;
  const stories: StoryDef[] = [];

  for (const stmt of sf.statements) {
    if (!ts.isVariableStatement(stmt)) continue;
    const exported = stmt.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword) ?? false;

    for (const decl of stmt.declarationList.declarations) {
      if (!ts.isIdentifier(decl.name) || !decl.initializer) continue;
      const init = unwrap(decl.initializer);
      if (!ts.isObjectLiteralExpression(init)) continue;

      if (!exported) {
        title ??= stringOf(objectProp(init, 'title'));
        continue;
      }

      const tags = literalValue(objectProp(init, 'tags') ?? ts.factory.createArrayLiteralExpression());
      if (Array.isArray(tags) && tags.includes('dev')) continue;

      const exportName = decl.name.text;
      stories.push({
        exportName,
        name: stringOf(objectProp(init, 'name')) ?? startCase(exportName),
        id: '', // filled once the title is known
        url: '',
        description: stringOf(pathProp(init, ['parameters', 'docs', 'description', 'story'])) ?? leadingJsDoc(stmt, sf),
        code: init.getText(sf),
      });
    }
  }

  for (const story of stories) {
    if (!title) break;
    story.id = `${sanitize(title)}--${sanitize(startCase(story.exportName))}`;
    story.url = `${STORYBOOK_URL}/?path=/story/${story.id}`;
  }
  if (!title) console.warn(`  ! no meta title in ${rel(file)}`);
  return { title, stories };
}

// ── Components ───────────────────────────────────────────────────────────────

function findComponentDirs(): Array<{ level: ComponentLevel; name: string; dir: string }> {
  return LEVEL_DIRS.flatMap(({ level, dir }) =>
    fs
      .readdirSync(dir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => ({ level, name: d.name, dir: path.join(dir, d.name) })),
  );
}

function buildComponents(): Record<string, ComponentMeta> {
  const dirs = findComponentDirs();
  const entryFiles = dirs.flatMap(({ name, dir }) =>
    [path.join(dir, 'index.ts'), path.join(dir, `${name}.stories.tsx`)].filter((f) => fs.existsSync(f)),
  );
  const program = createProgram(entryFiles);
  const checker = program.getTypeChecker();
  const components: Record<string, ComponentMeta> = {};

  for (const { level, name, dir } of dirs) {
    const indexFile = path.join(dir, 'index.ts');
    const indexSf = program.getSourceFile(indexFile);
    const moduleSymbol = indexSf && checker.getSymbolAtLocation(indexSf);
    const exports = moduleSymbol ? checker.getExportsOfModule(moduleSymbol) : [];

    // Defaults: every exported *_DEFAULTS constant, by name.
    const defaultsByConst = new Map<string, Record<string, unknown>>();
    for (const exp of exports) {
      if (!exp.name.endsWith('_DEFAULTS')) continue;
      const decl = resolveAlias(exp, checker).valueDeclaration;
      if (decl && ts.isVariableDeclaration(decl) && decl.initializer) {
        const value = literalValue(decl.initializer);
        if (value && typeof value === 'object' && !Array.isArray(value)) defaultsByConst.set(exp.name, value as Record<string, unknown>);
      }
    }

    // Constants with the allowed values of a prop (BUTTON_VARIANTS…), useful to the agent as-is.
    const constants: Record<string, unknown> = {};
    for (const exp of exports) {
      if (!/^[A-Z][A-Z0-9_]+$/.test(exp.name) || exp.name.endsWith('_DEFAULTS')) continue;
      const decl = resolveAlias(exp, checker).valueDeclaration;
      if (decl && ts.isVariableDeclaration(decl) && decl.initializer) constants[exp.name] = literalValue(decl.initializer);
    }

    // Other exported values in camelCase (the `schema` class vocabulary, hooks…): name, JSDoc and keys.
    const helpers: ComponentMeta['helpers'] = [];
    for (const exp of exports) {
      const target = resolveAlias(exp, checker);
      if (!/^[a-z]/.test(exp.name) || !(target.flags & (ts.SymbolFlags.Function | ts.SymbolFlags.Variable))) continue;
      const decl = target.valueDeclaration;
      const init = decl && ts.isVariableDeclaration(decl) && decl.initializer ? unwrap(decl.initializer) : undefined;
      helpers.push({
        name: exp.name,
        description: docComment(target, checker),
        keys: init && ts.isObjectLiteralExpression(init) ? init.properties.flatMap((p) => (p.name ? [propertyName(p.name)] : [])) : null,
      });
    }

    // Exported React components (PascalCase values) and their <Name>Props types.
    const typeExports = new Map(exports.filter((e) => resolveAlias(e, checker).flags & ts.SymbolFlags.Type).map((e) => [e.name, e]));
    const parts: ComponentMeta['parts'] = [];
    let description: string | null = null;
    let props: PropDef[] = [];

    for (const exp of exports) {
      const target = resolveAlias(exp, checker);
      if (!/^[A-Z][a-z]/.test(exp.name) || !(target.flags & (ts.SymbolFlags.Function | ts.SymbolFlags.Variable))) continue;

      const propsSymbol = typeExports.get(`${exp.name}Props`);
      const defaults = defaultsByConst.get(`${toConstantCase(exp.name)}_DEFAULTS`) ?? {};
      const partProps = propsSymbol ? extractProps(checker.getDeclaredTypeOfSymbol(resolveAlias(propsSymbol, checker)), checker, defaults) : [];
      const partDescription = docComment(target, checker);

      if (exp.name === name) {
        description = partDescription;
        props = partProps;
      } else {
        parts.push({ name: exp.name, description: partDescription, props: partProps });
      }
    }

    const storiesFile = path.join(dir, `${name}.stories.tsx`);
    const storiesSf = program.getSourceFile(storiesFile);
    const { title, stories } = storiesSf ? extractStories(storiesFile, storiesSf) : { title: null, stories: [] };

    const docsFile = path.join(dir, '_docs', `${name}.md`);
    const id = name.toLowerCase();
    components[id] = {
      id,
      name,
      level,
      path: rel(dir),
      storybookTitle: title,
      docsUrl: title ? `${STORYBOOK_URL}/?path=/docs/${sanitize(title)}--docs` : null,
      description,
      props,
      parts,
      constants,
      helpers,
      stories,
      docs: fs.existsSync(docsFile) ? read(docsFile) : '',
    };
  }
  return components;
}

// ── Tokens ───────────────────────────────────────────────────────────────────

const TOKEN_FILES: Record<TokenCategory, string> = {
  color: 'semantic-color.css',
  measure: 'semantic-measure.css',
  typography: 'semantic-typography.css',
};

function parsePrimitives(): Map<string, string> {
  const map = new Map<string, string>();
  for (const m of read(path.join(src, 'tokens', 'primitives.css')).matchAll(/(--540-[\w-]+)\s*:\s*([^;]+);/g)) {
    map.set(m[1], m[2].trim().replace(/\s+/g, ' '));
  }
  return map;
}

/** var(--540-x) → its raw value, recursively; other values untouched. */
function resolveValue(value: string, primitives: Map<string, string>, depth = 0): string {
  if (depth > 5) return value;
  return value.replace(/var\((--540-[\w-]+)\)/g, (match, name: string) =>
    primitives.has(name) ? resolveValue(primitives.get(name)!, primitives, depth + 1) : match,
  );
}

/**
 * Reads `--name: value; /* note *\/` declarations, remembering the group comment above them
 * and the context they live in: base (light, mobile), dark theme, desktop (>= 1024px) or
 * projection scale. Values found outside the base context are attached to the base token.
 */
function parseTokens(category: TokenCategory, primitives: Map<string, string>): Token[] {
  const css = read(path.join(src, 'tokens', TOKEN_FILES[category]));
  const tokens = new Map<string, Token>();
  const contexts: string[] = [];
  let group: string | null = null;

  for (const raw of css.split('\n')) {
    const line = raw.trim();
    if (line.endsWith('{')) {
      contexts.push(line);
      group = null;
      continue;
    }
    if (line.startsWith('}')) {
      contexts.pop();
      continue;
    }
    const groupComment = line.match(/^\/\*\s*(.+?)\s*\*\/$/);
    if (groupComment && contexts.length) {
      group = groupComment[1];
      continue;
    }
    const decl = line.match(/^(--[\w-]+)\s*:\s*([^;]+);\s*(?:\/\*\s*(.+?)\s*\*\/)?/);
    if (!decl) continue;

    const [, name, rawValue, note] = decl;
    const ctx = contexts.join(' ');
    const mode = ctx.includes("'dark'") ? 'dark' : ctx.includes('min-width: 1024px') ? 'desktop' : ctx.includes('projection') ? 'projection' : 'base';
    const value = { value: rawValue.trim(), resolved: resolveValue(rawValue.trim(), primitives) };

    if (mode === 'base') {
      tokens.set(name, { name, category, group, ...value, note: note ?? null });
    } else {
      const token = tokens.get(name) ?? { name, category, group, value: '', resolved: '', note: null };
      token[mode] = value;
      tokens.set(name, token);
    }
  }
  return [...tokens.values()];
}

// ── Rules ────────────────────────────────────────────────────────────────────

function buildRules(): Metadata['rules'] {
  const rules: Metadata['rules'] = {};
  for (const [file, pieceType] of Object.entries(RULE_FILES)) {
    const full = path.join(src, 'docs', file);
    if (fs.existsSync(full)) rules[pieceType] = { source: rel(full), content: read(full) };
  }
  return rules;
}

// ── Gaps report (task 15) ────────────────────────────────────────────────────

function reportGaps(components: Record<string, ComponentMeta>): string[] {
  const gaps: string[] = [];
  for (const c of Object.values(components)) {
    // A folder that only groups parts (Lists → ArrowList, ProblemList…) has no main component to describe.
    if (!c.description && !(c.parts.length && !c.props.length)) gaps.push(`${c.name}: no JSDoc description on the component`);
    if (!c.docs) gaps.push(`${c.name}: no _docs/${c.name}.md`);
    if (!c.stories.length) gaps.push(`${c.name}: no stories (besides Playground)`);
    for (const p of c.props) if (!p.description) gaps.push(`${c.name}.${p.name}: prop without JSDoc`);
    for (const part of c.parts) {
      if (!part.description) gaps.push(`${part.name} (part of ${c.name}): no JSDoc description`);
      for (const p of part.props) if (!p.description) gaps.push(`${part.name}.${p.name}: prop without JSDoc`);
    }
  }
  return gaps;
}

// ── Main ─────────────────────────────────────────────────────────────────────

/** The whole metadata, built in memory. Used by main() and by the MCP tests. */
export function buildMetadata(): Metadata {
  const pkg = JSON.parse(read(path.join(root, 'package.json')));
  const primitives = parsePrimitives();
  return {
    version: pkg.version,
    storybookUrl: STORYBOOK_URL,
    components: buildComponents(),
    tokens: {
      color: parseTokens('color', primitives),
      measure: parseTokens('measure', primitives),
      typography: parseTokens('typography', primitives),
    },
    rules: buildRules(),
  };
}

function main() {
  const metadata = buildMetadata();
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, `${JSON.stringify(metadata, null, 2)}\n`);

  const count = Object.keys(metadata.components).length;
  const tokenCount = Object.values(metadata.tokens).reduce((n, t) => n + t.length, 0);
  const kb = Math.round(fs.statSync(outputPath).size / 1024);
  console.log(`✓ ${rel(outputPath)}: ${count} components, ${tokenCount} tokens, ${Object.keys(metadata.rules).length} rule sets (${kb} KB)`);

  const gaps = reportGaps(metadata.components);
  if (gaps.length) {
    console.log(`\n${gaps.length} gaps for the MCP:`);
    for (const g of gaps) console.log(`  - ${g}`);
    if (process.argv.includes('--strict')) process.exit(1);
  }
}

// Run only as a script, not when the tests import buildMetadata().
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
