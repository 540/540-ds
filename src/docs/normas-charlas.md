# Normas para montar una charla

Estas normas son **obligatorias** para cualquier presentación que se construya con el sistema, la monte una persona o un agente. Cuidan dos cosas: que la charla sea de 540 (componentes, color, tipografía, efectos) y que se pueda proyectar y recorrer bien (accesibilidad, datos, aire). El contenido, en cambio, es libre: cuánto texto lleva cada parada, cuántas paradas tiene la charla o qué pieza elegir para cada cosa son **criterio**, y ese criterio está en la guía de diseño (`get-design-guide` en el MCP, `src/docs/diseno.md` en el repositorio).

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

**Si falta una pieza**, no se hace a mano: se habla con diseño (ver 13).

## 1. Estructura de una charla

Para empezar una charla se parte de la plantilla **Plantillas/Charla completa** (`src/templates/TalkTemplate`), que tiene todas las paradas que sabe hacer el sistema, y se eligen las que hacen falta.

Una charla es un `Deck` con este orden:

1. **`Cover`**: la portada. Una sola.
2. **Bloques numerados**. Cada bloque es un `BlockTitle` con su foto y, detrás, sus paradas.
3. **`Closing`**: el cierre. Uno solo.
4. **El pie** (`DeckFooter`), que lo pone el `Deck` con `footer`.

Reglas de estructura:

- **Cada bloque numerado lleva su foto**: un `BlockTitle` sin `photo` no se acepta. El ordinal es `"01"`, `"02"`…, en orden y sin saltos.
- Los remates (`Statements`, `Quote`, `Punchline`) no van seguidos: entre dos remates hay al menos una parada de contenido.
- Los `id` de las paradas van en minúsculas, sin acentos, con guiones (`quienes-somos`), únicos, y los de los destinos de la barra (`items` del `Deck`) apuntan a los `BlockTitle`.
- La barra de arriba lleva **un destino por bloque**, y solo los bloques: no se enlazan paradas sueltas.

Cuántas paradas lleva la charla, cuántas lleva cada bloque y cuánto texto cabe en cada una son criterio: están en la guía de diseño.

### Variedad: ninguna forma de parada pasa del 30 %

Una charla combina las piezas del catálogo; no repite la misma parada una y otra vez.

- **Ninguna forma de parada ocupa más del 30 % de las paradas de contenido.** Dos paradas tienen la misma forma cuando usan las mismas piezas (una cabecera con tres tarjetas y otra cabecera con tres tarjetas son la misma forma, aunque cambie el texto). La portada, los títulos de bloque y el cierre no cuentan.
- **Nunca dos paradas seguidas con la misma forma.**
- **Se alternan** las paradas densas (tarjetas, listas, gráficos) con las de aire (una frase, una cita, una imagen grande).
- El render avisa cuando una forma pasa del 30 %. El aviso se corrige: se cambia de pieza o se juntan paradas.

### Las piezas y para qué parada sirven

La tabla es orientativa: dice qué pieza cuenta mejor cada cosa y qué no se hace nunca. Si hay dos piezas que sirven, se elige la que no se ha usado todavía.

| Para contar… | Pieza | Nunca |
|---|---|---|
| El título de un bloque | `BlockTitle` con foto | Un `Slide` con un `h2` grande |
| Un título con dos frases de entrada | `Slide` + `SectionHeader` | Un título sin descripción debajo de otro título |
| Un texto con su imagen al lado | `Grid` 7 + 5 con `SectionHeader` y `Image`, con el texto centrado como en el resto de paradas (`align="center"`) | La imagen como fondo detrás del texto. Una foto grande con una frase debajo: no es una parada de 540. El texto alineado a la izquierda junto a la foto |
| Dos a cuatro cosas comparables | `Grid` + `Card` | Más de cuatro tarjetas por fila |
| Cinco cosas | `Grid layout="fiveCentered"` o `layout="five" compact` | Seis o más en una fila |
| Una historia o una objeción | `Story` | Un párrafo largo suelto |
| Una cita | `Quote` | Comillas en un `Text` |
| Una cita con la cara de quien la dijo | `Grid` con `Image` en `1:1` y `Text` | Un retrato sin permiso (ver 11) |
| Pasos en fila | `Flow` | Flechas escritas en texto |
| Una cronología | `Timeline` | Una lista con fechas en negrita |
| Un ciclo | `Cycle` | Un `Flow` que vuelve al principio |
| Un diagrama | `Schema` dentro de `SchemaFrame` | Una imagen de un diagrama |
| Una pantalla | `Screenshot` | Una captura recortada sin avisar |
| Dos pantallas comparadas (antes y ahora) | `Grid` 6 + 6 con `Image ratio="auto"` y su etiqueta | Dos `Screenshot` en una rejilla |
| Varias piezas en una parada | `Stack` | Un `div` con margen o `gap` |
| Cifras | `Metric` en un `Grid` + `MetricNote`; `Count` si la cifra sube | Números grandes en `Text` |
| Cantidades comparadas o un ranking | `Bars` | Una lista de números |
| Varias series por fila, o de qué se compone cada total | `BarSeries` (`mode="grouped"` o `mode="stacked"`) | Varias `Bars` seguidas |
| Cuánto cambió cada cosa entre dos momentos | `Dumbbell` | Dos `Bars` lado a lado |
| Cuántos quedan en cada paso de un proceso | `Funnel` | Un `Flow` con cifras |
| Partes de un todo | `Share` | Un gráfico circular |
| Una evolución en el tiempo | `LineChart`; `Schema` con `schema.series` si lleva anotaciones dibujadas | Una imagen de una gráfica |
| Un porcentaje o el avance hacia una meta | `ProgressRing`, solo o varios en un `Grid` | Un gráfico circular |
| Una proporción que se cuenta («37 de cada 100») | `Waffle` | Un porcentaje suelto en un `Text` |
| Intensidad en una tabla (días por horas, equipos por meses) | `Heatmap` | Una tabla con números de colores |
| La relación entre dos variables | `Scatter` | Dos listas de números |
| Herramientas o logos | `Tools`, `LogoCarousel`, `Marquee` | Logos sueltos en una rejilla |
| Algo que se cuenta por partes | `Steps` | Varias paradas casi iguales |
| Un detalle ampliado | `Sheet` dentro de un `Step` | `Dialog` |
| Preguntas con respuesta | `Question` | Texto con «P:» y «R:» |
| Una lista o el índice de la charla | `SimpleList`, `ArrowList`, `ProblemList` | `ul` sin componente |
| Tres frases de tesis | `Statements` | Tres `Slide` con un `statement` |

## 2. Portada y cierre

**`Cover`:**

- `title` corto, en dos o tres líneas.
- `question` o `lead`, no las dos largas.
- `event` con el nombre del evento y la fecha («Open space · marzo 2026»).
- `photo` siempre, 2:1, y `client` solo si hay permiso para usar el logo (ver 11).

**`Closing`:**

- `sentence`: una frase corta, con `<strong>` en una parte si hace falta, no en toda.
- `body` y `punchline` opcionales.

El pie lleva la frase de la marca, las redes y el «¡Gracias!». No se le añade nada ni se le quita nada.

## 3. Imágenes: siempre

Una charla de 540 lleva imágenes **sí o sí**. Una charla solo de texto y tarjetas no se acepta.

**Dónde van, como mínimo:**

- La **portada**, con su foto.
- Cada **título de bloque**, con su foto.
- En cada bloque, **al menos una parada de contenido con imagen**: un texto con su imagen al lado, una cita con foto, una pantalla (`Screenshot`), dos pantallas comparadas o los casos (`CaseItem`).

**De dónde salen.** De la **biblioteca de imágenes de 540** («Fundamentos → Biblioteca de imágenes» en Storybook; `search-images` en el MCP), elegidas por la temática de cada parada. Se escriben como `biblioteca:<id>` en el `src` de la foto (`photo='{"src":"biblioteca:carretera-costa-atardecer","alt":"…"}'`) y el render las incrusta. Solo vienen de fuera las capturas y las fotos propias del proyecto que se cuenta. Nunca de una búsqueda cualquiera. Las fotos de muestra de la plantilla no van en una charla real.

- Las **imágenes** (carreteras, paisajes, arquitectura, pagos) cuentan algo: van en la portada, los títulos de bloque y los textos con su imagen al lado.
- Las **texturas** (luz, desenfoques, líneas) son fondos abstractos: sirven para una cita o para un texto con su imagen al lado cuando ninguna escena encaja.
- Si la biblioteca no tiene nada para un tema, se habla con la diseñadora (ver 13) para añadir fotos; no se busca una por fuera.

**Cómo son:**

- **Fotos de portada y de bloque: 2:1**, de 2000 px de ancho como mínimo, en `.webp` y de menos de 400 KB. Sin texto ni logos dentro. Las de la biblioteca ya cumplen todo esto; para la portada y los bloques, las horizontales.
- **Fotos de contenido:** en la proporción que pida la pieza (`2:1`, `1:1` o `auto` para capturas), con la misma calidad.
- **Las fotos de contenido van siempre redondeadas**, al lado del texto o centradas, igual que las capturas. El redondeo lo pone `Image`; solo van a sangre, sin redondeo, las de portada y de título de bloque.
- **Sin personas reconocibles** salvo con su consentimiento (ver 11). Una mano o una silueta sí.
- **El velo lo pone el componente** (`--gradient-image-veil`); la foto no se oscurece ni se retoca en origen.
- **`alt` obligatorio** y descriptivo («Fachada de hormigón con la luz de la tarde»).
- **Las fotos nunca se repiten** dentro de una charla. El render avisa si una de la biblioteca sale dos veces.

## 4. Texto y jerarquía

- **Una `h2` por parada**, puesta por `SectionHeader`, `BlockTitle` o la pieza que corresponda. Nunca dos títulos del mismo nivel en una parada.
- **Si un título no cabe, se acorta; no se baja el tamaño.**
- **Negrita (`<strong>`) una vez por párrafo**, en la parte que importa. Nunca un párrafo entero.
- `<code>` solo para comandos, nombres de archivo y rutas.
- Mayúsculas sostenidas solo las que pone el sistema (`micro-bold`). No se escriben títulos en mayúsculas.
- **Sin faltas de ortografía**, en todo el texto: títulos, cuerpos, listas, `alt`, títulos y descripciones de los esquemas. El render avisa de cada palabra que no está en el diccionario; el aviso se corrige o, si la palabra está bien escrita (un término de 540, un nombre), se añade a `palabras-540.txt`. El corrector no ve las tildes diacríticas («solo», «él», «más»), la concordancia ni una palabra bien escrita en el sitio equivocado: por eso, además, se relee todo antes de entregar.
- Ortotipografía en español: «comillas latinas», signos de apertura (¿ ¡), raya para incisos, espacio antes del símbolo de porcentaje (20 %) y coma decimal (0,84).
- Tono: el de las charlas de 540. Nada de superlativos ni de «revolucionario», «increíble», «mágico».

Cuántas palabras lleva un título, una frase o un párrafo es criterio: está en la guía de diseño.

## 5. Márgenes y aire

El aire lo ponen las piezas. Quien monta la charla no mide nada.

- **`Slide` pone el margen de la parada** y centra el contenido en un escenario de 1200 px. No se añaden márgenes, ni `div` con `padding`, ni separadores.
- **Entre piezas de una parada, solo los huecos que dan los componentes** (`Stack`, `Grid`, `SectionHeader`, `Section`). Si dos piezas quedan pegadas, es que falta la pieza que las contiene, no un margen.
- **Nada sale del escenario de 1200 px** salvo lo que ya es de lado a lado por diseño: la foto de bloque, `CardList`, `Marquee`, `SchemaFrame`.
- **Los textos llevan su medida** (`measure`): `half` para descripciones y cuerpos, `wide` para frases, `prose` para texto corrido.
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
| Una serie destacada en una gráfica (`schema.accent*`, o `tone="accent"` en cualquier gráfica: `Bars`, `Share`, `LineChart`, `BarSeries`…) | Una serie, una fila o un punto por gráfica |
| El anillo de foco del teclado | Lo pone el sistema |

**Nunca** en texto, en fondos de parada o de tarjeta, en bordes, en iconos, en botones, en subrayados ni en fondos de hoja. **Cuota por charla: fuera de las manchas, el amarillo aparece en tres paradas como máximo.** Si una charla pide más, es que se está usando para decorar, y el amarillo no decora: señala.

El rojo y el verde son colores de estado y solo van en **círculos y trazos**: las marcas de `Cycle`, el punto de aviso de `Timeline`, el `Heartbeat`. Nunca en texto.

**Las series de una gráfica** van en tinta (la que cuenta la historia), en gris (el contexto) y, como mucho una, en amarillo. Una gráfica distingue tres series como máximo; si hay más, son varias gráficas o unas `Bars`.

Todo lo demás es negro, gris y los fondos del sistema. Las tarjetas son del color de la página y se separan con el borde; la única banda distinta es `tone="raised"`.

## 7. Tema y escala

- Las charlas **se proyectan en oscuro**: `Deck` ya arranca así (`defaultTheme="dark"`). No se cambia.
- **Se revisan en los dos temas** antes de darlas por buenas: todo lo que se ve en oscuro tiene que verse en claro (logos de cliente con `light` y `dark`, capturas con fondo propio).
- La escala de proyección la pone `Deck`. Dentro de una `Sheet` baja a web sola. No se toca.
- Nada depende del tema «a mano»: si una pieza necesita un archivo distinto por tema, el componente ya tiene un prop para eso.

## 8. Efectos: los que hay y cómo se usan

Los efectos **ya están dentro de los componentes**: no se programa ninguna animación en una charla.

| Efecto de las charlas | Pieza del sistema | Regla |
|---|---|---|
| Manchas que derivan en el fondo | `Deck` con `blobs` | Siempre encendidas |
| La foto de bloque que se acerca al pasar (1,18 → 1) | `BlockTitle` con `photo` | Con cada bloque |
| Las frases que se encienden una a una (`frase`) | `Statements`, `Spotlight` | De tres a cinco frases |
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
| Las gráficas que crecen o se dibujan | `Bars`, `Share`, `LineChart`, `BarSeries`, `Dumbbell`, `Funnel`, `ProgressRing`, `Waffle`, `Heatmap`, `Scatter` | Una gráfica que crece por paso |
| La ficha con la cifra al señalar | `LineChart`, `Heatmap`, `Scatter` | La pone la gráfica; no se escribe la cifra en cada punto |
| La barra de arriba que se esconde y el índice lateral | `Deck` | Siempre |

Guardarraíles del movimiento:

- **Un efecto fuerte por parada** (una pila de frases, un `Steps`, un `Cycle`, un `Schema` por capas). Dos piezas que se mueven a la vez compiten.
- **Lo que se repite en bucle** (`Marquee`, `LogoCarousel`, `Heartbeat`, el autoplay de `Carousel`) aparece **una vez por charla** cada uno, y nunca dos en la misma parada.
- **Las duraciones y las curvas no se cambian.**
- **Todo respeta `prefers-reduced-motion`.** Lo hacen los componentes; por eso no se añade ningún efecto fuera de ellos.

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
- **Logos y nombres de clientes:** en una charla interna de 540, libres. En una charla que sale de 540, solo con permiso por escrito del cliente; sin permiso, la parada dice «un cliente del sector X».
- Las **capturas** no llevan datos reales de personas ni de clientes: se anonimizan antes o se usan datos de ejemplo.
- Las **personas** salen con su nombre y su rol, con un retrato con el mismo encuadre para todas, y con su consentimiento.
- Las **cifras** llevan su fuente en una `MetricNote` (qué se midió, cuándo, cómo).

## 12. Lista final antes de dar la charla por buena

Se repasa entera. Un «no» en cualquiera devuelve la charla a revisión.

1. ¿Hay una `Cover`, bloques con `BlockTitle` y foto, y un `Closing`?
2. ¿Ninguna forma de parada pasa del 30 % de las de contenido y no hay dos seguidas iguales? ¿El render no da avisos?
3. ¿Sin faltas de ortografía? ¿El render no avisa de ninguna palabra y se ha releído todo, `alt` incluidos?
4. ¿Imágenes en la portada, en cada título de bloque y en al menos una parada de cada bloque, sin repetir ninguna?
5. ¿Ningún CSS propio, ningún `style=`, ningún valor escrito a mano, ninguna librería nueva?
6. ¿Todo el texto en negro o gris, sin colores?
7. ¿Amarillo solo en manchas, píldoras, un nodo de anillo o una serie, y en tres paradas como máximo?
8. ¿Rojo y verde solo en círculos y trazos?
9. ¿Fotos de portada y de bloque en 2:1, con `alt`, sin texto ni logos, menos de 400 KB?
10. ¿Cada parada cabe en 1440 × 900 en proyección y se ve bien en 375 y 768?
11. ¿Revisado en oscuro y en claro?
12. ¿Un efecto fuerte por parada y las piezas en bucle una vez por charla?
13. ¿Panel de accesibilidad en verde, una `h2` por parada, todo recorrible con teclado?
14. ¿Logos, nombres, capturas y retratos con permiso y sin datos reales?
15. ¿Las cifras con su `MetricNote`?
16. ¿La barra con un destino por bloque y el logo volviendo a la portada?

## 13. Qué hacer cuando el encargo pide algo fuera de las normas

Quien monta la charla (persona o agente) **no cumple el encargo saltándose una norma**. Dice qué norma lo impide y **habla con la diseñadora** para ver si hace falta un componente nuevo, una variante de uno que ya existe o una plantilla nueva. Un agente lo dice en la conversación y propone qué pieza haría falta; no la inventa.

Mientras se decide, la charla se monta con la pieza más cercana del catálogo, o se deja la parada con un texto que diga qué falta. Si diseño crea la pieza, entra en el catálogo y en la plantilla, y las normas se actualizan con ella.

Las normas cambian solo desde diseño, en este archivo (`src/docs/normas-charlas.md`), y cada cambio va con su commit.
