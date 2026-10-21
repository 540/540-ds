import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Card } from '../../molecules/Card';
import { CardList } from './CardList';
import doc from './_docs/CardList.md?raw';

const ITEMS = [
  { ordinal: '01', title: 'Primer apartado', body: 'Dos o tres frases sobre lo que hace este apartado.' },
  { ordinal: '02', title: 'Segundo apartado', body: 'Dos o tres frases sobre lo que hace este otro.' },
  { ordinal: '03', title: 'Tercer apartado', body: 'Y una explicación más, igual de corta.' },
  { ordinal: '04', title: 'Cuarto apartado', body: 'La última banda de la lista.' },
];

const meta = {
  title: 'Organismos/CardList',
  component: CardList,
  tags: ['autodocs', '!dev'],
  parameters: { docs: { description: { component: doc } }, layout: 'padded' },
  args: {
    children: ITEMS.map((item) => (
      <Card key={item.ordinal} variant="row" ordinal={item.ordinal} title={item.title}>
        {item.body}
      </Card>
    )),
  },
  argTypes: {
    children: { control: false, description: 'Card en variante row, y nada más.', table: { type: { summary: 'ReactNode' } } },
    className: { control: false, table: { disable: true } },
  },
} satisfies Meta<typeof CardList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { tags: ['dev'] };

export const Abiertas: Story = {
  parameters: { docs: { description: { story: 'Cuatro bandas abiertas. La raya de cada una cruza la pantalla entera y la lista cierra con la última.' } } },
};

function Acordeon() {
  const [active, setActive] = useState(0);
  return (
    <CardList>
      {ITEMS.map((item, i) => (
        <Card
          key={item.ordinal}
          variant="row"
          ordinal={item.ordinal}
          title={item.title}
          state={i === active ? 'active' : 'folded'}
          onMouseEnter={() => setActive(i)}
          onFocus={() => setActive(i)}
          tabIndex={0}
        >
          {item.body}
        </Card>
      ))}
    </CardList>
  );
}

export const UnaEncendida: Story = {
  name: 'Una encendida',
  parameters: { docs: { description: { story: 'Una banda encendida y las demás plegadas en título. Pasa el ratón o recorre con el tabulador: la encendida cambia, y el estado vive fuera de la lista.' } } },
  render: () => <Acordeon />,
};
