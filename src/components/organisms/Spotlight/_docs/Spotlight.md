El foco: **se enciende la pieza que ocupa el centro de la pantalla y el resto queda al 14 %.** Es lo que hace la charla con las tres frases de tesis y con los meses de la cronología de opiniones.

## Anatomía

Un envoltorio que mide dónde está su contenido respecto al centro de la ventana y pone `data-on` cuando lo ocupa (o está a menos del 30 % de la altura). La opacidad pasa de 0,14 a 1 en 0,35 s.

## Cuándo usarlo

- Varias piezas apiladas que se leen una a una al bajar: frases, meses, personas.

## Cuándo no

- Piezas que se comparan entre sí: atenuar las demás impide compararlas.
- Una sola pieza.

## Variantes

Ninguna.

## Estados

Encendido o atenuado, según el scroll. Con `prefers-reduced-motion` todo queda encendido.

## Decisiones de diseño

### La atenuación es ambiente

Al 14 % las demás piezas se intuyen pero no compiten: se sabe que hay más, y se lee solo lo que está delante.

## Accesibilidad

- No cambia el DOM ni el orden de lectura: solo la opacidad. El lector de pantalla lee todo.
- Sin movimiento con `prefers-reduced-motion`.

## Uso

**Do**

- Envolver cada paso de una Timeline o cada frase de una pila.

**Don't**

- Dentro de rejillas.
- En piezas con enlaces: un enlace al 14 % no parece pulsable.

## Equivalencias

No está en Figma. En las charlas es `.ilumina[data-on]` (CSS propio y `arranque-540.js`, «bloques .ilumina») y la iluminación de las tesis y los meses en `navegacion-540.js`.
