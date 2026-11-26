---
predictable: spec
---
## Specification Details
- **ID:** SPEC-072
- **Name:** src/charts/tones.ts

### Description
`tones.ts` — Tones. Called from `BarSeries.BarSeries`, `LineChart.LineChart` and `Scatter.Scatter`, and possibly from places the call graph cannot see. `ChartTone` is `(typeof CHART_TONES)[number]`. No requirements recorded yet — 1 operation was examined and no obligation was decided about it.

### Declarations

`tones` — Declares 1 function: `defaultTone`(`i`) — “The tone of the i-th series when it has none: the first in ink, the rest in gray.”
