import type { Meta, StoryObj } from '@storybook/react-vite';
import { Marquee } from './Marquee';
import { MARQUEE_DEFAULTS } from './types';
import doc from './_docs/Marquee.md?raw';

const ITEMS = ['Palabra uno', 'Palabra dos', 'Palabra tres', 'Palabra cuatro', 'Palabra cinco', 'Palabra seis', 'Palabra siete', 'Palabra ocho', 'Palabra nueve', 'Palabra diez'].map(
  (w) => `${w} ·`,
);

const meta = {
  title: 'Organismos/Marquee',
  component: Marquee,
  tags: ['autodocs', '!dev'],
  parameters: { docs: { description: { component: doc } }, layout: 'fullscreen' },
  args: { items: ITEMS, ...MARQUEE_DEFAULTS },
  argTypes: {
    items: { control: 'object', description: 'Las piezas. Se repiten una vez para el bucle.', table: { type: { summary: 'ReactNode[]' } } },
    duration: { control: { type: 'number', min: 10, max: 120 }, description: 'Segundos por vuelta.', table: { defaultValue: { summary: String(MARQUEE_DEFAULTS.duration) } } },
    className: { control: false, table: { disable: true } },
  },
} satisfies Meta<typeof Marquee>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { tags: ['dev'] };

export const Tira: Story = {
  parameters: { docs: { description: { story: 'Diez piezas en bucle entre dos líneas. Pasa el ratón para pararla.' } } },
};
