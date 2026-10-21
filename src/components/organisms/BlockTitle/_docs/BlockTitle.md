Un título de bloque numerado y, justo detrás, su foto. **Cada título numerado lleva su foto:** es la pauta de los bloques 01, 02 y 03 de la charla, y la que hay que repetir en cualquier charla nueva.

## Anatomía

1. **La parada:** una Slide sin alto mínimo con el ordinal en `micro-light` secundario y la cabecera centrada con el título. No ocupa toda la pantalla.
2. **La foto:** justo detrás, fuera de la sección y como hermana suya, en 2:1 y a todo el ancho de la columna. No es parada del índice: lleva `data-deck-photo`, y Deck alinea el título arriba para que la foto asome debajo.

Al seguir navegando, la foto se descubre de abajo arriba y hace el zoom de 1,18 a 1 mientras cruza la pantalla.

## Cuándo usarlo

- Abrir cada bloque de una charla (01, 02, 03).
- Solo aquí y en la portada van las fotos: las frases y las tarjetas no llevan foto.

## Cuándo no

- Un título sin foto que no abre bloque: eso es un SectionHeader dentro de una Slide normal.
- Una foto suelta: la foto acompaña a un título.

## Variantes

Ninguna. El ordinal y la foto son opcionales, pero la pauta es que vayan los dos.

## Estados

Ninguno. La revelación y el zoom de la foto van con `animation-timeline: view()` donde el navegador lo soporta y se apagan con `prefers-reduced-motion`; sin soporte, la foto se ve quieta.

## Decisiones de diseño

### La foto no es parada

Va en el mismo golpe que su título. Si fuera parada, el índice tendría rayas que no llevan a ninguna idea.

### Sin GSAP

Las charlas hacen el parallax y el zoom con GSAP (`data-mov="revelar"` y `data-mov="parallax"`). Aquí se hace con animaciones guiadas por el scroll en CSS, que no bloquean ni el teclado ni el hilo principal.

## Accesibilidad

- La Slide es una región con nombre (`aria-labelledby` al título).
- El ordinal es decorativo.
- La foto de ambiente suele ir con `alt=""`; si enseña algo, se describe.

## Uso

**Do**

- Un ordinal de dos cifras («01»).
- Fotos verticales o cuadradas: el recorte a 2:1 se queda con el centro.

**Don't**

- Texto sobre la foto.
- Dos fotos seguidas.

## Equivalencias

No está en Figma. En las charlas es `.charla-fichaParada` más `.header-center`, y `.charla-foto[data-mov="revelar"] > .charla-fotoCapa[data-mov="parallax"]` (base-540.css, GUIA-ESTILOS «Regla de estructura»).
