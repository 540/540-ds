import type { Meta, StoryObj } from '@storybook/react-vite';
import { SectionHeader } from '../SectionHeader';
import pintura from '../../../assets/samples/charla-pintura.webp';
import { Screenshot } from './Screenshot';
import doc from './_docs/Screenshot.md?raw';

const meta = {
  title: 'Moléculas/Screenshot',
  component: Screenshot,
  tags: ['autodocs', '!dev'],
  parameters: { docs: { description: { component: doc } }, layout: 'padded' },
  args: { src: pintura, alt: 'Una pantalla de ejemplo con un panel y sus datos.', width: 1800, height: 900 },
  argTypes: {
    src: { control: false, table: { type: { summary: 'string' } } },
    alt: { control: 'text', table: { type: { summary: 'string' } } },
    width: { control: 'number', table: { type: { summary: 'number' } } },
    height: { control: 'number', table: { type: { summary: 'number' } } },
    className: { control: false, table: { disable: true } },
  },
} satisfies Meta<typeof Screenshot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { tags: ['dev'] };

export const BajoCabecera: Story = {
  name: 'Bajo una cabecera',
  parameters: { docs: { description: { story: 'Como va en la charla: la cabecera de la parada y la captura debajo, centrada.' } } },
  render: (args) => (
    <div style={{ textAlign: 'center' }}>
      <SectionHeader title="Título de la parada" description="Una frase que dice qué se ve en la captura." align="center" />
      <Screenshot {...args} />
    </div>
  ),
};
