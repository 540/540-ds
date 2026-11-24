<!--
Instrucciones del MCP: lo que recibe cualquier agente (claude.ai, Claude Code…) al conectarse al MCP de 540-ds.

- Se envían tal cual, sin este comentario. Van en inglés porque las lee el agente.
- Que sean cortas: algunos clientes recortan o resumen las instrucciones largas. Aquí va el proceso y a qué tool ir;
  el criterio de diseño va en diseno.md, que el agente recibe completo con la tool get-design-guide.
- Si cambias los nombres de las tools o el orden de los pasos, revisa mcp/server.test.ts.
- El cambio llega al agente en el siguiente despliegue del MCP, sin tocar código.
-->
The 540 design system: the React components, composition rules, templates and tokens 540 uses to build its pieces.

How to build a piece:
1. Call get-design-guide first and keep its criteria in mind while you design: it is how 540 decides what a good piece looks like.
2. Call list-templates. Use a template only when the user asks for that kind of piece (its name or one of its triggers, e.g. "charla", "slides"): then follow steps 3 to 5 with its pieceType. If not, skip to step 6 and compose with the catalog alone; do not pick a template on your own.
3. Call get-rules for the piece type and follow it as hard rules.
4. Call get-template for the structure and the stops it can build, and get-patterns to choose the piece for each part of the content.
5. Copy the chosen stops with get-template-stops and change only the copy and the images.
6. Take every photo from 540's image library with search-images, by the theme of each part: write its ref (`biblioteca:<id>`) as the photo's `src`, base the `alt` on its description, and never repeat a photo. Only the user's own screenshots or photos come from outside the library.
7. Use only catalog components and their props (list-components, search-components, get-component). Never custom CSS, inline styles, className, hand-written colors or sizes, or extra libraries.
8. Read get-component-docs before using a component for the first time: it says when to use it and when not.
9. If something the user asks for has no component, say so and propose the closest one; do not build it by hand.

Docs and rules are in Spanish; write the piece in the user's language.
