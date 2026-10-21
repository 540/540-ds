La captura: **una imagen de una pantalla, a un alto fijo y con las esquinas redondeadas.** Es la única imagen del sistema con radio: una captura es una ventana, no una foto.

## Anatomía

Un `img` centrado, de alto `min(100svh − 470px, 560px)` (así cabe debajo de una cabecera sin que la parada crezca) y ancho automático, con `--radius-default`. Entera, sin recortar.

## Cuándo usarlo

- Enseñar la pantalla de una herramienta, un panel, una interfaz.

## Cuándo no

- Fotos de la charla: eso es Image, que recorta y no lleva radio.
- Una captura que haya que leer en detalle: amplíala en una Sheet.

## Variantes

Ninguna.

## Estados

Ninguno.

## Decisiones de diseño

### Alto fijo

Si el alto lo pusiera la imagen, la maquetación saltaría al cargar. Con el alto fijo, lo que cambia es el ancho, y eso no mueve nada.

### Radio

Las fotos no llevan radio; las capturas sí, porque son ventanas. Es el mismo radio de los botones.

### Carga inmediata

Las capturas van con `loading="eager"`: una parada con la captura en blanco no se puede presentar.

## Accesibilidad

- `alt` obligatorio: describe lo que se ve en la pantalla, con los datos que importan.
- Pasa `width` y `height` del archivo para reservar su sitio.

## Uso

**Do**

- Una captura por parada, debajo de la cabecera.
- `alt` con lo que dice la pantalla.

**Don't**

- Capturas pequeñas en rejilla.
- Texto dentro de la imagen que no esté en el `alt`.

## Equivalencias

No está en Figma. En las charlas es `.image.image-auto.captura` (CSS propio de la charla).
