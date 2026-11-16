---
predictable: spec
---
## Specification Details
- **ID:** SPEC-210
- **Name:** src/hooks/useReveal.ts

### Description
`useReveal.ts` — Use reveal. Called from `Bars.Bars`, `Count.Count` and `Share.Share`, and possibly from places the call graph cannot see. At run time it reaches `StepsContext`. No requirements recorded yet — 4 operations were examined and no obligation was decided about them.

### Declarations

`useReveal` — Declares 4 functions: `subscribeReducedMotion`(`onChange`) (internal), `readReducedMotion`() (internal), `serverReducedMotion`() (internal) and `useReveal`(`ref`) — “Whether a piece should show its final state: it is on screen (a third of it, at least) and its Step, if any, is on.”

### Notation

On the cards: `internal` — nothing outside this file can reach the operation (a `private` member, or a declaration the module does not export), so a requirement here is not addressed to anybody outside it.
