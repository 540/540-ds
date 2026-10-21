La pila de bandas de lado a lado: **sale de la columna y cierra con su raya.** Sus hijos son Card en variante `row`, y por eso es un organismo: lo que compone son moléculas.

## Anatomía

Un contenedor que hace dos cosas, y las dos son de la lista y no de sus filas:

1. **Sale de la columna** hasta el borde de la ventana (`margin-inline: calc(50% - 50vw)`), para que la raya de cada banda cruce la pantalla entera mientras el texto se queda donde el resto de la página. La cuenta es media caja menos media ventana, no un ancho fijo: sigue valiendo cuando cambie el ancho de la columna.
2. **Cierra por abajo** con una raya de 1 px: cada fila dibuja la que la separa de la anterior, pero ninguna sabe si es la última.

## Cuándo usarlo

- Una lista de apartados que se lee de arriba abajo: servicios, módulos de un curso.
- Cuando la sección es la lista y no hay nada al lado con lo que compararla.
- Cuando se quiere que una banda se abra y las demás queden en título.

## Cuándo no

- Tarjetas con caja que se comparan de lado a lado: una rejilla con Card `boxed`.
- Una sola banda: eso es una Card.
- Dentro de algo que ya sangre: el sangrado se calcula contra la columna.

## Variantes

Ninguna.

## Estados

Ninguno propio. Cuál está encendida vive en quien la usa: se pone `state` en cada Card.

## Decisiones de diseño

### Sin hueco entre bandas

Lo que las separa es la raya, y un hueco por medio la dejaría flotando en vez de separando.

### El pelo de 1 px no tiene token

En este sistema todas las rayas son la misma.

### Solo Card row

Cualquier cosa que no sea una Card `row` aquí dentro se queda sin la raya que la separa de la anterior, porque esa raya la dibuja la fila y no la lista.

## Accesibilidad

- Es reparto: no anuncia nada; lo que se lee son sus bandas.
- No entra en el recorrido del teclado; quien lo hace es la fila (si se enciende al pasar el ratón, tiene que encenderse al recibir el foco).

## Uso

**Do**

- Tres o más Card `row`, con ordinales.
- Una sola `active` a la vez.

**Don't**

- Mezclar Card `boxed` dentro.
- Anidar en otro bloque a sangre.

## Equivalencias con Figma

Página `CardList` del archivo de diseño, componente `CardList` (47:3). En las charlas es `.lista` en base-540.css.
