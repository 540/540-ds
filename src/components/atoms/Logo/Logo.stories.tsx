import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { Text } from '../Text';
import { Logo } from './Logo';
import { LOGO_DEFAULTS, LOGO_SIZES } from './types';
import doc from './_docs/Logo.md?raw';

const Caption = ({ children }: { children: ReactNode }) => (
  <Text variant="micro" tone="secondary" as="span">
    {children}
  </Text>
);

const Stack = ({ gap = 'var(--space-xl)', children }: { gap?: string; children: ReactNode }) => (
  <div style={{ display: 'grid', gap, justifyItems: 'start' }}>{children}</div>
);

const meta = {
  title: 'Átomos/Logo',
  component: Logo,
  tags: ['autodocs', '!dev'],
  parameters: { docs: { description: { component: doc } }, layout: 'padded' },
  args: { ...LOGO_DEFAULTS },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: [...LOGO_SIZES],
      description: 'Alto del logotipo: 48, 32 o 24 px. El ancho lo pone la proporción del dibujo.',
      table: { type: { summary: LOGO_SIZES.join(' | ') }, defaultValue: { summary: LOGO_DEFAULTS.size } },
    },
    label: {
      control: 'text',
      description: 'Nombre accesible. Vacío, el logotipo es decorativo y el lector de pantalla lo salta.',
      table: { type: { summary: 'string' }, defaultValue: { summary: LOGO_DEFAULTS.label } },
    },
    className: { control: false, table: { disable: true } },
  },
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { tags: ['dev'], parameters: { layout: 'centered' } };

export const Tamanos: Story = {
  name: 'Tamaños',
  parameters: {
    docs: {
      description: {
        story: 'Los tres altos, uno debajo de otro. Fíjate en que el ancho cambia solo: nunca se fija.',
      },
    },
  },
  render: () => (
    <Stack>
      {LOGO_SIZES.map((size) => (
        <Stack key={size} gap="var(--space-s)">
          <Caption>{size}</Caption>
          <Logo size={size} />
        </Stack>
      ))}
    </Stack>
  ),
};

export const SobreFondoInvertido: Story = {
  name: 'Sobre fondo invertido',
  parameters: {
    docs: {
      description: {
        story:
          'El logotipo no tiene opción de color: hereda la tinta. Sobre un fondo invertido, el contenedor pone `color: var(--color-text-inverse)` y el logotipo lo sigue. Cambia el **Tema** y verás que los dos bloques se intercambian.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-l)' }}>
      <div style={{ padding: 'var(--space-2xl)', background: 'var(--color-bg-default)', border: '1px solid var(--color-border-default)', borderRadius: 'var(--radius-default)' }}>
        <Logo size="sm" />
      </div>
      <div style={{ padding: 'var(--space-2xl)', background: 'var(--color-bg-inverse)', color: 'var(--color-text-inverse)', borderRadius: 'var(--radius-default)' }}>
        <Logo size="sm" />
      </div>
    </div>
  ),
};

export const ComoEnlace: Story = {
  name: 'Como enlace',
  parameters: {
    docs: {
      description: {
        story:
          'En la barra y en el pie el logotipo lleva al inicio. El enlace lo envuelve: es el enlace quien recibe el foco (prueba el tabulador) y quien lleva el nombre «Ir al inicio». El logotipo va decorativo (`label=""`) para no leer «540» dos veces.',
      },
    },
  },
  render: () => (
    <a href="#inicio" aria-label="Ir al inicio" style={{ display: 'inline-flex', color: 'inherit' }}>
      <Logo size="xs" label="" />
    </a>
  ),
};
