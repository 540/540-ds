El reparto: **un todo en una sola barra, partida en sus partes, con una leyenda que dice el porcentaje de cada una.** Es el `Share` de la charla de la newsletter («España / fuera de España», «LinkedIn / el resto») y las barras de migración del show & tell.

## Anatomía

1. **Título** opcional en `body-s-bold`.
2. **Barra** de 24 px, sin radio, partida en segmentos con 2 px de aire entre ellos.
3. **Leyenda**: por cada parte, un cuadrado de su color, su nombre en `body-s` y su porcentaje en `body-s-bold`.

## Cuándo usarlo

- Dos a cuatro partes de un mismo total.
- Como indicador: una parte frente al resto («2 de cada 3»).
- Debajo de un `Metric` o al lado de unas `Bars`, para el dato que resume.

## Cuándo no

- Más de cuatro partes: son `Bars`.
- Cantidades que no suman un todo.

## Variantes

Los tonos son los de `Bars`. Sin `tone`, la primera parte va en tinta y las demás en gris.

| `tone` | Para qué |
|---|---|
| `ink` | La parte que cuenta la historia |
| `context` | El resto |
| `accent` | La parte que importa. **Una por gráfica** y cuenta para la cuota de amarillo |

## Estados

Los segmentos crecen en 0,9 s, uno detrás de otro (100 ms), al llegar a la pantalla o al encenderse su `Step`. Con `prefers-reduced-motion` se ven ya hechos.

## Decisiones de diseño

### Sin quesos

Las charlas nunca usaron un gráfico circular: una barra se compara mejor con otra barra y cabe en la misma fila que un texto.

### El porcentaje lo calcula la pieza

Se pasan las cantidades; los porcentajes salen de su suma, con coma decimal y espacio antes del %.

## Accesibilidad

- La leyenda es una lista con nombre: el lector oye cada parte con su porcentaje.
- La barra es decorativa.

## Uso

**Do**

- Dos partes cuando la frase es «X de cada Y».
- La parte que importa a la izquierda.

**Don't**

- Escribir porcentajes que no sumen 100.
- Dos `accent`.

## Equivalencias

No está en Figma. En las charlas es `components/charts/Share.tsx` (newsletter) y `.mig__bar` (show & tell).
