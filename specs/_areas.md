---
predictable: areas
---

# Areas

- **Design Tokens**: The foundational values for color, type, spacing, and breakpoints that every component is built from.
- **Components**: The React component library organized by complexity, from basic building blocks up to full page sections.
  - **Atoms**: The smallest building blocks such as buttons, text, images, and icons.
  - **Molecules**: Small groups of atoms combined into reusable pieces like cards, fields, menus, and footers.
  - **Organisms**: Larger composed sections such as decks, slides, forms, and timelines built from molecules and atoms.
- **Templates**: Full page layouts, such as the talk template, that arrange organisms into a finished screen.
- **Foundations Docs**: Storybook documentation pages that showcase color, type, radius, and measurement foundations.
- **Runtime**: The client and server runtime that hydrates islands, renders on the server, and bridges to Preact/React.
  - **App Shell**: The root application entry and setup files that wire the design system together for rendering.
- **Hooks**: Shared interactive behaviors like reveal animations and centered-state tracking used across components.
- **MCP Server**: The MCP server that lets an AI agent consult the 540 design system while assembling a piece.
  - **MCP Tools**: The individual queries an agent can call, such as fetching a component, its docs, stories, patterns, rules, or the template and its stops.
  - **MCP Transports**: The ways the MCP server can be run and reached, over stdio, HTTP, or as a Firebase function.
- **Build Scripts**: The scripts that build the component library, the MCP metadata, and the Firebase deployment bundle.
  - **Piece Checks**: Scripts that render and validate assembled pieces, checking islands and DOM output against the tag contract rules.
