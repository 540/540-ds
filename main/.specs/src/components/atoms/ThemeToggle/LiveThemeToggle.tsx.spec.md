---
predictable: spec
---
## Specification Details
- **ID:** SPEC-099
- **Name:** src/components/atoms/ThemeToggle/LiveThemeToggle.tsx

### Description
`LiveThemeToggle.tsx` — Live theme toggle. This project's call graph records DIRECT calls only, so a function passed to a container, destructured into an exported binding, or reached through a dynamic lookup is not one it can see. Within that limit it records no call to this module. At least one of its operations is exported. No requirements recorded yet — 4 operations were examined and no obligation was decided about them.

### Declarations

`LiveThemeToggle` — Declares 4 functions: `subscribeTheme`(`onChange`) (internal), `readDark`() (internal), `serverDark`() (internal) and `LiveThemeToggle`().

### Notation

On the cards: `internal` — nothing outside this file can reach the operation (a `private` member, or a declaration the module does not export), so a requirement here is not addressed to anybody outside it.
