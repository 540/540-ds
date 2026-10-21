Text es la escala tipográfica convertida en componente. En el sistema no hay un *Heading* ni un *Label* aparte: **todo texto es un Text con un estilo (`variant`) y una etiqueta HTML (`as`) que se eligen por separado.** Es la pieza que evita que cada charla invente su propio tamaño de letra.

## Para qué sirve

Para escribir cualquier texto de una charla o de la web con el estilo exacto del sistema: la frase de una parada, el título de una sección, el cuerpo de una tarjeta, un pie de foto o una etiqueta en mayúsculas.

## Anatomía

Un único elemento HTML (`p` por defecto) con cuatro capas: estilo, tono, alineación y ancho. **No tiene márgenes propios**: el aire lo pone el contenedor.

## Cuándo usarlo

- Siempre que haya texto. Los demás componentes (Card, Header, Cita…) lo usan por dentro.
- Cuando el nivel de encabezado y el tamaño no coinciden: un `h2` puede ir en `statement` o en `body-s-bold`, según lo que pida la diapositiva.

## Cuándo no usarlo

- Para textos de interfaz que ya tienen su componente: el texto de un botón o de un enlace del pie lo pone el propio componente.
- Para texto dentro de un SVG: los esquemas de las charlas tienen sus propios estilos.

## Variantes

Trece estilos, los mismos de **Fundamentos / Tipografía**. El de por defecto es `body-m`.

| `variant` | Tamaño web · ≥ 1024 · proyección | Peso | Para qué |
|---|---|---|---|
| `statement` | fluido: 5,1 % del ancho, entre 20 y 76 px | ExtraBold 800 | La frase de una parada del recorrido |
| `title-l` | 28 · 36 · 42 | Regular 400 | Subtítulo de sección |
| `title-m` | 26 · 32 · 36 | Regular 400 | Título de bloque |
| `title-s` | 22 · 26 · 28 | Regular 400 | Título de tarjeta |
| `title-xs` | 20 · 22 · 22 | Regular 400 | Título menor |
| `body-l` | 18 · 18 · 22 | Regular 400 | Entradilla y texto destacado |
| `body-m` | 16 · 16 · 20 | Regular 400 | Texto corrido |
| `body-s` | 14 · 14 · 18 | Regular 400 | Texto de interfaz |
| `body-s-light` | 14 · 14 · 18 | Light 350 | Texto secundario |
| `body-s-bold` | 14 · 14 · 14 | Bold 700 | Texto de interfaz enfatizado |
| `micro` | 12 | Regular 400 | Letra pequeña que se lee sola: el ordinal de una banda |
| `micro-light` | 12 | Light 350 | Letra pequeña de apoyo: etiquetas de dato, pies |
| `micro-bold` | 12 | Bold 700 | Etiquetas en mayúsculas (las pone el componente) |

Los cuatro títulos crecen desde 1024 px. En **proyección** (dentro de las diapositivas, selector *Escala* de la barra superior) todo sube un punto para leerse desde el fondo de la sala; el cuerpo gana además interlineado (1,3 y 1,35).

## Tonos

Dos tintas, y solo dos: **negro y gris, como en las charlas.** El de por defecto es `primary`.

| `tone` | Token | Para qué |
|---|---|---|
| `primary` | `--color-text-primary` | Lo que se lee: títulos, frases, cuerpo |
| `secondary` | `--color-text-secondary` | Lo que acompaña: descripciones, pies, ordinales |

El texto no va en colores. El amarillo es para fondos y trazos; el texto sobre fondo invertido o sobre foto lo resuelve el contenedor con `--color-text-inverse` o `--color-text-on-media`, no una opción de Text.

## Alineación, reparto de líneas y ancho

- `align`: `start` (por defecto) o `center`.
- `wrap`: `balance` para frases y títulos (líneas de largo parecido) o `pretty` para párrafos (evita una palabra sola al final).
- `measure`: cuatro anchos con nombre, los que usan las charlas. Si el texto va centrado, el bloque también se centra.

| `measure` | Ancho | Uso en las charlas |
|---|---|---|
| `wide` | tres cuartos del contenedor (900 px) | frases de tesis, remate, cita y cierre |
| `half` | media retícula (588 px) | pregunta y entrada de portada, historia, objeción |
| `prose` | 62 caracteres | cuerpo de una tarjeta en fila |
| `narrow` | 38 caracteres | lema del pie, fichas de herramientas |

## Estados

Text no tiene estados interactivos. Lo único que cambia es el tema (claro u oscuro) y la escala (web o proyección), y ambos vienen de los tokens.

## Decisiones de diseño

### El estilo y la etiqueta van por separado

El estilo lo decide el diseño; la etiqueta la decide el documento: qué es un título de primer nivel, qué es un párrafo. Por eso ninguna variante se llama como un elemento HTML, y por eso elegir `as="h3"` "porque queda más pequeño" es un error: el tamaño lo da `variant`.

### El texto no va en colores

Negro y gris. El amarillo de marca va a fondos y trazos (`--color-bg-accent`), nunca a letras: sobre papel no pasa el contraste y sobre negro compite con la frase. Los estados de error y éxito tienen sus tokens, pero viven en los componentes que los necesitan (un campo de formulario), no en Text.

### Sin márgenes

Encadenar textos con márgenes propios hace que cada charla acabe con un ritmo distinto. Text no trae separación: el contenedor pone el `gap`, siempre con un token de espacio.

## Accesibilidad

- **Estructura.** Elige `as` por el significado: un solo `h1` por pantalla, `h2` para secciones, `p` para párrafos. Los lectores de pantalla navegan por esa estructura, no por el tamaño.
- **Contraste.** Negro sobre papel 16:1; gris (`secondary`) sobre papel 7,5:1. En oscuro, blanco 21:1 y gris claro 15:1. Todos muy por encima de AA.
- **Decoración.** Los ordinales decorativos ("01", "90°") van con `aria-hidden` en el contenedor, no dentro de Text.
- **Mayúsculas.** `micro-bold` pone las mayúsculas por CSS, así que el lector de pantalla lee el texto tal y como está escrito.

## Uso

**Do**

- `wrap="balance"` en títulos y frases; `wrap="pretty"` en párrafos.
- `measure` en vez de anchos a mano: así todas las charlas comparten las mismas cuatro medidas.
- Un único Text con `wrap="balance"` para un título de varias líneas.

**Don't**

- Elegir `as` por el tamaño.
- Texto en color. Negro y gris.
- Texto largo en `micro`.
- Añadir márgenes a Text: el aire es del contenedor.

## Equivalencias con Figma

Página `Tipografía` del archivo de diseño. Los trece estilos de texto tienen el mismo nombre que `variant` (`Título/L` → `title-l`, `Body/S Light` → `body-s-light`). Dos diferencias que conviene saber: en Figma los estilos Light son peso 300 (solo trae instancias estáticas) y el código usa 350; y el *statement* en Figma es 64 / 48 px mientras que en el código es fluido. Manda el código.
