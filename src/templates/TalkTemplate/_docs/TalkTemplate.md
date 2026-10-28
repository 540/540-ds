La plantilla: **una charla entera montada solo con el catálogo, con todas las paradas que el sistema sabe hacer y texto genérico.** Sale de revisar las siete charlas de 540 (construyendo el sistema —HTML y Next—, historias de usuario con IA, juniors e IA, show & tell, sistemas de diseño y la newsletter en datos) y reunir cada tipo de parada que usan.

Es un **catálogo de paradas, no una charla para dar**: tiene muchas más de 30 paradas y más amarillo del que cabe en una. Una charla real copia de aquí las que necesita (entre 12 y 30) y cumple `normas-charlas.md`.

## Estructura

| Parte | Paradas |
|---|---|
| Portada | `Cover` con pregunta, evento, cliente y foto |
| 01 · Contar | Cabecera y cuerpo · `Statements` · `Story` · pila con `Spotlight` · objeción (`Story kind="objection"`) · tres listas · `Quote` |
| 02 · Comparar | Antes y ahora (`Card` + `ArrowList`) · tres tarjetas por pasos con pie · cuatro tarjetas · cinco compactas con destacada · cinco centradas · seis numeradas · equipo con retrato · `TeamMember` · `CardList` · `CaseItem` · `Punchline` aparte |
| 03 · Procesos | `Flow` con `Punchline` dentro · `Timeline` con aviso, flujo y zoom (`Sheet`) · `ProgressBar` por pasos · `Cycle` con panel · `Schema` por capas · `Heartbeat` |
| 04 · Datos | Cuatro `Metric` con `Count` y `MetricNote` · dos `Bars` y un `Share` por pasos · tabla de barras con detalle · línea con `Schema` |
| 05 · Pantallas | `Screenshot` · `Tools` (las que se quedan y las descartadas) · `LogoCarousel` · `Marquee` · `Question` · contacto con `Form` |
| Cierre | `Closing` y el pie del `Deck` |

## Cómo se usa

1. Copia `TalkTemplate.tsx` con el nombre de la charla.
2. Borra las paradas que no cuentes. Deja de uno a seis bloques, cada uno con su `BlockTitle` y su foto.
3. Cambia los textos y las fotos. Ningún estilo, ningún `style=`, ningún valor a mano.
4. Repasa la lista final de las normas.

## Lo que no está (todavía)

Lo que usaban las charlas y el sistema aún no tiene, para pedirlo a diseño si hace falta:

- Las entradas de texto con GSAP (líneas que suben, palabra a palabra, escalonados). Las paradas entran sin animación.
- El diagrama animado con una «ficha» que recorre los nodos (zooms de implementación y flujo de trabajo).
- El marco de móvil con captura dentro (show & tell). Mientras, `Screenshot`.
- La pista de estado horizontal (hecho, bloqueado, previsto) y las calles con segmentos de espera (show & tell).
- La parada de apoyo «Solo si preguntan» después del pie.
- La exportación a PDF por pasos de la newsletter.
