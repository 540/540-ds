import type { Meta, StoryObj } from '@storybook/react-vite';
import { DeckFooter } from './DeckFooter';
import { DECK_FOOTER_DEFAULTS } from './types';
import doc from './_docs/DeckFooter.md?raw';

const NETWORKS = [
  { network: 'linkedin' as const, href: 'https://linkedin.com/company/540-degrees', label: 'LinkedIn de 540' },
  { network: 'x' as const, href: 'https://x.com/540deg', label: 'X de 540' },
  { network: 'instagram' as const, href: 'https://instagram.com/540deg', label: 'Instagram de 540' },
];

const meta = {
  title: 'Organismos/DeckFooter',
  component: DeckFooter,
  tags: ['autodocs', '!dev'],
  parameters: { docs: { description: { component: doc } }, layout: 'fullscreen' },
  args: {
    tagline: 'Una charla sobre dejar de entregar pantallas y entregar el sistema que las produce.',
    networks: NETWORKS,
    copyright: '© 2026 540',
    ...DECK_FOOTER_DEFAULTS,
  },
  argTypes: {
    tagline: { control: 'text', description: 'Una línea sobre la charla.', table: { type: { summary: 'ReactNode' } } },
    networks: { control: false, table: { type: { summary: 'FooterNetwork[]' } } },
    thanks: { control: 'text', description: 'La línea de gracias.', table: { defaultValue: { summary: DECK_FOOTER_DEFAULTS.thanks } } },
    copyright: { control: 'text', table: { type: { summary: 'ReactNode' } } },
    homeHref: { control: 'text', table: { defaultValue: { summary: DECK_FOOTER_DEFAULTS.homeHref } } },
    homeLabel: { control: 'text', table: { defaultValue: { summary: DECK_FOOTER_DEFAULTS.homeLabel } } },
    className: { control: false, table: { disable: true } },
  },
} satisfies Meta<typeof DeckFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { tags: ['dev'] };

export const Cierre: Story = {
  parameters: { docs: { description: { story: 'El pie completo. Cambia el **Tema**: el halo es gris sobre papel y un resplandor blanco sobre negro.' } } },
};
