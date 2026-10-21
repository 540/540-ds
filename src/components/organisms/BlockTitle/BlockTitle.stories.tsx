import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from '../../atoms/Text';
import { Slide } from '../Slide';
import { BlockTitle } from './BlockTitle';
import doc from './_docs/BlockTitle.md?raw';
import david from '../../../assets/samples/charla-david.webp';

const meta = {
  title: 'Organismos/BlockTitle',
  component: BlockTitle,
  tags: ['autodocs', '!dev'],
  parameters: { docs: { description: { component: doc }, story: { inline: false, height: '640px' } }, layout: 'fullscreen' },
  args: {
    id: 'bloque-01',
    ordinal: '01',
    title: 'Título del primer bloque',
    photo: { src: david, alt: '' },
  },
  argTypes: {
    id: { control: 'text', table: { type: { summary: 'string' } } },
    ordinal: { control: 'text', description: 'El ordinal del bloque, decorativo.', table: { type: { summary: 'string' } } },
    title: { control: 'text', table: { type: { summary: 'ReactNode' } } },
    photo: { control: false, description: 'La foto que va justo detrás, 2:1. No es parada.', table: { type: { summary: '{ src, alt }' } } },
    className: { control: false, table: { disable: true } },
  },
} satisfies Meta<typeof BlockTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { tags: ['dev'] };

export const ConFoto: Story = {
  name: 'Con foto',
  parameters: { docs: { description: { story: 'El título de bloque 01 y su foto debajo. Baja con el scroll: la foto se descubre de abajo arriba y asienta el zoom.' } } },
  render: (args) => (
    <>
      <Slide id="antes">
        <Text variant="body-l" tone="secondary" align="center">
          (una parada anterior)
        </Text>
      </Slide>
      <BlockTitle {...args} />
      <Slide id="despues">
        <Text variant="body-l" tone="secondary" align="center">
          (la parada siguiente)
        </Text>
      </Slide>
    </>
  ),
};
