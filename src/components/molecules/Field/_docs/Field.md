Un campo de formulario: **la etiqueta y el control, atados por el identificador.**

## Anatomía

1. **Etiqueta** encima, en `micro-bold` secundario. Las mayúsculas las pone el estilo: se escribe «Nombre».
2. **Control:** un `input` (o un `textarea` con `multiline`). El contorno es solo la línea de abajo: ni caja, ni radio, ni relleno. El texto va a 16 px porque por debajo Safari en iPhone hace zoom al enfocar.

Entre los dos, 8 px (`--space-s`).

## Cuándo usarlo

- Cualquier campo de un formulario.
- Los cuatro del formulario de contacto.

## Cuándo no

- Un dato que se lee y no se rellena: eso es texto.
- Elegir de una lista cerrada: no es un campo de texto.

## Tamaños

| `size` | Alto del control |
|---|---|
| `md` (por defecto) | 45 px (`--size-control-md`) |
| `sm` | 36 px (`--size-control-sm`) |

Con `multiline` el alto lo pone el mensaje (mínimo dos controles) y se puede estirar en vertical.

## Estados

| Estado | Señal |
|---|---|
| Normal | Línea de 1 px en `--color-border-default`; texto escrito en primario, placeholder en secundario |
| Foco | **La línea pasa a 2 px y al color de foco.** Es la única excepción del sistema al anillo: un rectángulo alrededor de un campo sin contorno dibuja una caja que no existe |
| Disabled | Texto en `--color-text-disabled` |

No valida ni marca errores. El sistema tuvo esa capacidad y se retiró al quedarse sin pantalla que la pidiera: si vuelve, vuelve aquí con su `aria-invalid`, no como un rojo puesto desde la pantalla.

## Decisiones de diseño

### El control no es un componente aparte

Lo fue (Input, un átomo) y no lo pedía nadie: separarlos solo servía para poder montar un campo sin etiqueta, que es lo que este componente existe para evitar. Sin etiqueta, un campo se anuncia como «cuadro de edición» y nada más.

### Sin ayuda ni mensaje de error

El campo dice qué se escribe en él y nada más.

## Accesibilidad

- Etiqueta y control, sin rol propio. Teclado: Tab.
- **La etiqueta va asociada al campo** (`for` / `id`): pulsarla lo enfoca y el lector de pantalla la anuncia con él.
- La obligatoriedad va en `required`, no solo pintada.
- Mayúsculas por CSS: el lector lee «Nombre», no «N-O-M-B-R-E».

## Uso

**Do**

- Un `id` único por campo.
- Etiquetas en caja normal, de una o dos palabras.
- `type="email"`, `inputMode`, `autoComplete`: pasan directos al control.

**Don't**

- Un campo sin etiqueta (el tipo no lo permite).
- Placeholder como etiqueta.
- Un rojo de error puesto desde fuera.

## Equivalencias con Figma

Página `Field` del archivo de diseño, set `Field` (16:43). `Tamaño = md / sm` es `size`; `Estado = normal / foco / disabled` lo pone el navegador o `disabled`. En Figma la etiqueta está escrita en mayúsculas; en el código las pone el estilo.
