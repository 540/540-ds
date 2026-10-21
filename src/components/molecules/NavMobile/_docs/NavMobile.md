La navegación de pantalla estrecha: **logotipo y un botón que abre el menú a pantalla completa.** Para escritorio es Menu, que es otra pieza y no una variante de esta.

## Anatomía

1. **Barra:** el logotipo (enlace al inicio) y, a la derecha, el hueco para el conmutador de tema y la hamburguesa (Button `ghost` de solo icono, «Abrir menú»).
2. **Panel** a pantalla completa: repite la barra (el logotipo se queda donde estaba y la cruz ocupa el sitio de la hamburguesa) y debajo la lista de destinos en MenuItem `lg`, el tamaño del pulgar, en caja normal.

El relleno horizontal no es suyo: lo pone la fila de la barra, que es la columna de la página. Así el conmutador de tema puede ir al lado sin solaparse.

## Cuándo usarlo

- La barra superior por debajo del ancho en el que los destinos dejan de caber en fila.
- Con la misma lista de destinos que Menu.

## Cuándo no

- Escritorio, donde los destinos caben en fila: usa Menu.
- A la vez que Menu.
- Para un submenú o un desplegable: esto es la navegación de la página.

## Variantes

Ninguna. Lo que cambia es `Abierto = sí / no`, y eso es estado interno.

## Estados

| Estado | Qué pasa |
|---|---|
| Cerrado | Solo la barra, transparente encima de lo que haya |
| Abierto | El panel tapa la página entera; la página de detrás no se desplaza |

Elegir un destino cierra el panel. Escape cierra. Al cerrar, el foco vuelve al botón del que salió: cerrar un menú no puede dejarte al principio de la página.

## Decisiones de diseño

### Son dos componentes y no uno

Una fila de seis destinos y un panel que se abre son dos cosas distintas. La página monta las dos y deja que el CSS elija cuál se ve; no lo elige JavaScript midiendo la ventana, porque medir en el cliente significa pintar primero la barra equivocada y corregirla, que es el salto que se ve al cargar en un móvil.

### A pantalla completa, no una cortinilla

En un móvil, seis destinos a cuerpo grande no caben en una cortinilla, y lo que quede asomando por detrás solo distrae de la única decisión que hay que tomar ahora, que es a dónde ir.

### Abrir no mueve nada

La barra del panel repite la de fuera: el logotipo se queda donde estaba. Abrir el menú no mueve nada de lo que ya estabas mirando.

### La lista es la misma que la de Menu

Los mismos objetos para las dos navegaciones, construidos una sola vez, para que no haya forma de que digan cosas distintas.

## Accesibilidad

- **Rol** `dialog` en el panel, modal porque tapa la página entera: es un `<dialog>` de verdad con `showModal()`, así que el foco entra dentro y se queda encerrado (tabular no puede llevar a enlaces que no se ven), Escape cierra y al cerrar el foco vuelve al botón.
- El botón lleva `aria-expanded` y su nombre es «Abrir menú» aunque solo se vea el icono.
- Teclado: Enter, Escape, Tab.

## Uso

**Do**

- Pasarle los mismos `items` que a Menu.
- El ThemeToggle en `end`.
- Enseñarlo solo por debajo de 1024 px, con CSS.

**Don't**

- Enseñarlo a la vez que Menu.
- Una lista distinta de la de Menu.
- Un panel que no cierre al elegir destino.

## Equivalencias con Figma

Página `NavMobile` del archivo de diseño, set `NavMobile` (40:89). `Abierto = sí / no` es el estado interno. En las charlas es `navmovil-*` en base-540.css.
