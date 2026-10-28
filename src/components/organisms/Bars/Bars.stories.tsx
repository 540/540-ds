import type { Meta, StoryObj } from '@storybook/react-vite';
import { SectionHeader } from '../../molecules/SectionHeader';
import { Stack } from '../../molecules/Stack';
import { Slide } from '../Slide';
import { Step, Steps } from '../Steps';
import { Bars } from './Bars';
import { BARS_DEFAULTS } from './types';
import doc from './_docs/Bars.md?raw';

const ROWS = [
  { label: 'Primera categoría', value: 412 },
  { label: 'Segunda categoría', value: 268 },
  { label: 'Tercera categoría', value: 154 },
  { label: 'Cuarta categoría', value: 97 },
  { label: 'Quinta categoría', value: 61, tone: 'context' as const },
  { label: 'El resto', value: 38, tone: 'context' as const },
];

const meta = {
  title: 'Organismos/Bars',
  component: Bars,
  tags: ['autodocs', '!dev'],
  parameters: { docs: { description: { component: doc } }, layout: 'padded' },
  args: { rows: ROWS, label: 'Personas por categoría', ...BARS_DEFAULTS },
  argTypes: {
    rows: { control: false, description: 'Las filas.', table: { type: { summary: 'Bar[]' } } },
    label: { control: 'text', description: 'Nombre accesible de la gráfica.' },
    header: { control: false, description: 'Nombres de las columnas, opcionales.', table: { type: { summary: '{ label, value?, detail? }' } } },
    max: { control: 'number', description: 'El valor de una barra entera. Por defecto, la fila mayor.' },
    unit: { control: 'text', description: 'Texto detrás de cada cifra (« %»).' },
    decimals: { control: 'number', description: 'Decimales de las cifras.', table: { defaultValue: { summary: '0' } } },
    className: { control: false, table: { disable: true } },
  },
} satisfies Meta<typeof Bars>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { tags: ['dev'] };

export const Ranking: Story = {
  parameters: { docs: { description: { story: 'Seis filas: cuatro en tinta, las dos últimas en gris de contexto.' } } },
};

export const ConCabeceraYDetalle: Story = {
  name: 'Con cabecera y detalle',
  parameters: { docs: { description: { story: 'Una tabla de barras: cabecera de columnas, cifra escrita como se dice y una columna de detalle. La fila que importa va en amarillo.' } } },
  args: {
    label: 'Piezas por vistas',
    header: { label: 'Pieza', value: 'Vistas', detail: 'Interacción · Altas' },
    rows: [
      { label: '#1 Título de la primera pieza', value: 2140, display: '2140', detail: '45,9 % · 12 altas', tone: 'accent' },
      { label: '#2 Título de la segunda', value: 1630, display: '1630', detail: '38,2 % · 8 altas' },
      { label: '#3 Título de la tercera', value: 1210, display: '1210', detail: '41,0 % · 5 altas' },
      { label: '#4 Título de la cuarta', value: 860, display: '860', detail: '29,4 % · 2 altas', tone: 'context' },
    ],
  },
};

export const PorPasos: Story = {
  name: 'Por pasos',
  parameters: { docs: { description: { story: 'Dentro de un `Steps`: las barras crecen en el paso 0 y en el paso 1 se atenúa todo menos la primera fila. Pulsa dentro y usa →.' } } },
  render: () => (
    <Slide id="barras">
      <Steps total={1}>
        <Stack>
          <SectionHeader title="Título de la parada" description="Una frase que dice qué se compara." align="center" />
          <Step from={0} to={1} collapse>
            <Bars label="Personas por categoría" rows={ROWS} />
          </Step>
          <Step from={1} collapse>
            <Bars label="Personas por categoría, destacada la primera" rows={ROWS.map((r, i) => ({ ...r, dimmed: i > 0 }))} />
          </Step>
        </Stack>
      </Steps>
    </Slide>
  ),
};
