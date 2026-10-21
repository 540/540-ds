La línea de tiempo: **un eje vertical a media retícula con un punto y un título por paso, unidos por una línea continua.** Cada paso es una parada.

## Anatomía

1. **Cabecera** centrada encima («Meses de investigación»).
2. **Lista ordenada** a media retícula (588 px), 48 px por debajo de la cabecera.
3. **Cada paso:** un punto de 16 px en tinta primaria, el título en `title-s` y el cuerpo en `body-m` secundario, centrados, con 24 px entre piezas. Entre pasos, 72 px, y en ese hueco el eje de 2 px en `--color-border-strong`.

Cada paso puede llevar además un **antetítulo** (`kicker`, una fecha, «Zoom · marzo») en `body-s` secundario encima del título, y un **extra** debajo del cuerpo: un Flow con la pieza del mes, o una Sheet dentro de un Step para ampliar un hito.

Cada paso lleva `data-stop`: Deck lo cuenta como parada.

## Cuándo usarlo

- Una cronología: meses, hitos, versiones.
- Cualquier secuencia que se quiera leer paso a paso y en orden.

## Cuándo no

- Pasos encadenados que se leen de un vistazo: eso es Flow.
- Más de ocho pasos: es otra charla.

## Variantes

Ninguna.

## Estados

Un paso con `alert` pinta su punto en rojo: es «el problema» de la cronología. El texto sigue en negro y gris; el color solo va en el punto.

El eje se dibuja de arriba abajo y el punto aparece cuando el paso entra en pantalla, con animaciones guiadas por el scroll (`animation-timeline: view()`) donde el navegador lo soporta; nada con `prefers-reduced-motion`. Las charlas además iluminan el mes actual y atenúan los demás con GSAP; eso queda para los efectos.

## Decisiones de diseño

### El eje es continuo

En la primera versión cada paso tenía un trazo corto; en la v2 el eje es una sola línea de 2 px que une los puntos: una cronología es un recorrido, no una lista.

### Una parada por paso

Un mes se lee entero antes de pasar al siguiente. El índice lateral tiene una raya por mes.

## Accesibilidad

- Lista ordenada (`ol`): el lector de pantalla anuncia cuántos pasos hay y en cuál está.
- El título de cada paso es un `h3`; el punto es decorativo.
- Región con nombre a través de la cabecera.

## Uso

**Do**

- De tres a ocho pasos.
- Un título corto («Marzo», «Versión 2») y dos frases de cuerpo.

**Don't**

- Pasos sin cuerpo: si no hay nada que contar, es un Flow.
- Dos líneas de tiempo seguidas.

## Equivalencias

No está en Figma. En las charlas es `.crono`, `.crono-paso` y `.crono-punto` (base-540.css, GUIA-ESTILOS parada 13 y «v2: la línea de tiempo es un eje continuo»).
