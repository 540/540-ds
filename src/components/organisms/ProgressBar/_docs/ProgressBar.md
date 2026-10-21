La barra de tiempo: **una pista de 2 px con un relleno que crece desde la izquierda, un punto en cada extremo y, si hace falta, hitos que se encienden al alcanzarlos.** Es la barra de «La explosión» (de febrero a hoy) y la de progreso de la adopción.

## Anatomía

1. **Pista** de 2 px en `--color-border-default`.
2. **Relleno** en `--color-border-strong`, que escala desde la izquierda en 1,1 s.
3. **Puntos** de 16 px en los extremos, en tinta primaria; **hitos** intermedios en gris que pasan a primaria al alcanzarse.
4. **Extremos** opcionales: dos etiquetas en `body-s`, una a cada lado.

## Cuándo usarlo

- Un tramo de tiempo que se llena («Feb 2025 – Hoy»).
- Un progreso con hitos que se encienden paso a paso, dentro de un Steps.

## Cuándo no

- Una cronología con texto por paso: eso es Timeline.
- Un porcentaje suelto: es un dato, no una barra.

## Estados

`value` de 0 a 1 pone el relleno; `reached` enciende los primeros hitos. El relleno se anima al cambiar; nada con `prefers-reduced-motion`.

## Decisiones de diseño

### Los puntos son los de la cronología

Los mismos 16 px y la misma tinta que los de Timeline: una barra horizontal es una cronología tumbada.

## Accesibilidad

- `role="progressbar"` con nombre y valor en porcentaje.
- Los puntos son decorativos.

## Uso

**Do**

- Etiquetas cortas en los extremos.
- `milestones` y `reached` solo cuando haya hitos de verdad.

**Don't**

- Más de seis hitos.
- Texto encima de la pista.

## Equivalencias

No está en Figma. En las charlas es `.barra-tiempo` (con `[data-mov="crece"]`) y `.progreso[data-hitos]` (CSS propio y `arranque-540.js`).
