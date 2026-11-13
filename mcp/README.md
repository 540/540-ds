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
        ├── HTTP en local ............. npm run mcp:serve    → http://localhost:3000/mcp
        ├── Firebase en local ......... npm run mcp:emulate  → http://127.0.0.1:5050/mcp
        └── Firebase .................. mcp/firebase.ts      → https://rev-ds-cd11b.web.app/mcp
```

- **La metadata sale del código, no se escribe a mano.** El script `scripts/build-mcp-metadata.ts` lee cada componente: su JSDoc, sus props de `types.ts` (con los valores de `*_DEFAULTS`), sus stories (sin las `Playground`) y su ficha de `_docs/`. También lee los tokens semánticos del CSS, las normas de `src/docs/normas-charlas.md` y la plantilla `TalkTemplate`, partida en paradas. Si diseño cambia una ficha o la plantilla, el MCP cambia en el siguiente despliegue.
- **El agente nunca ve `className`, `style` ni los atributos HTML heredados**: las normas prohíben montar una pieza con clases o estilos propios.
- **El servidor no guarda sesión**: cada petición se responde sola, con JSON. Por eso cabe en una Cloud Function sin base de datos.
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

Por HTTP, que es como funciona desplegado, en dos terminales:

```bash
npm run mcp:serve              # terminal 1: el servidor en http://localhost:3000/mcp
npm run mcp:inspect:http       # terminal 2: el Inspector, ya apuntando a esa URL
```

En el Inspector, conecta el servidor, ve a las tools y lánzalas. Si lo añades a mano, el tipo es **Streamable HTTP**.

**Con el emulador de Firebase**, que reproduce lo desplegado (Hosting reescribe `/mcp` a la función):

```bash
npm run mcp:emulate            # empaqueta la función y arranca Hosting y Functions en local
```

El MCP queda en `http://127.0.0.1:5050/mcp`. Usa un proyecto de demostración (`demo-540-ds`): no necesita cuenta ni toca el proyecto real.

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
npx tsc -p tsconfig.mcp.json --noEmit     # tipos de scripts/ y mcp/
npm run build-mcp-metadata -- --strict    # falla si un componente no está documentado
npm run build:firebase                    # lo anterior, y empaqueta la función en firebase/functions/
npm run test:mcp                          # las tools y el servidor HTTP
```

Lo mismo pasa el workflow `.github/workflows/mcp.yml` en cada PR y en `main`, y en `main` además despliega. Sin `--strict`, `build-mcp-metadata` escribe el fichero y lista los huecos sin fallar.

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

## Desplegar en Firebase

El MCP vive en el proyecto de Firebase **`rev-ds`** (ID `rev-ds-cd11b`, en `.firebaserc`):

- **Firebase Hosting** da la URL (`https://rev-ds-cd11b.web.app`) y el dominio propio. Reescribe `/mcp` a la función, manda `/` al Storybook y responde 404 a lo demás (`firebase/public/404.html`).
- **Una Cloud Function de segunda generación**, `mcp`, en `europe-west1`, pública, con 256 MB y sin instancias mínimas: no cuesta nada mientras no se usa, a cambio de un arranque en frío de un par de segundos tras un rato parado. Está en `mcp/firebase.ts`.
- **Lo que se despliega no es el repo**: `npm run build:firebase` empaqueta la función con su metadata en un solo fichero, en `firebase/functions/`, con un `package.json` mínimo. Firebase lo ejecuta solo antes de cada despliegue (`predeploy` en `firebase.json`), así que nunca se despliega nada con un componente sin documentar.

### Requisito: el plan Blaze

Las Cloud Functions solo existen en el plan **Blaze** (pago por uso). Lo activa quien gestione la facturación, en la consola de Firebase → **Usage and billing → Details & settings → Modify plan**, con la cuenta de facturación de Google de 540. Con el uso de este MCP, el gasto debería quedarse dentro de la capa gratuita. Conviene poner a la vez una **alerta de presupuesto** (por ejemplo, 5 € al mes) en la consola de Google Cloud → **Billing → Budgets & alerts**.

Al primer despliegue, Firebase activa solo las APIs que faltan (Cloud Functions, Cloud Build, Artifact Registry, Cloud Run…).

### Desplegar a mano

Hace falta acceso al proyecto con rol Editor o superior.

```bash
npx -y firebase-tools@15.36.0 login     # una vez, con tu cuenta de 540
npm run mcp:deploy                       # empaqueta y despliega la función y Hosting
```

### Despliegue automático desde GitHub (una vez)

El job `deploy` de `.github/workflows/mcp.yml` despliega en cada push a `main`, después de que pasen las comprobaciones. Entra en Google con **Workload Identity Federation**: GitHub demuestra quién es y Google le deja usar una cuenta de servicio, sin guardar ninguna clave en el repo. Mientras no existan las dos variables del paso 2, el job se salta.

**1. En Google Cloud**, con rol Owner en el proyecto. Se puede hacer desde **Cloud Shell**, el terminal que se abre desde la propia consola, sin instalar nada:

```bash
PROJECT_ID=rev-ds-cd11b
PROJECT_NUMBER=474159358681
SA=github-deploy@$PROJECT_ID.iam.gserviceaccount.com

# Las APIs con las que GitHub se identifica ante Google
gcloud services enable iam.googleapis.com iamcredentials.googleapis.com sts.googleapis.com --project $PROJECT_ID

# La cuenta de servicio que usará GitHub, con los permisos para desplegar Functions y Hosting
gcloud iam service-accounts create github-deploy --project $PROJECT_ID \
  --display-name "GitHub Actions: despliegue del MCP de 540-ds"
for role in roles/firebase.admin roles/cloudfunctions.admin roles/run.admin roles/iam.serviceAccountUser \
            roles/artifactregistry.admin roles/cloudbuild.builds.editor roles/serviceusage.serviceUsageConsumer; do
  gcloud projects add-iam-policy-binding $PROJECT_ID --member "serviceAccount:$SA" --role $role --condition None
done

# La confianza con GitHub: solo el repo 540/540-ds, y solo desde main
gcloud iam workload-identity-pools create github --project $PROJECT_ID --location global --display-name "GitHub"
gcloud iam workload-identity-pools providers create-oidc github-540 --project $PROJECT_ID --location global \
  --workload-identity-pool github --display-name "GitHub 540" \
  --issuer-uri "https://token.actions.githubusercontent.com" \
  --attribute-mapping "google.subject=assertion.sub,attribute.repository=assertion.repository,attribute.ref=assertion.ref" \
  --attribute-condition "assertion.repository == '540/540-ds' && assertion.ref == 'refs/heads/main'"
gcloud iam service-accounts add-iam-policy-binding $SA --project $PROJECT_ID \
  --role roles/iam.workloadIdentityUser \
  --member "principalSet://iam.googleapis.com/projects/$PROJECT_NUMBER/locations/global/workloadIdentityPools/github/attribute.repository/540/540-ds"
```

**2. En GitHub**, en el repo → **Settings → Secrets and variables → Actions → Variables**, dos variables (no son secretos: no dan acceso por sí solas):

| Variable | Valor |
|---|---|
| `GCP_WORKLOAD_IDENTITY_PROVIDER` | `projects/474159358681/locations/global/workloadIdentityPools/github/providers/github-540` |
| `GCP_SERVICE_ACCOUNT` | `github-deploy@rev-ds-cd11b.iam.gserviceaccount.com` |

A partir de ahí, cada push a `main` despliega. Se puede lanzar a mano desde **Actions → MCP → Run workflow**, sobre `main`.

### Si el despliegue falla porque la función no puede ser pública

La función se publica con acceso para cualquiera (`invoker: 'public'`), porque Claude la llama sin iniciar sesión en Google. Si la organización de Google Cloud tiene activa la política **«Domain restricted sharing»** (`iam.allowedPolicyMemberDomains`), Google rechaza ese acceso y el despliegue falla al asignarlo. Quien administre la organización tiene que permitir una excepción para este proyecto.

### Dónde mirar

- **Consola de Firebase → Functions**: la función, sus versiones y sus **logs** (cada petición y cada error).
- **Consola de Firebase → Hosting**: el historial de despliegues y los dominios.
- **GitHub → Actions → MCP**: el log de cada despliegue automático.

### Comprobar un despliegue

```bash
curl -s -X POST https://rev-ds-cd11b.web.app/mcp \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json, text/event-stream' \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'
```

Tiene que devolver un JSON con las tools. Después, conéctalo a Claude Code con `claude mcp add --transport http 540-ds https://rev-ds-cd11b.web.app/mcp`.

### El dominio `mcp.540deg.com`

1. Consola de Firebase → **Hosting → Add custom domain**, y escribe `mcp.540deg.com`.
2. Firebase enseña los registros que hay que añadir (un TXT para verificar y los de apuntado). Quien gestione el DNS de `540deg.com` en IONOS los añade.
3. Cuando Firebase lo marque como conectado, el MCP queda en `https://mcp.540deg.com/mcp`. El certificado HTTPS lo pone Firebase solo, y puede tardar unas horas.

Para cambiar de dominio más adelante, añade el nuevo y **deja también el viejo**, para que nadie se quede sin servicio. Mejor eso que una redirección: algunos clientes MCP no siguen redirecciones en un `POST`. Después actualiza la URL del conector en claude.ai.

## Ficheros

```
scripts/build-mcp-metadata.ts   genera mcp/metadata.json desde src/
scripts/build-mcp-firebase.ts   empaqueta la función en firebase/functions/
mcp/
  types.ts                      forma de la metadata
  server.ts                     el servidor MCP y sus instrucciones
  tools/                        una tool por fichero; index.ts las registra
  http.ts                       el manejador HTTP (local y Firebase)
  node-adapter.ts               traduce entre las peticiones de Node y las web
  firebase.ts                   la Cloud Function
  metadata.d.json.ts            el tipo de metadata.json, para TypeScript
  stdio.ts                      entrada por stdio, para local
  serve.ts                      servidor HTTP local
  *.test.ts                     tests (npm run test:mcp)
firebase.json                   Hosting (redirecciones) y Functions
.firebaserc                     el proyecto de Firebase (rev-ds-cd11b)
firebase/public/404.html        lo que responde Hosting fuera de /mcp
tsconfig.mcp.json               TypeScript de scripts/ y mcp/
.github/workflows/mcp.yml       comprobaciones en cada PR y despliegue desde main
```
