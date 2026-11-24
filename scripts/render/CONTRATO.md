# Contrato de etiquetas `<rev-…>`

> **Acordado** con la pista B (el MCP) el 13 de noviembre de 2026. El MCP lee los props de este mismo contrato (`manifest.json` → `tags`), así que el render y el MCP usan siempre las mismas etiquetas.

Una charla se escribe como un fragmento HTML con etiquetas `<rev-…>`. `540-ds-render` (el ejecutable del paquete `@540deg/ds`) lo convierte en un único `.html` autocontenido que funciona sin conexión. El contrato no se escribe a mano: `build:pieces` lo saca de los nombres de los componentes y de sus tipos `Props`, y lo deja en `manifest.json` (`tags`, `phrasing`, `svg`). Si un componente cambia, el contrato cambia con él.

## Nombres

| En el código | En la etiqueta |
| --- | --- |
| Export `GridItem` del componente `Grid` | `<rev-grid-item>` |
| Prop `storageKey` | atributo `storage-key` |
| Prop `children` | el contenido de la etiqueta |

Cada export de componente con mayúscula es una etiqueta (hoy 62). `className`, `style`, `key`, `ref`, los atributos DOM heredados y los callbacks opcionales no son atributos. `Dialog` y `ThemeToggle` aparecen marcados como `unavailable`: necesitan una función (`onClose`, `onToggle`) que una etiqueta no puede pasar.

## Valores de los atributos

| Tipo en `manifest.json` | Cómo se escribe | Ejemplo |
| --- | --- | --- |
| `string` | tal cual | `id="bloque-1"` |
| `number` | número | `value="1234"` |
| `boolean` | presente es `true`; también `"true"` / `"false"` | `guided` |
| `{ enum }` | uno de los valores | `tone="raised"` |
| `node` | texto con el HTML de frase permitido | `title="Lo que <strong>medimos</strong>"` |
| `{ array }`, `{ object }`, `{ record }`, `{ union }` | JSON | `photo='{"src":"fachada.webp","alt":"Fachada"}'` |

- Dentro del JSON, los campos `node` son también texto con HTML de frase.
- Un prop `node` o lista de `node` puede ir, en vez de en el atributo, como `<template slot="nombre-del-prop">…</template>`; para una lista se repite el `template` una vez por elemento.
- HTML de frase permitido: `strong`, `em`, `b`, `i`, `code`, `small`, `sub`, `sup`, `br` y `a href`. Nada más: ni `div`, ni `class`, ni `style`.
- Imágenes: cualquier cadena que acabe en `.png`, `.jpg`, `.webp`, `.avif`, `.gif` o `.svg` es una ruta relativa al documento y se incrusta en base64. Las URL remotas son error.
- Fotos de la biblioteca: `biblioteca:<id>`, con los `id` de `manifest.json` → `images` (las fotos van en `images/` del paquete). El render las incrusta en base64 como cualquier otra. Un `id` que no existe es error, con sugerencia; una foto de la biblioteca repetida en la charla, aviso.
- Dentro de `<rev-schema>` y `<rev-schema-layer>` se dibuja en SVG con los elementos y atributos de `manifest.svg` y solo con las clases del vocabulario de `Schema` (`svg.classes`), sin colores ni estilos.
- Un `<title>` opcional, fuera de cualquier etiqueta, da el título de la página.

## Qué hace el render

- Falla con todos los problemas a la vez, con línea y columna: etiqueta o atributo desconocido (con sugerencia), valor fuera del enum, campo JSON que sobra o falta, prop obligatorio ausente, imagen remota o inexistente.
- Pre-renderiza todo a HTML estático e incluye solo el CSS de `base.css` y de los componentes usados, con DM Sans incrustada.
- Añade JavaScript (runtime de Preact + scripts de isla) solo si la charla usa algún componente interactivo. Una charla solo con piezas estáticas sale sin ningún `<script>`.
- Dentro de `<rev-steps>`, lo que sigue los pasos (`Step`, `Count`, `Sheet`, `Schema` y todas las gráficas: `Bars`, `Share`, `LineChart`, `BarSeries`, `Dumbbell`, `Funnel`, `ProgressRing`, `Waffle`, `Heatmap`, `Scatter`) entra en la isla de `Steps`. Si un envoltorio estático (`<rev-stack>`, `<rev-grid>`…) lo separa de sus pasos, avisa: esa pieza no seguirá los pasos.
- En una charla en castellano, avisa de cada palabra que no está en el diccionario de español ni en el de inglés, con la línea donde aparece por primera vez, cuántas veces sale y sugerencias. Da por buenas las palabras de `render/palabras-540.txt`, los nombres propios (con mayúscula), las siglas, lo que va en `<code>` y los atributos que no son texto (`src`, `href`, `id`, `variant`…).
- Avisa cuando la charla se repite (normas de charlas, «Variedad»): si una forma de parada pasa del 30 % de las paradas de contenido del `<rev-deck>`, o si dos paradas seguidas tienen la misma forma. La forma de una parada es su etiqueta y las piezas del catálogo que lleva dentro, sin contar las de maquetación (`rev-stack`, `rev-grid`, `rev-text`, `rev-section-header`…). La portada, los títulos de bloque y el cierre no cuentan.
- Avisa de una foto grande con una frase debajo (un `rev-slide` con `rev-image` y un `rev-text` de `variant="statement"` juntos): no es una parada de 540; el texto va al lado de su imagen. Avisa también si el texto junto a una foto (`rev-section-header` o `rev-text` dentro de un `rev-grid` con una `rev-image`) lleva `align="start"`: va centrado, como en el resto de paradas.
- Fija la versión del sistema con `<meta name="540-ds-version">`.

## Ejemplo

```html
<title>Una charla</title>
<rev-deck items='[{"href":"#bloque-1","label":"Bloque"}]'>
  <rev-cover title='["Una charla","de prueba"]' photo='{"src":"portada.webp","alt":"Portada"}'></rev-cover>
  <rev-block-title id="bloque-1" ordinal="01" title="El bloque" photo='{"src":"bloque.webp","alt":"Bloque"}'></rev-block-title>
  <rev-slide id="tesis">
    <rev-statements>
      <template slot="sentences">Una idea.</template>
      <template slot="sentences">Otra <strong>idea</strong>.</template>
    </rev-statements>
  </rev-slide>
</rev-deck>
```

```bash
npx -y --package=@540deg/ds@X.Y.Z 540-ds-render charla.rev.html                               # escribe charla.html
npx -y --package=@540deg/ds@X.Y.Z 540-ds-render charla.rev.html -o salida.html --lang en
npx -y --package=@540deg/ds@X.Y.Z 540-ds-render --tags GridItem rev-metric                    # props de esas etiquetas
```

## La misma charla en el navegador (runtime)

Donde no hay Node (un artifact de claude.ai, por ejemplo), la charla la pinta el navegador al abrirla. Las etiquetas son las mismas; van dentro de un bloque `<script type="text/rev">`, junto al script del runtime con la versión fijada:

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@540deg/ds@X.Y.Z/pieces/runtime/runtime.js"></script>
<script type="text/rev" data-lang="es">
<title>Una charla</title>
<rev-deck items='[{"href":"#bloque-1","label":"Bloque"}]'>
  <rev-cover title='["Una charla","de prueba"]' photo='{"src":"data:image/webp;base64,…","alt":"Portada"}'></rev-cover>
  …
</rev-deck>
</script>
```

- Fuera del bloque solo va el script del runtime (y, si acaso, el esqueleto de la página: `doctype`, `html`, `head`, `body`, `meta`). Un bloque por página.
- **Fotos**: las de la biblioteca se escriben igual, `biblioteca:<id>`, y se cargan de jsDelivr con la misma versión que el resto. Las demás no tienen carpeta junto a la charla, así que van incrustadas como `data:image/…;base64,…`. Una ruta es error; una URL remota, también, como en el render.
- `data-lang` da el idioma de la página (por defecto `es`).
- El runtime valida igual que el render (comparten `render/core.mjs`). Con errores no pinta nada: enseña un panel con todos, con línea y sugerencia, y un botón para copiarlos. Las líneas cuentan desde la etiqueta `<script type="text/rev">`. Los avisos salen en el mismo panel, pero la charla se pinta.
- Carga de jsDelivr solo el JS y el CSS de los componentes que usa la charla y las fotos de la biblioteca que lleva, y nada más. Sin JavaScript no hay charla: para enviar o archivar, se usa el render.
- El render acepta este mismo fichero y escribe la misma página que el runtime (`npm run check:runtime` lo comprueba en Chromium). Las líneas de sus errores cuentan desde el principio del fichero.

`X.Y.Z` es la versión que fija quien lo llama (la skill 540-ds del toolkit). Dentro de este repo, con las piezas
construidas, vale también `node pieces/render/cli.mjs`.

Sale con código 1 si el documento tiene errores y 2 si la llamada está mal.
