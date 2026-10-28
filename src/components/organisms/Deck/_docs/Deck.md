El marco de una charla: **las manchas detrás, la barra que se esconde al navegar, las paradas, el índice lateral, el teclado, el tema recordado y el pie como última parada.** Es el mismo recorrido que las charlas de 540 (`navegacion-540.js`), en React y sin GSAP.

## Anatomía

1. **Manchas** (Blobs), fijas detrás de todo.
2. **Barra superior**, fija: el Menu en escritorio y el NavMobile por debajo de 1024 px, con el ThemeToggle al lado. Translúcida con desenfoque (`--color-bg-nav`, `--filter-nav`).
3. **Paradas:** los `Slide` hijos, dentro de un `main` con la escala de proyección.
4. **Índice lateral:** Bullets en vertical, pegados al canto derecho, con una raya por parada.
5. **Pie** (DeckFooter): la última parada.

## Cuándo usarlo

- Como raíz de cualquier charla. Todo lo demás va dentro.

## Cuándo no

- En la web: ahí no hay recorrido, hay páginas.
- Dos Deck en la misma página.

## Las paradas

Son los `Slide` directos dentro de `main`. Si una Slide tiene descendientes con `data-stop` (las tres frases de tesis, los meses de una cronología), esos pasan a ser las paradas y la Slide deja de serlo. La foto que sigue a un título de bloque (`data-deck-photo`) no es parada: va en el mismo golpe que su título. El pie es siempre la última.

## Cómo se recorre

| Tecla | Qué hace |
|---|---|
| → ↓ Av Pág, Espacio | Siguiente. Si la parada es más alta que la ventana, primero baja un 84 % dentro de ella |
| ← ↑ Re Pág, Mayús + Espacio | Anterior, con la misma regla |
| Inicio / Fin | Primera / última parada |

Al saltar a una parada se centra el **escenario**, no la caja de la sección. Un título de bloque con foto se alinea arriba, para que la foto asome debajo. El pie baja hasta el final del documento. Con `prefers-reduced-motion` el salto es instantáneo.

El teclado no actúa mientras se escribe en un campo ni con un diálogo abierto.

## La barra

Fija en la portada. Al navegar (scroll o teclado) se esconde; solo vuelve al pasar el ratón por la zona superior (120 px) y, al salir de ahí, se esconde al segundo. No se esconde con el menú abierto, ni con el foco o el ratón encima de ella.

## El índice

Aparece al pasar la portada (60 % de la ventana) y se oculta por debajo de 900 px. Cada raya es un botón con su nombre («Parada 3 de 12») y la actual lleva `aria-current`. Pulsar una lleva a esa parada.

Nunca pinta más de **20 rayas**. Si la charla tiene más paradas, las reparte por igual entre las 20: cada raya es un tramo («Tramo 7 de 20»), se enciende la del tramo en el que está la parada actual y pulsarla lleva a la primera parada de ese tramo.

## El tema

Oscuro por defecto: las charlas se proyectan en oscuro. Se guarda en `localStorage` con la clave `540:tema` (`claro` / `oscuro`), como en las charlas. No lee la preferencia del sistema. Se aplica con `data-theme` en la raíz del Deck, así que dentro de Storybook el selector **Tema** de la barra no afecta al Deck: lo manda su propio conmutador.

## Decisiones de diseño

### Sin GSAP

Las charlas animan titulares, frases y fotos con GSAP. Aquí el recorrido (paradas, índice, teclado, barra) está completo y los efectos de movimiento quedan para el final, como se acordó.

### Las dos barras se montan a la vez

Menu y NavMobile están las dos en el DOM y el CSS elige cuál se ve: medir en el cliente significa pintar primero la barra equivocada y corregirla.

## Accesibilidad

- La barra es `navigation` con nombre; el índice, un grupo de botones con nombre y `aria-current`.
- El teclado respeta los campos de texto y los diálogos.
- Foco visible en todo lo pulsable; las paradas no dibujan recuadro.
- Todo el movimiento (barra, índice, scroll) se apaga con `prefers-reduced-motion`.

## Uso

**Do**

- Un `id` por Slide y los mismos `items` en la barra que anclas en las paradas.
- `data-stop` para partir una Slide en varias paradas.
- El DeckFooter siempre, con lema y redes.

**Don't**

- Dos Deck.
- Scroll manual con `scrollTo` desde fuera: usa el índice o el teclado.

## Equivalencias

No está en Figma. En las charlas es `.marco`, `.marco-barra`, `main[data-mov=secciones]`, `.v2-indice` y `.marco-pie` (base-540.css) más `navegacion-540.js` y el tema de `arranque-540.js`.
