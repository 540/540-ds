import type { Meta, StoryObj } from '@storybook/react-vite';
import { SectionHeader } from '../../molecules/SectionHeader';
import { Slide } from '../Slide';
import { Steps } from '../Steps';
import { Schema, SchemaFrame, SchemaLayer, SchemaVoice, schema } from './Schema';
import doc from './_docs/Schema.md?raw';

const NODES = ['Primero', 'Segundo', 'Tercero', 'Cuarto', 'Quinto'];

function Chain({ y, kind }: { y: number; kind: 'node' | 'highlighted' | 'note' }) {
  return (
    <>
      {NODES.map((name, i) => {
        const x = 300 + i * 420;
        return (
          <g key={name}>
            <rect className={schema[kind]} x={x} y={y} width={300} height={90} rx={12} />
            <text className={schema.nodeText} x={x + 150} y={y + 56} textAnchor="middle">
              {name}
            </text>
            {i < NODES.length - 1 ? <path className={schema.line} d={`M${x + 310},${y + 45} L${x + 410},${y + 45}`} markerEnd="url(#head)" /> : null}
          </g>
        );
      })}
    </>
  );
}

const Drawing = () => (
  <Schema viewBox="0 0 2560 820" title="Dos cadenas de cinco pasos" description="Una cadena arriba, con el primer y el último paso destacados; una nota discontinua une el segundo paso con la cadena de abajo." data>
    <defs>
      <marker id="head" viewBox="0 0 12 12" refX="10" refY="6" markerWidth="12" markerHeight="12" orient="auto">
        <path className={schema.arrowhead} d="M2 2 L10 6 L2 10.5" />
      </marker>
    </defs>
    <SchemaLayer step={0} label="Antes: una cadena de cinco pasos">
      <text className={schema.title} x={300} y={200}>
        Antes
      </text>
      <Chain y={240} kind="node" />
      {NODES.map((n, i) => (
        <text key={n} className={schema.label} x={450 + i * 420} y={380} textAnchor="middle">
          etiqueta
        </text>
      ))}
    </SchemaLayer>
    <SchemaLayer step={1} label="Una nota que explica el cambio">
      <path className={schema.lineDashed} d="M870,400 L870,560" markerEnd="url(#head)" />
      <text className={schema.noteText} x={910} y={490}>
        Una nota que explica el cambio.
      </text>
    </SchemaLayer>
    <SchemaLayer step={2} label="Ahora: la misma cadena, con dos pasos destacados">
      <text className={schema.title} x={300} y={600}>
        Ahora
      </text>
      <Chain y={640} kind="highlighted" />
      <rect className={schema.pill} x={1900} y={560} width={220} height={50} rx={25} />
      <text className={schema.pillText} x={2010} y={594} textAnchor="middle">
        píldora
      </text>
    </SchemaLayer>
  </Schema>
);

const meta = {
  title: 'Organismos/Schema',
  component: Schema,
  tags: ['autodocs', '!dev'],
  parameters: { docs: { description: { component: doc }, story: { inline: false, height: '640px' } }, layout: 'fullscreen' },
  args: { viewBox: '0 0 2560 820', title: '', children: null },
  argTypes: {
    viewBox: { control: false, table: { type: { summary: 'string' } } },
    title: { control: false, table: { type: { summary: 'string' } } },
    description: { control: false, table: { type: { summary: 'string' } } },
    data: { control: 'boolean', description: 'Esquema de datos: textos un punto más grandes.', table: { defaultValue: { summary: 'false' } } },
    guided: { control: 'boolean', description: 'Capas que se encienden por pasos.', table: { defaultValue: { summary: 'false' } } },
    children: { control: false, table: { type: { summary: 'ReactNode' } } },
    className: { control: false, table: { disable: true } },
  },
} satisfies Meta<typeof Schema>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  tags: ['dev'],
  render: () => (
    <Slide id="esquema">
      <SectionHeader title="Un esquema" align="center" />
      <SchemaFrame caption="Un pie que explica el dibujo, a media rejilla.">
        <Drawing />
      </SchemaFrame>
    </Slide>
  ),
};

export const Entero: Story = {
  parameters: { docs: { description: { story: 'El dibujo entero, sin pasos: las tres capas encendidas. Con el marco a todo el ancho y el pie debajo.' } } },
  render: () => (
    <Slide id="esquema-entero">
      <SectionHeader title="Un esquema" align="center" />
      <SchemaFrame caption="Un pie que explica el dibujo, a media rejilla.">
        <Drawing />
      </SchemaFrame>
    </Slide>
  ),
};

export const PorCapas: Story = {
  name: 'Por capas',
  parameters: { docs: { description: { story: 'Dentro de un Steps: pulsa en el lienzo y usa → para encender las capas una a una. Lo que no toca queda al 18 %.' } } },
  render: () => (
    <Slide id="esquema-capas">
      <Steps total={2}>
        <SectionHeader title="Un esquema por capas" align="center" />
        <SchemaFrame caption="Un pie que explica el dibujo, a media rejilla.">
          <Drawing />
        </SchemaFrame>
        <SchemaVoice labels={['Antes: una cadena de cinco pasos', 'Una nota que explica el cambio', 'Ahora: la misma cadena, con dos pasos destacados']} />
      </Steps>
    </Slide>
  ),
};
