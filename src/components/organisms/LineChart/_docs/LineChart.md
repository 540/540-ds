La gráfica de líneas: **una evolución en el tiempo, de una a tres series sobre las mismas categorías, que se dibuja desde la izquierda al llegar a la pantalla.** Al pasar el ratón (o con ← → desde el teclado) enseña la cifra de cada serie en ese punto.

## Anatomía

1. **Leyenda**, si hay más de una serie: un cuadro de color y el nombre.
2. **Eje vertical** con cifras redondas en `micro` gris y una guía fina por cifra.
3. **Líneas** de 3,5 px, sin puntos. La discontinua es una previsión o un objetivo.
4. **Área** opcional, un relleno tenue bajo la línea.
5. **Categorías** del eje horizontal en `micro` gris.
6. **Cursor y ficha** al señalar: una línea vertical, un punto por serie y la cifra de cada una.

En proyección el área es 5:2; en móvil, 4:3.

## Cuándo usarlo

- Cómo cambia algo en el tiempo: meses, trimestres, años.
- Comparar la tendencia de dos o tres series.
- Una medida frente a su previsión u objetivo (`dashed`).

## Cuándo no

- Cantidades sin orden en el tiempo: son `Bars` o `BarSeries`.
- Dos momentos, antes y después: es `Dumbbell`.
- Una línea dentro de un diagrama con anotaciones a mano: es `Schema` con `schema.series`.

## Variantes

| `tone` de la serie | Color | Para qué |
|---|---|---|
| `ink` (la primera, por defecto) | Tinta | La serie que cuenta la historia |
| `context` (las demás, por defecto) | Gris | Lo que acompaña |
| `accent` | Amarillo | La serie que importa. **Una por gráfica** y cuenta para la cuota de amarillo |

`area` rellena bajo las líneas; `dashed` hace una serie discontinua.

## Estados

Cada línea se dibuja en 1,2 s, una detrás de otra (150 ms), al llegar a la pantalla o al encenderse su `Step`; al salir se borra. Las discontinuas y el área aparecen con un fundido. Con `prefers-reduced-motion` se ven ya hechas.

## Decisiones de diseño

### Ejes redondos

El eje vertical va de 0 a un número redondo (de 1, 2, 2,5 o 5 en 5) sobre el mayor valor. Si se compara con otra gráfica, se fija `max` en las dos.

### Las cifras en la ficha, no en la línea

Una cifra en cada punto llena la parada. La línea cuenta la forma; quien quiere el número lo señala. Si una cifra importa, va en un `Metric` al lado.

## Accesibilidad

- El dibujo tiene nombre (`label`) y se puede enfocar: con ← → recorre los puntos y la ficha se anuncia.
- Detrás va una tabla que solo leen los lectores de pantalla, con todas las cifras.

## Uso

**Do**

- De 4 a 12 categorías.
- Etiquetas cortas en el eje horizontal («Ene», «T1», «2026»).
- `min` y `max` fijos cuando dos gráficas se comparan.

**Don't**

- Más de un `accent` por gráfica.
- Más de tres series: con tinta, gris y un amarillo no se distinguen más.
