import type { Meta, StoryObj } from '@storybook/react-vite';
import { SectionHeader } from '../../molecules/SectionHeader';
import { Slide } from '../Slide';
import { Flow } from './Flow';
import { FLOW_DEFAULTS } from './types';
import doc from './_docs/Flow.md?raw';

const STEPS = [{ label: 'Primer paso' }, { label: 'Segundo paso' }, { label: 'Tercer paso', highlighted: true }, { label: 'Cuarto paso' }, { label: 'Quinto paso' }];

const meta = {
  title: 'Organismos/Flow',
  component: Flow,
  tags: ['autodocs', '!dev'],
  parameters: { docs: { description: { component: doc } }, layout: 'padded' },
  args: { steps: STEPS, ...FLOW_DEFAULTS },
  argTypes: {
    steps: { control: 'object', description: 'Los pasos, en orden. `highlighted` destaca uno.', table: { type: { summary: 'FlowStep[]' } } },
    label: { control: 'text', table: { defaultValue: { summary: FLOW_DEFAULTS.label } } },
    className: { control: false, table: { disable: true } },
  },
} satisfies Meta<typeof Flow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { tags: ['dev'], parameters: { layout: 'centered' } };

export const EnFila: Story = {
  name: 'En fila',
  parameters: { docs: { description: { story: 'Cinco pasos en fila con el tercero destacado. Las flechas van centradas en el hueco. Estrecha el **Viewport** por debajo de 600 px y la fila se vuelve columna con «↓».' } } },
};

export const EnUnaParada: Story = {
  name: 'En una parada',
  parameters: { docs: { description: { story: 'Dentro de una Slide, debajo de su cabecera, como va en las charlas.' } } },
  render: (args) => (
    <Slide id="flujo">
      <SectionHeader title="Título de la parada" description="Una entradilla corta que presenta los pasos." align="center" />
      <Flow {...args} />
    </Slide>
  ),
};
