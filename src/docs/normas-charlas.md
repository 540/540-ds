# Normas para montar una charla

Estas normas son **obligatorias** para cualquier presentación que se construya con el sistema, la monte una persona o un agente. Están escritas como guardarraíles: dicen qué se puede hacer, con qué pieza, y qué no se hace nunca. Si algo no está aquí, se pregunta antes de hacerlo; no se improvisa.

Se leen enteras antes de empezar y se repasa la lista final antes de dar la charla por buena.

## 0. La regla de oro: no salirse del sistema

Una charla se monta **solo con los componentes del catálogo**, con sus props, y nada más.

**Está prohibido:**

- Escribir CSS propio para una charla (ni archivos, ni `style=` en línea, ni clases nuevas).
- Usar un color, un tamaño o un margen escrito a mano (`#fef401`, `24px`, `1.2rem`). Todo valor sale de un token, y los tokens solo los usan los componentes.
- Cambiar el tamaño de letra, la fuente, el peso o el interlineado de nada. La escala la ponen `Text` y `Deck`.
- Añadir librerías de interfaz, iconos de otra familia o fuentes nuevas. Los iconos son los de `lucide-react` y solo dentro de los componentes que ya los usan.
- Sombras, degradados nuevos, bordes de colores, radios en tarjetas o fotos.
- Emojis, iconos decorativos, GIFs, vídeos con autoplay.
- Texto en color: el texto es negro o gris (`tone="primary"` o `tone="secondary"`), siempre.

**Si falta una pieza**, no se hace a mano: se pide un componente nuevo siguiendo el apartado «Cómo pedir un componente nuevo» del README. Mientras llega, la parada se resuelve con la pieza más cercana del catálogo o se deja con un texto que diga qué falta.

## 1. Estructura de una charla

Para empezar una charla se copia la plantilla **Plantillas/Charla completa** (`src/templates/TalkTemplate`), que tiene todas las paradas que sabe hacer el sistema, y se borra lo que no se cuenta.

Una charla es un `Deck` con este orden, y no otro:

1. **`Cover`**: la portada. Una sola.
2. **Bloques numerados**, de uno a seis. Cada bloque es un `BlockTitle` con su foto y, detrás, de una a seis paradas.
3. **`Closing`**: el cierre. Uno solo.
4. **El pie** (`DeckFooter`), que lo pone el `Deck` con `footer`.

Reglas de estructura:

- **Entre 12 y 30 paradas** en total. Menos de 12 es un artículo; más de 30 no se cuenta en una sesión.
- **Una idea por parada.** Si una parada necesita dos títulos, son dos paradas.
- **Cada bloque numerado lleva su foto**: un `BlockTitle` sin `photo` no se acepta. El ordinal es `"01"`, `"02"`…, en orden y sin saltos.
- **Un remate por bloque como máximo**: `Statements`, `Quote` o `Punchline` en una `Slide` con `tone="raised"`. Los remates no van seguidos: entre dos remates hay al menos una parada de contenido.
- Los `id` de las paradas van en minúsculas, sin acentos, con guiones (`quienes-somos`), únicos, y los de los destinos de la barra (`items` del `Deck`) apuntan a los `BlockTitle`.
- La barra de arriba lleva **entre tres y seis destinos**: los bloques. No se enlazan paradas sueltas.

### Las piezas y para qué parada sirven

| Para contar… | Pieza | Nunca |
|---|---|---|
| El título de un bloque | `BlockTitle` con foto | Un `Slide` con un `h2` grande |
| Un título con dos frases de entrada | `Slide` + `SectionHeader` | Un título sin descripción debajo de otro título |
| Dos a cuatro cosas comparables | `Grid` + `Card` | Más de cuatro tarjetas por fila |
| Cinco cosas | `Grid layout="fiveCentered"` o `layout="five" compact` | Seis o más |
| Una historia o una objeción | `Story` | Un párrafo largo suelto |
| Una cita | `Quote` | Comillas en un `Text` |
| Pasos en fila | `Flow` | Flechas escritas en texto |
| Una cronología | `Timeline` | Una lista con fechas en negrita |
| Un ciclo | `Cycle` | Un `Flow` que vuelve al principio |
| Un diagrama | `Schema` dentro de `SchemaFrame` | Una imagen de un diagrama |
| Una pantalla | `Screenshot` | `Image` con una captura |
| Varias piezas en una parada | `Stack` | Un `div` con margen o `gap` |
| Cifras | `Metric` en un `Grid` + `MetricNote`; `Count` si la cifra sube | Números grandes en `Text` |
| Cantidades comparadas o un ranking | `Bars` | Una lista de números |
| Partes de un todo | `Share` | Un gráfico circular |
| Una evolución en el tiempo | `Schema` con `schema.series` y `schema.accent` | Una imagen de una gráfica |
| Herramientas o logos | `Tools`, `LogoCarousel`, `Marquee` | Logos sueltos en una rejilla |
| Algo que se cuenta por partes | `Steps` | Varias paradas casi iguales |
| Un detalle ampliado | `Sheet` dentro de un `Step` | `Dialog` |
| Preguntas con respuesta | `Question` | Texto con «P:» y «R:» |
| Tres a cinco líneas | `SimpleList`, `ArrowList`, `ProblemList` | `ul` sin componente |
| Tres frases de tesis | `Statements` | Tres `Slide` con un `statement` |

## 2. Portada y cierre

**`Cover`:**

- `title` en dos o tres líneas, cada línea de cuatro palabras como máximo.
- `question` o `lead`, no las dos largas: la pregunta es una frase; el lead, dos.
- `event` con el nombre del evento y la fecha («Open space · marzo 2026»).
- `photo` siempre, 2:1, y `client` solo si hay permiso para usar el logo (ver 11).

**`Closing`:**

- `sentence`: una frase de 14 palabras como máximo, con `<strong>` en una parte si hace falta, no en toda.
- `body`: de uno a tres párrafos de dos frases.
- `punchline`: la última línea, de menos de diez palabras.

El pie lleva la frase de la marca, las redes y el «¡Gracias!». No se le añade nada ni se le quita nada.

## 3. Subsecciones con imagen

Cada bloque empieza con una foto. Las normas de esa foto:

- **Formato 2:1**, de 2000 px de ancho como mínimo, en `.webp` y de menos de 400 KB.
- **Neutra**: arquitectura, materiales, texturas, paisaje, objetos. Sin personas reconocibles, sin texto, sin pantallas, sin logos.
- **El velo lo pone el componente** (`--gradient-image-veil`); la foto no se oscurece ni se retoca en origen.
- **`alt` obligatorio** y descriptivo («Fachada de hormigón con la luz de la tarde»). Si la foto es pura decoración no vale `alt=""` aquí: una foto de bloque siempre se describe.
- Una foto por bloque. **No** hay fotos en paradas de contenido, salvo:
  - el retrato redondo del equipo (`Card` con `portrait`, o `TeamMember`), siempre con el mismo encuadre para todas las personas;
  - una `Screenshot` cuando la parada habla de una pantalla;
  - las imágenes de los casos (`CaseItem`), solo en una charla sobre proyectos.
- La portada lleva su propia foto, con las mismas normas.
- Las fotos nunca se repiten dentro de una charla, y una charla no reutiliza las fotos de otra sin cambiar al menos la de portada.

## 4. Texto y jerarquía

- **Una `h2` por parada**, puesta por `SectionHeader`, `BlockTitle` o la pieza que corresponda. Nunca dos títulos del mismo nivel en una parada.
- **Títulos de dos líneas como máximo** en proyección (unos 60 caracteres). Si no cabe, se acorta; no se baja el tamaño.
- **Descripción de la cabecera: una o dos frases.** Más que eso va en el cuerpo de la parada.
- **Cuerpo: tres frases por bloque de texto.** Un párrafo de cinco frases en una sala no se lee.
- **Frases de `statement`: 14 palabras como máximo.** Son frases que se dicen, no que se leen.
- **Negrita (`<strong>`) una vez por párrafo**, en la parte que importa. Nunca un párrafo entero.
- `<code>` solo para comandos, nombres de archivo y rutas.
- Mayúsculas sostenidas solo las que pone el sistema (`micro-bold`). No se escriben títulos en mayúsculas.
- Ortotipografía en español: «comillas latinas», signos de apertura (¿ ¡), raya para incisos, espacio antes del símbolo de porcentaje (20 %) y coma decimal (0,76).
- Las paradas se escriben en segunda persona o en primera del plural, como en las charlas; no se mezclan.
- Tono: el de las charlas de 540. Nada de superlativos ni de «revolucionario», «increíble», «mágico».

## 5. Márgenes y aire

El aire lo ponen las piezas. Quien monta la charla no mide nada.

- **`Slide` pone el margen de la parada** (`--padding-page` a los lados y `--padding-section-block` arriba y abajo) y centra el contenido en un escenario de 1200 px. No se añaden márgenes, ni `div` con `padding`, ni separadores.
- **Entre piezas de una parada, solo los huecos que dan los componentes** (`Stack`, `Grid`, `SectionHeader`, `Section`). Si dos piezas quedan pegadas, es que falta la pieza que las contiene, no un margen.
- **Nada sale del escenario de 1200 px** salvo lo que ya es de lado a lado por diseño: la foto de bloque, `CardList`, `Marquee`, `SchemaFrame`.
- **Los textos llevan su medida** (`measure`): `half` para descripciones y cuerpos, `wide` para frases, `prose` para texto corrido. Un párrafo de más de 70 caracteres por línea no se acepta.
- **Columnas: cuatro como máximo en proyección**, cinco solo con `Grid` `five` o `fiveCentered`. Dos columnas desiguales solo 7 + 5 u 8 + 4.
- **Cada parada cabe en una pantalla** de 1440 × 900 en escala de proyección, sin scroll dentro de la parada. Si no cabe, sobra contenido, no falta sitio.
- **Se revisa en los tres anchos** de la barra de Storybook (375, 768, 1440). En móvil todo va a una columna y nada se recorta.

## 6. El amarillo y el resto de colores

El amarillo de 540 es **de fondo y de trazo**. En una charla aparece en estos sitios y en ninguno más:

| Dónde | Cuánto |
|---|---|
| Las manchas del fondo (`Deck` con `blobs`) | Siempre, ya atenuadas al 11 % y al 7 %. No se suben |
| Las píldoras de un `Schema` (`schema.pill`) | Una o dos píldoras por diagrama |
| El nodo «preocupación» de un `Cycle` (`marks` con `yellow`) | Un nodo por anillo |
| Una serie destacada en una gráfica (`schema.accent*`, o `tone="accent"` en `Bars` y `Share`) | Una serie o una fila por gráfica |
| El anillo de foco del teclado | Lo pone el sistema |

**Nunca** en texto, en fondos de parada o de tarjeta, en bordes, en iconos, en botones, en subrayados ni en fondos de hoja. **Cuota por charla: fuera de las manchas, el amarillo aparece en tres paradas como máximo.** Si una charla pide más, es que se está usando para decorar, y el amarillo no decora: señala.

El rojo y el verde son colores de estado y solo van en **círculos y trazos**: las marcas de `Cycle`, el punto de aviso de `Timeline`, el `Heartbeat`. Nunca en texto. El antetítulo «El problema» va en gris.

Todo lo demás es negro, gris y los fondos del sistema. Las tarjetas son del color de la página y se separan con el borde; la única banda distinta es `tone="raised"`.

## 7. Tema y escala

- Las charlas **se proyectan en oscuro**: `Deck` ya arranca así (`defaultTheme="dark"`). No se cambia.
- **Se revisan en los dos temas** antes de darlas por buenas: todo lo que se ve en oscuro tiene que verse en claro (logos de cliente con `light` y `dark`, capturas con fondo propio).
- La escala de proyección la pone `Deck`. Dentro de una `Sheet` baja a web sola. No se toca.
- Nada depende del tema «a mano»: si una pieza necesita un archivo distinto por tema, el componente ya tiene un prop para eso.

## 8. Efectos: los que hay y cómo se usan

Los efectos son los de las charlas anteriores y **ya están dentro de los componentes**: no se programa ninguna animación en una charla.

| Efecto de las charlas | Pieza del sistema | Regla |
|---|---|---|
| Manchas que derivan en el fondo | `Deck` con `blobs` | Siempre encendidas |
| La foto de bloque que se acerca al pasar (1,18 → 1) | `BlockTitle` con `photo` | Con cada bloque |
| Las frases que se encienden una a una (`frase`) | `Statements`, `Spotlight` | Una pila por charla; de tres a cinco frases |
| El eje que se dibuja y el punto que aparece | `Timeline` | De tres a ocho pasos |
| Lo que se enciende con la flecha (`pasos`) | `Steps` | Ocho pasos como máximo; un `Steps` por parada |
| El detalle que sube (`zoom`) | `Sheet` en un `Step` | Una hoja por parada |
| El anillo que avanza | `Cycle` | Dentro de un `Steps` |
| El diagrama que se enciende por capas | `Schema` con `SchemaLayer` | Una capa por paso |
| La tira que desfila | `Marquee` | Una por charla |
| Los logos que pasan | `LogoCarousel` | Uno por charla |
| El latido | `Heartbeat` | Uno por charla |
| La barra que se llena | `ProgressBar` | Con `Steps` o sola |
| Las cifras que suben (`data-cuenta`) | `Count` | Cuatro por parada como máximo |
| Las barras que crecen | `Bars`, `Share` | Una gráfica que crece por paso |
| La barra de arriba que se esconde y el índice lateral | `Deck` | Siempre |

Guardarraíles del movimiento:

- **Un efecto fuerte por parada** (una pila de frases, un `Steps`, un `Cycle`, un `Schema` por capas). Dos piezas que se mueven a la vez compiten.
- **Lo que se repite en bucle** (`Marquee`, `LogoCarousel`, `Heartbeat`, el autoplay de `Carousel`) aparece **una vez por charla** cada uno, y nunca dos en la misma parada.
- **Las duraciones y las curvas no se cambian.** Son las de las charlas.
- **Todo respeta `prefers-reduced-motion`.** Lo hacen los componentes; por eso no se añade ningún efecto fuera de ellos.
- Las entradas de texto de las charlas hechas con GSAP (`entrada`, `escalonado`, `pieza`, `revelar`, `secciones`, el `parallax` de texto) **todavía no están en el sistema**. Mientras no estén, las paradas entran sin animación. No se sustituyen por una animación propia ni se añade GSAP a una charla.

## 9. Navegación y paradas

- Las paradas las cuenta el `Deck` por los `data-stop` que ponen `Slide`, `Statements`, `Timeline` y `Spotlight`. No se añade `data-stop` a mano ni se quita.
- Las teclas (flechas, espacio, inicio, fin) las gestiona el `Deck`; `Steps` las coge antes mientras está a la vista. No se añaden atajos.
- La foto de un `BlockTitle` no es parada: va con su título.
- `homeHref` del `Deck` apunta a la portada. El logo de la barra siempre vuelve al principio.
- Un `Dialog` no se usa en una charla. Un formulario (`Form`, `Field`) solo en el pie o en una parada final de contacto, nunca en medio.

## 10. Accesibilidad: lo que se comprueba

- Cada imagen tiene `alt`, y el `alt` describe (ver 3). Las capturas describen lo que dice la pantalla.
- Cada parada tiene **una** `h2`; los títulos de tarjetas y de pasos son `h3`.
- Cada `Schema` y cada `Cycle` tienen `title` y `description` que cuenten el dibujo en palabras.
- El panel de accesibilidad de Storybook está en verde en todas las historias de la charla, en los dos temas.
- Se puede recorrer toda la charla con el teclado y el foco se ve.
- Los logos de cliente llevan `alt` con el nombre.

## 11. Nombres, logos y datos

- Los **textos de ejemplo** en Storybook son genéricos. Las charlas reales llevan su contenido, pero nunca se suben al catálogo.
- **Logos y nombres de clientes** solo con permiso por escrito del cliente. Sin permiso, la parada dice «un cliente del sector X».
- Las **capturas** no llevan datos reales de personas ni de clientes: se anonimizan antes o se usan datos de ejemplo.
- Las **personas** del equipo salen con su nombre y su rol, con un retrato con el mismo encuadre para todas, y con su consentimiento.
- Las **cifras** llevan su fuente en una `MetricNote` (qué se midió, cuándo, cómo).

## 12. Lista final antes de dar la charla por buena

Se repasa entera. Un «no» en cualquiera devuelve la charla a revisión.

1. ¿Hay una `Cover`, de uno a seis bloques con `BlockTitle` y foto, y un `Closing`?
2. ¿Entre 12 y 30 paradas, una idea por parada?
3. ¿Ningún CSS propio, ningún `style=`, ningún valor escrito a mano, ninguna librería nueva?
4. ¿Todo el texto en negro o gris, sin colores?
5. ¿Amarillo solo en manchas, píldoras, un nodo de anillo o una serie, y en tres paradas como máximo?
6. ¿Rojo y verde solo en círculos y trazos?
7. ¿Fotos 2:1 neutras, con `alt`, sin personas reconocibles ni texto, menos de 400 KB?
8. ¿Títulos de dos líneas, cuerpos de tres frases, frases de 14 palabras?
9. ¿Cada parada cabe en 1440 × 900 en proyección y se ve bien en 375 y 768?
10. ¿Revisado en oscuro y en claro?
11. ¿Un efecto fuerte por parada y las piezas en bucle una vez por charla?
12. ¿Panel de accesibilidad en verde, una `h2` por parada, todo recorrible con teclado?
13. ¿Logos, nombres, capturas y retratos con permiso y sin datos reales?
14. ¿Las cifras con su `MetricNote`?
15. ¿La barra con tres a seis destinos y el logo volviendo a la portada?

## 13. Qué hacer cuando el encargo pide algo fuera de las normas

Quien monta la charla (persona o agente) **no cumple el encargo saltándose una norma**. Responde con la norma que lo impide y propone la pieza del sistema que resuelve lo mismo. Si de verdad hace falta algo nuevo, se pide el componente a diseño con el formato del README, y hasta que exista la charla se monta sin él.

Las normas cambian solo desde diseño, en este archivo (`src/docs/normas-charlas.md`), y cada cambio va con su commit.
