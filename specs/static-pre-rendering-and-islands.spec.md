---
predictable: spec
---
# Static pre-rendering and islands

<!-- predictable:capability={"authors":["runner"],"backlog":false,"covers":[],"created":"","guidelines":[],"id":"SPEC-268","lastModified":"","lastVerified":"","proseDigest":"89133354f2041b41","relatedSpecs":[]} -->
Components are pre-rendered to static HTML, and only interactive ones are brought to life in the browser as islands. The pieces build (build:pieces) produces, for each component, a server module bundled with Preact for pre-rendering in Node, its stylesheet, and, for the fourteen interactive components, an island script, together with a manifest listing each component's module, stylesheets in load order, island and whether it reads the steps of Steps.

An island is rendered on the server inside a ds-island element carrying its component name and its props as JSON. Static content passed to it as children travels as ds-slot elements that Preact leaves untouched, so islands inside them hydrate on their own, and a slot mounted again on the client has its new islands hydrated too. Decoding the props on the client revives slots and nested elements from the registry of components. Components that read the Steps context go inside the Steps island instead of travelling as slots. Dialog is not an island because its onClose function cannot travel as JSON.

Every story must server-render in Node without touching window, document or localStorage while rendering, and a talk assembled with Deck, Steps, Count, Carousel and Statements must hydrate in jsdom without errors.

## Behaviour

- An island is rendered as a ds-island element carrying its component name and its props as JSON.
  <!-- predictable:requirement={"analysisKey":null,"codeLocationsFile":null,"conflict":null,"enforcedBy":null,"id":"REQ-0001","origin":"authored","siblingVcs":[],"source":"manual","subject":null,"throwsError":null} -->
- Static children of an island travel as ds-slot elements that client-side rendering leaves untouched.
  <!-- predictable:requirement={"analysisKey":null,"codeLocationsFile":null,"conflict":null,"enforcedBy":null,"id":"REQ-0002","origin":"authored","siblingVcs":[],"source":"manual","subject":null,"throwsError":null} -->
- Components that read the Steps context are placed inside the Steps island instead of in slots.
  <!-- predictable:requirement={"analysisKey":null,"codeLocationsFile":null,"conflict":null,"enforcedBy":null,"id":"REQ-0003","origin":"authored","siblingVcs":[],"source":"manual","subject":null,"throwsError":null} -->
- Every story server-renders in Node without a browser.
  <!-- predictable:requirement={"analysisKey":null,"codeLocationsFile":null,"conflict":null,"enforcedBy":null,"id":"REQ-0004","origin":"authored","siblingVcs":[],"source":"manual","subject":null,"throwsError":null} -->
- A talk with Deck, Steps, Count, Carousel and Statements hydrates without errors.
  <!-- predictable:requirement={"analysisKey":null,"codeLocationsFile":null,"conflict":null,"enforcedBy":null,"id":"REQ-0005","origin":"authored","siblingVcs":[],"source":"manual","subject":null,"throwsError":null} -->
