Una historia o una objeción: **un título y unos párrafos a media retícula, centrados, sobre una banda levantada.** Es la parada de contar («Lo que creía», «En agosto…») y la de poner la pega («Pero el UI kit…»).

## Anatomía

1. **Título** en `title-m` (historia) o `title-s` (objeción).
2. **Párrafos** en `body-l` secundario, sin palabra suelta al final.
3. **Puente** opcional: la última frase, en `body-l` primario, que lleva a la siguiente parada.

Todo en una rejilla con 24 px entre piezas, a media retícula (588 px) y centrado. La banda va `raised`.

## Cuándo usarlo

- Una historia: lo que pasó, en dos o tres párrafos.
- Una objeción: la pega que alguien pondría, y la respuesta.

## Cuándo no

- Una frase grande: Punchline o Statements.
- Una lista de cosas: Card en rejilla.

## Variantes

| `kind` | Título | Para qué |
|---|---|---|
| `story` (por defecto) | `title-m` | Contar algo |
| `objection` | `title-s` | Poner una pega |

`tone` admite `default`, pero la pauta de las charlas es `raised`: las historias y las objeciones se separan del resto.

## Estados

Ninguno.

## Decisiones de diseño

### Media retícula

A doce columnas un párrafo pierde el renglón. A media retícula, unas sesenta letras por línea, se lee.

### El puente va en negro

Los párrafos van en gris; la frase que abre la siguiente parada, en primario. Es el único cambio de tinta, y dice «aquí termina esto».

## Accesibilidad

- Región con nombre: la Slide apunta al título con `aria-labelledby`.
- El título es un `h2`.

## Uso

**Do**

- Dos o tres párrafos cortos.
- `raised`.

**Don't**

- Más de cuatro párrafos: es otra parada.
- Negritas dentro de los párrafos.

## Equivalencias

No está en Figma. En las charlas es `.charla-historia` y `.charla-objecion` dentro de `.section-raised` (base-540.css, GUIA-ESTILOS paradas 2, 6, 9 y 20).
