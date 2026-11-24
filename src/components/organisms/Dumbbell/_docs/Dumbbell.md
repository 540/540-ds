El antes y después por fila: **dos puntos por fila, el de antes en gris y el de después en color, unidos por una línea; al llegar a la pantalla, el punto de después viaja desde la cifra de antes hasta la suya.** A la derecha, la cifra de después y la diferencia.

## Anatomía

1. **Leyenda**: los nombres de los dos momentos (`labels`), con su color.
2. **Nombre de la fila** en `body-m`, a la izquierda; en móvil, encima del dibujo.
3. **Guías** finas en cada cifra redonda de la escala.
4. **Punto de antes**, gris, de 12 px.
5. **Línea** gris de 3 px, del antes al después.
6. **Punto de después**, de 16 px con un filo del color del fondo, en tinta o en el `tone` que se pida.
7. **Cifra de después** en `body-s-bold` y **diferencia** («+19», «−9») en `body-s` gris.
8. **Escala** al pie, en `micro` gris.

## Cuándo usarlo

- Dos momentos de las mismas filas y lo que importa es cuánto se movió cada una: antes y después de un cambio, un año y el siguiente.
- Ver de un vistazo qué filas suben y cuáles bajan.

## Cuándo no

- Más de dos momentos, o una evolución: es `LineChart`.
- Dos series que se comparan entre sí, no un cambio: es `BarSeries`.
- Una cifra por fila: es `Bars`.
- Un solo dato que cambió: es `Metric`.

## Variantes

| `tone` del después | Color | Para qué |
|---|---|---|
| `ink` (por defecto) | Tinta | El caso general |
| `accent` | Amarillo | Cuando el cambio es el mensaje de la parada. **Una gráfica así por parada** y cuenta para la cuota de amarillo |

El antes es siempre gris (`context`). `change={false}` quita la diferencia; `display` escribe la cifra de después como se dice.

## Estados

Al llegar a la pantalla o al encenderse su `Step`, cada punto de después sale de la cifra de antes y llega a la suya en 0,9 s, y la línea se estira con él; las filas, una detrás de otra (50 ms). Al salir vuelven a su origen. Con `prefers-reduced-motion` se ven ya hechos.

## Decisiones de diseño

### La escala no empieza en cero

Aquí no se mide una longitud sino una distancia entre dos puntos, así que la escala va de un número redondo bajo la menor cifra a uno sobre la mayor: se aprovecha el ancho y se ven los cambios pequeños. Si hace falta el cero, o comparar con otra gráfica, se fijan `min` y `max`.

### El movimiento cuenta el cambio

El punto viaja del antes al después en la dirección en la que cambió: la animación es el dato, no un adorno. Por eso el antes no se mueve.

### La diferencia, en la misma unidad

La diferencia se escribe con signo y en la unidad de las cifras: si las cifras son porcentajes, la diferencia son puntos. Si se quiere decir de otra manera, `change={false}` y un `display`.

## Accesibilidad

- La gráfica tiene nombre (`label`); el dibujo es decorativo.
- Detrás va una tabla que solo leen los lectores de pantalla, con el antes, el después y la diferencia de cada fila.

## Uso

**Do**

- De 3 a 8 filas, ordenadas por el después o por el cambio.
- Nombres cortos para los dos momentos («2025», «Antes»).
- `min` y `max` fijos cuando dos gráficas se comparan.

**Don't**

- Más de una gráfica con `accent` en la misma parada.
- Usarla para dos series que no son dos momentos de lo mismo.
