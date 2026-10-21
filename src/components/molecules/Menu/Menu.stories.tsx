import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ThemeToggle } from '../../atoms/ThemeToggle';
import { Menu } from './Menu';
import { MENU_DEFAULTS } from './types';
import doc from './_docs/Menu.md?raw';

const DESTINOS = [
  { href: '#manifiesto', label: 'Manifiesto' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#formacion', label: 'Formación' },
  { href: '#servicios', label: 'Servicios', current: true },
  { href: '#equipo', label: 'Equipo' },
  { href: '#contacto', label: 'Contacto' },
];

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

const meta = {
  title: 'Moléculas/Menu',
  component: Menu,
  tags: ['autodocs', '!dev'],
  parameters: { docs: { description: { component: doc } }, layout: 'padded' },
  args: { items: DESTINOS, ...MENU_DEFAULTS },
  argTypes: {
    items: { control: false, description: 'Los destinos, en orden, con `href`, `label` y `current`.', table: { type: { summary: 'MenuDestination[]' } } },
    homeHref: { control: 'text', description: 'A dónde lleva el logotipo.', table: { defaultValue: { summary: MENU_DEFAULTS.homeHref } } },
    homeLabel: { control: 'text', description: 'Nombre accesible del enlace del logotipo.', table: { defaultValue: { summary: MENU_DEFAULTS.homeLabel } } },
    label: { control: 'text', description: 'Nombre de la navegación. Dos menús no pueden compartirlo.', table: { defaultValue: { summary: MENU_DEFAULTS.label } } },
    end: { control: false, description: 'Lo que va a la derecha: el ThemeToggle. No es un destino.', table: { type: { summary: 'ReactNode' } } },
    className: { control: false, table: { disable: true } },
  },
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { tags: ['dev'], render: (args) => <Menu {...args} end={<LiveToggle />} /> };

export const Barra: Story = {
  parameters: {
    docs: {
      description: {
        story: 'La barra completa: logotipo, seis destinos con «Servicios» como actual, y el conmutador de tema a la derecha (que funciona). Recorre con el tabulador: primero el logotipo, luego los seis destinos, luego el conmutador.',
      },
    },
  },
  render: () => <Menu items={DESTINOS} end={<LiveToggle />} />,
};

export const SinConmutador: Story = {
  name: 'Sin conmutador',
  parameters: { docs: { description: { story: 'Sin nada en `end`: los destinos siguen centrados sobre la barra, no sobre el hueco que deja el logotipo.' } } },
  render: () => <Menu items={DESTINOS} />,
};
