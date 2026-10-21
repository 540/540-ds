La tira de logotipos de cliente: **el paso del tiempo lo lleva el carrusel; esto es cómo se ve un logotipo ajeno dentro y cómo se reparten.**

## Anatomía

Una ventana que recorta la tira. La tira se reparte en un número impar de huecos iguales (7 en escritorio, 5 en tablet, 3 en móvil), y en cada hueco el logotipo se mete en una caja de 94 px de alto (`--size-logo-client`) sin recortarse ni deformarse. El del centro va a plena tinta y un 8 % más grande; los demás, igualados por el filtro del tema.

## Cuándo usarlo

- Enseñar con quién se ha trabajado, cuando son más de los que caben en una fila.
- Dar respaldo a una página de portfolio o de servicios.

## Cuándo no

- Como galería de fotos o de casos: esto es una lista de marcas.
- Con dos o tres logotipos: si caben todos, es una fila y no un carrusel.
- Para nada que se pulse: la tira se mueve, y un enlace que se va mientras lo apuntas no se puede pulsar.

## Variantes

Ninguna. La tinta la pone el tema: `--filter-logo-client` (gris al 55 % sobre papel; blanco al 72 % sobre negro) y `--filter-logo-client-center` para el del medio.

## Estados

Avanza un hueco cada 2,4 s. Se para al pasar el ratón y al recibir el foco. No se mueve con `prefers-reduced-motion`.

## Decisiones de diseño

### El reparto es uniforme

Es lo que sostiene que haya un logotipo centrado. Con medida propia cada marca ocupa lo suyo y el paso de la tira no es múltiplo de su ancho, así que ninguna pieza cae en el centro. Repartiendo el ancho a partes iguales entre un número impar de huecos, el de en medio es el centro exacto.

### Lo que se iguala es el hueco, no el dibujo

Cada marca tiene su proporción: la caja mide 94 de alto y el logotipo se mete dentro. Un logotipo ajeno no se recorta nunca.

### Nunca a su color

Son marcas ajenas y a todo color compiten entre sí. El filtro del tema las iguala; el del centro sube la presencia, no vuelve el color.

## Accesibilidad

- Rol `region` con `aria-roledescription="carrusel"` y el nombre que se le pase.
- Cada logotipo lleva el nombre del cliente en `alt`; las copias que hacen el bucle van ocultas.
- Pausa con el ratón y con el foco; nada de movimiento con `prefers-reduced-motion`.

## Uso

**Do**

- Siete o más logotipos, en PNG o SVG con fondo transparente.
- El nombre de cada cliente en `name`.

**Don't**

- Enlaces en los logotipos.
- Logotipos a su color.

## Equivalencias con Figma

Página `LogoCarousel` del archivo de diseño, set `LogoCarousel` (67:310). `Tinta = papel / negro` es el tema. En las charlas, la tira de logotipos de cliente usa los mismos filtros (`--filter-logo-cliente`).
