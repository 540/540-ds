import type { Meta, StoryObj } from '@storybook/react-vite';
import { Story as StoryBlock } from './Story';
import { STORY_DEFAULTS } from './types';
import doc from './_docs/Story.md?raw';

const meta = {
  title: 'Organismos/Story',
  component: StoryBlock,
  tags: ['autodocs', '!dev'],
  parameters: { docs: { description: { component: doc } }, layout: 'fullscreen' },
  args: {
    id: 'historia',
    title: 'Título de la historia',
    paragraphs: [
      'Un primer párrafo que cuenta lo que pasó, en dos o tres frases cortas, a media retícula y en gris.',
      'Un segundo párrafo que sigue la historia y deja la idea lista para el puente.',
    ],
    bridge: 'El puente a la siguiente parada, en negro.',
    ...STORY_DEFAULTS,
  },
  argTypes: {
    id: { control: 'text', table: { type: { summary: 'string' } } },
    title: { control: 'text', table: { type: { summary: 'ReactNode' } } },
    paragraphs: { control: 'object', description: 'Los párrafos, en gris.', table: { type: { summary: 'ReactNode[]' } } },
    bridge: { control: 'text', description: 'La última frase, en negro.', table: { type: { summary: 'ReactNode' } } },
    kind: { control: 'inline-radio', options: ['story', 'objection'], description: '`story` en title-m; `objection` en title-s.', table: { defaultValue: { summary: STORY_DEFAULTS.kind } } },
    tone: { control: 'inline-radio', options: ['default', 'raised'], table: { defaultValue: { summary: STORY_DEFAULTS.tone } } },
    className: { control: false, table: { disable: true } },
  },
} satisfies Meta<typeof StoryBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { tags: ['dev'] };

export const Historia: Story = {
  parameters: { docs: { description: { story: 'Una historia: título en title-m, dos párrafos en gris y el puente en negro, sobre banda levantada.' } } },
};

export const Objecion: Story = {
  name: 'Objeción',
  parameters: { docs: { description: { story: 'Una objeción: el título baja a title-s y el cuerpo responde a la pega.' } } },
  args: {
    id: 'objecion',
    kind: 'objection',
    title: '«La pega que alguien pondría»',
    paragraphs: ['La respuesta a esa pega, en un párrafo corto que la reconoce y la desmonta.'],
    bridge: undefined,
  },
};
