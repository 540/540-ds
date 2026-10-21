import type { Meta, StoryObj } from '@storybook/react-vite';
import { Footer } from './Footer';
import { FOOTER_DEFAULTS } from './types';
import doc from './_docs/Footer.md?raw';

const GROUPS = [
  {
    title: 'Estudio',
    items: [
      { label: 'Servicios', href: '#servicios' },
      { label: 'Portfolio', href: '#portfolio' },
      { label: 'Equipo', href: '#equipo' },
      { label: 'Formación', href: '#formacion' },
    ],
  },
  {
    title: 'Contacto',
    items: [
      { label: 'hola@540deg.com', href: 'mailto:hola@540deg.com' },
      { label: 'Calle M 30, Polígono Mutilva', href: '#mapa' },
      { label: '31192 Mutilva, Navarra', href: '#mapa' },
    ],
  },
];

const NETWORKS = [
  { network: 'linkedin' as const, href: '#linkedin', label: 'LinkedIn de 540' },
  { network: 'x' as const, href: '#x', label: 'X de 540' },
  { network: 'instagram' as const, href: '#instagram', label: 'Instagram de 540' },
];

const LEGAL = [
  { label: 'Aviso legal', href: '#aviso' },
  { label: 'Privacidad', href: '#privacidad' },
  { label: 'Cookies', href: '#cookies' },
];

const meta = {
  title: 'Moléculas/Footer',
  component: Footer,
  tags: ['autodocs', '!dev'],
  parameters: { docs: { description: { component: doc } }, layout: 'padded' },
  args: {
    tagline: 'Estudio de desarrolladores y desarrolladoras de software. Agilidad y sencillez, humana y tecnológica.',
    groups: GROUPS,
    networks: NETWORKS,
    copyright: '© 2026 540',
    legal: LEGAL,
    ...FOOTER_DEFAULTS,
  },
  argTypes: {
    tagline: { control: 'text', description: 'Una línea sobre la marca, a 38 caracteres. Opcional.', table: { type: { summary: 'ReactNode' } } },
    groups: { control: false, description: 'Columnas de enlaces: título y lista.', table: { type: { summary: 'FooterGroup[]' } } },
    networks: { control: false, description: 'Las redes: se elige la red, no se pasa el icono. Cada una con su nombre.', table: { type: { summary: 'FooterNetwork[]' } } },
    networksTitle: { control: 'text', description: 'Etiqueta del grupo de redes.', table: { defaultValue: { summary: FOOTER_DEFAULTS.networksTitle } } },
    copyright: { control: 'text', description: 'La firma.', table: { type: { summary: 'ReactNode' } } },
    legal: { control: false, description: 'Avisos legales, a la derecha de la firma.', table: { type: { summary: 'FooterLink[]' } } },
    homeHref: { control: 'text', table: { defaultValue: { summary: FOOTER_DEFAULTS.homeHref } } },
    homeLabel: { control: 'text', table: { defaultValue: { summary: FOOTER_DEFAULTS.homeLabel } } },
    className: { control: false, table: { disable: true } },
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { tags: ['dev'] };

export const Completo: Story = {
  parameters: {
    docs: {
      description: {
        story: 'El pie de la web: marca con lema, dos columnas, las tres redes y el cierre con los avisos legales. Pasa el ratón por los enlaces (subrayado) y por las redes (dorado).',
      },
    },
  },
};

export const SoloFirma: Story = {
  name: 'Solo firma',
  parameters: { docs: { description: { story: 'Sin lema, columnas ni redes, la parte de arriba no existe: el pie se queda en la firma, no en una franja vacía.' } } },
  args: { tagline: undefined, groups: [], networks: [], legal: [] },
};

export const DeCharla: Story = {
  name: 'De charla',
  parameters: { docs: { description: { story: 'Lo que lleva el pie de una charla: logotipo, lema corto, redes y la firma. Sin columnas: en una charla no hay a dónde ir.' } } },
  args: { tagline: 'Una charla sobre dejar de entregar pantallas y entregar el sistema que las produce.', groups: [], legal: [] },
};
