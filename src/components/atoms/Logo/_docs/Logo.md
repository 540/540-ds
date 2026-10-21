El logotipo de 540: **la estrella y la palabra, en un solo bloque.** El alto manda y el ancho lo sigue: un logotipo estirado se nota mucho más que uno un píxel más estrecho de la cuenta.

## Anatomía

Un único SVG con el trazado del logotipo. El dibujo hereda el color (`currentColor`), así que no hay una copia por tono: en claro es tinta, en oscuro es blanco, y lo decide el tema a través de `--color-text-primary`.

## Cuándo usarlo

- La barra de navegación (`xs`).
- El pie de página (`sm` o `xs`).
- El bloque de contacto (`md`).

## Cuándo no

- Como elemento decorativo de relleno: usa una imagen.
- Repetido dentro de la misma sección.
- Recoloreado fuera de sus dos tonos.

## Tamaños

| `size` | Alto | Token | Para qué |
|---|---|---|---|
| `md` (por defecto) | 48 px | `--size-logo-md` | Bloque de contacto, portada |
| `sm` | 32 px | `--size-logo-sm` | Pies y barras con aire |
| `xs` | 24 px | `--size-logo-xs` | La barra de navegación |

El ancho no se fija: lo pone la proporción del dibujo (3,29 : 1).

## Estados

Ninguno. No es interactivo: cuando lleva al inicio, **el enlace lo envuelve** y el foco es del enlace.

## Decisiones de diseño

### Sin tono

El logotipo no tiene opción de color. Usa la tinta que hereda de `--color-text-primary`, que el tema reapunta. Para ponerlo sobre un fondo invertido, el contenedor pone `color: var(--color-text-inverse)` y el logotipo lo sigue. Sobre una imagen de fondo el contraste no está garantizado: ahí va sobre un velo (`--gradient-image-veil`) o no va.

### Nombre accesible

Por defecto se lee «540». Con `label=""` desaparece del recorrido del lector de pantalla, que es lo correcto si al lado ya se lee «540» (por ejemplo, junto al nombre en el pie).

## Accesibilidad

- **Rol** `img` con el nombre en `aria-label`. Con nombre vacío, `aria-hidden`.
- **No recibe foco:** `focusable="false"`. Si navega, el enlace que lo envuelve lleva el foco y el nombre («Ir al inicio»).
- **Contraste:** tinta sobre papel y blanco sobre negro, los dos por encima de 15:1.

## Uso

**Do**

- `xs` en la barra, `md` donde el logotipo es protagonista.
- Envolverlo en un enlace al inicio cuando esté en la barra o en el pie.
- `label=""` cuando el nombre ya está escrito al lado.

**Don't**

- Fijar el ancho o estirarlo.
- Cambiarle el color a mano: hereda el del contexto.
- Dos logotipos en la misma sección.

## Equivalencias con Figma

Página `Logo` del archivo de diseño, set `Logo` (14:24). `Tamaño = md / sm / xs` es `size`. En Figma el relleno está enlazado a `Text/Primary`; en el código es `currentColor` sobre `--color-text-primary`, que es lo mismo con otro nombre.
