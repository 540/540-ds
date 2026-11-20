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

const CATEGORIES = [
  { kind: 'cat1', name: 'Grupo uno' },
  { kind: 'cat2', name: 'Grupo dos' },
  { kind: 'cat3', name: 'Grupo tres' },
  { kind: 'cat4', name: 'Grupo cuatro' },
  { kind: 'cat5', name: 'Grupo cinco' },
  { kind: 'cat6', name: 'Grupo seis' },
] as const;

const BRANCHES = [
  { name: 'Apartado A', leaves: ['cat1', 'cat1', 'cat2'] },
  { name: 'Apartado B', leaves: ['cat3', 'cat4', 'cat4', 'cat1'] },
  { name: 'Apartado C', leaves: ['cat5', 'cat6', 'cat2'] },
] as const;

const CategoryTree = () => {
  let y = 80;
  const branches = BRANCHES.map((b) => {
    const top = y;
    const leaves = b.leaves.map((kind) => {
      const ly = y;
      y += 70;
      return { kind, ly };
    });
    y += 40;
    return { ...b, mid: (top + y - 110) / 2 + 26, leaves };
  });
  return (
    <Schema viewBox="0 0 2560 900" title="Un árbol con las hojas por categoría" description="Tres apartados con sus pantallas; cada pantalla lleva el color del grupo al que pertenece. A la derecha, la leyenda con los seis grupos.">
      {branches.map((b) => (
        <g key={b.name}>
          <rect className={schema.node} x={300} y={b.mid - 32} width={320} height={64} rx={10} />
          <text className={schema.nodeText} x={460} y={b.mid + 9} textAnchor="middle">
            {b.name}
          </text>
          <path className={schema.line} d={`M620,${b.mid} L680,${b.mid} M680,${b.leaves[0].ly + 26} L680,${b.leaves[b.leaves.length - 1].ly + 26}`} />
          {b.leaves.map((l, i) => (
            <g key={i}>
              <path className={schema.line} d={`M680,${l.ly + 26} L740,${l.ly + 26}`} />
              <rect className={schema[l.kind]} x={740} y={l.ly} width={300} height={52} rx={8} />
              <text className={schema.label} x={890} y={l.ly + 34} textAnchor="middle">
                Pantalla
              </text>
            </g>
          ))}
        </g>
      ))}
      {CATEGORIES.map((c, i) => (
        <g key={c.kind}>
          <rect className={schema[c.kind]} x={1700} y={120 + i * 90} width={56} height={40} rx={8} />
          <text className={schema.label} x={1790} y={150 + i * 90}>
            {c.name}
          </text>
        </g>
      ))}
    </Schema>
  );
};

export const PorCategorias: Story = {
  name: 'Por categorías',
  parameters: {
    docs: {
      description: {
        story: 'Seis clases, de `cat1` a `cat6`, para distinguir grupos en las cajas: relleno suave y borde del color de la categoría. El texto sigue en tinta. Siempre con leyenda.',
      },
    },
  },
  render: () => (
    <Slide id="esquema-categorias">
      <SectionHeader title="Un árbol por categorías" align="center" />
      <SchemaFrame caption="Cada color es un grupo; la leyenda dice cuál.">
        <CategoryTree />
      </SchemaFrame>
    </Slide>
  ),
};
