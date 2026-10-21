Las manchas de fondo: **dos resplandores amarillos muy tenues que se mueven despacio detrás de toda la charla.** Es el único sitio, junto con la píldora del esquema, donde el amarillo de marca aparece sobre papel.

## Anatomía

Dos círculos degradados, fijos a la ventana, uno arriba a la derecha (11 % y 4 % de amarillo) y otro abajo a la izquierda (7 % y 3 %), de 42 % del ancho de la ventana cada uno. Derivan en bucle durante 34 y 47 segundos.

## Cuándo usarlo

- Una vez por charla, al principio del marco, debajo de todo. Deck ya lo pone.

## Cuándo no

- En la web: ahí no hay manchas.
- Dentro de una parada: son de la página entera.
- Más de dos: dos manchas son ambiente; cuatro son un fondo.

## Variantes

Ninguna.

## Estados

Ninguno. Con `prefers-reduced-motion` se quedan quietas.

## Decisiones de diseño

### El amarillo acompaña, no informa

Las manchas son lo único amarillo que cruza de una sección a la siguiente, y lo hacen al 11 % como mucho. Las bandas `default` de las paradas no pintan fondo precisamente para dejarlas ver.

### `color-mix` sobre el token

El color sale de `--color-bg-accent` mezclado con transparente, así que si el acento cambia, las manchas cambian con él.

## Accesibilidad

- `aria-hidden` y sin eventos de puntero: no existen para el lector de pantalla ni para el ratón.
- Sin movimiento con `prefers-reduced-motion`.

## Uso

**Do**

- Dejar que Deck las ponga.

**Don't**

- Subir la opacidad: si se ven, sobran.
- Ponerlas en la web.

## Equivalencias

No están en Figma. En las charlas son `.manchas`, `.manchas-manchaA` y `.manchas-manchaB` en base-540.css.
