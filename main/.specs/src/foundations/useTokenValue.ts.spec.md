---
predictable: spec
---
## Specification Details
- **ID:** SPEC-217
- **Name:** src/foundations/useTokenValue.ts

### Description
`useTokenValue.ts` — Use token value. Called from `ColorSwatch.ColorSwatch`, `MeasureTable.Row`, `RadiusSamples.Sample` and `TypeSpecimens.Specimen`, and possibly from places the call graph cannot see. `toHex` builds `h`, and no requirement here is about what runs inside it. No requirements recorded yet — 3 operations were examined and no obligation was decided about them.

### Declarations

`useTokenValue` — Declares 3 functions: `useTokenValue`(`name`) — “Reads the live computed value of a CSS custom property from <html>.”, `useResolvedValue`(`name`, `property`) — “Resolves a token to its final value (follows var() chains) using a probe element.” and `toHex`(`css`) — “Converts "rgb(r, g, b)" / "rgba(r, g, b, a)" to "#rrggbb" or "#rrggbbaa" for display.”
