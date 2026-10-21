El pie de una charla: **la última parada.** Una pantalla entera con el halo subiendo desde abajo, el logotipo, el lema, las redes, el «¡Gracias!» y la firma, todo centrado.

## Anatomía

1. **Halo** (`--gradient-halo`): un resplandor de 120 vw de ancho que asoma por el borde inferior. Gris sobre papel, blanco al 8 % sobre negro.
2. **Logotipo** (`xs`), enlace a la portada.
3. **Lema** a 38 caracteres, en `body-m` secundario.
4. **Redes** en fila, cajas de 24 px, hover en dorado.
5. **¡Gracias!** en `body-l` ligero y secundario.
6. **Firma** («© 2026 540»), separada por aire.

## Cuándo usarlo

- Como cierre de toda charla, después de la última Slide. Deck lo coloca y lo cuenta como última parada.

## Cuándo no

- En la web: ahí es Footer, con sus columnas.
- A mitad de una charla.

## Variantes

Ninguna. Las redes y el «¡Gracias!» son opcionales.

## Estados

Ninguno. Al llegar con el teclado, Deck baja hasta el final del documento.

## Decisiones de diseño

### Ocupa una pantalla, como el resto de paradas

El pie mide `100svh` y centra su contenido, igual que una Slide: la última parada pesa lo mismo que las demás.

### Todo centrado

A diferencia del pie de la web, aquí no hay columnas ni avisos legales: logotipo, lema, redes, gracias y firma, en una sola columna centrada. El rótulo «Síguenos» sobra cuando solo quedan los iconos.

### El halo es un token

`--gradient-halo` cambia con el tema: `--540-gradient-gray-paper` en claro y `--540-gradient-gray` en oscuro.

## Accesibilidad

- `footer` con rol `contentinfo`, uno por charla.
- Cada red lleva su nombre en el enlace; el icono es decorativo.
- El halo es decoración (`aria-hidden`).

## Uso

**Do**

- Un lema de una línea que resuma la charla.
- Las tres redes que 540 publica.

**Don't**

- Columnas de enlaces: en una charla no hay a dónde ir.
- Dos pies.

## Equivalencias

No está en Figma. En las charlas es `.marco-pie`, `.marco-halo`, `.footer-pie` centrado y `.v2-gracias` (base-540.css); el script lo cuenta como última parada.
