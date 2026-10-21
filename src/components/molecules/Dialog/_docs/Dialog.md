Una ventana que tapa la página para contar una cosa: **la ficha de una persona, un detalle que no cabe donde se pulsó.** En borrador.

## Anatomía

1. **Velo** (`--color-bg-overlay`, negro al 70 %): lo pone el navegador en el `::backdrop`. Pulsar en él cierra.
2. **Panel** de media retícula ((1200 − 24) / 2 = 588 px), sobre `--color-bg-surface`, con el radio del sistema.
3. **Retrato** opcional a sangre contra los bordes, recortado a cuadrado: la misma proporción con la que este sistema enseña una cara.
4. **Cuerpo:** título en `title-s` con la cruz arriba (Button `ghost` `sm` de solo icono), el texto en `body-m` y un pie opcional de acciones.

Lo que se desplaza es el texto y solo el texto: el título y la cruz se quedan a la vista aunque el contenido no quepa.

## Cuándo usarlo

- La ficha de una persona del equipo, al pulsar su retrato.
- Un detalle que alarga demasiado la tarjeta desde la que se abre.
- Algo que se lee y se cierra, sin salir de donde estabas.

## Cuándo no

- Contenido que merece su propia URL: una pantalla, para que se pueda enlazar.
- Un aviso que no hay que leer ahora: un texto en la propia página.
- Un menú o un panel de navegación: usa NavMobile.

## Variantes

Ninguna: no hay dos formas de esta pieza. El retrato y el pie son opcionales. **No hay estado cerrado:** es un `<dialog>` de verdad, y cerrado no pinta nada.

## Estados

Abierto o cerrado, y lo decide la pantalla (`open` + `onClose`).

## Decisiones de diseño

### Mide media retícula

No es un ancho elegido a ojo: sale de la rejilla.

### Sin sombra

En este sistema no hay ninguna; lo que lo separa de la página es el velo. El panel se levanta un peldaño con `--color-bg-surface`, y eso no se ve en claro (sobre el papel la superficie elevada y la página son el mismo color). Sobre negro no hay velo que valga (no se puede oscurecer el negro) y ahí el peldaño es lo único que hay.

### La cruz va arriba, no centrada

Con un título de dos líneas, centrada se queda flotando en medio de la segunda. Es `ghost` y de solo icono, como la de cerrar el panel de navegación.

### El retrato se recorta a cuadrado

Sin ese límite una imagen `fill` se estira a lo que le den, y en un móvil se comía dos tercios del diálogo.

### No se apila

Dos diálogos abiertos a la vez no es un caso que el sistema resuelva.

## Accesibilidad

- **Rol** `dialog`, modal. El foco entra al abrir (el panel recibe el foco sin anillo, porque no es un control), no sale mientras está abierto y vuelve al elemento que lo abrió al cerrar: lo hace el navegador.
- Teclado: Escape cierra; Tab y Shift+Tab recorren solo lo de dentro.
- **El nombre sale del título**, que es también el encabezado que se ve (`aria-labelledby`).

## Uso

**Do**

- Un título que diga de qué va.
- Dos o tres frases; si es más, es una pantalla.
- Guardar `open` en la pantalla y cerrar con `onClose`.

**Don't**

- Dos diálogos a la vez.
- Sombras o bordes para separarlo.
- Un retrato sin `alt` (vacío si el título ya nombra a la persona).

## Equivalencias con Figma

Página `Dialog` del archivo de diseño, componente `Dialog` (41:3), en borrador. `media` y `pie` son casillas, como en el código. El velo no está en Figma porque es el `::backdrop` del navegador.
