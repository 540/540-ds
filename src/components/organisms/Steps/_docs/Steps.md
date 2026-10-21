Un bloque que **se recorre por pasos con el teclado**: la misma flecha que salta de parada en parada enciende primero el paso siguiente mientras el bloque está a la vista y, al agotarse los pasos, pasa a la siguiente parada. Es la mecánica de `[data-pasos]` de las charlas.

## Anatomía

1. **Steps:** el bloque, con el número total de pasos.
2. **Step:** cada pieza, con el paso desde el que se ve (`from`) y, si se oculta después, hasta cuál (`to`). Un paso se ve si `from ≤ actual < to`.
3. **PanelStack:** varias versiones de un bloque en la misma celda (por ejemplo, tres cabeceras que se turnan): solo se ve la del paso.

Lo que aún no toca no se ve, y entra con opacidad y un desplazamiento de 12 px.

## Cuándo usarlo

- Una parada que se cuenta por partes: cinco tarjetas que aparecen una a una, un diagrama que se enciende por fases, una lista que crece.
- Un anillo (Cycle), una hoja (Sheet) o una barra (ProgressBar) que reaccionan al paso.

## Cuándo no

- Una parada que se lee entera de un vistazo.
- Para esconder contenido que el lector debería tener siempre: lo oculto sigue en el DOM pero fuera del lector de pantalla hasta que llega.

## Cómo se recorre

Al llegar la parada se enciende el paso 0 y lo demás espera a la flecha. Con el bloque a la vista (entre el 25 % y el 75 % de la ventana), → ↓ Av Pág o Espacio encienden el siguiente paso; ← ↑ Re Pág o Mayús + Espacio vuelven al anterior. El teclado se escucha en fase de captura, así que va **antes** que el paso de diapositivas de Deck. Cuando el paso actual es el último, la flecha vuelve a ser de Deck.

## Estados

El bloque expone `data-current` con el paso actual, para que lo que haya dentro (tarjetas que se atenúan, un anillo) pueda reaccionar por CSS o con el hook `useSteps()`.

## Decisiones de diseño

### Un solo teclado

No hay otro mando: los pasos se recorren con las mismas teclas que la charla, y el bloque las cede cuando se acaba. Quien presenta no tiene que pensar en qué está pulsando.

### Lo oculto no se lee

Un paso apagado va con `aria-hidden`: el lector de pantalla oye lo mismo que ve la sala, en el mismo orden.

## Accesibilidad

- Los pasos apagados están ocultos para el lector hasta que se encienden.
- Con `prefers-reduced-motion` no hay transición: aparecen sin moverse.
- El bloque no roba el teclado dentro de campos de texto ni con un diálogo abierto.

## Uso

**Do**

- `total` igual al último `from`.
- Un paso por idea.

**Don't**

- Más de ocho pasos en una parada.
- Dos Steps a la vista a la vez.

## Equivalencias

No está en Figma. En las charlas es `[data-pasos]`, `.paso[data-paso][data-hasta]`, `.pila-paneles` y `.oculta-total` (CSS propio de la charla y `navegacion-540.js`, apartado 6b).
