Las tres listas de las charlas: **sin viñetas, separadas por aire.**

## Anatomía

| Componente | Qué es | Dónde va |
|---|---|---|
| **SimpleList** | Ítems en `body-m` centrados, 12 px entre ellos | En una hoja o una tarjeta: «cómo trabaja» |
| **ArrowList** | Lo mismo, con una flecha «→» en gris delante de cada ítem | Dentro de tarjetas: lo que lleva a algo |
| **ProblemList** | Pares de etiqueta (`body-s` secundario) y texto (`body-m` primario), 24 px entre pares | Una lista de problemas o límites, cada uno con su nombre |

## Cuándo usarlo

- Tres a cinco cosas que se leen seguidas.
- Dentro de Card, Sheet o una parada centrada.

## Cuándo no

- Una sola cosa: es un párrafo.
- Pasos en orden: es Flow o Timeline.

## Decisiones de diseño

### Sin viñetas

El sistema no usa puntos de lista: el aire separa. La flecha de ArrowList no es una viñeta, es el sentido («esto lleva a»), y va en gris para no pesar más que el texto.

### La etiqueta en gris, el texto en negro

En ProblemList la etiqueta nombra y el texto cuenta: dos tintas, dos funciones.

## Accesibilidad

- Listas de verdad (`ul`): el lector anuncia cuántos ítems hay.
- La flecha va con `aria-hidden`.

## Uso

**Do**

- Ítems de una o dos frases.
- Negrita en la parte que importa, no en el ítem entero.

**Don't**

- Más de seis ítems.
- Listas anidadas.

## Equivalencias

No están en Figma. En las charlas son `.lista-simple`, `.lista-flechas` y `.lista-problemas` / `.problema` (CSS propio de las charlas).
