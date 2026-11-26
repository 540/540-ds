---
predictable: spec
---
## Specification Details
- **ID:** SPEC-065
- **Name:** scripts/render/cli.mjs

### Description
`cli.mjs` — Cli. This project's call graph records DIRECT calls only, so a function passed to a container, destructured into an exported binding, or reached through a dynamic lookup is not one it can see. Within that limit it records no call to this module. It refuses to start, logging “usage: 540-ds-render <talk.rev.html> [-o talk.html] [--lang es (default: data-lang of the runtime block, or es)] [--pieces <folder with manifest.json>]
       540-ds-render --contract           print the <rev-…> tag contract (CONTRATO.md)
       540-ds-render --tags [tag…]        print the props of every tag, or of the ones named (rev-grid-item, grid-item or GridItem)
       540-ds-render --version            print the design system version”. No requirements recorded yet — 1 operation was examined and no obligation was decided about it.

### Declarations

`cli.mjs` — Declares 1 function: `readManifest`() (internal).

### Notation

On the cards: `internal` — nothing outside this file can reach the operation (a `private` member, or a declaration the module does not export), so a requirement here is not addressed to anybody outside it.
