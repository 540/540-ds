Los pasos encadenados: **píldoras separadas 48 px con una flecha centrada en el hueco, sin tocar ninguna píldora.** En columna por debajo de 600 px («↓») y en fila desde 600 («→»).

## Anatomía

Una lista ordenada de píldoras: relleno 12 × 24, borde `--color-border-default`, radio de cápsula, texto en `body-s`. Entre píldoras, `--space-3xl` (48 px), y la flecha va centrada en ese hueco. Un paso puede ir destacado: fondo invertido y texto inverso.

## Cuándo usarlo

- Un proceso de tres a seis pasos que se lee de un vistazo.
- Dentro de una Slide, debajo de su cabecera.

## Cuándo no

- Pasos con explicación: eso es Timeline, con cuerpo y una parada por paso.
- Un solo paso.

## Variantes

Ninguna. `highlighted` marca el paso que importa.

## Estados

Ninguno.

## Decisiones de diseño

### Las flechas van separadas

Es una regla de las charlas: la flecha no se pega a la píldora. Está centrada en los 48 px del hueco, tanto en fila como en columna. Una flecha pegada se lee como parte del texto.

### Radio de cápsula sin ser botón

Es de las pocas cosas redondas que no se pulsan. Se acepta porque la fila de píldoras se lee como un camino, y las esquinas rectas la romperían en cajas.

## Accesibilidad

- Lista ordenada con nombre: el lector anuncia «lista, 5 elementos» y los recorre en orden.
- Las flechas son CSS (`::before`): no se leen. El orden lo da la lista.
- El destacado conserva contraste: texto inverso sobre fondo inverso.

## Uso

**Do**

- Etiquetas de una a tres palabras.
- Un solo paso destacado, o ninguno.

**Don't**

- Frases largas dentro de las píldoras.
- Flechas escritas en el texto.

## Equivalencias

No está en Figma. En las charlas es `.charla-flujo` y `.charla-paso[data-destacado]` (base-540.css, GUIA-ESTILOS «Regla: las flechas de los pasos encadenados van separadas»).
