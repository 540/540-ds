El remate: **la frase que cierra un bloque, en statement a tres cuartos, debajo de una línea fina, con una transición opcional a lo que viene.**

## Anatomía

1. **Línea** de 1 px en `--color-border-default` por encima, con 48 px de aire a cada lado.
2. **Frase** en `statement`, equilibrada, a tres cuartos (900 px).
3. **Transición** opcional en `body-m` secundario, a media retícula, 24 px por debajo.

## Cuándo usarlo

- Al final de una parada con tarjetas o un esquema, para cerrarla con una idea (`inside`).
- Como parada propia entre dos bloques (`standalone`).

## Cuándo no

- Para abrir: eso es un título.
- Como cierre de la charla: eso es Closing.

## Variantes

| `placement` | Qué es |
|---|---|
| `inside` (por defecto) | Un bloque al final de una Slide, con 48 px de margen por encima de la línea |
| `standalone` | Su propia Slide, con `id` |

## Estados

Ninguno.

## Decisiones de diseño

### La línea es la única raya

La charla no tiene rayas entre paradas: solo el remate la lleva, porque separa lo que se ha mostrado de lo que se concluye.

### La transición en gris

La frase es el remate; la transición, a media retícula y en gris, es el puente a la siguiente parada. Dos tintas, dos funciones.

## Accesibilidad

- La frase es un párrafo. Si va `standalone`, la Slide tiene su `id` para el índice.

## Uso

**Do**

- Una frase de una o dos líneas.
- `inside` después de tarjetas, `standalone` entre bloques.

**Don't**

- Dos remates seguidos.
- Negritas en la transición.

## Equivalencias

No está en Figma. En las charlas es `.charla-remate`, `.charla-remateFrase`, `.charla-transicion` y `.remate-dentro` (base-540.css, GUIA-ESTILOS paradas 18 y 19).
