import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from '../../atoms/Text';
import { SectionHeader } from '../../molecules/SectionHeader';
import { Slide } from './Slide';
import { SLIDE_DEFAULTS, SLIDE_TONES } from './types';
import doc from './_docs/Slide.md?raw';

const meta = {
  title: 'Organismos/Slide',
  component: Slide,
  tags: ['autodocs', '!dev'],
  parameters: { docs: { description: { component: doc } }, layout: 'fullscreen' },
  args: {
    id: 'parada',
    ...SLIDE_DEFAULTS,
    children: (
      <div style={{ display: 'grid', gap: 'var(--space-xl)', justifyItems: 'center' }}>
        <SectionHeader title="Una parada de la charla" description="El contenido va centrado en un escenario 16:9 dentro de la columna." align="center" />
      </div>
    ),
  },
  argTypes: {
    id: { control: 'text', description: 'El ancla de la parada.', table: { type: { summary: 'string' } } },
    tone: {
      control: 'inline-radio',
      options: [...SLIDE_TONES],
      description: '`default` deja ver las manchas; `raised` sube un peldaño.',
      table: { type: { summary: SLIDE_TONES.join(' | ') }, defaultValue: { summary: SLIDE_DEFAULTS.tone } },
    },
    full: { control: 'boolean', description: 'Ocupa la pantalla entera y centra. Apagado para títulos de bloque con foto.', table: { defaultValue: { summary: 'true' } } },
    children: { control: false, table: { type: { summary: 'ReactNode' } } },
    className: { control: false, table: { disable: true } },
  },
} satisfies Meta<typeof Slide>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { tags: ['dev'] };

export const Pantalla: Story = {
  parameters: { docs: { description: { story: 'Una parada a pantalla completa. Cambia el **Viewport** a Escritorio (1440) para verla como en una sala; el escenario no pasa de 16:9.' } } },
  args: { id: 'pantalla' },
};

export const Raised: Story = {
  parameters: { docs: { description: { story: 'La banda levantada un peldaño: la de las historias, objeciones y citas.' } } },
  args: {
    id: 'historia',
    tone: 'raised',
    children: (
      <div style={{ display: 'grid', gap: 'var(--space-xl)', justifyItems: 'center' }}>
        <Text as="h2" variant="title-m" wrap="balance">
          Lo que creía
        </Text>
        <Text variant="body-l" tone="secondary" wrap="pretty" measure="half" align="center">
          Que un sistema de diseño era un archivo de Figma bien ordenado. Que si las pantallas estaban limpias, el resto venía solo.
        </Text>
      </div>
    ),
  },
};

export const SinAltoMinimo: Story = {
  name: 'Sin alto mínimo',
  parameters: { docs: { description: { story: 'Con `full={false}` la parada mide lo que su contenido: es la del título de bloque, que va con su foto justo debajo.' } } },
  args: {
    id: 'bloque',
    full: false,
    children: (
      <div style={{ display: 'grid', gap: 'var(--space-l)', justifyItems: 'center' }}>
        <Text variant="micro-light" tone="secondary" as="span" aria-hidden="true">
          01
        </Text>
        <SectionHeader title="Lo desechable" align="center" />
      </div>
    ),
  },
};
