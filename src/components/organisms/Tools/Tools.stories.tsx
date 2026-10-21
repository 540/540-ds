import type { Meta, StoryObj } from '@storybook/react-vite';
import { SectionHeader } from '../../molecules/SectionHeader';
import { Slide } from '../Slide';
import { Tools } from './Tools';
import { TOOLS_DEFAULTS } from './types';
import doc from './_docs/Tools.md?raw';
import logo from '../../../assets/samples/logo-cliente.svg';

const TOOLS = [
  { src: logo, name: 'Herramienta uno' },
  { src: logo, name: 'Herramienta dos' },
  { src: logo, name: 'Herramienta tres' },
  { src: logo, name: 'Herramienta cuatro' },
];

const DESCARTADAS = [
  { src: logo, name: 'Herramienta cinco', verdict: 'Por qué se descartó, en una línea.' },
  { src: logo, name: 'Herramienta seis', verdict: 'Otra razón corta.' },
  { src: logo, name: 'Herramienta siete', verdict: 'Y una tercera.' },
];

const meta = {
  title: 'Organismos/Tools',
  component: Tools,
  tags: ['autodocs', '!dev'],
  parameters: { docs: { description: { component: doc } }, layout: 'padded' },
  args: { tools: TOOLS, ...TOOLS_DEFAULTS },
  argTypes: {
    tools: { control: false, description: 'Las herramientas: logotipo, nombre, veredicto opcional, inversión en oscuro y corrección óptica.', table: { type: { summary: 'Tool[]' } } },
    columns: { control: 'inline-radio', options: [3, 4], description: 'Por fila desde 1024 px.', table: { defaultValue: { summary: String(TOOLS_DEFAULTS.columns) } } },
    className: { control: false, table: { disable: true } },
  },
} satisfies Meta<typeof Tools>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { tags: ['dev'] };

export const LasQueSeQuedan: Story = {
  name: 'Las que se quedan',
  parameters: { docs: { description: { story: 'Cuatro herramientas en una fila, con el logotipo en su caja de 52 px y el nombre debajo.' } } },
  render: (args) => (
    <Slide id="stack">
      <SectionHeader title="Título de la parada" description="Una entradilla corta." align="center" />
      <Tools {...args} />
    </Slide>
  ),
};

export const Descartadas: Story = {
  parameters: { docs: { description: { story: 'Tres por fila, cada una con su veredicto de una línea en gris.' } } },
  args: { tools: DESCARTADAS, columns: 3 },
  render: (args) => (
    <Slide id="descartadas">
      <SectionHeader title="Título de la parada" align="center" />
      <Tools {...args} />
    </Slide>
  ),
};
