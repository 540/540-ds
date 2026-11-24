Imagen de contenido: **recorta para llenar su caja y nunca se deforma**, salvo cuando se le pide que mande la proporción del archivo.

## Anatomía

Un único `img`, con las esquinas redondeadas (`--radius-default`). No tiene color, ni relleno, ni hueco que enlazar: proporción, recorte y radio.

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

### Siempre redondeada

Una imagen de contenido va redondeada, igual que una captura (`Screenshot`): al lado de un texto o centrada, la misma esquina. No hay opción para quitarlo. Solo la pierden las piezas que llevan la foto a sangre o le dan otra forma, y lo hace la pieza, no quien la usa:

- `Cover` y `BlockTitle`: la foto sangra, sin radio.
- `Dialog`: la foto va arriba, dentro de un diálogo que ya redondea sus esquinas.
- `Card`: el retrato es un círculo.
- `fill`: el contenedor pone la forma.

El radio no tiene especificidad (`:where`), así que cualquiera de esas piezas lo cambia con una sola clase.

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

**Don't**

- Fijar un alto a mano: hay una proporción.
- `auto` sin reservar el sitio.
- Deformar o dejar franjas: no hay opción, y no debería haberla.
- Quitarle el radio a una foto de contenido: si una pieza necesita la foto a sangre, lo decide la pieza.
