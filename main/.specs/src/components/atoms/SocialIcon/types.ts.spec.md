---
predictable: spec
---
## Specification Details
- **ID:** SPEC-288
- **Name:** src/components/atoms/SocialIcon/types.ts

### Description
`types.ts` — Types. This project's call graph records DIRECT calls only, so a function passed to a container, destructured into an exported binding, or reached through a dynamic lookup is not one it can see. Within that limit it records no call to this module. `SocialNetwork` is `(typeof SOCIAL_NETWORKS)[number]` and `SocialIconSize` is `(typeof SOCIAL_ICON_SIZES)[number]`. It also declares `SocialIconProps`, whose target is too long to state here. No requirements recorded yet — 3 declarations were examined and no obligation was decided about them.
