---
predictable: spec
---
## Specification Details
- **ID:** SPEC-230
- **Name:** src/components/organisms/Steps/StepsContext.ts

### Description
`StepsContext.ts` — Steps context. Called from at least 9 other places in the project. `StepsState` carries `current`, `total` and `guided`. No requirements recorded yet — 2 operations were examined and no obligation was decided about them.

### Declarations

`StepsContext` — Declares 2 functions: `useSteps`() — “The current step of the surrounding Steps block (Infinity outside one: everything visible).” and `useStepOn`() — “Whether the surrounding Step is on (true outside any Step).”
