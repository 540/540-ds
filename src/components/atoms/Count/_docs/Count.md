El contador: **una cifra que sube desde cero cuando llega a la pantalla.** Es el `data-cuenta` del show & tell y el `Count` de la charla de la newsletter y de la de migración («79.592», «45,9 %»).

## Anatomía

1. **La cifra**, en el estilo de texto de donde se ponga (dentro de `Metric`, en `title-l`; dentro de un `Text`, en el suyo), con números tabulares para que no baile al cambiar.
2. **Prefijo y sufijo** opcionales («+», « %»).
3. **La voz**: el valor final, oculto a la vista, para el lector de pantalla.

## Cuándo usarlo

- Como `value` de un `Metric`, cuando la cifra es lo que se cuenta en esa parada.
- Dentro de un `Step`: sube cuando el paso se enciende.

## Cuándo no

- Cifras en un párrafo: se escriben tal cual.
- Fechas, años o códigos: no son cantidades.
- Más de cuatro contadores en una parada: compiten.

## Estados

| Estado | Qué se ve |
|---|---|
| Fuera de la pantalla o con su paso apagado | 0 |
| Al llegar | Sube hasta el valor en 1,4 s, frenando al final |

Al salir vuelve a cero, así que al volver a la parada se repite. Con `prefers-reduced-motion` se ve el valor final desde el principio.

## Decisiones de diseño

### El formato es el español

Punto de miles a partir de cinco cifras (79.592, pero 7959), coma decimal y un espacio antes del % que se escribe en el `suffix`. Lo pone `Intl.NumberFormat('es-ES')`.

### La duración no se toca

Es la de las charlas (1,4 s). No hay prop para cambiarla.

## Accesibilidad

- La cifra que se mueve está oculta al lector; el lector oye el valor final una vez.

## Uso

**Do**

- `<Metric value={<Count value={79592} />} … />`.
- `suffix=" %"` con el espacio.

**Don't**

- Redondear a mano: usa `decimals`.
- Ponerlo en un título de parada.

## Equivalencias

No está en Figma. En las charlas es `[data-cuenta]` (show & tell), `components/charts/Count.tsx` (newsletter) y el `Count` de `MigrationDataSlide.tsx`.
