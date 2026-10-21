import type { Meta, StoryObj } from '@storybook/react-vite';
import { SectionHeader } from './SectionHeader';
import { SECTION_HEADER_ALIGNS, SECTION_HEADER_DEFAULTS, SECTION_HEADER_LEVELS } from './types';
import doc from './_docs/SectionHeader.md?raw';

const meta = {
  title: 'Moléculas/SectionHeader',
  component: SectionHeader,
  tags: ['autodocs', '!dev'],
  parameters: { docs: { description: { component: doc } }, layout: 'padded' },
  args: {
    title: 'Herramientas que se quedan',
    description: 'Las cuatro que sobrevivieron a meses de probar. Ninguna es la más conocida de su categoría.',
    ...SECTION_HEADER_DEFAULTS,
  },
  argTypes: {
    title: { control: 'text', description: 'El título, siempre en `title-l`.', table: { type: { summary: 'ReactNode' } } },
    description: { control: 'text', description: 'La entradilla, opcional: una o dos frases en `body-m` secundario.', table: { type: { summary: 'ReactNode' } } },
    align: {
      control: 'inline-radio',
      options: [...SECTION_HEADER_ALIGNS],
      description: '`start` llena la columna; `center` se acota a media retícula y se centra.',
      table: { type: { summary: SECTION_HEADER_ALIGNS.join(' | ') }, defaultValue: { summary: SECTION_HEADER_DEFAULTS.align } },
    },
    level: {
      control: 'inline-radio',
      options: [...SECTION_HEADER_LEVELS],
      description: 'Nivel del encabezado. Un `h1` por página; las secciones en `h2`.',
      table: { type: { summary: SECTION_HEADER_LEVELS.join(' | ') }, defaultValue: { summary: SECTION_HEADER_DEFAULTS.level } },
    },
    titleId: { control: false, description: 'id del título para que la Section apunte a él con `aria-labelledby`.', table: { type: { summary: 'string' } } },
    className: { control: false, table: { disable: true } },
  },
} satisfies Meta<typeof SectionHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { tags: ['dev'], parameters: { layout: 'centered' } };

export const AlMargen: Story = {
  name: 'Al margen',
  parameters: { docs: { description: { story: 'La cabecera llena la columna: es la que va cuando hay una rejilla o algo al lado.' } } },
  args: { align: 'start' },
};

export const Centrada: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Acotada a media retícula (588 px) y centrada, con la medida de lectura puesta. Estrecha el viewport: es `max-width`, así que a 375 llena la ventana.',
      },
    },
  },
  args: { align: 'center' },
};

export const SinEntradilla: Story = {
  name: 'Sin entradilla',
  parameters: { docs: { description: { story: 'Solo el título. La entradilla es opcional y nunca más de dos frases.' } } },
  args: { align: 'center', description: undefined },
};
