# 540 Design System

El sistema de diseño de 540 en código: tokens, componentes React y documentación en Storybook. Sirve para montar las presentaciones de las charlas y la web con las mismas piezas.

## Arrancarlo en un Mac

Necesitas Node.js (versión 24 o superior) y Git. Si no los tienes, se instalan con Homebrew:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew install node git
```

Después, en la app Terminal:

```bash
cd ~/Projects/540-ds
npm install
npm run storybook
```

Se abre solo en el navegador en `http://localhost:6006`. Para pararlo, Ctrl + C en la Terminal.

Otros comandos útiles:

| Comando | Qué hace |
|---|---|
| `npm run storybook` | Arranca el catálogo en local |
| `npm run build-storybook` | Genera la versión estática para compartir (carpeta `storybook-static`) |
| `npx vitest run --project=storybook` | Pasa las pruebas de todas las historias (render y accesibilidad) |
| `npx tsc -p tsconfig.app.json --noEmit` | Comprueba los tipos de TypeScript |

## Cómo está organizado

```
src/
  tokens/            los valores con nombre (CSS)
    primitives.css         primitivos: --540-*
    semantic-color.css     colores por uso, con modo claro y oscuro
    semantic-typography.css  los trece estilos de texto y la escala de proyección
    semantic-measure.css   espacio, rellenos, tamaños, retícula, radios
    breakpoints.ts         los dos saltos (600 y 1024), como constantes
    manifest.ts            nombres y descripciones para las páginas de Fundamentos
  foundations/       las páginas de Fundamentos de Storybook
  components/
    atoms/           Text, Button, Logo, Image, ThemeToggle, Bullets, MenuItem, SocialIcon, Count
    molecules/       SectionHeader, Section, Card, Menu, CaseItem, TeamMember, Footer, NavMobile, Field, Carousel, Dialog, Grid, Question, Lists, Screenshot, Metric, Stack
    organisms/       Deck, Slide, Cover, Closing, Statements, BlockTitle, Story, Quote, Punchline, Timeline, Flow, Tools, Marquee, CardList, Form, LogoCarousel, DeckFooter, Blobs, Steps, Cycle, Sheet, ProgressBar, Heartbeat, Spotlight, Schema, Bars, Share
  templates/         TalkTemplate: la charla completa, con todas las paradas posibles
  hooks/             useReveal: cuándo una pieza entra en pantalla (contadores y gráficas)
  styles/global.css  reset y estilos base
  assets/            logotipo de 540 y muestras para las historias
.storybook/          configuración de Storybook (tema con la marca, barra de herramientas, portada de cada página)
```

Cada componente vive en su carpeta con la misma estructura:

```
Button/
  Button.tsx          el componente
  Button.module.css   sus estilos (CSS Modules, solo tokens semánticos)
  types.ts            opciones, tipos y valores por defecto
  index.ts            lo que se exporta
  Button.stories.tsx  las historias y los controles de Storybook
  _docs/Button.md     la ficha, en español
```

## Cómo cambiar un token

Los tokens están en `src/tokens`. Hay dos niveles:

- **Primitivos** (`primitives.css`): el valor en bruto con nombre. Por ejemplo `--540-accent-yellow: #fef401;`.
- **Semánticos** (`semantic-*.css`): el uso, apuntando a un primitivo. Por ejemplo `--color-bg-accent: var(--540-accent-yellow);`. Los componentes solo usan estos.

Para **cambiar un valor** (un gris, un tamaño), edita el primitivo en `primitives.css`. Todo lo que lo use cambia a la vez, y las páginas de Fundamentos enseñan el valor nuevo porque lo leen del CSS.

Para **cambiar a qué apunta un uso** (que los bordes fuertes usen otro gris), edita el semántico en `semantic-color.css`. Hay un bloque para el tema claro (`:root`) y otro para el oscuro (`[data-theme='dark']`).

## Cómo añadir un color

1. Añade el primitivo en `src/tokens/primitives.css`, en su grupo, con el prefijo `--540-`:
   ```css
   --540-status-blue: #2a5db0;
   ```
2. Si va a tener un uso propio, añade el semántico en `src/tokens/semantic-color.css`, en el bloque claro y en el oscuro:
   ```css
   --color-text-info: var(--540-status-blue);
   ```
3. Añádelo a `src/tokens/manifest.ts` para que salga en la página **Fundamentos / Color**: en `colorPrimitives` el primitivo y en `semanticColors` el semántico, con su descripción.
4. Guarda y mira la página de Color en Storybook.

Lo mismo vale para un tamaño de espacio o de letra: primitivo, semántico y manifest.

## Normas para montar una charla

Están en `src/docs/normas-charlas.md` y se leen en Storybook en **Introducción / Normas para charlas**. Son obligatorias para cualquier presentación hecha con el sistema, la monte una persona o un agente: estructura, fotos de bloque, texto, márgenes, dónde puede ir el amarillo, efectos y la lista final de comprobación. El `CLAUDE.md` del proyecto obliga a leerlas antes de montar una charla con Claude.

## Cómo pedir un componente nuevo

Abre Claude Code en la carpeta del proyecto y pídeselo con estos datos:

- **Qué es y para qué sirve**, en una frase.
- **Dónde está en Figma** (el enlace a la página) o **en qué charla** se usa, si existe ya.
- **Variantes, tamaños y estados** que necesita, o «decide tú» si no lo sabes.
- **En qué nivel va**: átomo, molécula u organismo.

Ejemplo:

> Crea el componente Badge. Es una etiqueta pequeña para marcar un estado («Nuevo», «Borrador»). Está en la página Badge del Figma. Variantes neutral y accent, un solo tamaño. Es un átomo.

El componente se creará con la misma estructura que los demás (componente, estilos, tipos, historias y ficha), con su página Docs en Storybook y pasando las pruebas de accesibilidad.

## Cómo compartir el catálogo con el equipo

```bash
npm run build-storybook
```

Deja una carpeta `storybook-static` con el catálogo completo en archivos estáticos. Se puede:

- **Abrir en local**: haz doble clic en `storybook-static/index.html`.
- **Mandar comprimida**: comprime la carpeta y envíala; quien la reciba la descomprime y abre `index.html`, sin instalar nada.
- **Publicar**: sube la carpeta a cualquier servicio de páginas estáticas (Netlify, Vercel, GitHub Pages) y comparte la URL.

La carpeta no se guarda en Git (está en `.gitignore`): se genera cada vez.

## Piezas por componente (para la skill 540)

```bash
npm run build:pieces && npm run check:pieces
```

Deja en `pieces/` lo que la skill necesita para montar un HTML autocontenido sin este repo ni `node_modules`:

| Carpeta | Qué hay |
| --- | --- |
| `server/` | Un módulo ESM por componente, con React dentro, para pre-renderizar en Node. `runtime.js` trae `renderIsland`, `renderStatic` y `registryOf`. |
| `css/` | `base.css` (tokens, reset y DM Sans) y una hoja por componente. |
| `islands/` | `runtime.js` (React + hidratación) y un script por cada uno de los 14 componentes interactivos. |
| `fonts/` | DM Sans variable, subconjunto latino, con su licencia SIL OFL. |
| `manifest.json` | Versión, y por componente: su módulo, sus hojas en orden de carga y su isla, si la tiene. |

Cómo funciona una isla (el contrato está en `src/runtime/islands.ts`): el componente se pinta en el servidor dentro de `<ds-island>` con sus props en JSON; en el navegador, `runtime.js` lo hidrata. El contenido estático que recibe como hijo va en `<ds-slot>` y React no lo toca, así que las islas que hay dentro se hidratan solas. Lo que lee el contexto de `Steps` (`Step`, `Count`, `Bars`, `Sheet`, `Schema`, `Share`) entra en el árbol de la isla de `Steps` en vez de ir como slot. `Dialog` no es isla: se abre y se cierra con `open` y `onClose`, y una función no viaja en el JSON de las props; quien lo use desde una isla lo lleva dentro de su script. `check:pieces` monta una charla con Deck, Steps, Count, Carousel y Statements y comprueba en jsdom que todo hidrata sin errores.

`TalkTemplate` no entra en las piezas: es una charla de ejemplo con fotos de muestra, no un componente que se rellene. La carpeta no se guarda en Git.

## Fuentes de verdad

1. Este código.
2. Las charlas anteriores (`base-540.css`, `navegacion-540.js` y su guía de estilos), de donde salen las piezas de presentación.
3. El archivo de Figma «540 · Design System», de donde se copian las fichas de los componentes. Si Figma y el código discrepan, manda el código.
