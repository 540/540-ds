La gráfica de dispersión: **la relación entre dos medidas, un punto por elemento colocado por su x y su y sobre un marco de cifras redondas en los dos ejes.** Los puntos aparecen de izquierda a derecha al llegar a la pantalla. Al pasar el ratón (o con ← → desde el teclado) enseña el nombre y las dos cifras del punto más cercano.

## Anatomía

1. **Leyenda**, si hay más de un grupo: un cuadro de color y el nombre.
2. **Título del eje vertical** arriba a la izquierda, en `micro` gris en negrita.
3. **Eje vertical** con cifras redondas en `micro` gris y una guía fina por cifra.
4. **Puntos** redondos con un borde del color del fondo, para que se distingan cuando se tocan.
5. **Punto destacado** opcional (`highlight`): amarillo, más grande y con su nombre escrito al lado.
6. **Eje horizontal** con cifras redondas y una guía vertical por cifra, y su **título** abajo a la derecha.
7. **Ficha** al señalar: el nombre del punto y sus dos cifras.

En proyección el área es 5:2; en móvil, 4:3, como `LineChart`.

## Cuándo usarlo

- Si dos medidas van juntas: precio y ventas, inversión y retorno.
- Ver grupos, tendencias y el punto que se sale.
- De 10 a unos 100 elementos.

## Cuándo no

- Una evolución en el tiempo: es `LineChart`.
- Comparar una sola medida entre elementos: son `Bars` o `BarSeries`.
- Dos momentos de la misma medida, antes y después: es `Dumbbell`.
- Una intensidad por filas y columnas: es `Heatmap`.
- Una cifra que importa sola: es `Metric`.

## Variantes

| `tone` del grupo | Color | Para qué |
|---|---|---|
| `ink` (el primero, por defecto) | Tinta | El grupo que cuenta la historia |
| `context` (los demás, por defecto) | Gris | Lo que acompaña |

`highlight` pinta en amarillo el punto cuyo `label` coincide y escribe su nombre. **Uno por gráfica**, y cuenta para la cuota de amarillo.

## Estados

Cada punto aparece creciendo en 0,9 s, uno detrás de otro de izquierda a derecha, al llegar a la pantalla o al encenderse su `Step`; al salir desaparecen. El nombre del punto destacado aparece al final. El punto señalado lleva un contorno. Con `prefers-reduced-motion` se ven ya puestos.

## Decisiones de diseño

### Grupos, no un color por punto

Los puntos van en `groups`, como las series de `LineChart`: cada grupo tiene un nombre y un color, y la leyenda sale sola. Un color suelto por punto acaba en colores sin leyenda; el único punto que lleva color propio es el destacado, y por eso es una prop aparte (`highlight`) que solo admite uno.

### Los ejes no empiezan en cero

En una dispersión se comparan posiciones, no longitudes: los dos ejes van de un número redondo bajo el menor valor a uno sobre el mayor. Si el cero importa, se fija `xMin` o `yMin`.

### Puntos en HTML

Los puntos y las cifras son HTML colocado en porcentajes: el marco se estira con la parada y los puntos siguen siendo redondos.

### Todos del mismo tamaño

El tamaño no lleva una tercera medida: una burbuja grande se lee como más importante, no como más alta. Si hace falta una tercera medida, va en la ficha o en otra gráfica.

## Accesibilidad

- El dibujo tiene nombre (`label`) y se puede enfocar: con ← → recorre los puntos de izquierda a derecha y la ficha se anuncia.
- Detrás va una tabla que solo leen los lectores de pantalla, con todos los puntos y sus cifras.

## Uso

**Do**

- Títulos cortos en los ejes («Precio», «Ventas»), con la unidad en `xUnit` e `yUnit`.
- Un `label` en cada punto, para que la ficha y la tabla digan de qué se habla.
- `highlight` para el punto que da sentido a la parada.

**Don't**

- Más de un punto en amarillo, o un grupo entero en amarillo.
- Más de tres grupos: con tinta, gris y un amarillo no se distinguen más.
- Unir los puntos con líneas: eso es `LineChart`.
