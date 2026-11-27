# Del JSX del MCP a etiquetas `<rev-…>`

El MCP devuelve JSX (`get-template-stops` en una plantilla; `get-component` y `get-component-stories` en diseño libre). El render lee etiquetas `<rev-…>`. La traducción es mecánica:
no se decide nada, solo se cambia la forma de escribir lo mismo. El contrato completo y los props de cada
etiqueta los da el propio render, con la última versión publicada, como en el paso 5 de la skill:

```bash
npx -y --package=@540deg/ds@latest 540-ds-render --contract                  # el contrato completo
npx -y --package=@540deg/ds@latest 540-ds-render --tags GridItem rev-metric  # props de esas etiquetas
```

Sin Node (vía runtime), los props salen de `get-component` del MCP, que lee el mismo contrato; y lo que no
cuadre lo marca el panel de errores del runtime al abrir la charla.

`--tags` acepta el export (`GridItem`), la etiqueta (`rev-grid-item`) o el nombre en kebab-case (`grid-item`);
sin nombres devuelve todas. Pide solo las que vayas a usar.

## Nombres

| JSX | Etiqueta |
|---|---|
| `<GridItem>` | `<rev-grid-item>`: `rev-` y el nombre en kebab-case |
| `storageKey=` | `storage-key=` |
| Hijos | El contenido de la etiqueta |
| `<Foo />` | `<rev-foo></rev-foo>`: siempre con cierre |

## Valores

| JSX | Etiqueta |
|---|---|
| `title="Texto"` | `title="Texto"` |
| `span={3}` | `span="3"` |
| `full` o `full={true}` | `full` |
| `full={false}` | Se quita |
| `items={[…]}`, `photo={{ … }}` | JSON entre comillas simples: `photo='{"src":"bloque.webp","alt":"…"}'` |
| `title={['Línea uno', 'línea dos']}` | `title='["Línea uno","línea dos"]'` |
| `sentence={<>Texto <strong>clave</strong>.</>}` | `sentence="Texto <strong>clave</strong>."` |
| Prop con un componente dentro: `value={<Count value={1240} />}` | `<template slot="value"><rev-count value="1240"></rev-count></template>` dentro de la etiqueta |
| Lista de nodos con HTML: `sentences={[<>Una <em>idea</em></>, …]}` | Un `<template slot="sentences">…</template>` por elemento |

- Constantes como `ITEMS` o `FOOTER` se escriben en línea, en JSON: claves con comillas dobles, sin
  `as const` ni comas finales.
- Dentro de un atributo con comillas simples, un apóstrofo se escribe `&#39;`. Dentro de uno con comillas
  dobles, una comilla doble se escribe `&quot;`.
- HTML de frase permitido en textos: `strong`, `em`, `b`, `i`, `code`, `small`, `sub`, `sup`, `br` y
  `a href`. Nada más.
- Las variables de imagen de muestra (`fachada`, `pintura`…) se cambian por la imagen de la pieza: con render,
  su ruta relativa (`"portada.webp"`); con runtime, la imagen incrustada (`"data:image/webp;base64,…"`). Nunca
  una URL.

## Lo que se quita

- Los comentarios `{/* … */}`.
- Cualquier callback (`onClose`, `onToggle`…). `Dialog` y `ThemeToggle` no tienen etiqueta.
- Lo que diga que se quita la propia plantilla, si vas con una (p. ej. en la de charla, `storageKey=""` y
  `defaultTheme={defaultTheme}` del `Deck`).

## El esqueleto

Un `<title>` opcional fuera de cualquier etiqueta y, debajo, las etiquetas de la pieza.

**Diseño libre**: secciones del catálogo una tras otra, sin raíz obligatoria.

```html
<title>Título de la página</title>
<rev-section>
  <rev-stack>
    <rev-section-header title="…" description="…"></rev-section-header>
    <rev-grid>
      <rev-grid-item span="6"><rev-card title="…">…</rev-card></rev-grid-item>
      <rev-grid-item span="6"><rev-card title="…">…</rev-card></rev-grid-item>
    </rev-grid>
  </rev-stack>
</rev-section>
<!-- más secciones -->
```

**Con plantilla**: la raíz es el `shell` que devuelve `get-template` (por ejemplo, el `Deck` de una charla),
traducido igual que el resto, con las partes aprobadas dentro. Las constantes del `shell` (menú, pie…) se
copian tal cual; solo cambia lo que la plantilla diga que cambia.

## Ejemplo: cuatro cifras

JSX del MCP:

```tsx
<GridItem span={3}>
  <Metric value={<Count value={45.9} decimals={1} suffix=" %" />} label="Lo que mide" delta="+6 puntos" />
</GridItem>
```

Etiquetas:

```html
<rev-grid-item span="3">
  <rev-metric label="Lo que mide" delta="+6 puntos">
    <template slot="value"><rev-count value="45.9" decimals="1" suffix=" %"></rev-count></template>
  </rev-metric>
</rev-grid-item>
```

Si una traducción no está clara, escribe lo más probable y lanza el render: cada error dice qué etiqueta o qué
atributo falla y propone el nombre correcto.
