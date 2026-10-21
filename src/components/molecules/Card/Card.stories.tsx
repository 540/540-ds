import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from './Card';
import retrato from '../../../assets/samples/retrato.svg';
import { Text } from '../../atoms/Text';
import { CARD_ALIGNS, CARD_DEFAULTS, CARD_EMPHASES, CARD_STATES, CARD_VARIANTS } from './types';
import doc from './_docs/Card.md?raw';

const SERVICIOS = [
  { ordinal: '01', title: 'Producto', body: 'Diseñamos y construimos el producto entero: investigación, interfaz y código, con el mismo equipo de principio a fin.' },
  { ordinal: '02', title: 'Sistemas de diseño', body: 'Tokens, componentes y documentación que el equipo de desarrollo usa de verdad, no un archivo de Figma bien ordenado.' },
  { ordinal: '03', title: 'Formación', body: 'Talleres para equipos que quieren dejar de entregar pantallas y entregar el sistema que las produce.' },
  { ordinal: '04', title: 'Acompañamiento', body: 'Un diseñador dentro del equipo, con decisiones que se toman en el código y no en una presentación.' },
];

const meta = {
  title: 'Moléculas/Card',
  component: Card,
  tags: ['autodocs', '!dev'],
  parameters: { docs: { description: { component: doc } }, layout: 'padded' },
  args: { ...CARD_DEFAULTS, ordinal: '01', title: SERVICIOS[0].title, children: SERVICIOS[0].body },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: [...CARD_VARIANTS],
      description: '`boxed`, la caja con borde; `row`, la banda de lado a lado dentro de un CardList.',
      table: { type: { summary: CARD_VARIANTS.join(' | ') }, defaultValue: { summary: CARD_DEFAULTS.variant } },
    },
    align: {
      control: 'inline-radio',
      options: [...CARD_ALIGNS],
      description: 'Alineación del texto. Centrada, la explicación se acota a 62 caracteres.',
      table: { type: { summary: CARD_ALIGNS.join(' | ') }, defaultValue: { summary: CARD_DEFAULTS.align } },
    },
    state: {
      control: 'inline-radio',
      options: [...CARD_STATES],
      description: 'Solo en `row`: `open` enseña la explicación, `folded` la pliega, `active` la abre sobre el fondo de fila activa.',
      table: { type: { summary: CARD_STATES.join(' | ') }, defaultValue: { summary: CARD_DEFAULTS.state } },
    },
    ordinal: { control: 'text', description: 'Número opcional («01»). Decorativo.', table: { type: { summary: 'string' } } },
    kicker: { control: 'text', description: 'Antetítulo en `body-s` secundario («Cliente», «Lo que medimos»).', table: { type: { summary: 'ReactNode' } } },
    portrait: { control: false, description: 'Retrato redondo de 160 px encima del encabezado.', table: { type: { summary: '{ src, alt }' } } },
    footer: { control: 'text', description: 'Pie bajo una línea fina: una fuente, una fecha.', table: { type: { summary: 'ReactNode' } } },
    after: { control: 'text', description: 'Bloque «después» bajo una línea fuerte.', table: { type: { summary: 'ReactNode' } } },
    emphasis: {
      control: 'inline-radio',
      options: [...CARD_EMPHASES],
      description: 'Entre varias: `highlighted` crece un 4 % con borde fuerte; `dimmed` se atenúa al 25 %.',
      table: { type: { summary: CARD_EMPHASES.join(' | ') }, defaultValue: { summary: CARD_DEFAULTS.emphasis } },
    },
    title: { control: 'text', description: 'El título.', table: { type: { summary: 'ReactNode' } } },
    level: { control: 'inline-radio', options: ['h2', 'h3', 'h4'], description: 'Nivel del título.', table: { defaultValue: { summary: CARD_DEFAULTS.level } } },
    children: { control: 'text', description: 'La explicación: dos o tres frases.', table: { type: { summary: 'ReactNode' } } },
    className: { control: false, table: { disable: true } },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  tags: ['dev'],
  parameters: { layout: 'centered' },
  render: (args) => (
    <div style={{ width: args.variant === 'row' ? 'min(1200px, 90vw)' : 380 }}>
      <Card {...args} />
    </div>
  ),
};

export const EnRejilla: Story = {
  name: 'En rejilla',
  parameters: {
    docs: {
      description: {
        story: 'Las cuatro tarjetas de Servicios en una rejilla de cuatro columnas. Textos de distinto largo y las cuatro a la misma altura: la caja llena su celda.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--grid-gutter)' }}>
      {SERVICIOS.map((s) => (
        <Card key={s.ordinal} ordinal={s.ordinal} title={s.title}>
          {s.body}
        </Card>
      ))}
    </div>
  ),
};

export const Centrada: Story = {
  parameters: { docs: { description: { story: 'Dos tarjetas centradas, como las de «Sí se tira / No se tira» de la charla. Sin ordinal.' } } },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--grid-gutter)', maxWidth: 800 }}>
      <Card align="center" title="Sí se tira">
        El archivo de Figma que ya no coincide con lo que hay en producción. Lo que no se mantiene, estorba.
      </Card>
      <Card align="center" title="No se tira">
        El criterio con el que se tomaron las decisiones. Eso es lo que hay que escribir en el sistema.
      </Card>
    </div>
  ),
};

export const ConAntetituloYPie: Story = {
  name: 'Con antetítulo y pie',
  parameters: { docs: { description: { story: 'El antetítulo en gris encima del título, y un pie bajo una línea fina con la fuente. A la derecha, el bloque «después» bajo una línea fuerte.' } } },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--grid-gutter)', maxWidth: 800 }}>
      <Card
        align="center"
        kicker="Lo que leímos"
        title="Un título con su fuente"
        footer={
          <Text variant="body-s" tone="secondary">
            <code>«Título del artículo» · mes 2026</code>
          </Text>
        }
      >
        Dos o tres frases sobre lo que dice el artículo, con <strong>la parte que importa</strong> en negrita.
      </Card>
      <Card
        align="center"
        kicker="Antes"
        title="Cómo se hacía"
        after={
          <>
            <Text variant="body-s" tone="secondary">
              Después
            </Text>
            <Text variant="body-s-light">Cómo se hace ahora, en una frase.</Text>
          </>
        }
      >
        Cómo se hacía antes, en dos frases.
      </Card>
    </div>
  ),
};

export const Destacada: Story = {
  name: 'Destacada entre atenuadas',
  parameters: { docs: { description: { story: 'Cinco tarjetas compactas: la primera destacada (crece un 4 % con borde fuerte) y las demás al 25 %. Es el final del contexto de la charla, cuando se señala una pieza.' } } },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 'var(--grid-gutter)', padding: 'var(--space-s)' }}>
      {['App', 'Panel', 'Servicio', 'Base', 'Cola'].map((t, i) => (
        <Card key={t} align="center" kicker="Pieza" title={t} emphasis={i === 0 ? 'highlighted' : 'dimmed'}>
          Una frase sobre esta pieza.
        </Card>
      ))}
    </div>
  ),
};

export const ConRetrato: Story = {
  name: 'Con retrato',
  parameters: { docs: { description: { story: 'Dos personas en tarjeta, con el retrato redondo de 160 px encima. Es «Quiénes somos» de la charla.' } } },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--grid-gutter)', maxWidth: 800 }}>
      {['Nombre Apellido', 'Nombre Apellido'].map((n, i) => (
        <Card key={i} align="center" portrait={{ src: retrato, alt: `Retrato de ${n}` }} title={n}>
          Rol y una frase sobre qué hace esta persona.
        </Card>
      ))}
    </div>
  ),
};

export const Banda: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'La variante `row` en sus tres estados, una debajo de otra: abierta, plegada (la explicación sigue en el documento) y encendida (abierta sobre el fondo de fila activa). Cada banda dibuja su raya de arriba; la de abajo del todo la pondría CardList.',
      },
    },
  },
  render: () => (
    <div style={{ marginInline: 'calc(50% - 50vw)', width: '100vw' }}>
      <Card variant="row" state="open" ordinal="01" title={SERVICIOS[0].title}>
        {SERVICIOS[0].body}
      </Card>
      <Card variant="row" state="folded" ordinal="02" title={SERVICIOS[1].title}>
        {SERVICIOS[1].body}
      </Card>
      <Card variant="row" state="active" ordinal="03" title={SERVICIOS[2].title}>
        {SERVICIOS[2].body}
      </Card>
      <div style={{ borderTop: '1px solid var(--color-border-default)' }} />
    </div>
  ),
};
