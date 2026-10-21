La retícula: **doce columnas en los tres tramos y los dos canales.** El reparto que se escribe es el de escritorio; la rejilla deduce los otros dos.

## Anatomía

1. **Grid:** `display: grid` con `--grid-columns` (12) y `--grid-gutter` como hueco.
2. **GridItem:** una celda con su `span` de escritorio.

| Tramo | Qué pasa |
|---|---|
| Móvil (< 600) | Cada celda ocupa la fila |
| Tablet (600–1023) | Los spans de 1 a 6 ocupan media fila; los mayores, la fila |
| Escritorio (≥ 1024) | Cada celda su span |

## Cuándo usarlo

- Tarjetas, herramientas, casos: cualquier reparto en columnas.
- Dos columnas (anillo y panel, 7 + 5).

## Cuándo no

- Una lista vertical: no hace falta rejilla.
- Dentro de otra rejilla sin motivo: anidar canales duplica el aire.

## Variantes

| `layout` | Qué hace |
|---|---|
| `twelve` (por defecto) | Doce columnas con spans |
| `five` | Cinco columnas iguales (las cinco piezas del sistema) |
| `fiveCentered` | Tres arriba y dos centradas debajo, desde 1024 px |

`compact` baja un punto los textos y el relleno de las tarjetas de dentro: para cinco tarjetas en una fila.

## Estados

Ninguno.

## Decisiones de diseño

### El span es el de escritorio

Una pantalla no escribe repartos de móvil: en tablet nada baja de media fila y en móvil todo ocupa la fila. Dos números (600 y 1024) y ninguna excepción.

### Las celdas igualan altura

Lo que va dentro de una celda ocupa el 100 % de su alto, así que las tarjetas de una fila quedan iguales.

## Accesibilidad

- Es reparto: no anuncia nada. El orden de lectura es el del DOM.

## Uso

**Do**

- Spans que sumen 12 por fila (4 + 4 + 4, 6 + 6, 7 + 5).
- `five` o `fiveCentered` para cinco piezas.

**Don't**

- Spans de móvil o tablet a mano.
- Rejillas anidadas.

## Equivalencias

Figma: página «Medidas» (Grid) y «Anchos de pantalla». En las charlas es `.grid`, `.grid-item`, `.grid-span-*`, `.cinco-columnas`, `.rejilla-cinco` y `.compacta` (base-540.css y CSS propio).
