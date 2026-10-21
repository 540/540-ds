import type { Meta, StoryObj } from '@storybook/react-vite';
import { Cover } from './Cover';
import { COVER_DEFAULTS } from './types';
import doc from './_docs/Cover.md?raw';
import fachada from '../../../assets/samples/charla-fachada.webp';
import logoCliente from '../../../assets/samples/logo-cliente.svg';

const meta = {
  title: 'Organismos/Cover',
  component: Cover,
  tags: ['autodocs', '!dev'],
  parameters: { docs: { description: { component: doc } }, layout: 'fullscreen' },
  args: {
    ...COVER_DEFAULTS,
    title: ['Primera línea del titular', 'y segunda línea del titular'],
    question: '¿La pregunta que abre la charla, en una o dos líneas?',
    event: 'Nombre del evento · 2026',
    client: { light: logoCliente, dark: logoCliente, alt: 'Logotipo del cliente' },
    photo: { src: fachada, alt: 'Descripción de la foto de portada' },
  },
  argTypes: {
    id: { control: 'text', table: { defaultValue: { summary: COVER_DEFAULTS.id } } },
    title: { control: 'object', description: 'Las líneas del titular, una por elemento.', table: { type: { summary: 'string[]' } } },
    question: { control: 'text', description: 'La pregunta, a media retícula.', table: { type: { summary: 'ReactNode' } } },
    lead: { control: 'text', description: 'La entrada, a media retícula.', table: { type: { summary: 'ReactNode' } } },
    event: { control: 'text', description: 'La ficha del evento.', table: { type: { summary: 'ReactNode' } } },
    client: { control: false, description: 'Logotipo del cliente, con archivo claro y oscuro.', table: { type: { summary: '{ light, dark, alt }' } } },
    photo: { control: false, description: 'La foto a sangre, 2:1.', table: { type: { summary: '{ src, alt }' } } },
    className: { control: false, table: { disable: true } },
  },
} satisfies Meta<typeof Cover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { tags: ['dev'] };

export const Completa: Story = {
  parameters: { docs: { description: { story: 'Titular en dos líneas, pregunta, ficha, logotipo del cliente y foto a sangre pegada abajo. Cambia el **Viewport** para ver el statement fluido.' } } },
};

export const SoloTitular: Story = {
  name: 'Solo titular',
  parameters: { docs: { description: { story: 'Una portada mínima: titular y pregunta. Sin cliente ni foto.' } } },
  args: { event: undefined, client: undefined, photo: undefined },
};
