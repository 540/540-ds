---
predictable: spec
---
# Design tokens and themes

<!-- predictable:capability={"authors":["runner"],"backlog":false,"covers":["src/tokens","src/foundations"],"created":"","guidelines":[],"id":"SPEC-265","lastModified":"","lastVerified":"","proseDigest":"48f56229fefa7035","relatedSpecs":[]} -->
The look of 540 is written as design tokens in src/tokens. Primitives (--540-*) hold the raw named values: the brand colours, sizes and type. Semantic tokens (--color-*, --space-*, text styles, measures, radii, effects) name a use and point to a primitive, with a light block on :root and a dark block under data-theme='dark', and a projection scale for talks. Components use only semantic tokens; the lint step fails when a primitive appears in a component, and the list of files still allowed to use them can only shrink.

Two breakpoints, 600 and 1024 pixels, are exported as constants with their design widths and ready-made media queries. The token manifest names and describes every primitive and semantic token so that the Foundations pages in Storybook (colour, type, spacing, radius, screen widths, image library) show them, reading the current values from the CSS.

The theme is light or dark. Outside a Deck the light theme is the one on :root and the dark one is switched on by data-theme='dark' on an ancestor; ThemeToggle switches it, and a Deck keeps its own theme.

## Behaviour

- Components use only semantic tokens, and the lint fails when a primitive --540-* token appears in a component file outside the allowed list.
  <!-- predictable:requirement={"analysisKey":null,"codeLocationsFile":null,"conflict":null,"enforcedBy":null,"id":"REQ-0001","origin":"authored","siblingVcs":[],"source":"manual","subject":null,"throwsError":null} -->
- The breakpoints are 600 and 1024 pixels.
  <!-- predictable:requirement={"analysisKey":null,"codeLocationsFile":null,"conflict":null,"enforcedBy":null,"id":"REQ-0002","origin":"authored","siblingVcs":[],"source":"manual","subject":null,"throwsError":null} -->
- Every semantic colour token has a light and a dark value.
  <!-- predictable:requirement={"analysisKey":null,"codeLocationsFile":null,"conflict":null,"enforcedBy":null,"id":"REQ-0003","origin":"authored","siblingVcs":[],"source":"manual","subject":null,"throwsError":null} -->
