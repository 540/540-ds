El pie de la página: **la marca, las columnas de enlaces, las redes y la firma.**

## Anatomía

1. **Marca:** el logotipo (`sm`, enlace al inicio) y una línea de lema a 38 caracteres.
2. **Columnas** de enlaces, con su etiqueta en mayúsculas. No son los destinos de la barra: son los que alguien busca al llegar abajo sin haber encontrado lo que venía a buscar (por eso están el correo y la dirección, que arriba no salen).
3. **Redes**, en fila: cajas de 24 px con el logotipo centrado.
4. **Cierre:** la firma («© 2026 540») y los avisos legales, separados del resto por aire y no por una línea. Es la única raya que tuvo una página que no tiene ninguna.

La separación entre la marca y las columnas es la medida grande de la página (120, `--grid-gutter-wide`) y no el canal de la retícula: lo que separa dos bloques que no se comparan no es el aire entre columnas.

## Cuándo usarlo

- Cerrar la página, fuera de toda sección.
- Recoger los destinos que alguien busca al llegar abajo sin encontrarlos.
- Dar salida a los avisos legales y al contacto.

## Cuándo no

- Repetir el menú principal entero: eso ya es un Menu, y arriba.
- Dentro de una sección: ahí deja de ser el pie del documento.
- Como separador entre secciones: esto cierra el documento.

## Variantes

Ninguna. **La parte de arriba es opcional:** sin lema, columnas ni redes, el pie se queda en la firma, no en una franja vacía. Es lo que hacen las charlas: logotipo, redes y «¡Gracias!».

## Estados

Los enlaces se subrayan al pasar, con el subrayado separado 4 px del texto. Los iconos de red pasan al dorado (`--color-text-accent-inverse`). Foco con el anillo en todos.

## Decisiones de diseño

### Los títulos de columna no son encabezados

Un `h3` aquí abajo mete cuatro entradas en el esquema de la página que no llevan a ninguna sección. Son la etiqueta de la columna: un `p` en `micro-bold`, con las mayúsculas puestas por el estilo.

### Las redes van en fila

Son iconos, y en fila se leen de un vistazo como lo que son (un grupo de perfiles) en vez de como tres destinos más de la lista de al lado. Son las cuentas que 540 publica hoy, no las del documento: se elige la red, no se pasa el icono.

### El logotipo lleva al inicio

El mismo reparto que en la barra: el nombre lo pone el enlace y el dibujo va decorativo.

## Accesibilidad

- **Rol** `contentinfo`. Solo es el hito «información de contenido» si no cuelga de una sección. **Uno solo por página:** dos pies dejan el hito duplicado y sin distinguir.
- Cada perfil lleva su nombre en el enlace («LinkedIn de 540») y el icono queda decorativo; sin eso, los tres se anuncian como «enlace, enlace, enlace».
- Teclado: Tab por todos los enlaces, con foco visible.

## Uso

**Do**

- Uno por página, fuera de cualquier sección.
- Una línea de lema, no un párrafo.
- Columnas con lo que no está en la barra.

**Don't**

- Dos pies.
- Títulos de columna como encabezados.
- Pasar iconos de red desde fuera.

## Equivalencias con Figma

Página `Footer` del archivo de diseño, componente `Footer` (52:3). `cabecera` es la parte de arriba, que existe si hay `tagline`, `groups` o `networks`. En Figma los títulos de columna están escritos en mayúsculas; en el código las pone el estilo. En las charlas es `footer-*` en base-540.css.
