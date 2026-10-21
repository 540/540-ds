Una cita: **una frase que dijo alguien, en statement a tres cuartos, con quién la dijo debajo.**

## Anatomía

Un `figure` centrado con 24 px entre piezas: la frase en `blockquote` con `statement`, equilibrada, a tres cuartos (900 px); y la atribución en `figcaption` con `micro-light` secundario. La banda va `raised`.

## Cuándo usarlo

- Una frase de otra persona que sostiene la parada.

## Cuándo no

- Una frase propia: eso es Punchline (remate) o Statements.
- Un párrafo entrecomillado: si no cabe en dos líneas de statement, es una Story.

## Variantes

Ninguna.

## Estados

Ninguno. Las charlas hacen aparecer la frase palabra a palabra con GSAP; queda para los efectos.

## Decisiones de diseño

### La atribución en micro

Quién lo dijo importa, pero la frase es lo que se lee desde el fondo. La atribución va pequeña y en gris, debajo, como un pie.

## Accesibilidad

- `figure` + `blockquote` + `figcaption`: el lector de pantalla anuncia la cita y su autor como tal.

## Uso

**Do**

- Frases de una o dos líneas.
- Nombre y, si hace falta, un contexto corto («Mary, en una revisión de 2024»).

**Don't**

- Comillas tipográficas dentro: el `blockquote` ya es la cita.

## Equivalencias

No está en Figma. En las charlas es `.charla-cita` y `.charla-citaFrase` (base-540.css, GUIA-ESTILOS parada 8).
