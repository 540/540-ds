# MCP del sistema de diseño

Un servidor [MCP](https://modelcontextprotocol.io) que deja a un agente (Claude en Desktop, en claude.ai o en Claude Code) **consultar el sistema de diseño de 540 mientras monta una pieza**: las normas, la plantilla y sus paradas, los patrones, los componentes con sus props, las fichas y los tokens. Solo lee: no cambia nada ni guarda nada.

Hoy sirve un tipo de pieza: las charlas (`talk`).

## Cómo funciona

```
src/ (componentes, fichas, stories, tokens, normas, plantilla)
        │  npm run build-mcp-metadata
        ▼
mcp/metadata.json   ← todo lo que sabe el MCP, sacado del código
        │
        ▼
servidor MCP (mcp/server.ts + una tool por fichero en mcp/tools/)
        │
        ├── stdio en local ............ npm run mcp:stdio
        ├── HTTP en local ............. npm run mcp:serve  → http://localhost:3000/mcp
        └── HTTP en Vercel ............ api/mcp.ts          → https://mcp.540deg.com/mcp
```

- **La metadata sale del código, no se escribe a mano.** El script `scripts/build-mcp-metadata.ts` lee cada componente: su JSDoc, sus props de `types.ts` (con los valores de `*_DEFAULTS`), sus stories (sin las `Playground`) y su ficha de `_docs/`. También lee los tokens semánticos del CSS, las normas de `src/docs/normas-charlas.md` y la plantilla `TalkTemplate`, partida en paradas. Si diseño cambia una ficha o la plantilla, el MCP cambia en el siguiente despliegue.
- **El agente nunca ve `className`, `style` ni los atributos HTML heredados**: las normas prohíben montar una pieza con clases o estilos propios.
- **El servidor no guarda sesión**: cada petición se responde sola, con JSON. Por eso cabe en una función de Vercel sin base de datos.
- `metadata.json` no se guarda en Git: se genera en cada build.

## Las tools

| Tool | Para qué la usa el agente |
|---|---|
| `get-rules` | Las normas del tipo de pieza. Lo primero, antes de montar nada |
| `get-template` | El esqueleto (el `Deck` con barra y pie) y el índice de paradas de la plantilla, por bloques |
| `get-patterns` | Qué pieza cuenta cada cosa (una cita, cifras, una cronología…), qué no se hace nunca y qué paradas lo muestran |
| `get-template-stops` | El código de las paradas elegidas, con sus auxiliares y las fotos de muestra que hay que cambiar |
| `list-components` | Los 54 componentes, con una línea cada uno y filtro por nivel |
| `search-components` | Buscar por lo que se necesita, en inglés o en español («cifra grande», «cita») |
| `get-component` | Las props de un componente: tipo, si es obligatoria, valor por defecto y para qué sirve |
| `get-component-docs` | La ficha del componente: cuándo usarlo y cuándo no |
| `get-component-stories` | Sus variantes con el enlace a Storybook y, si se pide, el código |
| `get-tokens` | Los tokens semánticos con sus valores en claro, oscuro, escritorio y proyección |

Al conectarse, el agente recibe además unas instrucciones con el orden de trabajo: normas → plantilla y patrones → copiar paradas → solo componentes del catálogo.

## Probarlo en local

Necesitas haber hecho `npm install`.

**Con MCP Inspector**, una web para llamar a las tools a mano:

```bash
npm run mcp:inspect            # por stdio: lo arranca él solo
```

Por HTTP, que es como funciona en Vercel, en dos terminales:

```bash
npm run mcp:serve              # terminal 1: el servidor en http://localhost:3000/mcp
npm run mcp:inspect:http       # terminal 2: el Inspector, ya apuntando a esa URL
```

En el Inspector, conecta el servidor, ve a las tools y lánzalas. Si lo añades a mano, el tipo es **Streamable HTTP**.

**Con Claude Code**, para ver cómo lo usa un agente:

```bash
# por stdio (no hace falta tener nada arrancado)
claude mcp add 540-ds -- /ruta/a/540-ds/node_modules/.bin/tsx /ruta/a/540-ds/mcp/stdio.ts

# o por HTTP, con npm run mcp:serve arrancado
claude mcp add --transport http 540-ds-local http://localhost:3000/mcp
```

Abre una sesión nueva, comprueba en `/mcp` que está conectado y pídele algo («monta el esqueleto de una charla de 15 paradas sobre…»). Para quitarlo: `claude mcp remove 540-ds`.

En local la metadata se construye al arrancar, en unos 3 segundos. Si cambias un componente, reinicia el servidor.

## Comprobar que todo está bien

```bash
npx tsc -p tsconfig.mcp.json --noEmit     # tipos de scripts/, mcp/ y api/
npm run build-mcp-metadata -- --strict    # falla si un componente no está documentado
npm run test:mcp                          # las tools y el servidor HTTP
```

Lo mismo pasa el workflow `.github/workflows/mcp.yml` en cada PR y en `main`. Sin `--strict`, `build-mcp-metadata` escribe el fichero y lista los huecos sin fallar.

**Si el CI falla por un hueco** (un componente sin descripción, un prop sin JSDoc, sin ficha o sin stories), lo que falta está en el componente, no en el MCP: añade el comentario o la ficha y vuelve a lanzarlo.

## Añadir una tool

1. Crea `mcp/tools/<nombre>.ts` con `defineTool()`: nombre en kebab-case, título, una descripción que diga al agente cuándo usarla, el esquema de entrada con `zod` y un `handler` que lea la metadata. Mira `get-component.ts` como ejemplo.
2. Añádela a la lista de `mcp/tools/index.ts`.
3. Añade su test en `mcp/server.test.ts` y su nombre al test que lista las tools.
4. Añade una fila a la tabla de este README.

Si la tool necesita datos que la metadata no tiene, añádelos en `scripts/build-mcp-metadata.ts` y su tipo en `mcp/types.ts`.

## Añadir un tipo de pieza

Cuando haya normas y plantilla de otro tipo (un informe, un post…):

1. Las normas en `src/docs/normas-<tipo>.md`, con la tabla de patrones con esta misma cabecera: `| Para contar… | Pieza | Nunca |`. De esa tabla salen los patrones.
2. La plantilla en `src/templates/<Nombre>/`, con sus paradas como hijos directos de la raíz.
3. Regístralas en `scripts/build-mcp-metadata.ts` (`RULE_FILES` y `TEMPLATE_DIRS`) y añade el tipo a `PIECE_TYPES` en `mcp/tools/shared.ts`.

## Desplegar en Vercel

La configuración está en `vercel.json`, así que en Vercel no hay que rellenar nada a mano:

- **Sin framework**: Vercel no despliega la app de Vite, solo la función.
- **Build**: `npm run build-mcp-metadata -- --strict`. Si un componente no está documentado, el despliegue falla y el anterior sigue en marcha.
- **La función** es `api/mcp.ts`, en Node. Lleva dentro `mcp/metadata.json`.
- **`/mcp`** lleva a `/api/mcp`, y **`/`** redirige al Storybook (`ds.540deg.com`).

### Crear el proyecto (una vez)

1. Entra en [vercel.com](https://vercel.com) con la cuenta del equipo de 540. Un MCP de empresa va en un equipo con plan **Pro**: el plan Hobby es solo para uso personal.
2. **Add New… → Project**. En «Import Git Repository», elige `540/540-ds`. Si no aparece, pulsa «Adjust GitHub App Permissions» y da acceso a ese repositorio. Puede que lo tenga que aprobar un administrador de la organización `540` en GitHub.
3. En la pantalla de configuración no cambies nada: `vercel.json` manda sobre la detección automática. No hace falta ninguna variable de entorno.
4. Pulsa **Deploy**.
5. En **Settings → Build and Deployment → Node.js Version**, elige **24.x**, la misma que el CI.

### Cómo se despliega a partir de ahí

- **Cada push a `main`** despliega producción.
- **Cada push a otra rama** (cada PR) crea un despliegue de preview con su propia URL. Vercel la publica como comentario en la PR.
- No hay que lanzar nada a mano.

### Dónde mirar

- **Deployments**: la lista de despliegues. Dentro de cada uno, **Building** tiene el log del build (ahí sale el `✓ mcp/metadata.json: …` o el error de `--strict`).
- **Logs** (u **Observability**): las peticiones al MCP y los errores en tiempo de ejecución.
- **Settings → Domains**: los dominios del proyecto.

### Comprobar un despliegue

```bash
curl -s -X POST https://<url-del-despliegue>/mcp \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json, text/event-stream' \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'
```

Tiene que devolver un JSON con las tools. Después, conéctalo a Claude Code con `claude mcp add --transport http 540-ds https://<url-del-despliegue>/mcp`.

**Los despliegues de preview están protegidos por defecto**: Vercel pide iniciar sesión (Deployment Protection), y un cliente MCP no puede. Para probar una preview, ve a **Settings → Deployment Protection** y quita la protección de las previews. Si no, prueba en producción después de fusionar. Producción es pública.

### El dominio `mcp.540deg.com`

1. **Settings → Domains → Add**, y escribe `mcp.540deg.com`.
2. Vercel te enseña un registro **CNAME** con el valor exacto que hay que poner. Quien gestione el DNS de `540deg.com` lo añade, igual que se hizo con `ds.540deg.com`.
3. Cuando Vercel lo marque como válido, el MCP queda en `https://mcp.540deg.com/mcp`. El certificado HTTPS lo pone Vercel solo.

Para cambiar de dominio más adelante, añade el nuevo al mismo proyecto y **deja también el viejo**, para que nadie se quede sin servicio. Mejor eso que una redirección: algunos clientes MCP no siguen redirecciones en un `POST`. Después actualiza la URL del conector en claude.ai.

## Ficheros

```
scripts/build-mcp-metadata.ts   genera mcp/metadata.json desde src/
mcp/
  types.ts                      forma de la metadata
  server.ts                     el servidor MCP y sus instrucciones
  tools/                        una tool por fichero; index.ts las registra
  http.ts                       el manejador HTTP (local y Vercel)
  stdio.ts                      entrada por stdio, para local
  serve.ts                      servidor HTTP local
  *.test.ts                     tests (npm run test:mcp)
api/mcp.ts                      la función de Vercel
vercel.json                     la configuración de Vercel
tsconfig.mcp.json               TypeScript de scripts/, mcp/ y api/
.github/workflows/mcp.yml       el CI del MCP
```
