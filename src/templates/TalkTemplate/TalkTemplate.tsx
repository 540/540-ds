import { Count } from '../../components/atoms/Count';
import { Text } from '../../components/atoms/Text';
import { Card } from '../../components/molecules/Card';
import { CaseItem } from '../../components/molecules/CaseItem';
import { Field } from '../../components/molecules/Field';
import { Grid, GridItem } from '../../components/molecules/Grid';
import { ArrowList, ProblemList, SimpleList } from '../../components/molecules/Lists';
import { Metric, MetricNote } from '../../components/molecules/Metric';
import { Question } from '../../components/molecules/Question';
import { Screenshot } from '../../components/molecules/Screenshot';
import { SectionHeader } from '../../components/molecules/SectionHeader';
import { Stack } from '../../components/molecules/Stack';
import { TeamMember } from '../../components/molecules/TeamMember';
import { Bars } from '../../components/organisms/Bars';
import { BlockTitle } from '../../components/organisms/BlockTitle';
import { CardList } from '../../components/organisms/CardList';
import { Closing } from '../../components/organisms/Closing';
import { Cover } from '../../components/organisms/Cover';
import { Cycle } from '../../components/organisms/Cycle';
import { Deck } from '../../components/organisms/Deck';
import { Flow } from '../../components/organisms/Flow';
import { Form } from '../../components/organisms/Form';
import { Heartbeat } from '../../components/organisms/Heartbeat';
import { LogoCarousel } from '../../components/organisms/LogoCarousel';
import { Marquee } from '../../components/organisms/Marquee';
import { ProgressBar } from '../../components/organisms/ProgressBar';
import { Punchline } from '../../components/organisms/Punchline';
import { Quote } from '../../components/organisms/Quote';
import { Schema, SchemaFrame, SchemaLayer, SchemaVoice, schema } from '../../components/organisms/Schema';
import { Share } from '../../components/organisms/Share';
import { Sheet } from '../../components/organisms/Sheet';
import { Slide } from '../../components/organisms/Slide';
import { Spotlight } from '../../components/organisms/Spotlight';
import { Statements } from '../../components/organisms/Statements';
import { PanelStack, Step, Steps, useSteps } from '../../components/organisms/Steps';
import { Story } from '../../components/organisms/Story';
import { Timeline } from '../../components/organisms/Timeline';
import { Tools } from '../../components/organisms/Tools';
import type { DeckTheme } from '../../components/organisms/Deck';
import captura from '../../assets/samples/captura.svg';
import david from '../../assets/samples/charla-david.webp';
import escultura from '../../assets/samples/charla-escultura.webp';
import fachada from '../../assets/samples/charla-fachada.webp';
import pintura from '../../assets/samples/charla-pintura.webp';
import placa from '../../assets/samples/charla-placa.webp';
import teclado from '../../assets/samples/charla-teclado.webp';
import logo540Claro from '../../assets/samples/logo-540-claro.svg';
import logo540PortadaClaro from '../../assets/samples/logo-540-portada-claro.svg';
import logo540PortadaOscuro from '../../assets/samples/logo-540-portada-oscuro.svg';
import c1 from '../../assets/samples/logos/cliente-1.svg';
import c2 from '../../assets/samples/logos/cliente-2.svg';
import c3 from '../../assets/samples/logos/cliente-3.svg';
import c4 from '../../assets/samples/logos/cliente-4.svg';
import c5 from '../../assets/samples/logos/cliente-5.svg';
import c6 from '../../assets/samples/logos/cliente-6.svg';
import c7 from '../../assets/samples/logos/cliente-7.svg';
import c8 from '../../assets/samples/logos/cliente-8.svg';
import c9 from '../../assets/samples/logos/cliente-9.svg';
import retrato from '../../assets/samples/retrato.svg';

/* The full talk template: every kind of stop the system can build, in the order a talk uses
   them, with generic copy. A real talk picks from here (12 to 30 stops) and keeps the rules
   in src/docs/normas-charlas.md. Nothing here is styled by hand: only catalog pieces. */

const ITEMS = [
  { href: '#contar', label: 'Contar' },
  { href: '#comparar', label: 'Comparar' },
  { href: '#procesos', label: 'Procesos' },
  { href: '#datos', label: 'Datos' },
  { href: '#pantallas', label: 'Pantallas' },
];

const FOOTER = {
  tagline: 'Una línea que resume de qué iba la charla.',
  networks: [
    { network: 'linkedin' as const, href: 'https://linkedin.com/company/540-degrees', label: 'LinkedIn de 540' },
    { network: 'x' as const, href: 'https://x.com/540deg', label: 'X de 540' },
    { network: 'instagram' as const, href: 'https://instagram.com/540deg', label: 'Instagram de 540' },
  ],
  copyright: '© 2026 540',
};

const PHASES = ['Descubrir', 'Definir', 'Diseñar', 'Especificar', 'Construir', 'Verificar', 'Operar'];

const PANELS = [
  { kicker: 'Fase 01', title: 'Descubrir', body: 'Qué hace esta fase y para quién, en una o dos frases.' },
  { kicker: 'Fase 02', title: 'Definir', body: 'Lo que sale de esta fase y quién lo recibe.' },
  { kicker: 'Fase 03', title: 'Diseñar', body: 'Una frase sobre lo que cambia aquí.' },
  { kicker: 'Fase 04', title: 'Especificar', body: 'Donde suele atascarse el ciclo, y por qué.' },
  { kicker: 'El cuello', title: 'Aquí se para todo', body: 'La fase marcada en rojo es la que frena a las demás.' },
];

const CONTEXT_CARDS = [
  { kicker: 'Primera pieza', title: 'Un nombre corto', body: 'Una frase sobre esta pieza.' },
  { kicker: 'Segunda pieza', title: 'Otro nombre', body: 'Una frase sobre esta otra.' },
  { kicker: 'Tercera pieza', title: 'Un tercero', body: 'Una frase que la presenta.' },
  { kicker: 'Cuarta pieza', title: 'El cuarto', body: 'Una frase, igual de corta.' },
  { kicker: 'Quinta pieza', title: 'El quinto', body: 'Y la última frase.' },
];

/** Five compact cards that enter one by one; at the last step the first one is highlighted. */
function ContextCards() {
  const { current } = useSteps();
  const focus = current >= 6;
  return (
    <Grid layout="five" compact>
      {CONTEXT_CARDS.map((c, i) => (
        <GridItem key={c.title}>
          <Step from={i + 1}>
            <Card kicker={c.kicker} title={c.title} align="center" emphasis={focus ? (i === 0 ? 'highlighted' : 'dimmed') : 'none'}>
              {c.body}
            </Card>
          </Step>
        </GridItem>
      ))}
    </Grid>
  );
}

/** The ring follows the step; at step 4 every phase is done and the fourth is marked red. */
function CycleWithPanel() {
  const { current } = useSteps();
  const step = Number.isFinite(current) ? Math.max(current, 0) : PANELS.length - 1;
  const all = step >= 4;
  return (
    <Grid align="center">
      <GridItem span={7}>
        <Cycle phases={PHASES} active={all ? undefined : step} all={all} marks={all ? { 3: 'red' } : undefined} label="El ciclo de siete fases, con la cuarta marcada como cuello de botella" />
      </GridItem>
      <GridItem span={5}>
        <PanelStack>
          {PANELS.map((p, i) => (
            <Step key={p.title} from={i} to={i + 1 < PANELS.length ? i + 1 : undefined}>
              <Stack gap="s">
                <Text variant="body-s" tone="secondary" align="center">
                  {p.kicker}
                </Text>
                <Text as="h3" variant="title-m" align="center" wrap="balance">
                  {p.title}
                </Text>
                <Text variant="body-l" tone="secondary" align="center" wrap="pretty">
                  {p.body}
                </Text>
              </Stack>
            </Step>
          ))}
        </PanelStack>
      </GridItem>
    </Grid>
  );
}

const CHAIN = ['Pedir', 'Diseñar', 'Construir', 'Revisar', 'Publicar'];

/** A diagram that lights up in three layers: the chain, a note, and the chain with two highlights. */
function LayeredDiagram() {
  return (
    <Schema viewBox="0 0 2560 820" title="Una cadena de cinco pasos, antes y ahora" description="Arriba, la cadena de antes: pedir, diseñar, construir, revisar y publicar. Una nota explica el cambio. Abajo, la misma cadena con el primer y el último paso destacados y una píldora sobre el final." data>
      <defs>
        <marker id="plantilla-flecha" viewBox="0 0 12 12" refX="10" refY="6" markerWidth="12" markerHeight="12" orient="auto">
          <path className={schema.arrowhead} d="M2 2 L10 6 L2 10.5" />
        </marker>
      </defs>
      {(['node', 'highlighted'] as const).map((kind, row) => (
        <SchemaLayer key={kind} step={row === 0 ? 0 : 2} label={row === 0 ? 'Antes: una cadena de cinco pasos' : 'Ahora: la misma cadena, con dos pasos destacados'}>
          <text className={schema.title} x={300} y={row === 0 ? 200 : 600}>
            {row === 0 ? 'Antes' : 'Ahora'}
          </text>
          {CHAIN.map((name, i) => {
            const x = 300 + i * 420;
            const y = row === 0 ? 240 : 640;
            const strong = row === 1 && (i === 0 || i === CHAIN.length - 1);
            return (
              <g key={name}>
                <rect className={schema[strong ? 'highlighted' : 'node']} x={x} y={y} width={300} height={90} rx={12} />
                <text className={schema.nodeText} x={x + 150} y={y + 56} textAnchor="middle">
                  {name}
                </text>
                {i < CHAIN.length - 1 ? <path className={schema.line} d={`M${x + 310},${y + 45} L${x + 410},${y + 45}`} markerEnd="url(#plantilla-flecha)" /> : null}
              </g>
            );
          })}
        </SchemaLayer>
      ))}
      <SchemaLayer step={1} label="Una nota que explica el cambio">
        <path className={schema.lineDashed} d="M870,350 L870,560" markerEnd="url(#plantilla-flecha)" />
        <text className={schema.noteText} x={910} y={470}>
          Una nota que explica el cambio.
        </text>
      </SchemaLayer>
      <SchemaLayer step={2}>
        <rect className={schema.pill} x={1980} y={560} width={220} height={50} rx={25} />
        <text className={schema.pillText} x={2090} y={594} textAnchor="middle">
          píldora
        </text>
      </SchemaLayer>
    </Schema>
  );
}

const SERIES = [62, 58, 66, 61, 70, 64, 72, 69];
const ACCENT = [48, 52, 50, 57, 63, 68, 74, 79];
const x = (i: number) => 260 + i * 300;
const y = (v: number) => 720 - ((v - 40) / 40) * 560;
const path = (vals: number[]) => vals.map((v, i) => `${i ? 'L' : 'M'}${x(i)},${y(v)}`).join(' ');

/** A two-series line chart drawn with the Schema vocabulary: gray context, one yellow series. */
function LineChart() {
  return (
    <Schema viewBox="0 0 2560 820" title="Evolución de dos series en ocho entregas" description="La serie de contexto, en gris, se mueve entre el 58 y el 72 %. La serie destacada, en amarillo, sube del 48 al 79 % y supera a la otra desde la quinta entrega." data>
      {[40, 50, 60, 70, 80].map((t) => (
        <g key={t}>
          <path className={schema.lineDashed} d={`M${x(0)},${y(t)} L${x(7)},${y(t)}`} />
          <text className={schema.label} x={x(0) - 40} y={y(t) + 10} textAnchor="end">
            {t} %
          </text>
        </g>
      ))}
      {SERIES.map((_, i) => (
        <text key={i} className={schema.label} x={x(i)} y={790} textAnchor="middle">
          #{i + 1}
        </text>
      ))}
      <path className={schema.series} d={path(SERIES)} />
      <path className={schema.accent} d={path(ACCENT)} />
      <circle className={schema.accentDot} cx={x(0)} cy={y(ACCENT[0])} r={12} />
      <circle className={schema.accentDot} cx={x(7)} cy={y(ACCENT[7])} r={12} />
      <text className={schema.noteText} x={x(7) + 40} y={y(ACCENT[7]) + 10}>
        79 %
      </text>
      <text className={schema.noteText} x={x(7) + 40} y={y(SERIES[7]) + 10}>
        69 %
      </text>
    </Schema>
  );
}

const SCREEN_ALT = 'Panel de una aplicación de ejemplo: barra superior, menú lateral, tres tarjetas con cifras y una gráfica de línea que sube.';

export type TalkTemplateProps = {
  /** Theme at first visit. Talks are projected in dark. */
  defaultTheme?: DeckTheme;
};

/** TalkTemplate is a whole talk built only with the catalog: every stop the system can make. */
export function TalkTemplate({ defaultTheme = 'dark' }: TalkTemplateProps) {
  return (
    <Deck items={ITEMS} footer={FOOTER} storageKey="" defaultTheme={defaultTheme}>
      {/* ---------- Cover ---------- */}
      <Cover
        title={['El título de la charla', 'en dos o tres líneas']}
        question="¿La pregunta que abre la charla, en una frase?"
        event="Nombre del evento · marzo 2026"
        client={{ light: logo540PortadaClaro, dark: logo540PortadaOscuro, alt: '540' }}
        photo={{ src: fachada, alt: 'Fachada de un edificio con la luz de la tarde' }}
      />

      {/* ---------- 01 · Contar: texts, theses, stories, quotes ---------- */}
      <BlockTitle id="contar" ordinal="01" title="Contar: frases, historias y citas" photo={{ src: pintura, alt: 'Detalle de una pared con pintura desconchada en varias capas' }} />

      <Slide id="contexto">
        <Stack>
          <SectionHeader title="Un título con dos frases de entrada" description="La entradilla presenta la parada en una o dos frases. Lo demás va en el cuerpo." align="center" />
          <Text variant="body-l" align="center" wrap="pretty" measure="half">
            Un párrafo de cuerpo, de tres frases como máximo, con <strong>la parte que importa</strong> en negrita. Va a media retícula. Así se lee en una sala.
          </Text>
          <Text variant="body-l" tone="secondary" align="center" wrap="pretty" measure="half">
            Una segunda frase en gris, que matiza la anterior.
          </Text>
        </Stack>
      </Slide>

      <Statements id="tesis" sentences={['La primera tesis, en una frase que se dice.', 'La segunda tesis, igual de corta.', 'La tercera tesis, que cierra la idea.']} />

      <Story
        id="historia"
        title="El título de una historia"
        paragraphs={['El primer párrafo cuenta lo que pasó, en dos frases. En gris y a media retícula.', 'El segundo párrafo cuenta qué se aprendió. También en dos frases.']}
        bridge="Y una frase puente que lleva a la siguiente parada."
      />

      <Slide id="pila">
        <Stack gap="l">
          {['Una frase que se enciende al llegar al centro.', 'Otra frase, que espera su turno.', 'Y la tercera, que cierra la pila.'].map((f) => (
            <Spotlight key={f}>
              <Text variant="statement" align="center" wrap="balance" measure="wide">
                {f}
              </Text>
            </Spotlight>
          ))}
        </Stack>
      </Slide>

      <Story id="objecion" kind="objection" title="«Una objeción que suele salir en la sala, entre comillas.»" paragraphs={['La respuesta a la objeción, en dos frases. Sin ponerse a la defensiva.']} />

      <Slide id="listas">
        <Stack>
          <SectionHeader title="Tres listas para tres a cinco líneas" description="Una lista simple, una con flechas y una de problemas con su etiqueta." align="center" />
          <Grid>
            <GridItem span={4}>
              <SimpleList items={['Un primer ítem corto.', <>Un segundo con <strong>lo que importa</strong>.</>, 'Y un tercero.']} />
            </GridItem>
            <GridItem span={4}>
              <ArrowList items={['Lo que se hace primero.', 'Lo que viene después.', 'Lo que queda al final.']} />
            </GridItem>
            <GridItem span={4}>
              <ProblemList
                items={[
                  { label: 'Primer límite', text: 'Lo que pasa al llegar a él.' },
                  { label: 'Segundo límite', text: <>Con <strong>la cifra</strong> que lo mide.</> },
                  { label: 'Tercer límite', text: 'Y una frase más.' },
                ]}
              />
            </GridItem>
          </Grid>
        </Stack>
      </Slide>

      <Quote id="cita" sentence="«Una cita corta de alguien que lo dijo mejor que nosotros.»" author="Nombre Apellido, su rol" />

      {/* ---------- 02 · Comparar: cards, teams, cases ---------- */}
      <BlockTitle id="comparar" ordinal="02" title="Comparar: tarjetas, equipos y casos" photo={{ src: teclado, alt: 'Teclado de un portátil con luz azul, desenfocado' }} />

      <Slide id="antes-ahora">
        <Stack>
          <SectionHeader title="Antes y ahora, en dos columnas" description="Dos tarjetas comparables con una lista de flechas dentro." align="center" />
          <Grid>
            <GridItem span={6}>
              <Card title="Antes" align="center">
                <ArrowList items={['Lo primero que se hacía.', 'Lo segundo.', 'Y lo tercero.']} />
              </Card>
            </GridItem>
            <GridItem span={6}>
              <Card title="Ahora" align="center" after="Lo que cambió, en una frase.">
                <ArrowList items={['Lo que se hace ahora.', 'Lo que ya no hace falta.', 'Lo que se ganó.']} />
              </Card>
            </GridItem>
          </Grid>
        </Stack>
      </Slide>

      <Slide id="tres-tarjetas">
        <Steps total={3}>
          <Stack>
            <SectionHeader title="Tres tarjetas que entran una a una" description="Cada flecha enciende la siguiente. El pie lleva la fuente o el comando." align="center" />
            <Grid>
              {[1, 2, 3].map((n) => (
                <GridItem key={n} span={4}>
                  <Step from={n}>
                    <Card kicker={`Antetítulo ${n}`} title={`Tarjeta ${n}`} align="center" footer={<Text as="span" variant="body-s" mono>/comando-{n}</Text>}>
                      Dos frases sobre esta tarjeta. Qué hace y para quién.
                    </Card>
                  </Step>
                </GridItem>
              ))}
            </Grid>
          </Stack>
        </Steps>
      </Slide>

      <Slide id="cuatro-tarjetas">
        <Stack>
          <SectionHeader title="Cuatro cosas comparables" description="El máximo por fila: cuatro tarjetas con su número." align="center" />
          <Grid>
            {['Primera', 'Segunda', 'Tercera', 'Cuarta'].map((t, i) => (
              <GridItem key={t} span={3}>
                <Card ordinal={`0${i + 1}`} title={t} align="center">
                  Dos frases sobre lo que hace esta pieza.
                </Card>
              </GridItem>
            ))}
          </Grid>
        </Stack>
      </Slide>

      <Slide id="cinco-piezas">
        <Steps total={6}>
          <Stack>
            <PanelStack>
              <Step from={0} to={6}>
                <SectionHeader title="Cinco piezas en una fila" description="Entran una a una. En el último paso se destaca la primera." align="center" />
              </Step>
              <Step from={6}>
                <SectionHeader title="Y la que importa es esta" description="Las demás se apagan para señalarla." align="center" />
              </Step>
            </PanelStack>
            <ContextCards />
          </Stack>
        </Steps>
      </Slide>

      <Slide id="cinco-centradas">
        <Stack>
          <SectionHeader title="Cinco cosas, tres arriba y dos abajo" align="center" />
          <Grid layout="fiveCentered">
            {['Primera', 'Segunda', 'Tercera', 'Cuarta', 'Quinta'].map((t, i) => (
              <GridItem key={t} span={4}>
                <Card ordinal={`0${i + 1}`} title={t} align="center">
                  Una frase sobre esta pieza.
                </Card>
              </GridItem>
            ))}
          </Grid>
        </Stack>
      </Slide>

      <Slide id="seis-pasos">
        <Stack>
          <SectionHeader title="Seis piezas numeradas, en dos filas" align="center" />
          <Grid>
            {['Uno', 'Dos', 'Tres', 'Cuatro', 'Cinco', 'Seis'].map((t, i) => (
              <GridItem key={t} span={4}>
                <Card kicker={`0${i + 1}`} title={`Paso ${t.toLowerCase()}`} align="center">
                  Lo que pasa en este paso, con un <Text as="span" variant="body-m" mono>comando</Text> si hace falta.
                </Card>
              </GridItem>
            ))}
          </Grid>
        </Stack>
      </Slide>

      <Slide id="equipo">
        <Stack>
          <SectionHeader title="Quiénes somos" description="El mismo encuadre para todas las personas, con su nombre y su rol." align="center" />
          <Grid>
            {[
              { name: 'Nombre Apellido', role: 'Su rol en el equipo' },
              { name: 'Otro Nombre', role: 'Otro rol' },
            ].map((p) => (
              <GridItem key={p.name} span={6}>
                <Card portrait={{ src: retrato, alt: `Retrato de ${p.name}` }} kicker={p.role} title={p.name} align="center">
                  Dos frases sobre lo que hace esta persona en el proyecto.
                </Card>
              </GridItem>
            ))}
          </Grid>
        </Stack>
      </Slide>

      <Slide id="fichas">
        <Stack>
          <SectionHeader title="El equipo, en fichas" description="La alternativa con retrato grande: tres por fila." align="center" />
          <Grid>
            {['Primera persona', 'Segunda persona', 'Tercera persona'].map((n) => (
              <GridItem key={n} span={4}>
                <TeamMember src={retrato} name={n} role="Su rol" bio="Dos líneas sobre lo que hace esta persona." align="center" />
              </GridItem>
            ))}
          </Grid>
        </Stack>
      </Slide>

      <Slide id="bandas">
        <Stack>
          <SectionHeader title="Apartados en bandas" description="Una lista de bandas a todo el ancho, con la raya entre ellas." align="center" />
          <CardList>
            {['Primer apartado', 'Segundo apartado', 'Tercer apartado'].map((t, i) => (
              <Card key={t} variant="row" align="center" ordinal={`0${i + 1}`} title={t}>
                Dos o tres frases sobre lo que hace este apartado.
              </Card>
            ))}
          </CardList>
        </Stack>
      </Slide>

      <Slide id="casos">
        <Stack>
          <SectionHeader title="Casos, solo en una charla de proyectos" align="center" />
          <Grid>
            <GridItem span={6}>
              <CaseItem src={david} title="Nombre del primer caso" description="Una frase sobre lo que fue el caso." />
            </GridItem>
            <GridItem span={6}>
              <CaseItem src={escultura} title="Nombre del segundo caso" description="Otra frase sobre este caso." />
            </GridItem>
          </Grid>
        </Stack>
      </Slide>

      <Punchline placement="standalone" id="remate-comparar" sentence="Un remate: la frase que se lleva la sala." transition="Y una transición que lleva al bloque siguiente." />

      {/* ---------- 03 · Procesos: flows, timelines, cycles, diagrams ---------- */}
      <BlockTitle id="procesos" ordinal="03" title="Procesos: pasos, cronologías y ciclos" photo={{ src: placa, alt: 'Placa base vista de cerca, con dos ventiladores de cobre' }} />

      <Slide id="flujo">
        <Stack>
          <SectionHeader title="Pasos en fila" description="Una cadena de pasos con el que importa en negativo." align="center" />
          <Flow label="Pasos del proceso" steps={[{ label: 'Pedir' }, { label: 'Diseñar' }, { label: 'Construir', highlighted: true }, { label: 'Revisar' }, { label: 'Publicar' }]} />
          <Punchline sentence="Un remate dentro de la parada." transition="Debajo de una raya, al final." />
        </Stack>
      </Slide>

      <Timeline
        id="recorrido"
        title="Una cronología de cuatro pasos"
        description="Cada paso es una parada. El aviso pone el punto en rojo; el zoom abre una hoja."
        steps={[
          { kicker: 'Mes uno', title: 'Primer hito', body: 'Lo que pasó en el primer mes, en una frase.' },
          { kicker: 'El problema', title: 'Algo que no funcionaba como debía.', alert: true },
          { kicker: 'Mes tres', title: 'Tercer hito', body: 'Lo que cambió después.', extra: <Flow label="El cambio" steps={[{ label: 'La pieza nueva', highlighted: true }]} /> },
          {
            kicker: 'Zoom · mes cuatro',
            title: 'Un hito con detalle',
            body: 'Pulsa → para abrir la hoja y otra vez para cerrarla.',
            extra: (
              <Steps total={2}>
                <Step from={1} to={2}>
                  <Sheet kicker="Zoom · mes cuatro" title="El detalle ampliado" description="Una frase que dice qué se amplía.">
                    <Grid>
                      <GridItem span={6}>
                        <Card title="Una tarjeta dentro de la hoja">Dos frases que explican el detalle.</Card>
                      </GridItem>
                      <GridItem span={6}>
                        <Stack gap="s">
                          <Question question={<><strong>Q1 · ¿Una pregunta del zoom?</strong> Con su matiz.</>} answer="La respuesta, en una frase." />
                          <Question question={<><strong>Q2 · ¿Otra pregunta?</strong></>} answer="Otra respuesta corta." />
                        </Stack>
                      </GridItem>
                    </Grid>
                  </Sheet>
                </Step>
              </Steps>
            ),
          },
        ]}
      />

      <Slide id="tramo">
        <Steps total={3}>
          <Stack>
            <SectionHeader title="Un tramo de tiempo que se llena" description="La barra con sus hitos, que se encienden paso a paso." align="center" />
            <TimeBar />
          </Stack>
        </Steps>
      </Slide>

      <Slide id="ciclo">
        <Steps total={4}>
          <Stack>
            <SectionHeader title="Un ciclo que avanza" description="El anillo recorre las fases; el panel cuenta cada una." align="center" />
            <CycleWithPanel />
          </Stack>
        </Steps>
      </Slide>

      <Slide id="esquema">
        <Steps total={2}>
          <SectionHeader title="Un diagrama por capas" description="Cada flecha enciende una capa; lo demás queda tenue." align="center" />
          <SchemaFrame caption="Un pie que explica el dibujo, a media retícula.">
            <LayeredDiagram />
          </SchemaFrame>
          <SchemaVoice labels={['Antes: una cadena de cinco pasos', 'Una nota que explica el cambio', 'Ahora: la misma cadena, con dos pasos destacados']} />
        </Steps>
      </Slide>

      <Slide id="latido">
        <Stack gap="m">
          <SectionHeader title="Algo que late sin parar" align="center" />
          <Heartbeat />
          <Text variant="body-l" tone="secondary" align="center" wrap="pretty" measure="half">
            Una frase que explica qué proceso late aquí, cada cuánto y para qué.
          </Text>
        </Stack>
      </Slide>

      {/* ---------- 04 · Datos: metrics, bars, shares, lines ---------- */}
      <BlockTitle id="datos" ordinal="04" title="Datos: cifras, barras y líneas" photo={{ src: escultura, alt: 'Escultura blanca sentada ante una pared de piedra con una ventana hexagonal' }} />

      <Slide id="cifras">
        <Stack>
          <SectionHeader title="Cuatro cifras que suben" description="Cada una con lo que mide y su variación. Debajo, de dónde salen." align="center" />
          <Stack gap="s">
            <Grid>
              <GridItem span={3}>
                <Metric value={<Count value={1240} />} label="Lo que mide la primera cifra" delta="+18 % desde el inicio" />
              </GridItem>
              <GridItem span={3}>
                <Metric value={<Count value={45.9} decimals={1} suffix=" %" />} label="Lo que mide la segunda" delta="+6 puntos" />
              </GridItem>
              <GridItem span={3}>
                <Metric value={<Count value={79592} />} label="Lo que mide la tercera" />
              </GridItem>
              <GridItem span={3}>
                <Metric value={<Count value={0.76} decimals={2} suffix=" %" />} label="Lo que mide la cuarta" delta="−89 % desde el 7,06 %" />
              </GridItem>
            </Grid>
            <MetricNote>Qué se midió, cuándo y cómo: la fuente de las cuatro cifras.</MetricNote>
          </Stack>
        </Stack>
      </Slide>

      <Slide id="barras">
        <Steps total={1}>
          <Stack>
            <SectionHeader title="Dos rankings lado a lado" description="Con el mismo máximo, para que se comparen. En el paso siguiente, el reparto." align="center" />
            <Grid>
              <GridItem span={6}>
                <Bars
                  label="Primera medida por categoría"
                  max={500}
                  rows={[
                    { label: 'Categoría uno', value: 412 },
                    { label: 'Categoría dos', value: 268 },
                    { label: 'Categoría tres', value: 154 },
                    { label: 'El resto', value: 61, tone: 'context' },
                  ]}
                />
              </GridItem>
              <GridItem span={6}>
                <Bars
                  label="Segunda medida por categoría"
                  max={500}
                  rows={[
                    { label: 'Categoría uno', value: 330 },
                    { label: 'Categoría dos', value: 295 },
                    { label: 'Categoría tres', value: 120 },
                    { label: 'El resto', value: 84, tone: 'context' },
                  ]}
                />
              </GridItem>
            </Grid>
            <Step from={1}>
              <Stack gap="m">
                <Share label="Reparto entre la categoría uno y el resto" segments={[{ label: 'Categoría uno', value: 64 }, { label: 'El resto', value: 36 }]} />
                <Text variant="body-l" align="center" wrap="pretty" measure="half">
                  La frase que lo resume: <strong>dos de cada tres</strong> vienen de la misma categoría.
                </Text>
              </Stack>
            </Step>
          </Stack>
        </Steps>
      </Slide>

      <Slide id="tabla">
        <Stack>
          <SectionHeader title="Una tabla de barras con detalle" description="La fila que importa va en amarillo; es la única de la gráfica." align="center" />
          <Bars
            label="Piezas por vistas"
            header={{ label: 'Pieza', value: 'Vistas', detail: 'Interacción · Altas' }}
            rows={[
              { label: '#1 Título de la primera pieza', value: 2140, detail: '45,9 % · 12 altas', tone: 'accent' },
              { label: '#2 Título de la segunda', value: 1630, detail: '38,2 % · 8 altas' },
              { label: '#3 Título de la tercera', value: 1210, detail: '41,0 % · 5 altas' },
              { label: '#4 Título de la cuarta', value: 860, detail: '29,4 % · 2 altas', tone: 'context' },
            ]}
          />
        </Stack>
      </Slide>

      <Slide id="linea">
        <SectionHeader title="Una evolución en el tiempo" description="La línea de contexto en gris y la que cuenta la historia en amarillo." align="center" />
        <SchemaFrame caption="Porcentaje por entrega, de la primera a la octava.">
          <LineChart />
        </SchemaFrame>
      </Slide>

      {/* ---------- 05 · Pantallas: screenshots, tools, logos, questions ---------- */}
      <BlockTitle id="pantallas" ordinal="05" title="Pantallas, herramientas y preguntas" photo={{ src: david, alt: 'Detalle de una escultura clásica de mármol blanco' }} />

      <Slide id="captura">
        <Stack>
          <SectionHeader title="Una pantalla" description="Una frase que dice qué se ve en la captura." align="center" />
          <Screenshot src={captura} alt={SCREEN_ALT} width={1600} height={1000} />
        </Stack>
      </Slide>

      <Slide id="herramientas">
        <Stack>
          <SectionHeader title="Las herramientas que se quedan" description="Cuatro por fila, con el logotipo a la misma altura óptica." align="center" />
          <Tools tools={['Herramienta uno', 'Herramienta dos', 'Herramienta tres', 'Herramienta cuatro'].map((name) => ({ src: logo540Claro, name, invertInDark: true }))} />
        </Stack>
      </Slide>

      <Slide id="descartadas">
        <Stack>
          <SectionHeader title="Y las que se descartaron" align="center" />
          <Tools
            columns={3}
            tools={[
              { src: logo540Claro, invertInDark: true, name: 'Herramienta cinco', verdict: 'Por qué se descartó, en una línea.' },
              { src: logo540Claro, invertInDark: true, name: 'Herramienta seis', verdict: 'Otra razón corta.' },
              { src: logo540Claro, invertInDark: true, name: 'Herramienta siete', verdict: 'Y una tercera.' },
            ]}
          />
        </Stack>
      </Slide>

      <Slide id="clientes">
        <Stack>
          <SectionHeader title="Con quién hemos trabajado" description="Los logotipos pasan solos; solo con permiso de cada cliente." align="center" />
          <LogoCarousel label="Clientes de ejemplo" logos={[c1, c2, c3, c4, c5, c6, c7, c8, c9].map((src, i) => ({ src, name: `Cliente de ejemplo ${i + 1}` }))} />
        </Stack>
      </Slide>

      <Slide id="tira">
        <Stack>
          <SectionHeader title="Una tira de palabras que desfila" align="center" />
          <Marquee items={['Palabra uno ·', 'Palabra dos ·', 'Palabra tres ·', 'Palabra cuatro ·', 'Palabra cinco ·', 'Palabra seis ·']} />
        </Stack>
      </Slide>

      <Slide id="preguntas">
        <Stack>
          <SectionHeader title="Preguntas con su respuesta" align="center" />
          <Stack gap="s" measure="half">
            {['¿La primera pregunta?', '¿La segunda pregunta?', '¿La tercera pregunta?'].map((q, i) => (
              <Question key={q} question={<><strong>Q{i + 1} · {q}</strong> Un matiz que la concreta.</>} answer="La respuesta, en una frase." />
            ))}
          </Stack>
        </Stack>
      </Slide>

      <Slide id="contacto">
        <Stack>
          <SectionHeader title="¿Hablamos?" description="Una parada final de contacto: el único sitio de la charla con formulario." align="center" />
          <Stack measure="half">
            <Form submitLabel="Enviar mensaje" align="center">
              <Field id="plantilla-nombre" label="Nombre" autoComplete="name" />
              <Field id="plantilla-correo" label="Correo electrónico" type="email" autoComplete="email" />
              <Field id="plantilla-mensaje" label="Mensaje" multiline />
            </Form>
          </Stack>
        </Stack>
      </Slide>

      {/* ---------- Closing ---------- */}
      <Closing
        sentence={
          <>
            La frase de cierre, <strong>con el giro en negrita</strong>.
          </>
        }
        body={['Un primer párrafo de dos frases que recoge la charla. Sin resumirla entera.', 'Un segundo párrafo que deja la puerta abierta.']}
        punchline="La última línea, en menos de diez palabras."
      />
    </Deck>
  );
}

/** The time bar fills with the step and lights its milestones one by one. */
function TimeBar() {
  const { current } = useSteps();
  const step = Number.isFinite(current) ? Math.max(current, 0) : 3;
  return <ProgressBar label="Tramo de tiempo de febrero a hoy" value={(step + 1) / 4} milestones={3} reached={step} start="Feb 2025" end="Hoy" />;
}
