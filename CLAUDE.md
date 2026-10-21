# 540-ds

Design system of 540, in React + Storybook. Its first purpose is building the talk decks (presentations).

## Before building or editing a talk

Read `src/docs/normas-charlas.md` in full and follow it as hard rules. In short: only catalog components and their props; no custom CSS, inline styles, hand-written values or new libraries; text only in primary/secondary tones; the accent yellow only where the rules list it; every numbered block is a `BlockTitle` with a photo; effects come only from the components. If the request asks for something the rules forbid, say which rule and propose the system piece that solves it; do not work around the rule.

## Conventions

- Code, file names and comments in English; documentation (`_docs/*.md`, stories' descriptions) in Spanish.
- Components use semantic tokens only (`--color-*`, `--space-*`…), never primitives (`--540-*`).
- Component folder pattern: `Component.tsx`, `Component.module.css`, `types.ts`, `index.ts`, `Component.stories.tsx`, `_docs/Component.md`. See `README.md`.
- Verify with `npx tsc -p tsconfig.app.json --noEmit` and `npx vitest run --project=storybook`.
