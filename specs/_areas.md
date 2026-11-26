---
predictable: areas
---

# Areas

- **Design System Library**: The published React component and token library that is the product of this repository.
  - **Tokens**: The design tokens such as breakpoints and color manifests that underlie the visual system.
  - **Foundations**: The reference pages showing color, type, spacing, and radius primitives behind the components.
  - **Atoms**: The smallest reusable interface pieces like buttons, text, images, and icons.
  - **Molecules**: Small composed components like cards, fields, menus, and section headers built from atoms.
  - **Organisms**: Larger composed building blocks such as slides, decks, charts, and timelines used to assemble full pieces.
  - **Charts**: The chart building blocks such as legends, scales, and data tables used by data visualization organisms.
  - **Templates**: Full page templates, such as the talk template, that arrange components into a finished piece.
  - **Runtime**: The client and server runtime that renders components, hydrates islands, and serves pages.
  - **App Shell**: The top level app entry and setup files that wire the library together for preview and rendering.
- **MCP Server**: A server that lets an AI agent query the 540 design system while it assembles a piece of content.
  - **MCP Tools**: The individual queries an agent can call, covering components, patterns, templates, tokens, rules, and images.
  - **MCP Transports**: The ways the server can be reached, over HTTP, stdio, or Firebase hosting.
  - **MCP Metadata**: The generated metadata and image catalog describing components, patterns, and tokens for the tools to read.
- **Build and Check Scripts**: The command line scripts that build, render, and validate the design system and its pieces.
  - **Piece Rendering**: The scripts that render a finished piece from the template and check its structure, spelling, and rules.
  - **Validation Checks**: Scripts that check islands, pieces, primitives, and runtime behavior stay correct as the library changes.
  - **Runtime Panel**: A debugging overlay panel used while checking rendered pieces at runtime.
