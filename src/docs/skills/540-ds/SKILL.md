---
name: 540-ds
description: 'Monta piezas de 540 con el sistema de diseño (540-ds): consulta el MCP del sistema (plantillas, normas, patrones, componentes) y entrega un único .html: autocontenido y sin conexión si hay Node (render), o pintado al abrirlo por el runtime del sistema en claude.ai o donde no hay Node; dentro de un proyecto React, la pieza con los componentes de @540deg/ds. Por defecto compone un diseño libre con el catálogo; usa una plantilla del MCP (p. ej. una charla) solo si se pide explícitamente. USAR cuando se pida algo hecho con el sistema de diseño o los componentes de 540: "hazme una página con el DS de 540", "monta una charla sobre X", "pásame esto a slides de 540", "una landing con @540deg/ds", "maqueta esto con el sistema de diseño de 540". NO USAR para .pptx.'
---

# 540-ds · piezas con el sistema de diseño

El diseño lo da el MCP del sistema, el contenido lo da la persona y el paquete `@540deg/ds` lo convierte en HTML:
con el render (Node) o con el runtime (en el navegador, al abrirlo). Esta skill pone el proceso con la persona y
el puente entre el MCP y el paquete. **Cómo se usa el sistema (orden de consulta, solo catálogo, nada de
estilos) está en las instrucciones del MCP: síguelas tal cual.** Esta skill no repite lo que dice el MCP ni
guarda nombres de plantillas: todo eso se consulta en cada ejecución.

## Paso 0 · el MCP tiene que estar

Esta skill la sirve el propio MCP del sistema de diseño de 540, y va siempre a la par con sus tools
(`list-templates`, `list-components`, `get-component-docs`, `get-rules`, `get-template`…). Si no tienes esas
tools, **para**: di que hace falta activar el conector del sistema de diseño de 540 en *Settings → Connectors*.
No montes nada a mano ni con lo que recuerdes del sistema.

Los ficheros de `referencias/` se leen igual que esta skill: el recurso `skill://540-ds/referencias/<fichero>`
o, si tu cliente no lee recursos, la tool `get-skill` con ese `file`.

## Paso 1 · ¿plantilla o diseño libre?

1. Llama **siempre** a `list-templates`, aunque creas saber qué hay. Las plantillas cambian; esta skill no las
   conoce. Apunta el campo `version` de la respuesta: es la versión del sistema, y el paso 6 B la necesita.
2. Decide:
   - **Con plantilla**, solo si la persona la pide o el encargo nombra explícitamente esa pieza ("quiero
     montar una charla", "usa la plantilla de X"). Compara con lo que devuelve `list-templates`.
   - **Diseño libre** en cualquier otro caso. Es el modo por defecto. Si dudas, diseño libre, y di que hay
     una plantilla que podría encajar por si la quiere.
3. **Avísalo antes de seguir**, en una línea: «Voy sin plantilla: compongo el diseño con el catálogo» o
   «Voy con la plantilla `<pieceType>` (<nombre>)». Lo repites en la entrega.

## Paso 2 · HTML con render, HTML con runtime o React

| Dónde estás | Salida |
|---|---|
| Hay terminal con Node 20+ (`node -v` responde) y no hay proyecto | **HTML con render**: un único `.html` autocontenido que funciona sin conexión. Por defecto |
| claude.ai, Desktop sin terminal, o no hay Node | **HTML con runtime**: el `.html` lleva las etiquetas y el runtime del sistema las pinta al abrirlo. Se publica como artifact. Ver el paso 6 B |
| Un proyecto React (`package.json` con `react`) y la pieza va dentro de la app | **React**: los componentes de `@540deg/ds`. Ver `referencias/react.md` |
| Un proyecto React, pero la pieza es un fichero para enviar, publicar o proyectar | **HTML con render** |
| No está claro | **Pregunta**, con estas opciones. No elijas por tu cuenta |

Las dos salidas HTML usan las mismas etiquetas `<rev-…>` y el mismo fichero: lo que cambia es quién lo pinta.
El render también acepta un fichero escrito para el runtime, así que una pieza hecha en claude.ai se puede
renderizar después para enviarla o archivarla. En la vía React cambian los pasos 5 y 6.

## Paso 3 · el encargo

Antes de diseñar necesitas:

1. **El contenido**: tema, a quién va, qué tiene que llevarse quien lo lea, y los datos, citas o historias que
   haya. Si viene en un fichero (guion, notas, transcripción), léelo primero.
2. **Lo que pida la plantilla**, si vas con plantilla: `get-rules` dice qué necesita (fotos, fechas, número de
   partes…). Pídelo tal cual lo pide.
3. **Las imágenes**, si la pieza las lleva: con render, rutas locales; con runtime, como ficheros adjuntos,
   porque van incrustadas en el `.html` (paso 5). Nunca URL.
4. **Dónde guardarla**: si hay un fichero de contexto, al lado; si no, pregunta. Nombre en kebab-case. Con
   runtime en claude.ai, se publica como artifact.

Lo que falte, pregúntalo todo junto. No inventes cifras, nombres, clientes ni citas. Si faltan fotos, sigue y
deja la pieza como borrador; dilo en la entrega.

## Paso 4 · la estructura, aprobada

Antes de escribir, enséñale a la persona la estructura y **espera el sí**.

**Con plantilla**: con `get-rules`, `get-template` y `get-patterns` de ese `pieceType`, reparte el contenido en
las partes de la plantilla (paradas, secciones…), con el id de cada una y una frase de lo que dice. Compruébalo
contra las normas de estructura antes de enseñarlo.

**Diseño libre**: no hay plantilla ni `get-rules`. Con `list-components` y `search-components`, elige los
componentes para cada parte del contenido y enseña un esquema de secciones:

```
1 · <Sección>      SectionHeader → Grid de 3 Card
2 · <Sección>      Metric × 4
…
```

Reglas del diseño libre:
- Solo componentes y props del catálogo. Los organismos pensados para una plantilla concreta (lo dice su
  `get-component-docs`, p. ej. los que solo viven dentro de un `Deck`) no se usan fuera de ella.
- Lee `get-component-docs` de cada componente antes de usarlo por primera vez: dice cuándo sí y cuándo no.
- Si algo del encargo no tiene componente, dilo y propón el más cercano. No lo construyas a mano.

## Paso 5 · escribir las etiquetas

1. **Con plantilla**: `get-template-stops` (o la tool de código que indique `get-template`) con los ids
   aprobados, 12 como máximo por llamada. Cambia solo textos e imágenes.
   **Diseño libre**: el JSX de cada componente sale de `get-component` y `get-component-stories`.
2. Antes de escribir, saca los props de las etiquetas que vas a usar, **siempre**:
   - Con Node: `npx -y --package=@540deg/ds@latest 540-ds-render --tags <Componente> <Componente>…`.
   - Sin Node (runtime): `get-component` del MCP, que lee el mismo contrato.

   Escribe con esos props, no con los que supongas.
3. Pasa el JSX a etiquetas `<rev-…>` con `referencias/etiquetas.md`.
4. **Con render**: escribe `<nombre>.rev.html` con las imágenes al lado (rutas relativas).
   **Con runtime**: escribe `<nombre>.html` con el formato del paso 6 B. No hay carpeta junto a la pieza, así
   que cada imagen va incrustada como `data:image/webp;base64,…` (o `jpeg`, `png`): conviértela con la
   ejecución de código, nunca a mano ni inventada. Si no puedes convertirla, deja la pieza como borrador sin
   esa imagen y dilo. Nunca una URL remota.

## Paso 6 A · render (con Node)

```bash
npx -y --package=@540deg/ds@latest 540-ds-render <nombre>.rev.html             # escribe <nombre>.html
npx -y --package=@540deg/ds@latest 540-ds-render <nombre>.rev.html --lang en   # pieza en inglés
```

- Usa siempre `@latest`: el render sale de la última versión publicada del paquete, la que va con el MCP. No
  fijes otra versión.
- Necesita Node 20 o superior. Si `node` o `npx` no están, ve por el runtime (paso 6 B).
- La primera vez baja el paquete de npm y necesita conexión; después sale de la caché y funciona sin red.
  Si falla la descarga, dilo: no montes la pieza a mano.
- Sale con **1** si el documento tiene errores, y los lista todos a la vez, con línea, columna y sugerencia.
  Corrige **el `.rev.html`** y vuelve a lanzarlo hasta que salga con 0. Nunca edites el `.html` generado.
- Los `warning:` también se corrigen.
- Si rechaza un componente o un prop que el MCP sí da, el MCP va por delante de la última versión publicada
  del paquete: dilo. No lo esquives cambiando de pieza ni fijando otra versión.
- La última línea da el tamaño, la versión del sistema, los componentes y las islas con JavaScript.

## Paso 6 B · runtime (sin Node)

El `.html` es solo esto, con la pieza dentro del bloque `text/rev` y nada más fuera:

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@540deg/ds@X.Y.Z/pieces/runtime/runtime.js"></script>
<script type="text/rev" data-lang="es">
<title>…</title>
<rev-…>
  …
</rev-…>
</script>
```

- `X.Y.Z` es la versión exacta que dio `list-templates` en el paso 1 (campo `version`), escrita tal cual en la
  URL. Aquí nunca `latest`: jsDelivr lo guarda en caché varios días, así que la pieza podría mezclar ficheros
  de dos versiones, y además cambiaría sola con cada versión nueva del sistema.
- `data-lang="en"` para una pieza en inglés.
- Al abrirlo, el runtime valida las etiquetas con las mismas reglas que el render. Si hay errores, no pinta
  nada y enseña un panel con todos, con línea (contada desde `<script type="text/rev">`) y sugerencia. Los
  avisos salen en el mismo panel, con la pieza ya pintada, y también se corrigen.
- En claude.ai, publícalo como artifact y pide a la persona que lo abra. Si sale el panel, que lo copie (botón
  **Copiar**) y te lo pegue: corrige las etiquetas y vuelve a publicar hasta que no salga. Tú no ves el
  panel: no des la pieza por buena sin que la persona lo confirme.
- Necesita conexión y JavaScript para pintarse. Para enviarla o archivarla, se renderiza el mismo fichero con
  el paso 6 A en un sitio con Node.

## Paso 7 · repaso

**Con plantilla**: repasa la lista final de `get-rules`, punto por punto. Lo que se comprueba leyendo las
etiquetas lo compruebas y lo arreglas tú; lo que pide mirar la pieza (temas, tamaños de pantalla, teclado) lo
dejas como tarea para la persona. No lo des por hecho.

**Diseño libre**: comprueba que solo hay componentes del catálogo, que cada uno se usa como dice su
`get-component-docs`, que no hay textos ni datos inventados y que las imágenes son locales o van incrustadas.
Pide a la persona que la mire en tema claro y oscuro, y en móvil y escritorio.

## Paso 8 · entregar

- Si has usado plantilla o no, y cuál.
- Con render: la ruta del `.html` y de su fuente `.rev.html`, el tamaño, y si lleva JavaScript y de qué islas.
- Con runtime: el artifact o la ruta del `.html`, si la persona ya lo ha abierto sin panel de errores, y que
  para enviarlo o archivarlo se renderiza con Node (paso 6 A).
- Lo que queda pendiente: imágenes que faltan, puntos del repaso que hay que mirar, piezas que el catálogo no
  tiene.
- El `.html` con render se abre sin conexión, se envía tal cual o se publica como artifact de claude.ai.
- Para cambiar algo después, se editan las etiquetas (el `.rev.html`, o el bloque `text/rev`) y se vuelve a
  renderizar o a publicar.

## Lo que nunca se hace

- Usar una plantilla que la persona no ha pedido, o no decir si se usa.
- Dar por sabidas las plantillas sin llamar a `list-templates`.
- HTML suelto entre las etiquetas (`div`, `p`, `h2`…), estilos, o atributos que no den `--tags` o
  `get-component`.
- Editar el `.html` generado por el render.
- Con runtime, HTML, estilos o scripts fuera del bloque `text/rev`, o una versión del runtime distinta de la
  que dio `list-templates`, o `latest` en esa URL.
- Imágenes de muestra del sistema en una pieza real, o imágenes remotas.
- Saltarse una norma porque el encargo lo pide: responde con la norma y propón la pieza del sistema.
