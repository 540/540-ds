import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProgressBar } from './ProgressBar';
import doc from './_docs/ProgressBar.md?raw';

const meta = {
  title: 'Organismos/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs', '!dev'],
  parameters: { docs: { description: { component: doc } }, layout: 'padded' },
  args: { value: 1, start: 'Inicio', end: 'Hoy', label: 'Tramo de tiempo' },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 1, step: 0.05 }, description: 'Relleno de 0 a 1.', table: { type: { summary: 'number' } } },
    start: { control: 'text', table: { type: { summary: 'ReactNode' } } },
    end: { control: 'text', table: { type: { summary: 'ReactNode' } } },
    milestones: { control: { type: 'number', min: 0, max: 6 }, description: 'Hitos intermedios.', table: { defaultValue: { summary: '0' } } },
    reached: { control: { type: 'number', min: 0, max: 6 }, description: 'Hitos alcanzados.', table: { defaultValue: { summary: '0' } } },
    label: { control: 'text', table: { type: { summary: 'string' } } },
    className: { control: false, table: { disable: true } },
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { tags: ['dev'], render: (args) => <div style={{ maxWidth: 720, margin: '0 auto' }}><ProgressBar {...args} /></div> };

export const TramoDeTiempo: Story = {
  name: 'Tramo de tiempo',
  parameters: { docs: { description: { story: 'La barra entera llena, con las dos fechas en los extremos.' } } },
  render: (args) => <div style={{ maxWidth: 720, margin: '0 auto' }}><ProgressBar {...args} /></div>,
};

export const ConHitos: Story = {
  name: 'Con hitos',
  parameters: { docs: { description: { story: 'Cuatro hitos, dos alcanzados: el relleno llega hasta el segundo.' } } },
  args: { value: 0.4, milestones: 4, reached: 2, start: 'Hito 0', end: 'Hito 5' },
  render: (args) => <div style={{ maxWidth: 720, margin: '0 auto' }}><ProgressBar {...args} /></div>,
};
