import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArrowList, ProblemList, SimpleList } from './Lists';
import doc from './_docs/Lists.md?raw';

const ITEMS = [
  <>
    Un primer ítem con <strong>la parte que importa</strong> en negrita.
  </>,
  'Un segundo ítem, de una frase.',
  'Y un tercero que cierra la lista.',
];

const meta = {
  title: 'Moléculas/Lists',
  component: SimpleList,
  tags: ['autodocs', '!dev'],
  parameters: { docs: { description: { component: doc } }, layout: 'padded' },
  args: { items: ITEMS },
  argTypes: {
    items: { control: false, table: { type: { summary: 'ReactNode[]' } } },
    className: { control: false, table: { disable: true } },
  },
} satisfies Meta<typeof SimpleList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { tags: ['dev'], parameters: { layout: 'centered' }, render: (args) => <div style={{ width: 480 }}><SimpleList {...args} /></div> };

export const Simple: Story = {
  parameters: { docs: { description: { story: 'SimpleList: ítems centrados, sin viñetas.' } } },
  render: (args) => <div style={{ maxWidth: 480, margin: '0 auto' }}><SimpleList {...args} /></div>,
};

export const ConFlechas: Story = {
  name: 'Con flechas',
  parameters: { docs: { description: { story: 'ArrowList: una flecha en gris delante de cada ítem.' } } },
  render: (args) => <div style={{ maxWidth: 480, margin: '0 auto' }}><ArrowList {...args} /></div>,
};

export const Problemas: Story = {
  parameters: { docs: { description: { story: 'ProblemList: pares de etiqueta en gris y texto en negro.' } } },
  render: () => (
    <div style={{ maxWidth: 560, margin: '0 auto' }}>
      <ProblemList
        items={[
          { label: 'El primer límite', text: <>Lo que pasa cuando se llega a él, con <strong>la parte que importa</strong> en negrita.</> },
          { label: 'El segundo límite', text: 'Otra frase que lo explica.' },
          { label: 'El tercero', text: 'Y una tercera.' },
        ]}
      />
    </div>
  ),
};
