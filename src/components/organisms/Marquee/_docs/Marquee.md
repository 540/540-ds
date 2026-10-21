La marquesina: **una tira de piezas cortas que se desplaza sin fin entre dos líneas finas.**

## Anatomía

Una franja con 24 px de relleno vertical y una línea de 1 px arriba y abajo. Dentro, la tira: las piezas en `body-m` secundario, separadas 24 px, repetidas una vez para que el bucle no se note. Se desplaza la mitad de su ancho en 40 s y vuelve a empezar.

## Cuándo usarlo

- Una lista de nombres, etiquetas o palabras que acompaña y no hay que leer entera.

## Cuándo no

- Algo que hay que leer: lo que se mueve se va.
- Enlaces: no se pueden pulsar a tiempo.

## Variantes

Ninguna. `duration` cambia la velocidad.

## Estados

Se para al pasar el ratón por encima. Con `prefers-reduced-motion` no se mueve: se ve la primera vuelta quieta.

## Decisiones de diseño

### La repetición va oculta

La segunda copia de las piezas lleva `aria-hidden`: el lector de pantalla lee la lista una vez.

### Dos líneas, no una caja

La franja se separa del resto con las líneas de arriba y abajo, sin fondo: es un hilo, no un bloque.

## Accesibilidad

- La primera copia se lee como texto normal; la segunda no existe para el lector.
- Sin movimiento con `prefers-reduced-motion`, y pausa al pasar el ratón.

## Uso

**Do**

- Piezas de una a tres palabras.
- Diez o más piezas, para que la tira sea más ancha que la pantalla.

**Don't**

- Frases.
- Más de una marquesina por charla.

## Equivalencias

No está en Figma. En las charlas es `.charla-marquesina`, `.charla-marquesinaTira` y `.charla-marquesinaPieza` (base-540.css).
