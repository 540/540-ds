Las herramientas: **una rejilla de logotipos con su nombre y, si hace falta, un veredicto de una línea.** Es la parada de «las que se quedan» y «las descartadas».

## Anatomía

Una lista en la retícula de doce columnas: cada herramienta ocupa tres columnas (cuatro por fila) o cuatro (tres por fila) desde 1024 px, seis en tablet y doce en móvil. Cada ficha: el logotipo en una caja óptica de 52 × 52, el nombre en `title-s` y, opcional, el veredicto en `body-s-light` secundario; centrada y a 38 caracteres como mucho.

## Cuándo usarlo

- Comparar herramientas, marcas o productos de un vistazo, con su logotipo.

## Cuándo no

- Logotipos de cliente en bucle: eso es LogoCarousel.
- Texto largo por herramienta: es una Card.

## Variantes

| `columns` | Por fila desde 1024 px |
|---|---|
| `4` (por defecto) | Cuatro: las herramientas que se quedan |
| `3` | Tres: las descartadas, con veredicto |

## Estados

Ninguno. Las charlas escalonan la entrada de las fichas con GSAP (`data-mov="escalonado"`); queda para los efectos.

## Decisiones de diseño

### Los logotipos se normalizan por área de tinta

Una caja común de 52 px y, por marca, una corrección (`scale`) que sale de medir la tinta de cada archivo: un logotipo con mucho aire alrededor se ve más pequeño que uno que llena la caja, y la corrección iguala el peso visual.

### Invertir en oscuro, solo lo que lo necesita

Los logotipos en negro sobre transparente se invierten en el tema oscuro (`invertInDark`); los de color no se tocan.

## Accesibilidad

- El logotipo va con `alt=""` porque el nombre está justo debajo.
- Cada nombre es un `h3`; la rejilla es una lista.

## Uso

**Do**

- Logotipos en SVG o PNG con fondo transparente.
- Un veredicto de una línea cuando la parada compara.

**Don't**

- Más de ocho herramientas en una parada.
- Logotipos con fondo de color: rompen la rejilla.

## Equivalencias

No está en Figma. En las charlas es `.herr`, `.herr-logo[data-marca]` y `[data-inv]` (base-540.css, GUIA-ESTILOS paradas 14 y 15 y «v2: logos normalizados por área de tinta»).
