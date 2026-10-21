import type { Meta, StoryObj } from '@storybook/react-vite';
import { Quote } from './Quote';
import { QUOTE_DEFAULTS } from './types';
import doc from './_docs/Quote.md?raw';

const meta = {
  title: 'Organismos/Quote',
  component: Quote,
  tags: ['autodocs', '!dev'],
  parameters: { docs: { description: { component: doc } }, layout: 'fullscreen' },
  args: {
    id: 'cita',
    sentence: 'La frase que dijo alguien.',
    author: 'Nombre Apellido, dónde o cuándo lo dijo',
    ...QUOTE_DEFAULTS,
  },
  argTypes: {
    id: { control: 'text', table: { type: { summary: 'string' } } },
    sentence: { control: 'text', table: { type: { summary: 'ReactNode' } } },
    author: { control: 'text', table: { type: { summary: 'ReactNode' } } },
    tone: { control: 'inline-radio', options: ['default', 'raised'], table: { defaultValue: { summary: QUOTE_DEFAULTS.tone } } },
    className: { control: false, table: { disable: true } },
  },
} satisfies Meta<typeof Quote>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { tags: ['dev'] };

export const Cita: Story = {
  parameters: { docs: { description: { story: 'La frase en statement y, debajo, quién la dijo.' } } },
};
