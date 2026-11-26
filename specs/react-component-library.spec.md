---
predictable: spec
---
# React component library

<!-- predictable:capability={"authors":["runner"],"backlog":false,"covers":["src/components","src/hooks"],"created":"","guidelines":[],"id":"SPEC-266","lastModified":"","lastVerified":"","proseDigest":"749b30c8870256d5","relatedSpecs":[]} -->
The design system is published on npm as @540deg/ds for React 19 projects: every catalog component (atoms, molecules, organisms) and TalkTemplate with their TypeScript types, and a single stylesheet, @540deg/ds/styles.css, with the tokens, the reset, the base styles, the embedded DM Sans font and the styles of every component. Components do not import CSS themselves, so they work with any bundler and on the server, and the package is free of side effects except for CSS so unused components are dropped.

Besides the talk pieces, the catalog covers the 540 website: Menu and NavMobile, Footer, Section and SectionHeader, Card, CardList, CaseItem, TeamMember, Form and Field, Carousel, Dialog, Grid, Lists, LogoCarousel, Marquee, Question and others. Each component exports its Props type and the lists of allowed values for its options, and documents itself through its JSDoc, its stories in Storybook and a sheet in Spanish saying when to use it and when not.

Storybook is the catalog: every story renders, passes the accessibility checks (a violation breaks CI unless the story is in the shrinking list of tolerated ones), and server-renders in Node without a browser.

## Behaviour

- The package exports every catalog component and TalkTemplate from its entry point.
  <!-- predictable:requirement={"analysisKey":null,"codeLocationsFile":null,"conflict":null,"enforcedBy":null,"id":"REQ-0001","origin":"authored","siblingVcs":[],"source":"manual","subject":null,"throwsError":null} -->
- Every story renders and passes the accessibility checks unless it is marked as tolerated.
  <!-- predictable:requirement={"analysisKey":null,"codeLocationsFile":null,"conflict":null,"enforcedBy":null,"id":"REQ-0002","origin":"authored","siblingVcs":[],"source":"manual","subject":null,"throwsError":null} -->
- Each component exports its Props type and the lists of allowed values for its options.
  <!-- predictable:requirement={"analysisKey":null,"codeLocationsFile":null,"conflict":null,"enforcedBy":null,"id":"REQ-0003","origin":"authored","siblingVcs":[],"source":"manual","subject":null,"throwsError":null} -->
