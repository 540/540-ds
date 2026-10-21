Número, título y explicación. **Caja con borde o banda de lado a lado.** La misma pieza en dos formas.

## Anatomía

1. **Ordinal** opcional («01»). Decorativo: va oculto para el lector de pantalla.
2. **Título**, un `h3` por defecto. En la caja va en `body-l`; en la banda, en `title-m`.
3. **Explicación** en `body-s-light`: dos o tres frases seguidas.

Entre el encabezado y la explicación, 36 px (`--padding-section`).

## Cuándo usarlo

- Las cuatro tarjetas de Servicios.
- La ficha práctica de Formación.
- Cualquier rejilla de cosas comparables entre sí.
- Una lista de apartados que se recorre de arriba abajo, con `row` dentro de un CardList.

## Cuándo no

- Un caso del portfolio: usa CaseItem, que lleva imagen y enlace.
- Una persona del equipo: usa TeamMember.
- Una sola tarjeta suelta: si no hay con qué compararla, es un párrafo.

## Variantes

| `variant` | Forma | Qué la separa | Dónde |
|---|---|---|---|
| `boxed` (por defecto) | Caja con borde, del color de la página | El borde | Rejillas |
| `row` | Banda de lado a lado | Su raya de arriba | Dentro de un CardList |

`boxed`: lo único que la separa del fondo es el borde. Una tarjeta más clara pediría una sombra, y la sombra es un lenguaje que este sistema no usa.

`row`: no hay caja. La raya de abajo del todo la pone CardList, porque una fila no sabe si es la última. Devuelve la columna con su relleno y va dentro de un CardList, que es quien la saca de la columna.

`align="center"` centra todo y acota la explicación a 62 caracteres.

## Estados

El estado es de la banda, no de la caja: lo que se responde es «cuál de los cuatro», y eso una tarjeta sola no lo sabe. La de caja enseña siempre su explicación, así que solo tiene `open`.

| `state` (solo `row`) | Qué pasa |
|---|---|
| `open` (por defecto) | Explicación visible |
| `folded` | La ventana se cierra a cero y se recorta; el texto sigue en el documento |
| `active` | Se abre y coge el fondo de fila activa (`--color-bg-row-active`) |

El plegado y el fondo llevan transición (0,42 s) que se apaga con `prefers-reduced-motion`.

## Decisiones de diseño

### Esquinas rectas

Lo único redondo del sistema son los botones, y ahí el radio significa «esto se pulsa». Una tarjeta no se pulsa.

### Todas las de una fila igualan altura

La caja ocupa el 100 % del alto de su celda, así que en una rejilla las cuatro quedan a la misma altura aunque una tenga más texto.

### Sin sombra

El fondo es el de la página; la separa el borde.

## Accesibilidad

- Es un `article` con texto, sin rol propio.
- **El título es un `h3`** (configurable) y entra en el índice de la página.
- **Plegada, la explicación sigue en el documento** y se lee igual: lo que se pliega es lo que se ve.
- Si la lista se enciende al pasar el ratón, tiene que encenderse también al recibir el foco (lo hace CardList).
- El ordinal va con `aria-hidden`: es un guiño, no un dato.

## Uso

**Do**

- Dos o más tarjetas comparables, en una rejilla o en una lista.
- Ordinales cuando el orden importa («01», «02»).
- `row` siempre dentro de CardList.

**Don't**

- Una tarjeta sola.
- Radios o sombras.
- `state` en `boxed`: no hace nada.

## Equivalencias con Figma

Página `Card` del archivo de diseño, set `Card` (13:27). `Variante = boxed / row` es `variant`; `Alineación` es `align`; `Estado = abierta / plegada / encendida` es `state` (`open` / `folded` / `active`); `ordinal` es `ordinal`. En las charlas es `card`, `card-row`, `card-revela`, `card-activa` y `card-centrada` en base-540.css.
