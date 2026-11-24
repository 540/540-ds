Las barras con varias series: **unas barras horizontales con dos o más cifras por fila, agrupadas (una barra fina por serie) o apiladas (una barra partida en sus series, con el total en la punta), que crecen desde la izquierda al llegar a la pantalla.**

## Anatomía

1. **Leyenda**, si hay más de una serie: un cuadro de color y el nombre.
2. **Nombre de la fila** en `body-m`, a la izquierda; en móvil, encima de las barras.
3. **Barras**:
   - agrupadas (`grouped`): una barra fina por serie, una debajo de otra, cada una con su cifra en la punta en `body-s-bold`;
   - apiladas (`stacked`): una barra de 24 px partida en tramos, uno por serie, separados por una línea fina del color del fondo, y el total en la punta.

## Cuándo usarlo

- Comparar dos o tres series en las mismas categorías: este año y el anterior, dos grupos, dos canales.
- Ver de qué se compone un total (`stacked`): cuánto pone cada parte en cada fila.

## Cuándo no

- Una sola cifra por fila: es `Bars`.
- Una serie en el tiempo, con muchos puntos: es `LineChart`.
- Solo dos momentos y lo que importa es el cambio de cada fila: es `Dumbbell`.
- Las partes de un único total: es `Share` o `Waffle`.
- Los pasos de un proceso que se van quedando por el camino: es `Funnel`.

## Variantes

| `tone` de la serie | Color | Para qué |
|---|---|---|
| `ink` (la primera, por defecto) | Tinta | La serie que cuenta la historia |
| `context` (las demás, por defecto) | Gris | Lo que acompaña |
| `accent` | Amarillo | La serie que importa. **Una por gráfica** y cuenta para la cuota de amarillo |

`mode`: `grouped` (por defecto) o `stacked`.

## Estados

Las barras crecen desde la izquierda en 0,9 s, una detrás de otra (50 ms), al llegar a la pantalla o al encenderse su `Step`; al salir se recogen. Agrupadas, crecen fila a fila y serie a serie; apiladas, la barra entera crece con sus tramos dentro. Con `prefers-reduced-motion` se ven ya hechas.

## Decisiones de diseño

### Las mismas barras que `Bars`

El grosor, la cifra en la punta, la curva y el escalonado son los de `Bars`, para que una parada con las dos no parezca de dos sistemas. Agrupadas, cada barra es más fina (12 px) para que la fila no crezca el doble.

### Agrupadas para comparar, apiladas para sumar

Agrupadas se compara cada serie con la otra fila a fila; apiladas se lee el total y solo el primer tramo se compara bien entre filas. Si la pregunta es «¿cuál creció?», agrupadas; si es «¿de qué se compone?», apiladas.

### Escala compartida

Todas las barras miden contra la misma cifra: la mayor (o el mayor total, si van apiladas). Si se compara con otra gráfica, se fija `max` en las dos.

## Accesibilidad

- La gráfica tiene nombre (`label`); el dibujo es decorativo.
- Detrás va una tabla que solo leen los lectores de pantalla, con todas las cifras y, apiladas, el total de cada fila.

## Uso

**Do**

- De 2 a 4 series y de 3 a 8 filas.
- Nombres de fila cortos.
- La serie que cuenta la historia, la primera.

**Don't**

- Más de un `accent` por gráfica.
- Apilar series que no suman un total con sentido.
- Más de tres series: con tinta, gris y un amarillo no se distinguen más.
