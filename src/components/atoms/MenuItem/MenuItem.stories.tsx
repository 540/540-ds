import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { Text } from '../Text';
import { MenuItem } from './MenuItem';
import styles from './MenuItem.module.css';
import { MENU_ITEM_DEFAULTS, MENU_ITEM_SIZES } from './types';
import doc from './_docs/MenuItem.md?raw';

const Caption = ({ children }: { children: ReactNode }) => (
  <Text variant="micro" tone="secondary" as="span">
    {children}
  </Text>
);

const DESTINOS = ['Manifiesto', 'Portfolio', 'Formación', 'Servicios', 'Equipo', 'Contacto'];

const meta = {
  title: 'Átomos/MenuItem',
  component: MenuItem,
  tags: ['autodocs', '!dev'],
  parameters: { docs: { description: { component: doc } }, layout: 'padded' },
  args: { href: '#servicios', children: 'Servicios', ...MENU_ITEM_DEFAULTS },
  argTypes: {
    href: { control: 'text', description: 'El destino. Obligatorio: un ítem de menú siempre navega.', table: { type: { summary: 'string' } } },
    size: {
      control: 'inline-radio',
      options: [...MENU_ITEM_SIZES],
      description: '`sm` en la barra de escritorio (micro, mayúsculas); `lg` en el panel de móvil (title-m).',
      table: { type: { summary: MENU_ITEM_SIZES.join(' | ') }, defaultValue: { summary: MENU_ITEM_DEFAULTS.size } },
    },
    current: {
      control: 'boolean',
      description: 'La sección que se está viendo: negrita y `aria-current="page"`. Uno por menú.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    children: { control: 'text', description: 'La etiqueta, escrita en minúsculas normales.', table: { type: { summary: 'ReactNode' } } },
    className: { control: false, table: { disable: true } },
  },
} satisfies Meta<typeof MenuItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { tags: ['dev'], parameters: { layout: 'centered' } };

export const Tamanos: Story = {
  name: 'Tamaños',
  parameters: {
    docs: {
      description: {
        story: 'Arriba `sm`, la fila de la barra de escritorio: micro en mayúsculas, con «Servicios» como actual. Abajo `lg`, la columna del panel de móvil en title-m.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--space-3xl)' }}>
      <div style={{ display: 'grid', gap: 'var(--space-s)' }}>
        <Caption>sm · barra de escritorio</Caption>
        <ul style={{ display: 'flex', gap: 'var(--space-xl)', margin: 0, padding: 0, listStyle: 'none' }}>
          {DESTINOS.map((d) => (
            <li key={d}>
              <MenuItem href={`#${d.toLowerCase()}`} current={d === 'Servicios'}>
                {d}
              </MenuItem>
            </li>
          ))}
        </ul>
      </div>
      <div style={{ display: 'grid', gap: 'var(--space-s)' }}>
        <Caption>lg · panel de móvil</Caption>
        <ul style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 'var(--space-m)', margin: 0, padding: 0, listStyle: 'none' }}>
          {DESTINOS.map((d) => (
            <li key={d}>
              <MenuItem href={`#${d.toLowerCase()}`} size="lg" current={d === 'Servicios'}>
                {d}
              </MenuItem>
            </li>
          ))}
        </ul>
      </div>
    </div>
  ),
};

export const Estados: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Normal, hover (crece), active (se hunde), focus (la raya de 2 px bajo la palabra) y actual (negrita), en los dos tamaños. Hover y active están forzados; en la realidad los pone el navegador.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--space-2xl)' }}>
      {MENU_ITEM_SIZES.map((size) => (
        <div key={size} style={{ display: 'grid', gridTemplateColumns: '64px 1fr', gap: 'var(--space-l)', alignItems: 'center' }}>
          <Caption>{size}</Caption>
          <div style={{ display: 'flex', gap: 'var(--space-2xl)', alignItems: 'center', flexWrap: 'wrap' }}>
            <MenuItem href="#a" size={size}>
              Normal
            </MenuItem>
            <MenuItem href="#b" size={size} className={styles.forceHover}>
              Hover
            </MenuItem>
            <MenuItem href="#c" size={size} className={styles.forceActive}>
              Active
            </MenuItem>
            <MenuItem href="#d" size={size} className={styles.forceFocus}>
              Focus
            </MenuItem>
            <MenuItem href="#e" size={size} current>
              Actual
            </MenuItem>
          </div>
        </div>
      ))}
    </div>
  ),
};
