import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from '../../atoms/Text';
import { Blobs } from './Blobs';
import doc from './_docs/Blobs.md?raw';

const meta = {
  title: 'Organismos/Blobs',
  component: Blobs,
  tags: ['autodocs', '!dev'],
  parameters: { docs: { description: { component: doc } }, layout: 'fullscreen' },
  argTypes: { className: { control: false, table: { disable: true } } },
} satisfies Meta<typeof Blobs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  tags: ['dev'],
  render: () => (
    <div style={{ position: 'relative', minHeight: '100svh', display: 'grid', placeItems: 'center' }}>
      <Blobs />
      <Text variant="statement" align="center">
        540°
      </Text>
    </div>
  ),
};

export const DetrasDeUnaParada: Story = {
  name: 'Detrás de una parada',
  parameters: { docs: { description: { story: 'Las dos manchas detrás de un texto. Son muy tenues a propósito: mira las esquinas superior derecha e inferior izquierda. Cambia el **Tema** para verlas sobre negro.' } } },
  render: () => (
    <div style={{ position: 'relative', minHeight: '100svh', display: 'grid', placeItems: 'center' }}>
      <Blobs />
      <Text variant="statement" align="center" wrap="balance" measure="wide">
        Donde otros terminan, nosotros empezamos.
      </Text>
    </div>
  ),
};
