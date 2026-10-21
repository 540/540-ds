Una persona del equipo: **retrato 1:1, puesto, nombre y dos líneas.**

## Anatomía

1. **Retrato:** sigue el ancho de la ficha y se recorta a 1:1, así que la misma ficha vale a 240 en una tira y a 384 en una fila de tres.
2. **Puesto** en `micro-bold` secundario (las mayúsculas las pone el estilo).
3. **Nombre** en `title-xs`, un `h3`.
4. **Bio** opcional en `body-s` secundario: dos o tres líneas.

Los tres van al mismo nivel y separados por `--space-l`: no hay caja intermedia.

## Cuándo usarlo

- La rejilla de los Heads.
- Una tira de personas donde cada retrato va solo, con la alineación centrada.
- Cualquier ficha de persona que se compare con otras.

## Cuándo no

- Un caso del portfolio: usa CaseItem.
- Un apartado de texto: usa Card.

## Variantes

| `align` | Orden | Para qué |
|---|---|---|
| `start` (por defecto) | Puesto, nombre, bio | Rejillas al margen |
| `center` | Nombre, puesto (como pie de foto), bio | Tiras de retratos |

Es el orden del documento y no del CSS, para que quien no ve la pantalla oiga lo mismo que quien la ve.

## Estados

Ninguno en la ficha. Cuando abre página (`href`), **lo que se pulsa es el nombre y no la tarjeta entera**: un retrato no dice que se pulse. El nombre se subraya al pasar, con el subrayado separado 4 px.

## Decisiones de diseño

### El retrato va con `alt` vacío

El nombre ya está al lado: leer dos veces a la misma persona es peor que una.

### Sin caja

Tres piezas apiladas con el mismo aire entre ellas. Una caja alrededor pediría borde o fondo, y en una fila de seis retratos pesaría más que las caras.

## Accesibilidad

- **El nombre es un `h3`** y entra en el índice de la página.
- Con `href`, el enlace es el nombre: nombre accesible claro, foco visible con el anillo.
- El puesto va en mayúsculas por CSS, así que se lee tal y como se escribe.

## Uso

**Do**

- Retratos con la cara centrada: el recorte a 1:1 es por el centro.
- Puesto corto («Head of Design»).
- `center` en tiras, `start` en rejillas.

**Don't**

- Enlazar toda la tarjeta.
- Bios de un párrafo.
- Retratos redondeados a mano: las esquinas rectas son del sistema.

## Equivalencias con Figma

Página `TeamMember` del archivo de diseño, set `TeamMember` (17:21). `Alineación = start / center` es `align`; `bio` es `bio`. El resumen de la ficha en Figma habla de «retrato redondo»; el dibujo y la descripción del componente lo recortan a cuadrado 1:1, y eso es lo que hace el código.
