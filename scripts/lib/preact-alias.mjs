import path from 'node:path';

/** react → preact/compat, shared by the pieces build and the islands tests so both see the same module graph. */
export function preactAlias(root) {
  const compat = path.join(root, 'src/runtime/compat/react.ts');
  return [
    { find: /^react$/, replacement: compat },
    { find: /^react-dom$/, replacement: compat },
    { find: /^react-dom\/client$/, replacement: 'preact/compat/client' },
    { find: /^react\/jsx-(dev-)?runtime$/, replacement: 'preact/compat/jsx-runtime' },
  ];
}
