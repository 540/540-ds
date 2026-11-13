import path from 'node:path';
import ts from 'typescript';

const IGNORED = new Set(['className', 'style', 'key', 'ref']);

/** "GridItem" → "rev-grid-item". */
export function tagName(exportName) {
  return `rev-${exportName.replace(/([a-z0-9])([A-Z])/g, '$1-$2').replace(/([A-Z])([A-Z][a-z])/g, '$1-$2').toLowerCase()}`;
}

/** "storageKey" → "storage-key". */
export function attrName(prop) {
  return prop.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * The props every component export takes from a tag, read from its TypeScript Props type.
 * Only props declared in src/components count (inherited DOM attributes, className and callbacks stay out).
 */
export function readContract(root, components) {
  const program = ts.createProgram(
    components.map((c) => c.entry),
    { target: ts.ScriptTarget.ES2023, module: ts.ModuleKind.ESNext, moduleResolution: ts.ModuleResolutionKind.Bundler, jsx: ts.JsxEmit.ReactJSX, strict: true, skipLibCheck: true, noEmit: true, allowImportingTsExtensions: true },
  );
  const checker = program.getTypeChecker();
  const own = path.join(root, 'src');
  const isOwn = (decl) => path.resolve(decl.getSourceFile().fileName).startsWith(own);

  const isNode = (type) => {
    const alias = type.aliasSymbol?.name;
    if (alias === 'ReactNode' || alias === 'ReactElement') return true;
    const name = type.getSymbol()?.name;
    return name === 'ReactElement' || name === 'ReactPortal';
  };

  const describe = (type, depth = 0) => {
    if (depth > 6) return 'json';
    if (isNode(type)) return 'node';
    if (type.flags & (ts.TypeFlags.Undefined | ts.TypeFlags.Null | ts.TypeFlags.Void)) return 'none';
    if (type.isUnion()) {
      const parts = type.types.filter((t) => !(t.flags & (ts.TypeFlags.Undefined | ts.TypeFlags.Null)));
      if (parts.some(isNode)) return 'node';
      if (parts.length && parts.every((t) => t.flags & ts.TypeFlags.BooleanLiteral)) return 'boolean';
      if (parts.length && parts.every((t) => t.isLiteral())) return { enum: parts.map((t) => t.value).sort(byValue) };
      if (parts.length === 1) return describe(parts[0], depth);
      const described = parts.map((t) => describe(t, depth + 1)).filter((d) => d !== 'function');
      return described.length ? described.reduce(mergeTypes) : 'function';
    }
    if (type.flags & ts.TypeFlags.StringLike) return type.isStringLiteral() ? { enum: [type.value] } : 'string';
    if (type.flags & ts.TypeFlags.NumberLike) return type.isNumberLiteral() ? { enum: [type.value] } : 'number';
    if (type.flags & ts.TypeFlags.BooleanLike) return 'boolean';
    if (type.getCallSignatures().length) return 'function';
    if (checker.isArrayType(type) || checker.isTupleType(type)) {
      const [item] = checker.getTypeArguments(type);
      return { array: item ? describe(item, depth + 1) : 'json' };
    }
    if (type.flags & ts.TypeFlags.Object) {
      const [index] = checker.getIndexInfosOfType(type);
      if (index) return { record: describe(index.type, depth + 1) };
      const fields = {};
      const required = [];
      for (const prop of checker.getPropertiesOfType(type)) {
        const decl = prop.valueDeclaration ?? prop.declarations?.[0];
        if (!decl || IGNORED.has(prop.name)) continue;
        const d = describe(checker.getTypeOfSymbolAtLocation(prop, decl), depth + 1);
        if (d === 'function' || d === 'none') continue;
        fields[prop.name] = d;
        if (!(prop.flags & ts.SymbolFlags.Optional)) required.push(prop.name);
      }
      return { object: fields, required };
    }
    return 'json';
  };

  /** The props of one export, or the callbacks it cannot do without (then it is not a tag). */
  const propsOf = (symbol) => {
    const param = checker.getTypeOfSymbol(symbol).getCallSignatures()[0]?.getParameters()[0];
    if (!param) return { props: {}, callbacks: [] };
    const propsType = checker.getTypeOfSymbol(param);
    const members = propsType.isUnion() ? propsType.types : [propsType];
    const props = {};
    const seen = {};
    const callbacks = [];
    for (const member of members) {
      for (const prop of checker.getPropertiesOfType(member)) {
        const decls = (prop.declarations ?? []).filter(isOwn);
        if (!decls.length || IGNORED.has(prop.name)) continue;
        const d = describe(checker.getTypeOfSymbolAtLocation(prop, decls[0]));
        const required = !(prop.flags & ts.SymbolFlags.Optional);
        if (d === 'function') {
          if (required) callbacks.push(prop.name);
          continue;
        }
        seen[prop.name] = (seen[prop.name] ?? 0) + (d === 'none' ? 0 : 1);
        if (d === 'none') continue;
        const doc = ts.displayPartsToString(prop.getDocumentationComment(checker)).trim();
        const prev = props[prop.name];
        props[prop.name] = { type: prev ? mergeTypes(prev.type, d) : d, required: (prev?.required ?? true) && required, ...(doc ? { doc } : {}) };
      }
    }
    for (const [name, prop] of Object.entries(props)) if (seen[name] < members.length) prop.required = false;
    return { props, callbacks };
  };

  const contract = {};
  for (const component of components) {
    const source = program.getSourceFile(component.entry);
    const moduleSymbol = source && checker.getSymbolAtLocation(source);
    if (!moduleSymbol) throw new Error(`No module for ${component.name}`);
    for (const exported of checker.getExportsOfModule(moduleSymbol)) {
      if (!/^[A-Z][a-z]/.test(exported.name)) continue;
      const symbol = exported.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(exported) : exported;
      if (!(symbol.flags & (ts.SymbolFlags.Function | ts.SymbolFlags.Variable))) continue;
      if (!checker.getTypeOfSymbol(symbol).getCallSignatures().length) continue;
      const { props, callbacks } = propsOf(symbol);
      contract[exported.name] = callbacks.length ? { component: component.name, unavailable: `needs ${callbacks.join(', ')}, a function a tag cannot pass` } : { component: component.name, props };
    }
  }
  return contract;
}

const byValue = (a, b) => (typeof a === 'number' && typeof b === 'number' ? a - b : 0);

function mergeTypes(a, b) {
  if (JSON.stringify(a) === JSON.stringify(b)) return a;
  const list = [...(a.union ?? [a]), ...(b.union ?? [b])];
  const unique = list.filter((t, i) => list.findIndex((u) => JSON.stringify(u) === JSON.stringify(t)) === i);
  return unique.length === 1 ? unique[0] : { union: unique };
}
