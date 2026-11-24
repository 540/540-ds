El gofre: **una proporción contada en cuadros, una cuadrícula de 10 × 10 en la que la parte destacada se llena cuadro a cuadro al llegar a la pantalla.** Dice «37 de cada 100» de forma que se ve y se cuenta.

## Anatomía

1. **Cuadrícula** de 100 cuadros iguales, sin esquinas redondas, separados por `--space-xs`. Cada cuadro es una centésima.
2. **Parte destacada**: los primeros cuadros, en el color del tono.
3. **Segunda parte** opcional: los cuadros siguientes, en gris.
4. **Resto**: los cuadros vacíos, en gris claro (`--color-border-default`).
5. **Cifra** al lado, en `title-l`: el porcentaje, que cuenta a la vez que se llenan los cuadros, o el texto de `display`.
6. **Pie** opcional bajo la cifra, en `body-s` gris.
7. **Leyenda**, solo con segunda parte.

La cuadrícula mide como mucho 288 px; la cifra va a su derecha y, si no cabe, debajo.

## Cuándo usarlo

- Una proporción que se entiende mejor contada en unidades: «37 de cada 100».
- Una parte frente al resto, y como mucho una segunda parte.
- Cuando la cifra tiene que sentirse como personas, equipos o casos, no como un ángulo.

## Cuándo no

- Un porcentaje como avance hacia un objetivo, o varios que se comparan en fila: es `ProgressRing`.
- Tres o cuatro partes de un todo: es `Share`.
- Una cifra suelta, sin total: es `Metric`.
- Un avance en el tiempo: es `ProgressBar`.
- Cantidades que se comparan: es `Bars`. Su evolución: es `LineChart`. Etapas que se van quedando gente: es `Funnel`.

## Variantes

| Parte | Color | Para qué |
|---|---|---|
| Destacada, `tone="ink"` (por defecto) | Tinta | La parte que cuenta la historia |
| Destacada, `tone="accent"` | Amarillo | La parte que importa. **Una por parada** y cuenta para la cuota de amarillo |
| `secondary` | Gris | Una segunda parte que acompaña, con leyenda |
| Resto | Gris claro | Lo que queda hasta cien |

`total` pasa una cantidad a cuadros (18 de 48 son 38 cuadros); `display` escribe la cifra a mano y entonces no cuenta.

## Estados

Al llegar a la pantalla o al encenderse su `Step`, los cuadros destacados se llenan uno detrás de otro (10 ms entre cuadro y cuadro, 0,4 s cada uno), y después los de la segunda parte; la cifra cuenta a la vez. Al salir se vacían. Con `prefers-reduced-motion` se ve ya hecho.

## Decisiones de diseño

### Se llena en orden de lectura

Los cuadros se llenan de izquierda a derecha y de arriba abajo, como se lee. Así las filas enteras son decenas y se cuentan de un vistazo: 37 son tres filas y siete cuadros. Llenar desde abajo, como un vaso, obliga a contar al revés.

### Cuadros redondeados a la centésima

Cada cuadro es un 1 %. La cifra dice el valor exacto (con `decimals` si hace falta); los cuadros, el redondeo. Por debajo del 1 % el gofre no sirve.

### Dos partes como mucho

Con más partes los cuadros dejan de contarse y pasan a ser manchas de color: para eso está `Share`.

## Accesibilidad

- La cuadrícula es una imagen con nombre: `label` y las cifras de cada parte («Primera medida: 37 %»).
- La cifra grande no se lee por separado, porque ya está en el nombre. El pie se lee como texto normal.

## Uso

**Do**

- Escribir la cifra como se dice en voz alta cuando ayuda: «37 de cada 100».
- Un pie corto que diga qué se cuenta.

**Don't**

- Más de un `accent` por parada.
- Valores por debajo del 1 %: no llenan un cuadro.
- Varios gofres en fila para comparar: son `ProgressRing` o `Bars`.
