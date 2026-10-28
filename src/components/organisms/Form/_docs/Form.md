El envoltorio de un formulario: **coloca los campos y pone el envío.** Los campos los trae quien lo usa, y normalmente son Field. Es un organismo porque lo que compone son moléculas: sus hijos son Field y su envío es un Button.

## Anatomía

1. **Campos**, en columna, con 24 px entre ellos: de la línea de uno a la etiqueta del siguiente. Con menos, la etiqueta se pega a la línea de arriba y deja de leerse como el título del campo que tiene debajo.
2. **Envío**: un Button `primary` al final de la fila, no a lo ancho. En un formulario hay una sola acción y es esta.

## Cuándo usarlo

- El formulario de contacto.
- Cualquier formulario: es lo que aporta el `form` y el envío.

## Cuándo no

- Un campo suelto que no se envía: usa Field.
- Un buscador de una línea: ahí el envío va dentro del propio campo.

## Variantes

| `align` | Dónde va el envío |
|---|---|
| `end` (por defecto) | Al final de la fila: la web |
| `center` | Centrado: la parada de contacto de una charla, donde todo va centrado |

Lo demás que cambia es cuántos campos lleva y qué dice el verbo del botón.

## Estados

Ninguno propio. No valida ni acusa recibo: qué hacer con el envío es de quien lo monta (`onSubmit`).

## Decisiones de diseño

### El verbo y el objeto en el botón

«Enviar mensaje», no «Enviar»: quien llega por la lista de controles oye el verbo y el objeto.

### `noValidate`

Los globos de validación del navegador salen en el idioma del sistema operativo, se colocan donde quieren y desaparecen solos. Se desactivan para que ganen los mensajes del sistema.

## Accesibilidad

- Rol `form`. Teclado: Tab entre campos, Enter envía.
- **No anuncia el resultado del envío.** Un formulario real lo necesita (una región `aria-live` con el resultado), y esa capacidad hay que devolverla al sistema antes de publicarlo.
- La leyenda de obligatorios va antes del formulario, fuera de este componente.

## Uso

**Do**

- Field como hijos, con `id` únicos.
- Un verbo con objeto en `submitLabel`.
- Anunciar el resultado en la pantalla que lo monta.

**Don't**

- Dos botones de envío.
- Copy dentro del Form: aquí no hay texto.

## Equivalencias con Figma

Página `Form` del archivo de diseño, componente `Form` (43:3). El botón es el `primary` de serie.
