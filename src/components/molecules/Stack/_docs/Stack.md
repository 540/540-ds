La pila: **las piezas de una parada, una debajo de otra, con uno de los tres huecos del sistema entre ellas.** Es lo que separa una cabecera de su rejilla, una fila de cifras de su nota o varias preguntas entre sí, sin escribir un margen.

## Anatomía

1. **La pila:** una columna que ocupa el ancho de la parada.
2. **El hueco** entre piezas: `s` (`--space-l`, 16), `m` (`--space-2xl`, 32) o `l` (`--space-3xl`, 48).
3. **La medida** opcional: a media retícula o a tres cuartos, centrada.

Viene de las charlas: el aire entre `.header`, `.charla-rejilla` y `.charla-transicion` que ponía `base-540.css` con márgenes propios.

## Cuándo usarlo

- Una cabecera y lo que presenta (tarjetas, una captura, un dibujo, unas barras).
- Varias piezas sueltas en columna: preguntas, una lista y su remate.
- Una fila de `Metric` y su `MetricNote`.

## Cuándo no

- Una sola pieza: no hace falta.
- Piezas en columnas: eso es Grid.
- Para separar paradas: cada parada es una `Slide`.

## Variantes

| `gap` | Hueco | Para qué |
|---|---|---|
| `s` | 16 | Piezas de la misma familia: preguntas, filas |
| `m` | 32 | Una pieza y su comentario |
| `l` (por defecto) | 48 | Cabecera y contenido |

| `measure` | Ancho |
|---|---|
| `none` (por defecto) | El de la parada |
| `half` | Media retícula, centrada |
| `wide` | Tres cuartos, centrada |

## Estados

Ninguno.

## Decisiones de diseño

### Tres huecos y ninguno más

Son los tres pasos altos de la escala de espacio. Con tres basta para decir «esto va junto», «esto comenta lo anterior» y «esto es otra cosa»; un cuarto hueco no se distinguiría en una sala.

### Las piezas ocupan el ancho

La pila estira lo que lleva dentro: una rejilla sigue teniendo sus doce columnas. Lo que debe quedarse estrecho (un párrafo, una lista) ya trae su medida.

## Accesibilidad

- Es reparto: no anuncia nada. El orden de lectura es el del DOM.

## Uso

**Do**

- `l` entre la cabecera y el cuerpo de una parada.
- `measure="half"` para una columna de preguntas o de texto.

**Don't**

- Una pila dentro de otra con el mismo hueco: sobra una.
- Un `div` con `gap` o `margin` en su lugar.

## Equivalencias

No está en Figma. En las charlas son los márgenes de `.header`, `.charla-rejilla`, `.charla-transicion` y `.remate-dentro` en `base-540.css`.
