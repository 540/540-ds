import type { Meta, StoryObj } from '@storybook/react-vite';
import { Timeline } from './Timeline';
import doc from './_docs/Timeline.md?raw';

const STEPS = [
  { title: 'Primer paso', body: 'Lo que pasó en el primer paso, en una o dos frases.' },
  { title: 'Segundo paso', body: 'Lo que pasó después, igual de corto.' },
  { title: 'Tercer paso', body: 'Un tercer hito, con su frase.' },
  { title: 'Cuarto paso', body: 'Y el último, que cierra la cronología.' },
];

const meta = {
  title: 'Organismos/Timeline',
  component: Timeline,
  tags: ['autodocs', '!dev'],
  parameters: { docs: { description: { component: doc }, story: { inline: false, height: '640px' } }, layout: 'fullscreen' },
  args: { id: 'recorrido', title: 'Título de la cronología', description: 'Una entradilla corta que la presenta.', steps: STEPS },
  argTypes: {
    id: { control: 'text', table: { type: { summary: 'string' } } },
    title: { control: 'text', table: { type: { summary: 'ReactNode' } } },
    description: { control: 'text', table: { type: { summary: 'ReactNode' } } },
    steps: { control: 'object', description: 'Los pasos, en orden. Cada uno es una parada.', table: { type: { summary: 'TimelineStep[]' } } },
    className: { control: false, table: { disable: true } },
  },
} satisfies Meta<typeof Timeline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { tags: ['dev'] };

export const CuatroPasos: Story = {
  name: 'Cuatro pasos',
  parameters: { docs: { description: { story: 'Cuatro pasos unidos por el eje. Baja con el scroll: la línea se dibuja y el punto aparece al entrar cada paso.' } } },
};
