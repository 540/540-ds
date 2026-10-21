import type { Meta, StoryObj } from '@storybook/react-vite';
import { Statements } from './Statements';
import { STATEMENTS_DEFAULTS } from './types';
import doc from './_docs/Statements.md?raw';

const TESIS = ['La primera tesis de la charla.', 'La segunda tesis, en una línea.', 'La tercera tesis, que cierra.'];
const MANIFIESTO = [
  'Primera parada del recorrido.',
  'Segunda parada del recorrido.',
  'Tercera parada del recorrido.',
  'Cuarta parada del recorrido.',
  'Quinta parada del recorrido.',
  'Sexta parada del recorrido.',
];

const meta = {
  title: 'Organismos/Statements',
  component: Statements,
  tags: ['autodocs', '!dev'],
  parameters: { docs: { description: { component: doc } }, layout: 'fullscreen' },
  args: { ...STATEMENTS_DEFAULTS, sentences: TESIS },
  argTypes: {
    id: { control: 'text', table: { defaultValue: { summary: STATEMENTS_DEFAULTS.id } } },
    sentences: { control: 'object', description: 'Las frases, en orden. Cada una es una parada.', table: { type: { summary: 'ReactNode[]' } } },
    numbered: { control: 'boolean', description: 'Ordinal decorativo delante de cada frase.', table: { defaultValue: { summary: 'true' } } },
    className: { control: false, table: { disable: true } },
  },
} satisfies Meta<typeof Statements>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { tags: ['dev'] };

export const TresTesis: Story = {
  name: 'Tres tesis',
  parameters: { docs: { description: { story: 'Las tres tesis de una charla, numeradas. Dentro de un Deck, cada una es una parada.' } } },
};

export const Manifiesto: Story = {
  parameters: { docs: { description: { story: 'Seis paradas sin ordinal, una frase cada una.' } } },
  args: { id: 'manifiesto', sentences: MANIFIESTO, numbered: false },
};
