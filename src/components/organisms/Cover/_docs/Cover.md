La portada de una charla: **el titular en statement, la pregunta, la entrada, la ficha del evento, el logotipo del cliente y la foto a sangre.** Es la primera parada, y la única que lleva su propia composición.

## Anatomía

1. **Título** en `statement`, una línea por elemento de `title` (cada una en un `span` de bloque, para partir donde se decide y no donde cabe).
2. **Pregunta** en `body-m` secundario, a media retícula, con las líneas equilibradas.
3. **Entrada** en `body-m` secundario, a media retícula, sin palabra suelta al final.
4. **Ficha** del evento («Open space 2026») en `body-s`.
5. **Logotipo del cliente** a 94 px (`--size-logo-client`), con un archivo para claro y otro para oscuro.
6. **Foto** a sangre (ancho de la ventana), 2:1, `loading="eager"`, pegada al borde inferior de la parada.

Bloque en rejilla con 48 px entre piezas; texto en rejilla con 32 px. Relleno superior: el de la sección más dos veces 24 más los 24 del control de la barra, para que la barra fija no tape el titular.

## Cuándo usarlo

- Como primera Slide de toda charla.

## Cuándo no

- Como cabecera de página web: ahí es SectionHeader.
- A mitad de una charla: solo hay una portada.

## Variantes

Ninguna. Pregunta, entrada, ficha, cliente y foto son opcionales.

## Estados

Ninguno. La barra se queda fija mientras la portada está en pantalla; al avanzar se esconde.

## Decisiones de diseño

### El titular en dos líneas, a mano

«Dejar de entregar pantallas / y entregar el sistema»: la partición es del titular, no del ancho. Por eso `title` es una lista de líneas.

### La portada no se recorre por pasos

Lo que sobra por debajo es la foto de cubierta, y no merece parada propia: el teclado salta directamente a la segunda parada.

### El logotipo del cliente en dos archivos

No se puede recolorear un logotipo ajeno: se guardan los dos y el tema enseña uno.

## Accesibilidad

- El título es el único `h1` de la charla.
- El logotipo del cliente lleva su nombre en `alt`; la foto describe lo que muestra.
- Los `span` de línea no cambian la lectura: el lector lee la frase entera.

## Uso

**Do**

- Dos líneas de titular, tres como mucho.
- Una pregunta o una entrada, no las dos largas.

**Don't**

- Antetítulos, etiquetas o degradados sobre el titular.
- Una foto que no sea 2:1.

## Equivalencias

No está en Figma como pieza. En las charlas es `.charla-portada`, `.charla-portadaBloque`, `.charla-portadaTexto`, `.charla-tituloLinea`, `.charla-pregunta`, `.charla-entrada`, `.jakala` y `.charla-portadaFoto` (base-540.css).
