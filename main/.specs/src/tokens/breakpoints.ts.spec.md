---
predictable: spec
---
## Specification Details
- **ID:** SPEC-261
- **Name:** src/tokens/breakpoints.ts

### Description
`breakpoints.ts` — Breakpoints. This project's call graph records DIRECT calls only, so a function passed to a container, destructured into an exported binding, or reached through a dynamic lookup is not one it can see. Within that limit it records no call to this module. `BREAKPOINTS` maps `tablet` to `600` and `desktop` to `1024`; `DESIGN_WIDTHS` maps `mobile` to `375`, `tablet` to `768` and `desktop` to `1440`. No requirements recorded yet — 3 declarations were examined and no obligation was decided about them.
