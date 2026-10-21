Una parada de la charla: **una Section que ocupa la pantalla entera y centra su contenido en un escenario 16:9.** Es la unidad de las presentaciones: cada `Slide` es una parada del recorrido, y Deck las recoge para el índice y el teclado.

## Anatomía

1. **La banda:** fondo a sangre, aire vertical de `--padding-section-block`, alto mínimo de una pantalla (`100svh`) con el contenido centrado verticalmente.
2. **El escenario:** la columna de 1200 px, acotada además a lo que cabe en 16:9 (`100svh × 16 / 9`), con el texto centrado. En una sala con proyector, es lo que se ve.

Viene de las charlas: `section.section.diapo` y `.columna-540.diapo-cont` en base-540.css.

## Cuándo usarlo

- Cada parada de una charla.
- Con `full={false}`, los títulos de bloque que van con su foto detrás: la sección pierde el alto mínimo y la foto asoma debajo.

## Cuándo no

- En la web: ahí es Section, sin alto mínimo ni escenario.
- Anidada: el aire se duplicaría.

## Tonos

| `tone` | Fondo | Para qué |
|---|---|---|
| `default` | Ninguno: deja ver las manchas de fondo | Lo normal |
| `raised` | `--color-bg-row-active` | Historias, objeciones, citas: lo que se quiere separar |

## Estados

Ninguno visual. Deck marca cuál es la parada actual en el índice lateral, no en la propia parada. La navegación por teclado no dibuja recuadro de foco.

## Decisiones de diseño

### Se centra el contenido, no la caja

Al saltar a una parada, Deck centra el escenario (`.diapo-cont`) y no la sección: el relleno no descuadra la parada.

### Las paradas pesan igual

Misma escala, mismo aire, mismo tratamiento. En cuanto una se pinta más grande que otra hay jerarquía donde el concepto pide paradas iguales.

### Una cabecera es una frase

Ni antetítulo, ni entradilla, ni foto detrás: los tres se retiraron del sistema al llegar el recorrido.

## Accesibilidad

- Es un `section` con `id`: el ancla a la que llevan el índice, el menú y el teclado.
- Con `aria-labelledby` apuntando al título de su SectionHeader, es una región con nombre.
- El foco de teclado no pinta recuadro en la parada; sí en todo lo que haya dentro.

## Uso

**Do**

- Un `id` corto y estable por parada (`#contexto`, `#cierre`).
- Dentro: SectionHeader, Text, Card, Grid… lo que haga falta, centrado.
- `raised` solo para separar.

**Don't**

- Fijar alturas a mano.
- Una Slide dentro de otra.
- Más de una idea por parada.

## Equivalencias

En Figma no existe como pieza: es Section más las reglas de la página «Anchos de pantalla». En las charlas es `.diapo` y `.diapo-cont` (base-540.css, sección «Paso de diapositivas»).
