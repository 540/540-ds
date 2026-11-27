---
predictable: spec
---
## Specification Details
- **ID:** SPEC-576
- **Name:** src/components/molecules/Carousel/types.ts

### Description
`types.ts` — Types. This project's call graph records DIRECT calls only, so a function passed to a container, destructured into an exported binding, or reached through a dynamic lookup is not one it can see. Within that limit it records no call to this module. `CarouselProps` carries `items`, `label`, `controls`, `header`, `itemWidth`, `autoplay`, `itemLabel` and `className`. `CarouselControls` is `(typeof CAROUSEL_CONTROLS)[number]`. No requirements recorded yet — 2 declarations were examined and no obligation was decided about them.
