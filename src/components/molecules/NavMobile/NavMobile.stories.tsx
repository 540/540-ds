import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ThemeToggle } from '../../atoms/ThemeToggle';
import { NavMobile } from './NavMobile';
import { NAV_MOBILE_DEFAULTS } from './types';
import doc from './_docs/NavMobile.md?raw';

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
  title: 'Moléculas/NavMobile',
  component: NavMobile,
  tags: ['autodocs', '!dev'],
  parameters: { docs: { description: { component: doc } }, layout: 'padded' },
  args: { items: DESTINOS, ...NAV_MOBILE_DEFAULTS },
  argTypes: {
    items: { control: false, description: 'Los mismos destinos que Menu.', table: { type: { summary: 'MenuDestination[]' } } },
    homeHref: { control: 'text', table: { defaultValue: { summary: NAV_MOBILE_DEFAULTS.homeHref } } },
    homeLabel: { control: 'text', table: { defaultValue: { summary: NAV_MOBILE_DEFAULTS.homeLabel } } },
    label: { control: 'text', description: 'Nombre de la navegación y del panel.', table: { defaultValue: { summary: NAV_MOBILE_DEFAULTS.label } } },
    end: { control: false, description: 'Lo que va junto al botón: el ThemeToggle.', table: { type: { summary: 'ReactNode' } } },
    className: { control: false, table: { disable: true } },
  },
} satisfies Meta<typeof NavMobile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  tags: ['dev'],
  parameters: { viewport: { defaultViewport: 'mobile' } },
  render: (args) => <NavMobile {...args} end={<LiveToggle />} />,
};

export const Barra: Story = {
  parameters: {
    docs: {
      description: {
        story: 'La barra cerrada, con el conmutador de tema al lado de la hamburguesa. Pulsa la hamburguesa: el panel tapa la página, Escape lo cierra y el foco vuelve al botón.',
      },
    },
  },
  render: () => (
    <div style={{ width: 375 }}>
      <NavMobile items={DESTINOS} end={<LiveToggle />} />
    </div>
  ),
};
