Un destino del menú. **Enlace de verdad, con estado de sección actual.** El destino en el que estás va en negrita y nada más: no lleva color de marca ni raya, porque el peso ya lo separa de los demás y no depende de distinguir un color.

## Anatomía

Un enlace con la etiqueta dentro de un `span`. El `span` es lo que crece al pasar el ratón y lo que lleva la raya de foco.

## Cuándo usarlo

- Dentro de la barra de escritorio, con Menu (`sm`).
- Dentro del panel de móvil, con NavMobile (`lg`).
- Para marcar la sección que se está viendo (`current`).

## Cuándo no

- Suelto, fuera de un menú: es un enlace normal.
- Con peso de acción: usa Button con `href`.
- Una entrada que todavía no lleva a ningún sitio: quítala del menú.

## Tamaños

| `size` | Dónde | Estilo | Alto mínimo |
|---|---|---|---|
| `sm` (por defecto) | La barra de escritorio | `micro`, en mayúsculas | 24 px (`--size-control-xs`) |
| `lg` | El panel de móvil | `title-m` | 45 px (`--size-control-md`) más 12 px de relleno vertical |

**Las mayúsculas de `sm` las pone el estilo, no el contenido:** se escribe «Servicios» y así se lee en voz alta.

## Estados

| Estado | Señal |
|---|---|
| Normal | Tinta primaria, sin subrayado |
| Hover | La etiqueta crece a 1,09 |
| Active | La etiqueta se encoge a 0,97: se lee como que se hunde |
| Focus | Una raya de 2 px bajo la palabra, solo con teclado |
| Actual | Negrita y `aria-current="page"` |

No hay estado deshabilitado: un destino que existe se puede visitar, y si no existe se quita del menú. Por eso su quinto estado es «actual».

## Decisiones de diseño

### El foco es una raya, no un anillo

Sobre una palabra suelta, en una fila de destinos, el anillo pesa más que el propio menú. La raya de 2 px va justo debajo de la palabra y no ocupa sitio (es un `box-shadow`).

### El actual lo marca el componente

`current` pone la negrita y el `aria-current="page"` a la vez, para que no se pueda olvidar uno de los dos. Un solo actual por menú.

### Sin tono

La tinta la pone el tema.

## Accesibilidad

- **Rol** `link`. Teclado: Enter.
- **Actual:** `aria-current="page"` además del peso; el lector de pantalla lo anuncia.
- **Mayúsculas por CSS:** el texto se lee tal y como se escribe.
- **Movimiento:** el crecer y encoger se apagan con `prefers-reduced-motion`.

## Uso

**Do**

- Escribir las etiquetas en minúsculas normales.
- Un `current` por menú, el de la sección visible.
- `sm` en la barra, `lg` en el panel.

**Don't**

- Un ítem sin `href`.
- Color de marca o raya para el actual: solo negrita.
- Usarlo como botón.

## Equivalencias con Figma

Página `MenuItem` del archivo de diseño, set `MenuItem` (15:37). `Tamaño = sm / lg` es `size`; `Actual = sí / no` es `current`; `Estado` lo pone el navegador. En Figma las mayúsculas de `sm` están escritas en el contenido y el hover y el pulsado son tamaños de letra distintos, porque Figma no tiene `transform` en texto. En las charlas es `navitem` en base-540.css.
