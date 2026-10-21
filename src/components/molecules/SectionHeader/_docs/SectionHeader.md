La cabecera de una sección: **título y entradilla.** Es la pieza que más se repite en la web: cinco páginas abren igual.

## Anatomía

1. **Título** en `title-l`, siempre. El nivel del encabezado (`h1`, `h2`…) se elige aparte.
2. **Entradilla** opcional en `body-m` secundario: una o dos frases.

Entre los dos, 48 px (`--space-3xl`).

## Cuándo usarlo

- Abrir cualquier sección de la página.
- Centrada, cuando la sección ocupa el ancho entero y no hay nada al lado.

## Cuándo no

- El titular de la portada, que lleva su propia composición.
- Un título suelto dentro de una tarjeta: eso es Text.
- Tres párrafos de entradilla: si no cabe en dos frases, va en el cuerpo.

## Variantes

| `align` | Ancho | Para qué |
|---|---|---|
| `start` (por defecto) | Llena la columna | Secciones con algo al lado o una rejilla debajo |
| `center` | Se acota a media retícula (588 px) y se centra | Secciones que ocupan el ancho entero |

Centrada trae la medida de lectura puesta: media retícula, seis columnas de doce. No es del que la coloca: a doce columnas una frase corta flota en medio de la nada y una larga pierde el renglón, así que acotar no era una opción entre dos. Es `max-width` y no un ancho fijo: la misma cabecera vale a 1440 y a 375.

## Estados

Ninguno.

## Decisiones de diseño

### Sin antetítulo

Lo llevó, y se retiró con el recorrido de los grados: una etiqueta en mayúsculas encima del título dice de qué va la sección antes que el título, que es lo que el título ya hace.

### El estilo y el nivel, por separado

El cuerpo del título es siempre el mismo (`title-l`) y el nivel lo decide el esquema del documento, no el tamaño que se quiera. Un solo `h1` por página: el resto de secciones bajan de nivel.

### Sin tono

La tinta la pone el tema.

## Accesibilidad

- Es un `header` con texto, sin rol propio.
- **Un solo `h1` por página.** Las secciones van en `h2` y lo que cuelga de ellas en `h3`.
- Con `titleId`, la Section que la contiene puede apuntar al título con `aria-labelledby` y convertirse en región con nombre.

## Uso

**Do**

- `level="h2"` en secciones, `h1` solo en el título de la página.
- `center` cuando no hay nada al lado.
- Entradilla de una o dos frases, o ninguna.

**Don't**

- Antetítulos o etiquetas encima del título.
- Elegir el nivel por el tamaño.
- Entradillas largas.

## Equivalencias con Figma

Página `SectionHeader` del archivo de diseño, set `SectionHeader` (12:9). `Alineación = start / center` es `align`; `entradilla` es `description`. En las charlas es `header` / `header-center` en base-540.css.
