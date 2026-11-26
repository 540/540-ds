---
predictable: spec
---
# Data charts

<!-- predictable:capability={"authors":["runner"],"backlog":false,"covers":[],"created":"","guidelines":[],"id":"SPEC-264","lastModified":"","lastVerified":"","proseDigest":"89133354f2041b41","relatedSpecs":[]} -->
Talks and pages tell numbers with a family of chart components: LineChart for change over time, Bars and BarSeries for amounts, Dumbbell for before and after, Funnel, ProgressRing, Waffle, Heatmap and Scatter, plus Metric and Count for a single big figure. They share the building blocks in src/charts: three tones (ink for the main series, context for the rest, accent only where the talk rules allow it), a scale that rounds the axis to nice numbers, a number format for the language with fixed decimals and a unit, a legend, and a data table.

Every chart draws itself when it enters the screen (useReveal), and draws its final state straight away when the user prefers reduced motion or when rendered on the server. The drawing is decorative for assistive technology: each chart carries the same data as a table that only screen readers see, with a caption, column headers and one header cell per row.

The axis scale takes the lowest and highest values and returns a rounded minimum, maximum and evenly spaced ticks that cover them; positions along an axis are the value's fraction between that minimum and maximum, and a flat range places everything at the start instead of dividing by zero.

## Behaviour

- niceScale returns a rounded minimum and maximum that cover the given values, with evenly spaced ticks.
  <!-- predictable:requirement={"analysisKey":null,"codeLocationsFile":null,"conflict":null,"enforcedBy":null,"id":"REQ-0001","origin":"authored","siblingVcs":[],"source":"manual","subject":null,"throwsError":null} -->
- position returns 0 when the minimum equals the maximum instead of dividing by zero.
  <!-- predictable:requirement={"analysisKey":null,"codeLocationsFile":null,"conflict":null,"enforcedBy":null,"id":"REQ-0002","origin":"authored","siblingVcs":[],"source":"manual","subject":null,"throwsError":null} -->
- The first series of a chart uses the ink tone and every other series the context tone by default.
  <!-- predictable:requirement={"analysisKey":null,"codeLocationsFile":null,"conflict":null,"enforcedBy":null,"id":"REQ-0003","origin":"authored","siblingVcs":[],"source":"manual","subject":null,"throwsError":null} -->
- Every chart carries its data as a table visible only to screen readers, with a caption, column headers and row headers.
  <!-- predictable:requirement={"analysisKey":null,"codeLocationsFile":null,"conflict":null,"enforcedBy":null,"id":"REQ-0004","origin":"authored","siblingVcs":[],"source":"manual","subject":null,"throwsError":null} -->
- A chart draws its final state at once when the user prefers reduced motion or when rendered on the server.
  <!-- predictable:requirement={"analysisKey":null,"codeLocationsFile":null,"conflict":null,"enforcedBy":null,"id":"REQ-0005","origin":"authored","siblingVcs":[],"source":"manual","subject":null,"throwsError":null} -->
