El dato: **una cifra grande, lo que mide en gris y su variación en negrita, dentro de una caja.** Son las tarjetas de telemetría de la charla («0,76 %», «−89 % desde el 7,06 % inicial»).

## Anatomía

1. **Cifra** en `title-l`, como `h3`.
2. **Etiqueta** en `body-s` secundario: qué mide.
3. **Variación** en `body-s-bold` primario: cuánto ha cambiado y desde dónde.
4. **MetricNote**, aparte: la nota de abajo de una fila de datos (de dónde salen), en `body-s` a 14 px incluso en proyección.

La caja es la de Card: borde fino, sin radio, sin sombra, centrada.

## Cuándo usarlo

- Tres o cuatro cifras comparables en una fila, con su nota de origen debajo.

## Cuándo no

- Una cifra sola en medio de un texto: va en el texto.
- Texto largo: la etiqueta es una línea.

## Variantes

Ninguna. La variación es opcional.

## Estados

Ninguno.

## Decisiones de diseño

### La variación en negro, también en oscuro

En la charla, en modo oscuro la variación iba en el acento. El sistema la deja en primario en los dos temas: el texto solo va en negro y gris, y la negrita ya la destaca.

### La nota no crece en proyección

Las notas de telemetría son letra pequeña de verdad: 14 px aunque el cuerpo suba a 20. Si hace falta leerlas, no son notas.

## Accesibilidad

- La cifra es un `h3`: entra en el índice. La etiqueta, debajo, la explica.

## Uso

**Do**

- Tres o cuatro Metric en un Grid, y una MetricNote debajo.
- Cifras con la unidad.

**Don't**

- Más de una cifra por caja.
- Colores en la variación.

## Equivalencias

No está en Figma. En las charlas es `.card-centrada` con `.dato-delta` y `.nota-telemetria` (CSS propio de la charla).
