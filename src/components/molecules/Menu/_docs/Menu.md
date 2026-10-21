La barra de navegación de escritorio: **el logotipo a un lado y los destinos en el medio.**

## Anatomía

Tres columnas, y la del medio con lo que mida:

1. **Logotipo** (`xs`, 24 px) a la izquierda, como enlace al inicio.
2. **Destinos** centrados sobre la barra, en una lista de MenuItem `sm`.
3. **Hueco final** a la derecha, donde la página pone el ThemeToggle.

Los destinos van en el centro de la barra y no en el hueco que sobra a la derecha del logotipo: se colocan por posición, no por reparto. Relleno vertical de 24 px; 24 px entre destinos.

## Cuándo usarlo

- La barra superior en escritorio.
- El pie de página, con su propio nombre.
- Cualquier grupo de destinos en fila.

## Cuándo no

- Pantallas estrechas: usa NavMobile.
- Enlaces sueltos dentro de un texto: no es un menú.
- Disparar acciones: un menú lleva a sitios.

## Variantes

Ninguna. Lo que cambia es la lista de destinos y cuál es el actual.

## Estados

Los de cada MenuItem (hover, active, focus, actual). La barra no tiene estado propio; el ocultarse al navegar y volver con el ratón lo hace la barra de la charla (organismo), no el menú.

## Decisiones de diseño

### El conmutador de tema va fuera de la lista

No es un destino: metido en la lista se contaría como el séptimo sitio al que se puede ir. Por eso se pasa en `end` y se pinta en la tercera columna, fuera del `ul`. En Figma el conmutador vive dentro de la pieza; en el código lo pone la página.

### Un solo actual

Un solo destino con `current` en la lista.

## Accesibilidad

- **Rol** `navigation` con nombre (`aria-label`): dos menús en la misma página no pueden compartirlo.
- **Lista:** los destinos van en un `ul`, así el lector de pantalla anuncia cuántos hay antes de recorrerlos.
- **Logotipo:** un enlace al inicio con nombre propio («Ir al inicio») y el dibujo decorativo, para no anunciarse dos veces.
- Teclado: Tab y Enter.

## Uso

**Do**

- Etiquetas escritas en minúsculas normales («Servicios»).
- Un `current`, el de la sección visible.
- El ThemeToggle en `end`.

**Don't**

- Enseñarlo a la vez que NavMobile.
- Dos menús con el mismo nombre.
- Acciones en el menú.

## Equivalencias con Figma

Página `Menu` del archivo de diseño, componente `Menu` (34:14). En Figma los destinos quedan centrados sobre los 1200 de la columna; en la web, sobre los 1160 que ocupa la navegación, 20 px a la izquierda. En las charlas es `menu`, `menu-inicio` y `menu-lista` en base-540.css.
