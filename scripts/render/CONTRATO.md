# Contrato de etiquetas `<rev-…>`

> **Acordado** con la pista B (el MCP) el 13 de noviembre de 2026. El MCP lee los props de este mismo contrato (`manifest.json` → `tags`), así que el render y el MCP usan siempre las mismas etiquetas.

Una charla se escribe como un fragmento HTML con etiquetas `<rev-…>`. `render/cli.mjs` lo convierte en un único `.html` autocontenido que funciona sin conexión. El contrato no se escribe a mano: `build:pieces` lo saca de los nombres de los componentes y de sus tipos `Props`, y lo deja en `manifest.json` (`tags`, `phrasing`, `svg`). Si un componente cambia, el contrato cambia con él.

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
- Dentro de `<rev-schema>` y `<rev-schema-layer>` se dibuja en SVG con los elementos y atributos de `manifest.svg` y solo con las clases del vocabulario de `Schema` (`svg.classes`), sin colores ni estilos.
- Un `<title>` opcional, fuera de cualquier etiqueta, da el título de la página.

## Qué hace el render

- Falla con todos los problemas a la vez, con línea y columna: etiqueta o atributo desconocido (con sugerencia), valor fuera del enum, campo JSON que sobra o falta, prop obligatorio ausente, imagen remota o inexistente.
- Pre-renderiza todo a HTML estático e incluye solo el CSS de `base.css` y de los componentes usados, con DM Sans incrustada.
- Añade JavaScript (runtime de Preact + scripts de isla) solo si la charla usa algún componente interactivo. Una charla solo con piezas estáticas sale sin ningún `<script>`.
- Dentro de `<rev-steps>`, lo que sigue los pasos (`Step`, `Count`, `Bars`, `Sheet`, `Schema`, `Share`) entra en la isla de `Steps`. Si un envoltorio estático (`<rev-stack>`, `<rev-grid>`…) lo separa de sus pasos, avisa: esa pieza no seguirá los pasos.
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
node render/cli.mjs charla.rev.html            # escribe charla.html
node render/cli.mjs charla.rev.html -o salida.html --lang en
```

Sale con código 1 si el documento tiene errores y 2 si la llamada está mal.
