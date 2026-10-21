Una tira que se recorre con los puntos de debajo. **Puede avanzar sola, pero no de serie.** Una pieza por hueco.

## Anatomía

1. **Ventana** que recorta la tira.
2. **Tira** con los huecos, separados por el canal de la retícula (24 px). Cada hueco mide media retícula desde 600 px y el ancho entero en móvil; se puede cambiar con `itemWidth`.
3. **Mandos:** los puntos (Bullets), las dos flechas (Button `ghost` de solo icono) o las dos cosas, según `controls`.
4. **Cabecera** opcional encima de la tira.

## Cuándo usarlo

- Enseñar una lista que no cabe entera y que se puede recorrer sin prisa.
- Logotipos de cliente, casos de portfolio.
- Una lista que se lee sin principio ni final, en bucle.

## Cuándo no

- Contenido que hay que leer entero: lo que se mueve se va, y un párrafo a medias no vuelve.
- Con menos piezas de las que caben: si caben todas, es una fila.
- Como contenido principal de una página: esto acompaña.

## Variantes

Dos ejes. **Cabecera** cuelga la tira de un título, y con él los mandos suben a su fila: ahí no hay puntos, porque al lado de una cabecera compiten con ella. **Mandos** es dónde se gobierna la tira:

| `controls` | Qué se ve | Cuándo |
|---|---|---|
| `dots` (por defecto) | Los puntos centrados, sin flechas | Lo normal |
| `row` | Los puntos y las dos flechas en una fila, con los puntos ocupando lo que sobra | Cuando las flechas son una comodidad |
| `sides` | Las flechas superpuestas a la tira, una a cada lado, **sin puntos** | Las dos tiras de la web: los casos de Portfolio y el muro de Equipo |

Con `sides` las flechas son el único mando, y dos juegos para la misma tira sobran. `header` con `dots` no existe: se pinta como `row`.

## Estados

El de la tira: en qué página está. Lo gobiernan los mandos, el dedo (en táctil) y el trackpad. Con `autoplay` avanza sola cada n milisegundos y se para al pasar el ratón o al entrar con el teclado.

## Decisiones de diseño

### Las flechas son opcionales y van apagadas de serie

Al pie son comodidad, no acceso: los puntos ya llevan a cualquier página.

### Cuando la tira sangra, las flechas se van al borde de la pantalla

En el borde de la tira taparían las piezas de los extremos. Eso lo coloca el organismo que saca la tira de la columna.

### Sin mandos solo para lo que no hay que leer

Sin puntos, sin flechas y sin cabecera la tira se queda sin mando y solo avanza sola: la excepción, y solo para logotipos.

## Accesibilidad

- **Rol** `region` con `aria-roledescription="carrusel"` y el nombre que se le pase. Cada hueco es una «diapositiva» con su número.
- Teclado: Tab a los mandos, Enter y Espacio. Los puntos miden 12 y se separan 12: sus centros quedan a 24, la distancia mínima entre dianas pequeñas.
- El avance automático se para con el ratón y el foco encima, y no arranca con `prefers-reduced-motion`.
- El desplazamiento suave se apaga con `prefers-reduced-motion`.

## Uso

**Do**

- Un `label` que diga qué hay dentro («Casos del portfolio»).
- `sides` para casos y equipo; `dots` para el resto.
- `autoplay` solo en tiras de logotipos.

**Don't**

- Texto largo dentro de los huecos.
- `row` y `sides` a la vez: no existe.
- Menos de dos piezas.

## Equivalencias con Figma

Página `Carousel` del archivo de diseño, set `Carousel` (54:79). `Cabecera = sí / no` es `header`; `Mandos = puntos / fila / lados` es `controls`. Es disperso a propósito: no todas las casillas existen en el código.
