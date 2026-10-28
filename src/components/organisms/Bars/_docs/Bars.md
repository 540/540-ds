Las barras: **una gráfica de barras horizontales; cada fila con su etiqueta, una barra que crece desde la izquierda y la cifra en la punta.** Son las de la charla de la newsletter (países, fuentes, posts) y las comparativas del show & tell.

## Anatomía

1. **Cabecera** opcional: los nombres de las columnas en `micro-bold` gris.
2. **Etiqueta** en `body-m`: qué es la fila.
3. **Barra** de 24 px de alto, sin radio. Mide `value / max`.
4. **Cifra** en `body-s-bold`, pegada a la punta: viaja con ella al crecer.
5. **Detalle** opcional en `body-s` gris, en una columna a la derecha.

En móvil la etiqueta y el detalle van en una línea y la barra debajo.

## Cuándo usarlo

- Comparar de tres a ocho cantidades de la misma cosa (países, fuentes, piezas).
- Un ranking: las filas ordenadas de mayor a menor.
- Dentro de un `Steps`, cambiando qué fila se atenúa en cada paso.

## Cuándo no

- Partes de un todo: eso es `Share`.
- Una evolución en el tiempo: una línea, con `Schema` (`schema.series`).
- Dos o tres cifras sueltas: son `Metric`.

## Variantes

| `tone` de la fila | Color | Para qué |
|---|---|---|
| `ink` (por defecto) | Tinta (`--color-bg-inverse`) | La serie que cuenta la historia |
| `context` | Gris (`--color-text-tertiary`) | Lo que acompaña |
| `accent` | Amarillo (`--color-bg-accent`) | La fila que importa. **Una por gráfica** y cuenta para la cuota de amarillo |

`dimmed` baja una fila al 30 % para señalar las demás.

## Estados

Las barras crecen en 0,9 s, una detrás de otra (50 ms), al llegar a la pantalla o al encenderse su `Step`; al salir vuelven a cero. Con `prefers-reduced-motion` se ven ya hechas.

## Decisiones de diseño

### Rojo no

La newsletter pintaba de rojo el peor post. En el sistema el rojo es de círculos y trazos: el peor se señala atenuando los demás o con su texto.

### La cifra en la punta

Leer una barra y bajar la vista a un eje cuesta en una sala. La cifra va donde acaba la barra.

## Accesibilidad

- Es una lista con nombre (`label`): el lector oye cada fila con su etiqueta, su cifra y su detalle.
- Las barras y la cabecera son decorativas.

## Uso

**Do**

- De tres a ocho filas.
- `max` fijo cuando se comparan dos gráficas lado a lado.
- `display` para escribir la cifra como se dice («45,9 %»).

**Don't**

- Más de un `accent` por gráfica.
- Etiquetas de más de una línea.

## Equivalencias

No está en Figma. En las charlas es `components/charts/Bars.tsx` (newsletter) y `.cc__vs` / `[data-barra]` (show & tell).
