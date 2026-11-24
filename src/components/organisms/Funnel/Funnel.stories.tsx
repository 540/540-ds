import type { Meta, StoryObj } from '@storybook/react-vite';
import { SectionHeader } from '../../molecules/SectionHeader';
import { Stack } from '../../molecules/Stack';
import { Slide } from '../Slide';
import { Step, Steps } from '../Steps';
import { Funnel } from './Funnel';
import { FUNNEL_DEFAULTS } from './types';
import doc from './_docs/Funnel.md?raw';

const STEPS = [
  { label: 'Visitas', value: 12400 },
  { label: 'Ficha vista', value: 7690 },
  { label: 'Carrito', value: 2310 },
  { label: 'Pago iniciado', value: 1480 },
  { label: 'Compra', value: 1120 },
];

const meta = {
  title: 'Organismos/Funnel',
  component: Funnel,
  tags: ['autodocs', '!dev'],
  parameters: { docs: { description: { component: doc } }, layout: 'padded' },
  args: { steps: STEPS, label: 'De la visita a la compra', ...FUNNEL_DEFAULTS },
  argTypes: {
    steps: { control: false, description: 'Los pasos del proceso, en orden, del más ancho.', table: { type: { summary: 'FunnelStep[]' } } },
    label: { control: 'text', description: 'Nombre accesible de la gráfica.' },
    unit: { control: 'text', description: 'Texto detrás de cada cifra (« personas»).' },
    decimals: { control: 'number', description: 'Decimales de las cifras.', table: { defaultValue: { summary: '0' } } },
    tone: { control: 'select', options: ['ink', 'context', 'accent'], description: 'Color de las barras.', table: { defaultValue: { summary: 'ink' } } },
    className: { control: false, table: { disable: true } },
  },
} satisfies Meta<typeof Funnel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { tags: ['dev'] };

export const Embudo: Story = {
  parameters: { docs: { description: { story: 'Cinco pasos en tinta: cada barra, tan ancha como su cifra frente a la primera; entre dos pasos, cuántos siguieron.' } } },
};

export const ConAcento: Story = {
  name: 'Con acento',
  parameters: { docs: { description: { story: '`tone="accent"`: el embudo entero en amarillo, cuando es la gráfica que importa de la parada. Cuenta para la cuota de amarillo.' } } },
  args: { tone: 'accent' },
};

export const CifrasEscritas: Story = {
  name: 'Cifras escritas',
  parameters: { docs: { description: { story: '`display`: la cifra escrita como se dice («12,4 k»). La conversión se calcula siempre con el número.' } } },
  args: { steps: STEPS.map((s) => ({ ...s, display: s.value >= 10000 ? `${(s.value / 1000).toLocaleString('es-ES', { maximumFractionDigits: 1 })} k` : undefined })) },
};

export const PorPasos: Story = {
  name: 'Por pasos',
  parameters: { docs: { description: { story: 'Dentro de un `Steps`: en el paso 0, los tres primeros pasos; en el paso 1, el embudo entero. Pulsa dentro y usa →.' } } },
  render: () => (
    <Slide id="embudo">
      <Steps total={1}>
        <Stack>
          <SectionHeader title="Título de la parada" description="Una frase que dice dónde se pierde la gente." align="center" />
          <Step from={0} to={1} collapse>
            <Funnel label="De la visita al carrito" steps={STEPS.slice(0, 3)} />
          </Step>
          <Step from={1} collapse>
            <Funnel label="De la visita a la compra" steps={STEPS} />
          </Step>
        </Stack>
      </Steps>
    </Slide>
  ),
};
