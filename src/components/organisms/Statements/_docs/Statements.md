Las frases del recorrido: **una pila de sentencias en statement, cada una una parada.** Es la pieza de las «tres tesis» de la charla y de las paradas 0° a 540° del manifiesto.

## Anatomía

Una Slide sin alto mínimo con una pila a sangre. Cada frase va en `statement`, centrada, a tres cuartos (900 px), con el ordinal («01 ») delante en un `span` oculto al lector. Entre frases, 1,5 veces el tamaño del statement; por encima de la primera, media pantalla.

Cada frase lleva `data-stop`, así que **Deck la cuenta como parada**: la flecha salta de frase en frase, y el índice lateral tiene una raya por frase.

## Cuándo usarlo

- Las tres tesis de una charla.
- Las seis paradas del manifiesto («Donde otros terminan, nosotros empezamos.»).
- Cualquier secuencia de frases que se quiera leer una a una.

## Cuándo no

- Una sola frase: eso es Punchline o Quote.
- Frases largas: si no cabe en dos líneas de statement, es un párrafo.

## Variantes

Ninguna. El ordinal se puede quitar con `numbered={false}`.

## Estados

| Estado | Qué se ve |
|---|---|
| La frase que ocupa el centro de la pantalla | Encendida |
| Las ya dichas | Al 14 % |
| Las que vienen | Ocultas: no se adelanta lo que aún no se ha dicho |

El cambio es un fundido de 0,35 s. Con `prefers-reduced-motion` todas se ven encendidas. El lector de pantalla lee todas siempre.

## Decisiones de diseño

### Las paradas pesan igual

Misma escala, mismo aire, mismo tratamiento para cada frase. En cuanto una se pinta más grande que otra hay jerarquía donde el concepto pide frases iguales.

### Los grados se leen pero no se anuncian

El ordinal es un guiño de marca y no un dato: va con `aria-hidden`.

### La pila sangra

El contenedor de las frases se sale de la columna (`margin-inline: calc(50% - 50vw)`) para que el aire entre ellas sea el de la pantalla, no el de la columna.

## Accesibilidad

- Cada frase es un párrafo; el ordinal no se lee.
- Cada frase es una parada con su nombre en el índice.

## Uso

**Do**

- De tres a seis frases.
- Una idea por frase, en una o dos líneas.

**Don't**

- Negritas dentro de las frases: aquí la jerarquía es el orden.
- Mezclar con otros bloques en la misma Slide.

## Equivalencias

No está en Figma. En las charlas es `#tesis-seccion`, `.tesis-pila`, `.tesis-parada` y `.tesis-frase` con `[data-mov="frase"]` (base-540.css y navegacion-540.js).
