---
name: prueba-540-ds
description: >-
  Prueba el sistema de diseño de la rama actual sin publicar nada y sin tocar producción: genera el paquete y la
  metadata del MCP desde esta carpeta, levanta el MCP en local y pide a una sesión de Claude limpia (que solo ve ese
  MCP y ninguna skill) que monte la pieza pedida y la pinte con el paquete recién generado. Entrega la pieza abierta
  en el navegador y un informe de dónde el sistema no ayudó. USAR cuando se quiera ver cómo usa un agente los cambios
  de esta rama: "prueba la rama", "prueba-540-ds monta una charla sobre X", "a ver si el agente respeta la norma
  nueva", "prueba mis cambios con una landing". NO USAR para montar una pieza de verdad (eso es la skill 540-ds) ni
  para revisar el código.
argument-hint: [qué pieza montar, p. ej. «una charla de 3 bloques sobre IA en logística»]
---

# prueba-540-ds · probar la rama en local

Lo que se prueba es **el sistema de diseño de esta rama** (componentes, fichas, normas, plantillas, guía e
instrucciones del MCP), no una skill. Por eso la pieza la monta una sesión de Claude aparte que:

- solo ve el **MCP local**, generado desde esta carpeta (ni el conector de producción ni ningún otro);
- no tiene **ninguna skill** ni lee el `CLAUDE.md` del repo: sabe solo lo que le dice el MCP;
- pinta con el **paquete recién generado** aquí, no con el publicado en npm;
- no ha visto esta conversación, así que si respeta un cambio es porque el sistema lo explica, no porque lo sepa.

Nada sale de la máquina salvo la propia sesión de Claude: no se publica, no se despliega, no se hace commit.

## 1 · El pedido

El argumento es la pieza a montar. Si no hay, pregunta qué pieza quiere probar y con qué contenido, en una sola
pregunta. Si la persona acaba de cambiar algo concreto (una norma, un componente), propón un pedido que lo ponga a
prueba («una charla con tres cifras, para ver el componente Metric nuevo») y espera el sí.

## 2 · Lanzarla

```bash
node .claude/skills/prueba-540-ds/scripts/probar.mjs --pedido "<el pedido, tal cual>"
```

- Desde la raíz del repo. Tarda varios minutos: lánzalo en segundo plano y avisa en una línea de que está en marcha.
- Necesita Node y el CLI `claude`. Si falta alguno, para y dilo.
- `--modelo sonnet` (u otro) si la persona quiere probar con un modelo concreto. Por defecto, el de su sesión.
- Por stderr va contando lo que hace (cada tool del MCP, cada render). La última línea de stdout es un JSON con el
  resumen: `ok`, `carpeta`, `pieza`, `informe`, `herramientas`, `minutos` y `coste_usd`.

Si sale con **3**, la rama no se construye: el paquete o la metadata fallan antes de montar nada. Explica el error en
lenguaje de diseño (p. ej. «el componente Badge no tiene ficha en `_docs`: sin ella no llega al MCP») y no sigas.
Si sale con **4**, la sesión no terminó la pieza: cuenta lo que dice `ultimo_mensaje` y el informe, si lo hay.

## 3 · Enseñar el resultado

1. Abre la pieza: `open <pieza>`.
2. Lee `informe.md` y cuéntalo **corto y sin jerga**, empezando por lo que importa a quien mantiene el sistema:
   - **Dónde el sistema no ayudó**: cada duda, hueco o contradicción, con el fichero o componente al que apunta.
     Es lo más valioso de la prueba: es lo que le pasará a cualquiera que use el sistema mañana.
   - **Errores del render** que tuvo que corregir: suelen señalar props mal documentadas.
   - Qué tools del MCP consultó (de `herramientas`). Si no llamó a una que debería, las instrucciones del MCP no lo
     dejan claro.
3. Termina con la carpeta (`pruebas/…`, fuera de git) y el coste.

No arregles nada por tu cuenta durante la prueba. Si el informe señala algo, propón el cambio y espera el sí; después
se puede volver a probar con el mismo pedido.

## Qué no hacer

- Montar la pieza tú en esta conversación: la prueba solo vale si la monta una sesión que no sabe qué se cambió.
- Usar el conector de producción o la skill 540-ds para comparar: si hace falta, que lo pida la persona.
- Hacer commit, push o publicar nada.
