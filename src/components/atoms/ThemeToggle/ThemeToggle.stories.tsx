import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import type { ReactNode } from 'react';
import { Text } from '../Text';
import { Logo } from '../Logo';
import { ThemeToggle } from './ThemeToggle';
import styles from './ThemeToggle.module.css';
import { THEME_TOGGLE_DEFAULTS } from './types';
import doc from './_docs/ThemeToggle.md?raw';

const Caption = ({ children }: { children: ReactNode }) => (
  <Text variant="micro" tone="secondary" as="span">
    {children}
  </Text>
);

const meta = {
  title: 'Átomos/ThemeToggle',
  component: ThemeToggle,
  tags: ['autodocs', '!dev'],
  parameters: { docs: { description: { component: doc } }, layout: 'padded' },
  args: { dark: false, label: THEME_TOGGLE_DEFAULTS.label, onToggle: () => {} },
  argTypes: {
    dark: {
      control: 'boolean',
      description: 'Si el tema oscuro está puesto. Decide el icono (luna en claro, sol en oscuro) y el `aria-pressed`.',
      table: { type: { summary: 'boolean' } },
    },
    onToggle: {
      control: false,
      description: 'Avisa del cambio con el valor siguiente. Guardarlo es de la aplicación.',
      table: { type: { summary: '(nextDark: boolean) => void' } },
    },
    label: {
      control: 'text',
      description: 'Nombre para el lector de pantalla. No cambia con el estado.',
      table: { type: { summary: 'string' }, defaultValue: { summary: THEME_TOGGLE_DEFAULTS.label } },
    },
    className: { control: false, table: { disable: true } },
  },
} satisfies Meta<typeof ThemeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

/* The real thing: the toggle drives the theme of the whole canvas through <html data-theme>. */
function LiveToggle() {
  const [dark, setDark] = useState(() => document.documentElement.dataset.theme === 'dark');
  return (
    <ThemeToggle
      dark={dark}
      onToggle={(next) => {
        setDark(next);
        document.documentElement.dataset.theme = next ? 'dark' : 'light';
      }}
    />
  );
}

export const Playground: Story = {
  tags: ['dev'],
  parameters: { layout: 'centered' },
  render: () => <LiveToggle />,
};

export const LosDosTemas: Story = {
  name: 'Los dos temas',
  parameters: {
    docs: {
      description: {
        story: 'A la izquierda, como se ve en claro (luna: a dónde lleva). A la derecha, como se ve en oscuro (sol). El dibujo hereda la tinta, así que el tema es de la página y no del componente.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-3xl)' }}>
      <div style={{ display: 'grid', gap: 'var(--space-s)', justifyItems: 'start' }}>
        <Caption>dark = false</Caption>
        <ThemeToggle dark={false} onToggle={() => {}} />
      </div>
      <div style={{ display: 'grid', gap: 'var(--space-s)', justifyItems: 'start' }}>
        <Caption>dark = true</Caption>
        <ThemeToggle dark onToggle={() => {}} />
      </div>
    </div>
  ),
};

export const Estados: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Normal, hover, active y focus, forzados con las mismas variables que usa el estado real. Nada en reposo, una superficie al pasar, un paso más al pulsar.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-3xl)' }}>
      {[
        ['normal', ''],
        ['hover', styles.forceHover],
        ['active', styles.forceActive],
        ['focus', styles.forceFocus],
      ].map(([name, cls]) => (
        <div key={name} style={{ display: 'grid', gap: 'var(--space-s)', justifyItems: 'start' }}>
          <Caption>{name}</Caption>
          <ThemeToggle dark={false} onToggle={() => {}} className={cls} />
        </div>
      ))}
    </div>
  ),
};

export const EnLaBarra: Story = {
  name: 'En la barra',
  parameters: {
    docs: {
      description: {
        story: 'Su único sitio: enfrente del logotipo, que mide lo mismo (24 px). Pulsa y cambia el tema de verdad.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBlock: 'var(--space-xl)' }}>
      <Logo size="xs" />
      <LiveToggle />
    </div>
  ),
};
