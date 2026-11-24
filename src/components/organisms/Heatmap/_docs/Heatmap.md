El mapa de calor: **una intensidad en una tabla, filas por columnas (días por horas, equipos por semanas), cada celda más oscura cuanto mayor es su cifra.** Las celdas aparecen en diagonal desde arriba a la izquierda al llegar a la pantalla. Al pasar el ratón (o con las flechas desde el teclado) enseña la fila, la columna y la cifra de la celda.

## Anatomía

1. **Nombres de las columnas** arriba, en `micro` gris. Con más de 12 se escribe uno de cada dos (o de cada tres…), para que 24 horas quepan.
2. **Nombres de las filas** a la izquierda, en `micro` gris.
3. **Celdas** casi cuadradas, del color de `tone` en cinco intensidades. Crecen con el ancho hasta un tope.
4. **Clave de color** debajo, a la derecha: los cinco pasos entre la cifra menor y la mayor (o las palabras de `scale`).
5. **Ficha** al señalar una celda: fila, columna y cifra.

## Cuándo usarlo

- Cuándo pasa algo: actividad por día de la semana y hora.
- Un patrón en una tabla de dos entradas: equipos por semanas, canales por meses.
- Buscar los picos y los huecos, más que leer cifras exactas.

## Cuándo no

- Una sola serie en el tiempo: es `LineChart`.
- Cantidades que hay que comparar con precisión: son `Bars` o `BarSeries` (la longitud se lee mejor que la intensidad).
- Dos momentos, antes y después: es `Dumbbell`.
- La relación entre dos medidas: es `Scatter`.
- Una cifra que importa sola: es `Metric`.

## Variantes

| `tone` | Color | Para qué |
|---|---|---|
| `ink` (por defecto) | Tinta | El caso normal |
| `accent` | Amarillo | Cuando el mapa es lo único que importa en la parada. Cuenta para la cuota de amarillo |

`min` y `max` fijan los extremos de la escala; `scale` cambia las cifras de la clave por palabras («Poca», «Mucha»).

## Estados

Las celdas aparecen con un fundido de 0,9 s, en diagonal desde arriba a la izquierda, al llegar a la pantalla o al encenderse su `Step`; al salir se apagan. La celda señalada lleva un contorno. Con `prefers-reduced-motion` se ven ya puestas.

## Decisiones de diseño

### Cinco pasos, no un degradado

Cada celda toma una de cinco opacidades del mismo color (8 %, 25 %, 45 %, 70 % y 100 %). En un proyector, dos tonos de un degradado continuo que se diferencian en un 5 % se ven iguales; cinco escalones bien separados se leen desde el fondo de la sala, y la clave puede enseñarlos todos. La más tenue no es blanca: una celda con cifra baja sigue siendo una celda.

### Un solo color

La intensidad cuenta cuánto; el color no añade nada. Mezclar colores en un mapa obliga a leer dos escalas a la vez.

### La cifra en la ficha, no en la celda

Con 168 celdas, una cifra en cada una es ruido. El mapa enseña dónde están los picos; quien quiere el número lo señala. Si una cifra importa, va en un `Metric` al lado.

## Accesibilidad

- El mapa tiene nombre (`label`) y se puede enfocar: con las flechas recorre las celdas y la ficha se anuncia.
- Detrás va una tabla que solo leen los lectores de pantalla, con todas las cifras.

## Uso

**Do**

- Nombres cortos en filas y columnas («Lun», «9 h», «S1»).
- `min` y `max` fijos cuando la escala tiene extremos naturales (0 % y 100 %) o cuando dos mapas se comparan.
- Hasta unas 10 filas y 24 columnas.

**Don't**

- Usarlo para leer cifras exactas.
- Varios mapas en amarillo en la misma charla.
- Cambiar de `tone` entre filas o celdas: el mapa es de un color.
