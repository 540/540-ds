import type { Meta, StoryObj } from '@storybook/react-vite';
import { SectionHeader } from '../../molecules/SectionHeader';
import { Stack } from '../../molecules/Stack';
import { Slide } from '../Slide';
import { Step, Steps } from '../Steps';
import { BarSeries } from './BarSeries';
import { BAR_SERIES_DEFAULTS } from './types';
import doc from './_docs/BarSeries.md?raw';

const ROWS = [
  { label: 'Primera categoría', values: [412, 356] },
  { label: 'Segunda categoría', values: [268, 301] },
  { label: 'Tercera categoría', values: [154, 120] },
  { label: 'Cuarta categoría', values: [97, 140] },
];
const YEARS = [{ label: '2026' }, { label: '2025' }];

const meta = {
  title: 'Organismos/BarSeries',
  component: BarSeries,
  tags: ['autodocs', '!dev'],
  parameters: { docs: { description: { component: doc } }, layout: 'padded' },
  args: { rows: ROWS, series: YEARS, label: 'Personas por categoría y año', ...BAR_SERIES_DEFAULTS },
  argTypes: {
    rows: { control: false, description: 'Las filas: un nombre y una cifra por serie.', table: { type: { summary: 'BarSeriesRow[]' } } },
    series: { control: false, description: 'De una a tres series: nombre y color.', table: { type: { summary: 'BarSeriesSerie[]' } } },
    label: { control: 'text', description: 'Nombre accesible de la gráfica.' },
    mode: { control: 'inline-radio', options: ['grouped', 'stacked'], description: 'Agrupadas (una barra fina por serie) o apiladas (una barra partida, con el total).', table: { defaultValue: { summary: 'grouped' } } },
    max: { control: 'number', description: 'El valor de una barra entera. Por defecto, la mayor cifra (o el mayor total, si van apiladas).' },
    unit: { control: 'text', description: 'Texto detrás de cada cifra (« %»).' },
    decimals: { control: 'number', description: 'Decimales de las cifras.', table: { defaultValue: { summary: '0' } } },
    className: { control: false, table: { disable: true } },
  },
} satisfies Meta<typeof BarSeries>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { tags: ['dev'] };

export const Agrupadas: Story = {
  parameters: { docs: { description: { story: 'Dos series por fila: la que cuenta la historia en tinta y la de contexto en gris, cada una con su cifra.' } } },
};

export const Apiladas: Story = {
  parameters: { docs: { description: { story: '`mode="stacked"`: una barra por fila partida en sus series, con el total en la punta. Para ver de qué se compone cada total.' } } },
  args: {
    mode: 'stacked',
    label: 'Personas por categoría y canal',
    series: [{ label: 'Web' }, { label: 'App' }],
    rows: [
      { label: 'Primera categoría', values: [210, 140] },
      { label: 'Segunda categoría', values: [120, 98] },
      { label: 'Tercera categoría', values: [64, 60] },
      { label: 'Cuarta categoría', values: [40, 35] },
    ],
  },
};

export const ConAcento: Story = {
  name: 'Con acento',
  parameters: { docs: { description: { story: 'La serie que importa en amarillo y la otra en gris. Un acento por gráfica.' } } },
  args: { label: 'Conversión frente al sector', unit: ' %', decimals: 1, series: [{ label: 'Nosotros', tone: 'accent' }, { label: 'Media del sector', tone: 'context' }], rows: [{ label: 'Primer trimestre', values: [3.1, 2.4] }, { label: 'Segundo trimestre', values: [3.6, 2.5] }, { label: 'Tercer trimestre', values: [4.2, 2.6] }] },
};

export const PorPasos: Story = {
  name: 'Por pasos',
  parameters: { docs: { description: { story: 'Dentro de un `Steps`: en el paso 0, los totales apilados; en el paso 1, las mismas series agrupadas para compararlas. Pulsa dentro y usa →.' } } },
  render: () => (
    <Slide id="barras-series">
      <Steps total={1}>
        <Stack>
          <SectionHeader title="Título de la parada" description="Una frase que dice qué se compara." align="center" />
          <Step from={0} to={1} collapse>
            <BarSeries label="Personas por categoría, dos años sumados" mode="stacked" rows={ROWS} series={YEARS} />
          </Step>
          <Step from={1} collapse>
            <BarSeries label="Personas por categoría y año" rows={ROWS} series={YEARS} />
          </Step>
        </Stack>
      </Steps>
    </Slide>
  ),
};
