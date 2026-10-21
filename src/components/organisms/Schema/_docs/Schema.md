El esquema: **un dibujo en SVG con el vocabulario de las charlas** (cajas, líneas, puntas de flecha, series y seis tamaños de texto), todo en las tintas neutras. Es cómo están hechos el flujo de la charla, «quién hacía qué» y las gráficas de telemetría.

## Anatomía

1. **Schema:** el SVG, con `viewBox`, título y descripción accesibles. Dentro de un Steps, las capas se encienden con el paso.
2. **SchemaLayer:** un grupo del dibujo que se enciende desde un paso (`step`). Con el esquema guiado, lo que no está encendido queda al 18 %.
3. **SchemaFrame:** el marco que le da al dibujo todo el ancho de la ventana (con scroll lateral si no cabe) y, debajo, un pie a media rejilla.
4. **SchemaVoice:** la región viva que lee el rótulo de la capa encendida.

Las formas y los textos se escriben con las clases del objeto `schema`:

| Grupo | Clases |
|---|---|
| Formas | `node` (caja, borde fuerte), `highlighted` (borde primario), `note` (borde discontinuo), `pill` (relleno acento), `inverse`, `dot`, `arc`, `icon`, `iconBox`, `iconFill` |
| Líneas | `line` (secundaria), `lineStrong` (primaria), `lineDashed` (terciaria), `arrowhead`, `arrowheadFill` |
| Series de gráficas | `series`, `seriesDashed`, `accent`, `accentThin`, `accentDashed`, `accentDotted`, `accentDot` |
| Textos | `title` 32, `nodeText` 26, `nodeSub` 21, `circleText` 26, `pillText` 23, `inverseText` 26, `noteText` 24, `label` 22, `coreTitle` 44, `coreSub` 26, `micro` 19, `sideText` 24 |

Con `data` (esquemas de datos), todos los textos suben un punto: `title` 44, `nodeText` 34, `label` 30.

## Cuándo usarlo

- Un flujo, un diagrama de quién hace qué, una gráfica de series.
- Cualquier dibujo que se cuente por capas con la flecha.

## Cuándo no

- Un anillo de fases: eso es Cycle.
- Pasos en fila: Flow.
- Una captura: Screenshot.

## Estados

Sin Steps alrededor, todo encendido. Dentro de un Steps, cada capa se enciende cuando `current ≥ step`; las demás, al 18 %, en 0,55 s.

## Decisiones de diseño

### Tres grosores, tres tintas

Las líneas van de 1,15 (secundaria) a 1,6 (primaria). El dibujo no grita: la jerarquía está en la tinta, no en el grosor.

### El acento solo rellena

El amarillo aparece en las píldoras (con el texto en negro) y en las series destacadas de las gráficas. Nunca en texto.

### Un ancho mínimo

El SVG no baja de 1200 px: un diagrama con texto de 22 px no se lee más estrecho. En móvil se desplaza de lado dentro del SchemaFrame.

## Accesibilidad

- `role="img"` con título y descripción: el lector de pantalla oye lo que dice el dibujo, en palabras.
- Con Steps, SchemaVoice lee el rótulo de cada capa al encenderse.
- Sin transición con `prefers-reduced-motion`.

## Uso

**Do**

- Escribir la descripción como si se contara por teléfono.
- Una capa por paso.

**Don't**

- Colores que no estén en el vocabulario.
- Texto más pequeño que `micro` (19 px).

## Equivalencias

No está en Figma. En las charlas es `svg.esq[data-guia]`, `.esq-capa[data-paso][data-rotulo]`, `.esq-marco`, `.esq-pie`, `.esq-datos`, `.esq-parada-voz` y todas las clases `esq-*` (base-540.css y CSS propio de cada charla).
