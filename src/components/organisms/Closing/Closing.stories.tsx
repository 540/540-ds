import type { Meta, StoryObj } from '@storybook/react-vite';
import { Closing } from './Closing';
import { CLOSING_DEFAULTS } from './types';
import doc from './_docs/Closing.md?raw';

const meta = {
  title: 'Organismos/Closing',
  component: Closing,
  tags: ['autodocs', '!dev'],
  parameters: { docs: { description: { component: doc } }, layout: 'fullscreen' },
  args: {
    ...CLOSING_DEFAULTS,
    sentence: (
      <>
        La primera parte de la frase. <strong>Y el giro que se quiere que se quede.</strong>
      </>
    ),
  },
  argTypes: {
    id: { control: 'text', table: { defaultValue: { summary: CLOSING_DEFAULTS.id } } },
    sentence: { control: false, description: 'La frase de cierre, en statement.', table: { type: { summary: 'ReactNode' } } },
    body: { control: false, description: 'Párrafos opcionales a media retícula.', table: { type: { summary: 'ReactNode[]' } } },
    punchline: { control: 'text', description: 'La última línea, en primario.', table: { type: { summary: 'ReactNode' } } },
    className: { control: false, table: { disable: true } },
  },
} satisfies Meta<typeof Closing>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { tags: ['dev'] };

export const SoloFrase: Story = {
  name: 'Solo frase',
  parameters: { docs: { description: { story: 'Un cierre de una sola frase, con el giro en negrita, y nada más.' } } },
};

export const ConCuerpo: Story = {
  name: 'Con cuerpo',
  parameters: { docs: { description: { story: 'La frase y, debajo, dos párrafos en gris y el remate en negro, todo a media retícula.' } } },
  args: {
    sentence: 'La frase de cierre.',
    body: ['Un primer párrafo de cuerpo que matiza la frase, a media retícula y en gris.', 'Un segundo párrafo, igual de corto, que termina la idea.'],
    punchline: 'La última línea, en negro.',
  },
};
