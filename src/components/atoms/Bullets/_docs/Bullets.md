Los puntos que dicen por dónde va algo paginado y dejan saltar a otra página. **El activo se alarga en vez de cambiar de color**, y esa es la decisión: la longitud se ve en escala de grises y con el brillo al mínimo; el color solo, no. El color acompaña, no informa.

## Anatomía

Un grupo de botones, uno por página. En horizontal son puntos de 12 px y el activo es una cápsula de 48. En vertical son rayas de 4 px de alto: 16 de largo las apagadas y 32 la activa.

## Cuándo usarlo

- Debajo de un carrusel, para decir cuántas páginas hay y en cuál se está.
- Cualquier cosa paginada donde el número de páginas sea pequeño y se vea de un vistazo.
- Como índice al canto de la ventana, en columna, para una pila que se recorre bajando (el índice del recorrido de las charlas).

## Cuándo no

- Muchas páginas: doce puntos no se cuentan de un vistazo; eso pide números.
- Pasos de un proceso, que van en orden y no se saltan: eso es otra cosa.
- Una sola página: no se pinta, porque no hay a dónde ir.

## Variantes

| `orientation` | Dónde | Punto | Activo | Apagado |
|---|---|---|---|---|
| `horizontal` (por defecto) | Debajo de un carrusel | 12 × 12, `--color-border-default` | 48 × 12, `--color-text-primary` | hover a `--color-text-secondary` |
| `vertical` | Al canto derecho de la ventana | 16 × 4, `--color-text-tertiary` | 32 × 4, `--color-text-primary` | hover a `--color-text-primary` |

En columna el punto deja de ser redondo y pasa a ser una raya: apilados, lo que se compara es el largo y un círculo no tiene largo. Se alinean a la derecha, con el hueco pequeño (8 en vez de 12) porque el de la fila los separaría demasiado, y los apagados suben al gris terciario porque van solos al canto de la ventana.

## Estados

| Estado | Señal |
|---|---|
| Actual | Más largo y en tinta primaria; `aria-current` |
| Hover | El apagado sube de gris |
| Focus | Anillo de 2 px, solo con teclado |

El cambio de largo lleva una transición de 0,32 s que se apaga con `prefers-reduced-motion`.

## Decisiones de diseño

### El estado vive fuera

Cuál es la página actual y a dónde salta lo pone quien pagina: el componente recibe `current` y avisa con `onSelect`.

### Con una sola página no pinta nada

Un índice de uno no dice nada: con `count` menor que 2 el componente no renderiza.

## Accesibilidad

- **Rol** `button` en cada punto, dentro de un grupo con nombre. Teclado: Tab, Enter, Espacio.
- **Cada punto tiene su nombre:** «Página 2 de 3». El activo lleva `aria-current`: el color (y el largo) no viajan solos.
- **Diana:** las rayas verticales miden 4 px, así que la zona pulsable se amplía por CSS a 24 px de alto sin cambiar lo que se ve.

## Uso

**Do**

- Entre dos y seis páginas.
- `vertical` solo pegado al canto de la ventana, como índice.
- Cambiar `itemLabel` si no son páginas («Frase 2 de 3»).

**Don't**

- Puntos sin `onSelect` en algo que sí se puede recorrer.
- Más de seis: pon números.
- Colorear el activo: se alarga.

## Equivalencias con Figma

Página `Bullets` del archivo de diseño, set `Bullets` (16:17). `Orientación = horizontal / vertical` es `orientation`. En las charlas es el componente `puntos` de base-540.css y el índice lateral `v2-indice`.
