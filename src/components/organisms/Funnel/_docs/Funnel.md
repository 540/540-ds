El embudo: **los pasos de un proceso y cuántos llegan a cada uno, en barras centradas que se estrechan con la cifra y que se abren desde el centro al llegar a la pantalla.** Entre dos pasos, qué parte siguió.

## Anatomía

1. **Nombre del paso** en `body-m`, a la izquierda; en móvil, encima de la barra.
2. **Barra** centrada de 24 px, tan ancha como su cifra frente a la del primer paso.
3. **Cifra** en `body-s-bold`, a la derecha.
4. **Conversión** entre dos pasos («62 %»), en `micro` gris, centrada sobre la barra: la parte del paso anterior que llegó a este.

## Cuándo usarlo

- Un proceso en el que la gente se va quedando por el camino: de la visita a la compra, del registro al uso.
- Señalar en qué paso se pierde más.

## Cuándo no

- Cantidades sin orden de proceso: es `Bars`.
- Las partes de un total que no se van restando: es `Share` o `Waffle`.
- Un solo porcentaje de avance: es `ProgressRing`.
- Una conversión que cambia en el tiempo: es `LineChart`.
- La misma conversión en dos momentos, por paso: es `Dumbbell`.

## Variantes

| `tone` | Color | Para qué |
|---|---|---|
| `ink` (por defecto) | Tinta | El caso general |
| `context` | Gris | Un embudo de referencia junto a otro en tinta |
| `accent` | Amarillo | El embudo es la gráfica que importa de la parada. Cuenta para la cuota de amarillo |

`display` escribe la cifra como se dice («12,4 k»); la conversión se calcula siempre con `value`.

## Estados

Las barras se abren desde el centro en 0,9 s, una detrás de otra (50 ms), al llegar a la pantalla o al encenderse su `Step`; las conversiones aparecen con un fundido cuando su barra ya ha crecido. Al salir se recogen. Con `prefers-reduced-motion` se ven ya hechas.

## Decisiones de diseño

### El ancho, frente al primer paso

La primera barra ocupa todo el ancho y las demás miden su cifra frente a ella, así que se ve cuánto queda del total. Si un paso supera al primero, se queda en el ancho entero: el embudo empieza por el paso más grande.

### Conversión del paso anterior

Entre dos pasos se escribe qué parte del anterior llegó, no del total: es la que dice dónde se rompe el proceso. La del total ya la cuenta el ancho de la barra.

### Barras centradas, cifras fuera

Centradas, las barras dibujan la forma del embudo. Las cifras van fuera de la barra porque el texto solo va en tinta o gris, nunca sobre el color.

## Accesibilidad

- La gráfica tiene nombre (`label`); el dibujo es decorativo.
- Detrás va una tabla que solo leen los lectores de pantalla, con la cifra de cada paso y la conversión desde el anterior.

## Uso

**Do**

- De 3 a 6 pasos, en el orden del proceso.
- Nombres de paso cortos («Carrito», «Pago»).
- Contar en la parada, con un `Metric` o el título, el paso donde más se pierde.

**Don't**

- Pasos que no son un proceso, o en otro orden.
- Más de un color en el mismo embudo.
