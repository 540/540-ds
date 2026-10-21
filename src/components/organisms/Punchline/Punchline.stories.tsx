import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from '../../molecules/Card';
import { SectionHeader } from '../../molecules/SectionHeader';
import { Slide } from '../Slide';
import { Punchline } from './Punchline';
import { PUNCHLINE_DEFAULTS } from './types';
import doc from './_docs/Punchline.md?raw';

const meta = {
  title: 'Organismos/Punchline',
  component: Punchline,
  tags: ['autodocs', '!dev'],
  parameters: { docs: { description: { component: doc } }, layout: 'fullscreen' },
  args: {
    sentence: 'La frase que remata el bloque.',
    transition: 'La transición a lo que viene después, en gris.',
    ...PUNCHLINE_DEFAULTS,
  },
  argTypes: {
    sentence: { control: 'text', table: { type: { summary: 'ReactNode' } } },
    transition: { control: 'text', description: 'El puente a la siguiente parada, en gris.', table: { type: { summary: 'ReactNode' } } },
    placement: { control: 'inline-radio', options: ['inside', 'standalone'], table: { defaultValue: { summary: PUNCHLINE_DEFAULTS.placement } } },
    id: { control: 'text', description: 'Solo para standalone.', table: { type: { summary: 'string' } } },
    className: { control: false, table: { disable: true } },
  },
} satisfies Meta<typeof Punchline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { tags: ['dev'], args: { placement: 'standalone', id: 'remate' } };

export const DentroDeUnaParada: Story = {
  name: 'Dentro de una parada',
  parameters: { docs: { description: { story: 'Dos tarjetas y, debajo, el remate con su línea y la transición.' } } },
  render: (args) => (
    <Slide id="grietas">
      <div style={{ display: 'grid', gap: 'var(--space-3xl)' }}>
        <SectionHeader title="Título de la parada" description="Una entradilla corta que presenta las dos tarjetas." align="center" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--grid-gutter)', textAlign: 'start' }}>
          <Card title="Primera tarjeta" align="center">
            Dos o tres frases sobre lo que dice esta tarjeta.
          </Card>
          <Card title="Segunda tarjeta" align="center">
            Dos o tres frases sobre lo que dice esta otra.
          </Card>
        </div>
        <Punchline {...args} placement="inside" />
      </div>
    </Slide>
  ),
};

export const ParadaPropia: Story = {
  name: 'Parada propia',
  parameters: { docs: { description: { story: 'El remate como parada entre dos bloques.' } } },
  args: { placement: 'standalone', id: 'remate' },
};
