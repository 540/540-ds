Un icono que enciende y apaga el tema oscuro de la página. **El icono es el del tema al que se va, no el que está puesto:** en claro se ve la luna y en oscuro el sol. Es lo que hace que se entienda sin pulsarlo; un sol cuando ya hay sol no dice a dónde lleva.

## Anatomía

Un botón redondo de 24 px (`--size-control-xs`, el control más pequeño del sistema y la diana mínima que pide la WCAG) con un icono de Lucide de 16 px dentro y una etiqueta solo para lectores de pantalla. Es también lo que mide el logotipo que tiene enfrente, así que entra en la barra sin hacerla más alta.

## Cuándo usarlo

- En la barra de una página que tiene los dos temas.
- Cuando la preferencia de tema es de quien mira y no de la pantalla.

## Cuándo no

- Para elegir entre más de dos opciones: eso es un grupo de radios.
- Para ejecutar una acción que no se puede deshacer: usa Button.
- Como pieza suelta en medio del contenido: su sitio es la barra.

## Variantes

Ninguna. No tiene tamaños: la barra es el único sitio donde va. Lo único que cambia es el icono, y lo decide `dark`.

## Estados

El gesto del botón fantasma: sin relleno en reposo, con relleno al pasar y un paso más al pulsar. Aquí no hay nada que invertir porque no hay relleno del que salir; lo que distingue los tres estados es cuánto se levanta del fondo.

| Estado | Señal |
|---|---|
| Normal | Transparente, icono en `--color-text-primary` |
| Hover | Fondo `--color-bg-neutral-hover` |
| Active | Fondo `--color-bg-neutral-active` |
| Focus | Anillo de 2 px separado 2 px, solo con teclado |

No tiene estado deshabilitado: un conmutador que no se puede conmutar no hace falta.

## Decisiones de diseño

### Es presentacional

No toca el documento, no lee la preferencia del sistema y no guarda nada. Recibe `dark` y avisa con `onToggle`; dónde vive la preferencia y cómo se recuerda es de la aplicación (las charlas la guardan en `localStorage` con la clave `540:tema`). El sistema no decide cómo se guarda el gusto de quien mira.

### Redondo a propósito

Es de las pocas cosas redondas de la página: aquí el radio de cápsula significa «esto se pulsa», y esto se pulsa.

### Solo dos temas

No es un selector de paletas.

## Accesibilidad

- **Rol** `button`. Teclado: Enter y Espacio.
- **Botón de alternancia:** lleva `aria-pressed`, y ahí se lee si el tema oscuro está puesto. **El nombre no cambia al pulsarlo** («Tema oscuro»); lo que cambia es el estado. El `title` sí dice a dónde lleva.
- **Nunca un icono sin nombre:** la etiqueta es texto solo para lectores.
- **Diana** de 24 × 24, el mínimo de WCAG 2.5.8.

## Uso

**Do**

- En la barra, enfrente del logotipo.
- Guardar la preferencia en la aplicación y pasarla como `dark`.

**Don't**

- Cambiar el icono por otro par: luna y sol son los del sistema.
- Usarlo para algo que no sea el tema.

## Equivalencias con Figma

Página `ThemeToggle` del archivo de diseño, set `ThemeToggle` (25:2), en borrador. `Tema = claro / oscuro` es `dark`; `Estado` lo pone el navegador. En Figma el trazo del icono va a 1,333 porque el lienzo de 24 de Lucide se pinta a 16, que es exactamente lo que hace el navegador aquí.
