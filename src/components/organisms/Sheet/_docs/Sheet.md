La hoja: **un panel que sube desde el borde de abajo de la pantalla, encima de la parada, para hacer zoom en un detalle.** Son los «zooms» de la charla: un diagrama ampliado, una lista, unas tarjetas.

## Anatomía

1. **Velo** (`--color-bg-overlay`) que atenúa la parada de detrás.
2. **Hoja** de 84 % del alto de la ventana y hasta 1080 px de ancho, pegada al borde inferior, con el asa arriba (40 × 4), fondo `--color-bg-surface`, borde fino y esquinas redondeadas solo arriba. Dentro, la escala tipográfica baja a la web para que quepa.
3. **Cabecera:** antetítulo en `body-s`, título en `title-m` y una frase en `body-m`.
4. **Cuerpo:** lo que haga falta ampliar.

## Cuándo usarlo

- Dentro de un Steps, para abrir un detalle en un paso concreto: la flecha lo abre y la siguiente lo cierra.
- Para enseñar un diagrama más grande de lo que cabe en la parada.

## Cuándo no

- Como diálogo de la web: eso es Dialog.
- Para contenido que se puede leer en la propia parada.

## Estados

| Estado | Qué pasa |
|---|---|
| Cerrada | Fuera de la pantalla, por abajo; sin velo |
| Abierta | Sube en 0,55 s; el velo se enciende |

Dentro de un Step, se abre cuando el paso se enciende. **Se cierra sola** en cuanto su parada deja de ocupar el centro de la pantalla: una hoja abierta nunca se queda flotando sobre otra parada.

## Decisiones de diseño

### Sube, no aparece

El recorrido es el alto de la hoja: a la velocidad de un botón se leería como un salto, y aquí lo que se quiere es que el detalle «venga» a la pantalla.

### La escala baja a web

En proyección el cuerpo va a 20 px; dentro de la hoja vuelve a 16 para que un diagrama con sus notas quepa entero.

## Accesibilidad

- Cerrada va con `aria-hidden`; abierta, su título es un `h3` dentro del flujo de la parada.
- El velo es decoración.
- Sin movimiento con `prefers-reduced-motion`: aparece y desaparece sin subir.

## Uso

**Do**

- Un Step con `from` y `to` alrededor de la Sheet: se abre en un paso y se cierra en el siguiente.
- Cabecera corta: la hoja es para el cuerpo.

**Don't**

- Dos hojas abiertas.
- Texto largo dentro: es un zoom, no una página.

## Equivalencias

No está en Figma. En las charlas es `.paso > .zoom`, `.zoom-cabecera` y el velo `.section::after` (CSS propio de la charla y `arranque-540.js`, «los zooms se anclan a la ventana»).
