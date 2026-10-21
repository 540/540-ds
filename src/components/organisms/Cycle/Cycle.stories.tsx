import type { Meta, StoryObj } from '@storybook/react-vite';
import { Cycle } from './Cycle';
import { CYCLE_MARKS } from './types';
import doc from './_docs/Cycle.md?raw';

const FASES = ['Fase uno', 'Fase dos', 'Fase tres', 'Fase cuatro', 'Fase cinco', 'Fase seis', 'Fase siete'];

const meta = {
  title: 'Organismos/Cycle',
  component: Cycle,
  tags: ['autodocs', '!dev'],
  parameters: { docs: { description: { component: doc } }, layout: 'padded' },
  args: { phases: FASES, active: 2, label: 'Un ciclo de siete fases' },
  argTypes: {
    phases: { control: 'object', description: 'Las fases, en orden.', table: { type: { summary: 'string[]' } } },
    active: { control: { type: 'number', min: -1, max: 8 }, description: 'La fase activa (índice). Las anteriores quedan hechas.', table: { type: { summary: 'number' } } },
    all: { control: 'boolean', description: 'Todas hechas.', table: { type: { summary: 'boolean' } } },
    highlightFirst: { control: 'boolean', description: 'Con `all`, la primera sigue activa.', table: { type: { summary: 'boolean' } } },
    marks: { control: 'object', description: `Marcas por índice: ${CYCLE_MARKS.join(', ')}.`, table: { type: { summary: 'Record<number, CycleMark>' } } },
    label: { control: 'text', table: { type: { summary: 'string' } } },
    className: { control: false, table: { disable: true } },
  },
} satisfies Meta<typeof Cycle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { tags: ['dev'], parameters: { layout: 'centered' }, render: (args) => <div style={{ width: 720 }}><Cycle {...args} /></div> };

export const EnMarcha: Story = {
  name: 'En marcha',
  parameters: { docs: { description: { story: 'Dos fases hechas, la tercera activa y el arco cubriendo dos séptimos.' } } },
  render: (args) => <div style={{ width: 720 }}><Cycle {...args} /></div>,
};

export const ConMarcas: Story = {
  name: 'Con marcas',
  parameters: { docs: { description: { story: 'Todas hechas, y tres marcas: un problema en rojo, uno resuelto en verde y la preocupación en amarillo.' } } },
  args: { all: true, marks: { 3: 'red', 4: 'green', 2: 'yellow' } },
  render: (args) => <div style={{ width: 720 }}><Cycle {...args} /></div>,
};
