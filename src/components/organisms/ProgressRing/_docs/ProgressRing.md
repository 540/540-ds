El anillo de progreso: **un porcentaje, o el camino hacia un objetivo, como un arco que crece desde las doce en el sentido de las agujas del reloj, con la cifra contando en el centro.** Varios del mismo tamaño se comparan de un vistazo en un `Grid`.

## Anatomía

1. **Pista**: el círculo entero en gris claro (`--color-border-default`).
2. **Arco**: la parte alcanzada, en el color del tono, desde las doce.
3. **Cifra** en el centro: el porcentaje, que cuenta de cero a su valor a la vez que crece el arco, o el texto de `display`.
4. **Pie** opcional bajo el anillo, en `body-s` gris y centrado: qué mide la cifra.

Tres tamaños: `s` (120 px de diámetro, cifra en `title-s`), `m` (192 px, `title-m`) y `l` (264 px, `title-l`). Nunca más anchos que su hueco.

## Cuándo usarlo

- Un porcentaje que se entiende como «cuánto del total»: el 72 % de los proyectos.
- El avance hacia un objetivo: 340 de 500.
- Dos a cuatro porcentajes que se comparan, uno al lado de otro.

## Cuándo no

- Una cifra sin un total del que forme parte: es `Metric`.
- Un porcentaje que se cuenta en unidades, «37 de cada 100»: es `Waffle`.
- Varias partes de un mismo todo: es `Share`.
- Un avance en el tiempo, con hitos: es `ProgressBar`.
- Varias cantidades que se comparan entre sí: es `Bars`. Su evolución: es `LineChart`. Un embudo de etapas: es `Funnel`.

## Variantes

| `tone` | Color | Para qué |
|---|---|---|
| `ink` (por defecto) | Tinta | El anillo que cuenta la historia |
| `context` | Gris | Los anillos que lo acompañan |
| `accent` | Amarillo | El anillo que importa. **Uno por parada** y cuenta para la cuota de amarillo |


`size` (`s`, `m`, `l`) cambia el diámetro y la cifra. `max` fija el objetivo (por defecto 100) y `display` escribe la cifra a mano («340 de 500», «3/4»): entonces no cuenta, aparece hecha.

## Estados

El arco crece en 1,4 s desde las doce al llegar a la pantalla o al encenderse su `Step`, con la misma curva que la cifra que cuenta en el centro; al salir vuelve a cero. Con `prefers-reduced-motion` se ve ya hecho. Si `value` pasa de `max`, el anillo se cierra y la cifra dice el porcentaje real (120 %).

## Decisiones de diseño

### Un anillo, no una tarta

El arco sobre su pista dice una sola cosa, cuánto del total, y deja el centro para la cifra. Una tarta con varias porciones obliga a comparar ángulos, que es lo que peor se lee: para eso está `Share`.

### La cifra cuenta con el arco

El arco y la cifra usan la misma duración y la misma curva (las de `Count`), así que el número que se lee es siempre el que dibuja el arco.

### Sin esquinas redondas

El trazo acaba en recto, como las barras de `Bars` y `Share`.

## Accesibilidad

- El anillo es una imagen con nombre: `label` y la cifra («Primera medida: 72 %»). El dibujo y la cifra que cuenta no se leen por separado.
- El pie se lee como texto normal.

## Uso

**Do**

- Todos los anillos de una fila del mismo tamaño y con el mismo `max`.
- Pies cortos, de una o dos líneas.
- Uno en tinta o en amarillo y el resto en gris cuando uno es el protagonista.

**Don't**

- Más de un `accent` por parada.
- Más de cuatro anillos en una fila: es una tabla, o `Bars`.
- Un anillo para una cifra que no es parte de un total.
