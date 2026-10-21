Una banda de la página: **fondo a sangre, contenido en la columna y el aire vertical del sistema.** Es lo que da el ritmo vertical a todas las secciones.

## Anatomía

Dos piezas, y no una a propósito:

1. **La banda:** el fondo, de lado a lado, con el aire vertical de `--padding-section-block` (48 px en móvil, 120 en escritorio).
2. **La columna:** llena la banda y se para en `--size-container` (1200 px), centrada, con el relleno de página a los lados. Es `max-width` con `margin-inline: auto`, así que la misma banda vale a 1440 (donde la columna se queda en 1200) y a 375 (donde llena la ventana menos su relleno).

Si el fondo estuviera en la columna se cortaría en los 1200 y la sección dejaría de ser una banda: se vería una tira de color flotando con el papel a los lados.

## Cuándo usarlo

- Cada una de las siete secciones de la página.
- Cuando el bloque necesita un fondo que llegue de lado a lado.

## Cuándo no

- Un bloque dentro de otra sección: el aire vertical se duplicaría.

## Tonos

| `tone` | Fondo | Para qué |
|---|---|---|
| `default` (por defecto) | Ninguno: deja ver el fondo de la página y lo que haya detrás, como las manchas que cruzan de una sección a la siguiente | Lo normal |
| `raised` | `--color-bg-row-active`, un peldaño por encima | Historias, objeciones, citas: las paradas que se quieren separar |

Tuvo un tercer tono, `inverse` (la banda del color contrario), y se fue con el sistema de tonos: era el único que obligaba a que lo de dentro eligiera su propia tinta, y ninguna pantalla lo pedía. El tono de la banda y el de las piezas de dentro se eligen por separado.

## Estados

Ninguno.

## Decisiones de diseño

### No se anida

Una Section dentro de otra duplica el aire vertical. Lo que va dentro son cabeceras, rejillas y tarjetas.

### La diapositiva es otra pieza

En las charlas, cada parada es una Section que además ocupa la pantalla entera y centra su contenido en un escenario 16:9. Eso lo añade el organismo Diapo, no esta molécula.

## Accesibilidad

- Es un `section`. Cuenta como **región con nombre** solo si se le apunta al título de su SectionHeader con `aria-labelledby` (y el `titleId` de la cabecera).
- El fondo es decoración: no lleva nada que leer. Si dijera algo, sería contenido.

## Uso

**Do**

- Una Section por sección de página, con su SectionHeader dentro.
- `aria-labelledby` apuntando al título.
- `raised` solo para separar; no para decorar.

**Don't**

- Anidar secciones.
- Meter el fondo en la columna.
- Fijar el ancho de la columna: es `max-width`.

## Equivalencias con Figma

Página `Section` del archivo de diseño, set `Section` (17:9). `Tono = default / raised` es `tone`. En las charlas es `section` / `section-raised` y `columna-540` en base-540.css.
