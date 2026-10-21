La acción que dispara algo: enviar, abrir, confirmar. **Con `href` navega, y entonces es un enlace de verdad con el mismo aspecto.**

## Anatomía

1. **Icono** (opcional): va delante de la etiqueta y hereda su color. No aporta significado propio, así que en cada variante va con la tinta de su texto. Es un icono de [Lucide](https://lucide.dev), de 18 px en `md` y 16 px en `sm`.
2. **Etiqueta**: el verbo de la acción. Obligatoria siempre: es el nombre accesible del botón. En el modo *solo icono* no desaparece, se vuelve invisible y sigue leyéndose.

El botón abraza su etiqueta: el ancho es el texto más el relleno lateral. Las variantes de solo icono son la excepción, porque ahí el ancho es igual al alto.

## Cuándo usarlo

- Enviar un formulario.
- Abrir un panel o un diálogo.
- Confirmar o descartar en un diálogo.
- La llamada a la acción que lleva a otra página, con `href`.

## Cuándo no

- Navegar desde el `onClick`: pásale `href` y será un enlace de verdad.
- Alternar algo que se ve o no se ve: usa un interruptor (ThemeToggle).
- Más de una acción de igual peso en la misma zona: deja una `primary` y el resto `outline` o `ghost`.

## Variantes

Tres, y no seis: la escala para fondo oscuro se retiró con el sistema de tonos. El tono no se adapta al fondo; lo elige quien monta la pantalla.

| `variant` | Para qué | Cuántos por zona |
|---|---|---|
| `primary` | La acción que se espera que se haga. Relleno invertido. | Uno. |
| `outline` | Acciones secundarias que acompañan a la principal. Contorno fuerte. | Varios. |
| `ghost` | Acciones de apoyo: cerrar, menú, flechas de un carrusel. Sin superficie. | Varios. |

## Tamaños

| `size` | Alto | Relleno lateral | Icono | Para qué |
|---|---|---|---|---|
| `md` (por defecto) | 45 px (`--size-control-md`) | 24 px | 18 px | Lo normal. |
| `sm` | 36 px (`--size-control-sm`) | 16 px | 16 px | Barras y zonas densas. |

No se mezclan tamaños dentro de un mismo grupo de botones.

## Estados

**El hover invierte el relleno**: lo que está relleno pasa a contorno y lo que no lo está se rellena. **El pulsado rellena un paso más**: tres superficies distintas, nunca dos.

| Estado | `primary` | `outline` | `ghost` |
|---|---|---|---|
| Normal | fondo `bg-inverse`, texto `text-inverse` | borde `border-strong`, texto `text-primary` | transparente, texto `text-primary` |
| Hover | transparente, borde `border-strong`, texto `text-primary` | fondo `bg-inverse`, texto `text-inverse` | fondo `bg-neutral-hover` |
| Active | fondo `bg-inverse-active`, texto `text-inverse` | fondo `bg-inverse-active`, texto `text-inverse` | fondo `bg-neutral-active` |
| Focus | anillo de 2 px con 2 px de separación, solo con teclado | igual | igual |
| Disabled | fondo `bg-disabled`, texto `text-disabled` | borde `border-default`, texto `text-disabled` | texto `text-disabled` |

No hay estado *cargando*: ni el Figma ni las charlas lo necesitan. Si un día hace falta, se compone (icono y etiqueta cambian), no se pide con una opción.

## Decisiones de diseño

### Solo icono es geometría, no un interruptor

`iconOnly` no oculta la etiqueta: cambia la forma. El relleno lateral se va a cero y el ancho pasa a ser el alto, así que el botón es un cuadrado de 45 (`md`) o 36 (`sm`). Y **solo existe en `ghost`**, que es el único con el que la web lo monta: la hamburguesa y la cruz de la navegación estrecha, el cerrar del diálogo y las dos flechas del carrusel. Un contorno alrededor de una cruz pesa más que la cruz, y compite con el logotipo que tiene enfrente.

Sin icono no hay botón de solo icono: el código se cae al botón con etiqueta, que siempre se entiende, antes que dejar un cuadrado vacío.

### Un enlace no se deshabilita

`href` no se combina con `disabled`. Si la navegación no está disponible, el enlace no se pinta.

### Una sola primary por zona

Dos botones rellenos juntos compiten y obligan a leer los dos para decidir. En un diálogo: confirmar en `primary`, cancelar en `ghost`.

## Accesibilidad

- **Rol.** `button`, o `link` cuando lleva `href`. Se activa con Enter y con Espacio (el enlace, con Enter).
- **Nombre accesible.** La etiqueta siempre está en el DOM, también en solo icono (clase `srOnly`). El icono va con `aria-hidden`.
- **Foco.** Anillo de 2 px con 2 px de separación (`--focus-ring-*`), solo con teclado (`:focus-visible`). El color sigue al tema.
- **Contraste.** Texto invertido sobre `bg-inverse`: 16:1. Texto primario sobre papel: 16:1. Deshabilitado baja de AA a propósito: es la señal de que no está disponible, y el botón no lleva información que haya que leer.
- **Objetivo.** 45 × 45 en `md` y 36 × 36 en `sm` como mínimo, por encima de los 24 px que pide WCAG 2.5.8.
- **Movimiento.** Las transiciones se apagan con `prefers-reduced-motion`.

## Uso

**Do**

- Un verbo en la etiqueta, sin punto final.
- El icono solo cuando la acción tiene un símbolo reconocible, y siempre delante.
- `href` para ir a otra página o a otra parada de la charla.

**Don't**

- Dos `primary` en la misma zona.
- `iconOnly` en `primary` u `outline`.
- `disabled` junto a `href`.
- Mezclar `md` y `sm` en el mismo grupo.

## Equivalencias con Figma

Página `Button` del archivo de diseño, set `Button` (11:51).

| En el diseño | En el código |
|---|---|
| `Variante = primary / outline / ghost` | `variant` |
| `Tamaño = md / sm` | `size` |
| `Estado = normal / hover / active / disabled` | lo pone el navegador; `disabled` es la prop |
| `Solo icono = sí / no` (variante) | `iconOnly` (solo con `icon`) |
| `Con icono` + `Icono` (propiedades) | `icon` |

Lo que Figma no puede pintar: el estado de foco (un anillo sin borde) y la etiqueta invisible del solo icono. Los dos existen en el código.
