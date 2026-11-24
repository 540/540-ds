import type { Meta, StoryObj } from '@storybook/react-vite';
import { SectionHeader } from '../../molecules/SectionHeader';
import { Stack } from '../../molecules/Stack';
import { Slide } from '../Slide';
import { Step, Steps } from '../Steps';
import { Dumbbell } from './Dumbbell';
import { DUMBBELL_DEFAULTS } from './types';
import doc from './_docs/Dumbbell.md?raw';

const ROWS = [
  { label: 'Primera categoría', before: 52, after: 71 },
  { label: 'Segunda categoría', before: 64, after: 78 },
  { label: 'Tercera categoría', before: 70, after: 74 },
  { label: 'Cuarta categoría', before: 58, after: 49 },
  { label: 'Quinta categoría', before: 41, after: 62 },
];
const LABELS = { before: '2025', after: '2026' };

const meta = {
  title: 'Organismos/Dumbbell',
  component: Dumbbell,
  tags: ['autodocs', '!dev'],
  parameters: { docs: { description: { component: doc } }, layout: 'padded' },
  args: { rows: ROWS, labels: LABELS, label: 'Satisfacción por categoría, antes y después', ...DUMBBELL_DEFAULTS },
  argTypes: {
    rows: { control: false, description: 'Las filas: un nombre, la cifra de antes y la de después.', table: { type: { summary: 'DumbbellRow[]' } } },
    labels: { control: false, description: 'Los nombres de los dos momentos, para la leyenda.', table: { type: { summary: '{ before, after }' } } },
    label: { control: 'text', description: 'Nombre accesible de la gráfica.' },
    min: { control: 'number', description: 'Mínimo de la escala. Por defecto, un número redondo bajo la menor cifra.' },
    max: { control: 'number', description: 'Máximo de la escala. Por defecto, un número redondo sobre la mayor cifra.' },
    unit: { control: 'text', description: 'Texto detrás de cada cifra (« %»).' },
    decimals: { control: 'number', description: 'Decimales de las cifras.', table: { defaultValue: { summary: '0' } } },
    tone: { control: 'select', options: ['ink', 'accent'], description: 'Color del punto de después. El de antes siempre es gris.', table: { defaultValue: { summary: 'ink' } } },
    change: { control: 'boolean', description: 'Escribe la diferencia junto a la cifra de después.', table: { defaultValue: { summary: 'true' } } },
    className: { control: false, table: { disable: true } },
  },
} satisfies Meta<typeof Dumbbell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { tags: ['dev'] };

export const AntesYDespues: Story = {
  name: 'Antes y después',
  parameters: { docs: { description: { story: 'Antes en gris, después en tinta. Al llegar a la pantalla, cada punto viaja desde su cifra de antes; a la derecha, la de después y la diferencia.' } } },
};

export const ConAcento: Story = {
  name: 'Con acento',
  parameters: { docs: { description: { story: '`tone="accent"`: el después en amarillo, cuando ese cambio es el mensaje de la parada. Cuenta para la cuota de amarillo.' } } },
  args: { tone: 'accent', unit: ' %', decimals: 1, label: 'Conversión por canal, antes y después', rows: [{ label: 'Primer canal', before: 2.1, after: 3.4 }, { label: 'Segundo canal', before: 1.8, after: 2.6 }, { label: 'Tercer canal', before: 3.0, after: 2.7 }] },
};

export const SinDiferencia: Story = {
  name: 'Sin diferencia',
  parameters: { docs: { description: { story: '`change={false}` y `display`: solo la cifra de después, escrita como se dice.' } } },
  args: { change: false, rows: ROWS.map((r) => ({ ...r, display: `${r.after} de 100` })) },
};

export const PorPasos: Story = {
  name: 'Por pasos',
  parameters: { docs: { description: { story: 'Dentro de un `Steps`: en el paso 0, el cambio en tinta y sin diferencias; en el paso 1, el mismo con el después en amarillo y la diferencia escrita. Pulsa dentro y usa →.' } } },
  render: () => (
    <Slide id="antes-despues">
      <Steps total={1}>
        <Stack>
          <SectionHeader title="Título de la parada" description="Una frase que dice qué cambió." align="center" />
          <Step from={0} to={1} collapse>
            <Dumbbell label="Satisfacción por categoría, antes y después" labels={LABELS} rows={ROWS} change={false} />
          </Step>
          <Step from={1} collapse>
            <Dumbbell label="Satisfacción por categoría, antes y después, con la diferencia" labels={LABELS} rows={ROWS} tone="accent" />
          </Step>
        </Stack>
      </Steps>
    </Slide>
  ),
};
