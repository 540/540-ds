El logotipo de una red social, **relleno y en su lienzo original.** Es la excepción a «los iconos son Lucide, outline, trazo 2»: un logotipo de marca redibujado a trazo deja de ser ese logotipo.

## Anatomía

Un SVG con el trazado de la marca. Hereda el color de quien lo envuelve: un icono no es una superficie, así que no tiene tono propio.

## Cuándo usarlo

- Una fila de perfiles en el pie de página.
- El enlace al perfil de alguien dentro de su ficha.
- Cualquier sitio donde lo que se reconoce es la marca de la red y no su nombre.

## Cuándo no

- Cualquier otro icono: Lucide, outline, trazo 2.
- Suelto, sin nada alrededor que se pulse: un logotipo no dice a dónde lleva.
- Como marca de 540: eso es Logo.

## Redes y tamaños

| `network` | Origen del trazado |
|---|---|
| `linkedin` | Trazado clásico (Simple Icons lo retiró tras una reclamación de marca) |
| `x` | Simple Icons (CC0) |
| `youtube` | Simple Icons (CC0) |
| `instagram` | Simple Icons (CC0) |

| `size` | Medida | Token |
|---|---|---|
| `md` (por defecto) | 18 px | `--size-icon-md` |
| `sm` | 16 px | `--size-icon-sm` |

Solo las cuatro redes que el sistema guarda: el trazado no se pasa desde fuera porque son marcas registradas. Añadir una red es añadir su trazado al componente.

## Estados

Ninguno propio. El hover del pie (dorado, `--color-text-accent-inverse`) lo pone el enlace que lo envuelve, y el icono lo hereda.

## Decisiones de diseño

### Siempre oculto para el lector de pantalla

Va con `aria-hidden` y no se le puede quitar: el nombre lo pone el enlace o el botón que lo lleva («LinkedIn de 540»). Dos nombres para el mismo destino es peor que uno.

### Sin tono

Hereda `currentColor`. Para el dorado del hover, el color va en el enlace.

## Accesibilidad

- **Oculto siempre** (`aria-hidden="true"`, `focusable="false"`). No recibe foco: lo recibe la caja que lo lleva.
- **El enlace que lo envuelve** lleva el nombre, el foco visible (anillo de 2 px) y una diana de 24 px como mínimo.

## Uso

**Do**

- Dentro de un enlace con nombre y diana de 24 px.
- `md` en el pie, `sm` dentro de un control compacto.

**Don't**

- Suelto, sin enlace.
- Redibujado a trazo o recoloreado por partes.
- Pasar un trazado desde fuera.

## Equivalencias con Figma

Página `SocialIcon` del archivo de diseño, set `SocialIcon` (15:27). `Red = linkedin / x / youtube / instagram` es `network`; `Tamaño = md / sm` es `size`. En las charlas es `footer-red` en base-540.css (24 × 24, hover en dorado).
