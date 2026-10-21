Imagen de contenido: **recorta para llenar su caja y nunca se deforma**, salvo cuando se le pide que mande la proporción del archivo.

## Anatomía

Un único `img`. Es la única pieza del sistema sin un solo token: no tiene color, ni radio, ni relleno, ni hueco que enlazar. Solo proporción y recorte.

## Cuándo usarlo

- La foto de un caso en la rejilla del portfolio, en `2:1`.
- El retrato de una persona del equipo, en `1:1`.
- El fondo de una sección, con `fill`.
- Una pieza que no se puede recortar (un logotipo, una foto con una marca incrustada), con `auto`.

## Cuándo no

- Un icono: es Lucide, dentro del componente que lo aloja.
- Una textura decorativa que se puede pintar con CSS.
- Un texto que hay que leer metido dentro del píxel.

## Proporciones

El ancho es siempre el 100 % del contenedor. Lo que cambia de dueño es el alto.

| `ratio` | Quién pone el alto | Recorta | Para qué |
|---|---|---|---|
| `2:1` (por defecto) | la caja | sí | Fotos de caso, fotos detrás de un título de bloque, foto de portada |
| `1:1` | la caja | sí | Retratos del equipo |
| `fill` | el contenedor (100 % de su alto) | sí | Fondo de sección |
| `auto` | el archivo | **no** | Lo que no se puede cortar |

`cover` y no `contain`: la caja manda sobre la proporción del archivo. Una imagen deformada para caber se nota siempre, y una con franjas a los lados rompe la rejilla; recortar es lo único que no se ve. Y va centrada, sin opción de encuadrar: elegir el foco de cada foto es trabajo de la foto, no del componente.

## Estados

Ninguno. La carga va con `loading="lazy"` por defecto; la foto de portada, que se ve al entrar, va con `loading="eager"`.

## Decisiones de diseño

### Sin radio propio

Lo recorta el contenedor. Si la imagen llevara el suyo, una tarjeta con imagen tendría dos radios que cuadrar a mano. La posición también es del contenedor.

### `auto` exige reservar el sitio

Es la única proporción que no recorta: se ve la foto entera, con la forma que tiene. A cambio, quien la usa tiene que reservarle el hueco (con `width` y `height` en el `img` o con un `aspect-ratio` en el contenedor): sin proporción declarada, el navegador no sabe cuánto espacio dejar y la página pega un salto cuando la foto acaba de cargar.

### El `alt` es obligatorio

Está en el tipo, así que no se puede montar la imagen sin decidirlo. `alt=""` es la forma correcta de marcarla decorativa, y es distinto de olvidarse.

## Accesibilidad

- **Rol** `img`, con el texto alternativo que describe lo que muestra, no lo que es («El David visto desde abajo bajo la cúpula», no «foto»).
- **Decorativa** con `alt=""`: el lector de pantalla la salta. Es lo correcto para las fotos de ambiente detrás de un título.
- **Texto sobre la foto:** solo sobre un velo (`--gradient-image-veil`) y en `--color-text-on-media`; el contraste sobre una foto desnuda no está garantizado.

## Uso

**Do**

- `2:1` para casos y fondos de título, `1:1` para retratos.
- Un `alt` que describa, o `alt=""` a conciencia.
- El radio en la tarjeta o en el contenedor, con `overflow: hidden`.

**Don't**

- Fijar un alto a mano: hay una proporción.
- `auto` sin reservar el sitio.
- Deformar o dejar franjas: no hay opción, y no debería haberla.

## Equivalencias con Figma

Página `Image` del archivo de diseño, set `Image` (22:2). `Proporción = 2:1 / 1:1 / fill / auto` es `ratio`. En Figma los altos de las variantes son de ejemplo; en el código no hay ningún alto escrito, hay una proporción.
