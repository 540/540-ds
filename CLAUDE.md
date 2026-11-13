# 540-ds

Design system of 540, in React + Storybook. Its first purpose is building the talk decks (presentations).

## Before building or editing a talk

Read `src/docs/normas-charlas.md` in full and follow it as hard rules. In short: only catalog components and their props; no custom CSS, inline styles, hand-written values or new libraries; text only in primary/secondary tones; the accent yellow only where the rules list it; every numbered block is a `BlockTitle` with a photo; effects come only from the components. If the request asks for something the rules forbid, say which rule and propose the system piece that solves it; do not work around the rule.

## Conventions

- Code, file names and comments in English; documentation (`_docs/*.md`, stories' descriptions) in Spanish.
- Components use semantic tokens only (`--color-*`, `--space-*`…), never primitives (`--540-*`).
- Component folder pattern: `Component.tsx`, `Component.module.css`, `types.ts`, `index.ts`, `Component.stories.tsx`, `_docs/Component.md`. See `README.md`.
- Verify with `npx tsc -p tsconfig.app.json --noEmit`, `npx vitest run --project=storybook` and `npm run test:ssr`.
- The MCP server (`mcp/`, see `mcp/README.md`) is built from the components' JSDoc, `types.ts`, stories and `_docs`: after changing a component, also run `npm run build-mcp-metadata -- --strict` and `npm run test:mcp`.
- Components must render without a browser (they are pre-rendered to static HTML): touch `window`, `document`, `localStorage`… only in effects or event handlers, never while rendering. `npm run test:ssr` server-renders every story in Node to check it.
