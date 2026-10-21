import type { Meta, StoryObj } from '@storybook/react-vite';
import { TeamMember } from './TeamMember';
import { TEAM_MEMBER_ALIGNS, TEAM_MEMBER_DEFAULTS } from './types';
import doc from './_docs/TeamMember.md?raw';
import retrato from '../../../assets/samples/retrato.svg';

const PERSONA = {
  src: retrato,
  name: 'Markel Aldaz',
  role: 'Head of Engineering',
  bio: 'Lleva el equipo de desarrollo y las decisiones de arquitectura. Ahora, con el sistema de diseño en código.',
};

const meta = {
  title: 'Moléculas/TeamMember',
  component: TeamMember,
  tags: ['autodocs', '!dev'],
  parameters: { docs: { description: { component: doc } }, layout: 'padded' },
  args: { ...PERSONA, ...TEAM_MEMBER_DEFAULTS },
  argTypes: {
    src: { control: 'text', description: 'El retrato. Se recorta a 1:1 por el centro.', table: { type: { summary: 'string' } } },
    name: { control: 'text', description: 'El nombre, un h3.', table: { type: { summary: 'ReactNode' } } },
    role: { control: 'text', description: 'El puesto, escrito en caja normal; el estilo pone las mayúsculas.', table: { type: { summary: 'ReactNode' } } },
    bio: { control: 'text', description: 'Dos o tres líneas, opcional.', table: { type: { summary: 'ReactNode' } } },
    align: {
      control: 'inline-radio',
      options: [...TEAM_MEMBER_ALIGNS],
      description: '`start`: puesto delante del nombre. `center`: nombre delante y el puesto hace de pie de foto.',
      table: { type: { summary: TEAM_MEMBER_ALIGNS.join(' | ') }, defaultValue: { summary: TEAM_MEMBER_DEFAULTS.align } },
    },
    href: { control: 'text', description: 'Con página, el nombre es el enlace, no la tarjeta.', table: { type: { summary: 'string' } } },
    level: { control: 'inline-radio', options: ['h2', 'h3', 'h4'], description: 'Nivel del nombre.', table: { defaultValue: { summary: TEAM_MEMBER_DEFAULTS.level } } },
    className: { control: false, table: { disable: true } },
  },
} satisfies Meta<typeof TeamMember>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  tags: ['dev'],
  parameters: { layout: 'centered' },
  render: (args) => (
    <div style={{ width: 320 }}>
      <TeamMember {...args} />
    </div>
  ),
};

export const Alineaciones: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Al margen (puesto, nombre, bio) y centrada (nombre, puesto, bio). Es el orden del documento, no solo el del CSS.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 320px)', gap: 'var(--grid-gutter-wide)' }}>
      <TeamMember {...PERSONA} align="start" />
      <TeamMember {...PERSONA} align="center" />
    </div>
  ),
};

export const EnFila: Story = {
  name: 'En fila',
  parameters: { docs: { description: { story: 'Tres fichas en una fila de tres (384 px cada una). El retrato sigue el ancho de la ficha; la misma pieza vale a 240 en una tira.' } } },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--grid-gutter)' }}>
      <TeamMember {...PERSONA} href="#markel" />
      <TeamMember {...PERSONA} name="Olaia Merino" role="Head of Design" bio="Diseño de producto y del sistema. Ahora, llevando el sistema a Storybook." href="#olaia" />
      <TeamMember {...PERSONA} name="Miguel Arbea" role="Head of Delivery" bio="Entrega y relación con el cliente. Lo que se contrata es lo que se entrega." href="#miguel" />
    </div>
  ),
};
