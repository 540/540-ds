Un caso del portfolio: **la foto, y encima el nombre y la frase ancladas abajo, sobre un velo.** Enlaza a su caso, o no enlaza a nada.

## Anatomía

1. **Marco** con la foto en 2:1. La caja de la pieza es la propia imagen: el texto va dentro y no la alarga.
2. **Velo** (`--gradient-image-veil`): transparente arriba, oscuro abajo. No es decoración: sin él, un nombre claro sobre una foto clara desaparece, y eso no lo arregla un color de texto.
3. **Datos** anclados abajo, donde el velo es más denso: el nombre en `title-s` y una frase en `body-s`, los dos en `--color-text-on-media`.

## Cuándo usarlo

- La tira de casos del portfolio.
- Una selección de casos destacados en otra página.
- Un caso que todavía no tiene página a la que llevar (sin `href`).

## Cuándo no

- Algo que no lleva a ningún sitio ni cuenta nada: usa Card.
- Una persona del equipo: usa TeamMember.
- Un caso sin imagen: la imagen es la mitad de la pieza.

## Variantes

Ninguna. Tuvo cinco disposiciones (apilada, con la imagen a un lado o al otro, a sangre y en tira) y se quedó en la última, que es la única que la web pide.

## Estados

Solo los casos con `href` tienen estados: sin destino, el acercamiento prometería algo que no pasa.

| Estado | Señal |
|---|---|
| Normal | La foto tal cual |
| Hover | La foto se acerca (escala 1,05) en 320 ms |
| Active | Cede un paso, a 1,04: tres superficies, no dos |
| Focus | Anillo de 2 px por dentro del marco, en el color de borde fuerte inverso |

El acercamiento va más lento que el resto del sistema a propósito: el recorrido es medio tamaño de imagen, y a la velocidad de un botón se leería como un salto. Con `prefers-reduced-motion` no se mueve nada; queda el foco, que sí es permanente.

## Decisiones de diseño

### El marco recorta

La imagen crece dentro del marco y la pieza no se mueve. Sin marco, el acercamiento desbordaría y empujaría la tira entera.

### El texto no sigue al tema

Va en `--color-text-on-media`, blanco en los dos temas. Por debajo del velo la foto es oscura en los dos; con el tono, el nombre saldría en la tinta de la página (negra sobre papel) encima de una foto que no ha cambiado.

### Un solo enlace, nombrado por el título

Con `href`, todo el bloque es un enlace y no se meten enlaces dentro. Su nombre accesible sale del título: si cada caso fuera un «Ver caso», la lista de enlaces de la página serían seis entradas idénticas.

## Accesibilidad

- **Rol** `link` cuando lleva destino; `article` sin él. Teclado: Enter.
- El `alt` de la foto va vacío por defecto: el título ya dice qué es.
- Contraste del texto sobre el velo: blanco sobre negro al 78 %, por encima de AA en cualquier foto.

## Uso

**Do**

- `href` cuando el caso tiene página.
- Una frase, no un párrafo.
- Fotos con algo oscuro o neutro abajo: el velo ayuda, pero no hace milagros.

**Don't**

- Enlaces dentro de la pieza.
- Subrayar el nombre o cambiarle el color al pasar: el acercamiento ya lo dice.
- Alargar la caja con más texto.

## Equivalencias con Figma

Página `CaseItem` del archivo de diseño, set `CaseItem` (28:16). `Estado = normal / hover / active` lo pone el navegador; los tres son los de un caso enlazado.
