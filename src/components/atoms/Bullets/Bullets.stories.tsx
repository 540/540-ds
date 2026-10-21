import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import type { ReactNode } from 'react';
import { Text } from '../Text';
import { Bullets } from './Bullets';
import { BULLETS_DEFAULTS, BULLETS_ORIENTATIONS } from './types';
import type { BulletsProps } from './types';
import doc from './_docs/Bullets.md?raw';

const Caption = ({ children }: { children: ReactNode }) => (
  <Text variant="micro" tone="secondary" as="span">
    {children}
  </Text>
);

/* Live version: the page changes when you click a dot */
function LiveBullets(props: Omit<BulletsProps, 'onSelect'>) {
  const [page, setPage] = useState(props.current);
  return <Bullets {...props} current={page} onSelect={setPage} />;
}

const meta = {
  title: 'Átomos/Bullets',
  component: Bullets,
  tags: ['autodocs', '!dev'],
  parameters: { docs: { description: { component: doc } }, layout: 'padded' },
  args: { count: 5, current: 1, ...BULLETS_DEFAULTS },
  argTypes: {
    count: { control: { type: 'number', min: 1, max: 8 }, description: 'Cuántas páginas. Con una, no pinta nada.', table: { type: { summary: 'number' } } },
    current: { control: { type: 'number', min: 1, max: 8 }, description: 'La página actual, empezando en 1.', table: { type: { summary: 'number' } } },
    orientation: {
      control: 'inline-radio',
      options: [...BULLETS_ORIENTATIONS],
      description: '`horizontal` debajo de un carrusel; `vertical` como índice al canto de la ventana.',
      table: { type: { summary: BULLETS_ORIENTATIONS.join(' | ') }, defaultValue: { summary: BULLETS_DEFAULTS.orientation } },
    },
    onSelect: { control: false, description: 'Avisa de la página elegida (empezando en 1).', table: { type: { summary: '(page: number) => void' } } },
    itemLabel: { control: 'text', description: 'Palabra del nombre de cada punto: «Página 2 de 3».', table: { defaultValue: { summary: BULLETS_DEFAULTS.itemLabel } } },
    label: { control: 'text', description: 'Nombre del grupo para el lector de pantalla.', table: { defaultValue: { summary: BULLETS_DEFAULTS.label } } },
    className: { control: false, table: { disable: true } },
  },
} satisfies Meta<typeof Bullets>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  tags: ['dev'],
  parameters: { layout: 'centered' },
  render: (args) => <LiveBullets {...args} />,
};

export const Horizontal: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Los puntos de un carrusel de cinco páginas. Pulsa uno: el activo se alarga y se desplaza con una transición corta. En escala de grises se sigue viendo cuál es.',
      },
    },
  },
  render: () => <LiveBullets count={5} current={2} />,
};

export const Vertical: Story = {
  parameters: {
    docs: {
      description: {
        story: 'El índice del recorrido de una charla: rayas apiladas a la derecha, con el hueco pequeño. La activa es el doble de larga. Aquí va dentro de una caja; en la charla va fijo al canto derecho de la ventana.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'flex-end', padding: 'var(--space-xl)', border: '1px dashed var(--color-border-default)', width: 320 }}>
      <LiveBullets count={6} current={3} orientation="vertical" itemLabel="Parada" label="Recorrido" />
    </div>
  ),
};

export const UnaSolaPagina: Story = {
  name: 'Una sola página',
  parameters: {
    docs: {
      description: {
        story: 'Con `count = 1` no se pinta nada: no hay a dónde ir. El recuadro punteado es solo para ver que el hueco está vacío.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--space-s)' }}>
      <Caption>count = 1</Caption>
      <div style={{ minHeight: 24, border: '1px dashed var(--color-border-default)', width: 200 }}>
        <Bullets count={1} current={1} />
      </div>
    </div>
  ),
};
