El anillo de fases: **un círculo con una fase por nodo y un arco de progreso que las va cubriendo.** Es el anillo de siete fases de la charla sobre el ciclo del software.

## Anatomía

Un SVG de 880 × 640 con un anillo de radio 215, los nodos repartidos en círculo (empezando arriba), el número dentro de cada uno y la etiqueta fuera. El arco de progreso cubre tantas fases como haya hechas.

## Cuándo usarlo

- Un ciclo o un proceso circular: fases, iteraciones, vueltas.
- Dentro de un Steps, para encenderlo fase a fase con la flecha.

## Cuándo no

- Pasos lineales: eso es Flow o Timeline.
- Más de nueve fases: las etiquetas no caben.

## Estados

| Estado del nodo | Señal |
|---|---|
| `idle` | Borde fino, número en terciario, etiqueta en terciario |
| `done` (antes de la activa, o todas con `all`) | Relleno en primario, número inverso, etiqueta en negrita |
| `active` | Relleno en inverso, un 18 % más grande |

Las **marcas** pintan un nodo del color de estado: `red` (un problema), `green` (resuelto) o `yellow` (la preocupación, con el número en negro). Son los únicos colores de estado de la charla, y van en círculos y trazos, nunca en texto.

## Decisiones de diseño

### El color solo en círculos

Las etiquetas de estado de la charla van en secundario; el rojo, el verde y el amarillo solo pintan nodos y trazos.

### Posicionado por ángulo

Los nodos se reparten en el círculo según cuántas fases haya; las etiquetas se anclan a la izquierda, al centro o a la derecha según dónde caen, así que el anillo vale para cinco, siete o nueve fases sin tocar nada.

## Accesibilidad

- Es una imagen (`role="img"`) con nombre: el lector de pantalla no recorre las fases. Lo que dicen va en el texto de la parada.
- Las transiciones se apagan con `prefers-reduced-motion`.

## Uso

**Do**

- Etiquetas de una o dos palabras.
- `active` que avanza con un Steps.

**Don't**

- Marcas en más de dos nodos a la vez.
- Texto largo en las etiquetas.

## Equivalencias

No está en Figma. En las charlas es `svg.ciclo[data-estados]`, `.ciclo-nodo[data-estado][data-marca]`, `.ciclo-arco` (CSS propio de la charla y `arranque-540.js`, «el anillo de siete fases»).
