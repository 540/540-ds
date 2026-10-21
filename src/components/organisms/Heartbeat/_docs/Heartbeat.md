El latido: **un corazón rojo en trazo que late, con una onda que se expande alrededor.** Es el latido de «la maquineta» de la charla: algo que trabaja solo, cada diez minutos.

## Anatomía

Una caja de 200 × 200 centrada con la onda (un círculo de 144 px con borde rojo que crece y se desvanece cada 1,6 s) y el corazón (116 px, trazo rojo de 2,4, que late con dos golpes en el mismo ciclo).

## Cuándo usarlo

- Para decir «esto está vivo» sin palabras, en una parada sobre un proceso que se ejecuta solo.

## Cuándo no

- Como icono: es una pieza de 200 px, no un icono de 18.
- Más de una vez por charla.

## Variantes

Ninguna.

## Estados

Late siempre. Con `prefers-reduced-motion` se queda quieto.

## Decisiones de diseño

### El único rojo que late

Es de las pocas piezas de la charla en color de estado, y es trazo, no texto: el color acompaña, no informa.

## Accesibilidad

- `aria-hidden`: es decoración. Lo que significa va en el texto de la parada.

## Uso

**Do**

- Solo, centrado, con una frase debajo.

**Don't**

- Cambiarle el color.
- Ponerle texto dentro.

## Equivalencias

No está en Figma. En las charlas es `.latido`, `.latido-onda` y `.latido-corazon` (CSS propio de la charla).
