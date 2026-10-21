El cierre de una charla: **una frase en statement a tres cuartos, y debajo, si hace falta, un cuerpo a media retícula y un remate.** Es la última parada antes del pie.

## Anatomía

1. **Frase** en `statement`, a tres cuartos del contenedor (900 px), con las líneas equilibradas. Puede llevar una parte en negrita: «La IA acelera el ciclo. **El criterio sigue siendo nuestro.**».
2. **Cuerpo** opcional: párrafos en `body-l` secundario a media retícula, con 16 px entre ellos y 32 px por encima.
3. **Remate** opcional: la última línea, en `body-l` primario.

## Cuándo usarlo

- Como última Slide de toda charla, justo antes del DeckFooter.

## Cuándo no

- Para una frase a mitad de charla: eso es Punchline (remate) o Quote (cita).

## Variantes

Ninguna. El cuerpo y el remate son opcionales; la charla de 2026 cierra solo con la frase.

## Estados

Ninguno.

## Decisiones de diseño

### Una frase, no un resumen

El cierre es la vuelta y media: una sola idea, grande. Lo que haya que matizar va en el cuerpo, a media retícula, en gris.

### La negrita marca el giro

Dentro de la frase, lo que va en `strong` es la parte que se quiere que se quede: el peso dice dónde acaba la premisa y empieza la tesis.

## Accesibilidad

- La frase es un párrafo, no un encabezado: el índice de la charla ya tiene el título de la portada.
- El `strong` se anuncia como énfasis.

## Uso

**Do**

- Una frase de una o dos líneas.
- Negrita solo en la segunda mitad.

**Don't**

- Tres párrafos de cuerpo.
- Una lista.

## Equivalencias

No está en Figma. En las charlas es `.charla-cierre`, `.charla-cierreFrase` y `.charla-cierreCuerpo` (base-540.css).
