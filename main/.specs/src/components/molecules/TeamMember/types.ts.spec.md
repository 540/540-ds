---
predictable: spec
---
## Specification Details
- **ID:** SPEC-466
- **Name:** src/components/molecules/TeamMember/types.ts

### Description
`types.ts` — Types. This project's call graph records DIRECT calls only, so a function passed to a container, destructured into an exported binding, or reached through a dynamic lookup is not one it can see. Within that limit it records no call to this module. `TeamMemberProps` carries `src`, `name`, `role`, `bio`, `align`, `href`, `level` and `className`. `TeamMemberAlign` is `(typeof TEAM_MEMBER_ALIGNS)[number]`. No requirements recorded yet — 2 declarations were examined and no obligation was decided about them.
