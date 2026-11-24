import type { Meta, StoryObj } from '@storybook/react-vite';
import { SectionHeader } from '../../molecules/SectionHeader';
import { Stack } from '../../molecules/Stack';
import { Slide } from '../Slide';
import { Step, Steps } from '../Steps';
import { LineChart } from './LineChart';
import { LINE_CHART_DEFAULTS } from './types';
import doc from './_docs/LineChart.md?raw';

const MONTHS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
const ALTAS = { label: 'Altas', values: [120, 135, 150, 148, 172, 190, 185, 210, 236, 251, 270, 302] };
const BAJAS = { label: 'Bajas', values: [40, 42, 38, 45, 44, 50, 61, 58, 55, 52, 49, 47] };

const meta = {
  title: 'Organismos/LineChart',
  component: LineChart,
  tags: ['autodocs', '!dev'],
  parameters: { docs: { description: { component: doc } }, layout: 'padded' },
  args: { categories: MONTHS, series: [ALTAS], label: 'Altas por mes', ...LINE_CHART_DEFAULTS },
  argTypes: {
    categories: { control: false, description: 'Los puntos del eje horizontal, en orden.', table: { type: { summary: 'string[]' } } },
    series: { control: false, description: 'De una a tres series.', table: { type: { summary: 'LineSeries[]' } } },
    label: { control: 'text', description: 'Nombre accesible de la gráfica.' },
    area: { control: 'boolean', description: 'Rellena el área bajo cada línea.', table: { defaultValue: { summary: 'false' } } },
    min: { control: 'number', description: 'Mínimo del eje vertical. Por defecto 0.' },
    max: { control: 'number', description: 'Máximo del eje vertical. Por defecto, un número redondo sobre el mayor valor.' },
    unit: { control: 'text', description: 'Texto detrás de cada cifra (« %»).' },
    decimals: { control: 'number', description: 'Decimales de las cifras.', table: { defaultValue: { summary: '0' } } },
    className: { control: false, table: { disable: true } },
  },
} satisfies Meta<typeof LineChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { tags: ['dev'] };

export const UnaSerie: Story = {
  name: 'Una serie',
  parameters: { docs: { description: { story: 'Una línea en tinta. Pasa el ratón por encima, o tabula hasta ella y usa ← →, para ver cada cifra.' } } },
};

export const SerieYContexto: Story = {
  name: 'Serie y contexto',
  parameters: { docs: { description: { story: 'La serie que cuenta la historia en tinta y la que la acompaña en gris, con leyenda.' } } },
  args: { label: 'Altas y bajas por mes', series: [ALTAS, BAJAS] },
};

export const ConArea: Story = {
  name: 'Con área',
  parameters: { docs: { description: { story: '`area`: un relleno tenue bajo la línea, para hablar de volumen.' } } },
  args: { area: true },
};

export const ConPrevision: Story = {
  name: 'Con previsión',
  parameters: { docs: { description: { story: 'La medida en tinta, su previsión discontinua y la serie de contexto en gris, con leyenda.' } } },
  args: {
    label: 'Usuarios por plataforma',
    categories: ['2021', '2022', '2023', '2024', '2025', '2026'],
    series: [
      { label: 'App', values: [20, 28, 35, 44, 52, 61], tone: 'ink' },
      { label: 'Previsión de la app', values: [20, 28, 35, 44, 55, 70], tone: 'ink', dashed: true },
      { label: 'Web', values: [42, 48, 51, 55, 58, 60], tone: 'context' },
    ],
    unit: ' k',
  },
};

export const ConAcento: Story = {
  name: 'Con acento',
  parameters: { docs: { description: { story: 'La serie que importa en amarillo y el resto en gris. Un acento por gráfica.' } } },
  args: { label: 'Conversión frente al sector', unit: ' %', decimals: 1, series: [{ label: 'Nosotros', values: [2.1, 2.4, 2.2, 3.1, 3.6, 4.2], tone: 'accent' }, { label: 'Media del sector', values: [2.3, 2.3, 2.4, 2.5, 2.5, 2.6] }], categories: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'] },
};

export const PorPasos: Story = {
  name: 'Por pasos',
  parameters: { docs: { description: { story: 'Dentro de un `Steps`: en el paso 0 se dibuja la serie; en el paso 1, la misma con su contexto. Pulsa dentro y usa →.' } } },
  render: () => (
    <Slide id="lineas">
      <Steps total={1}>
        <Stack>
          <SectionHeader title="Título de la parada" description="Una frase que dice qué cambia." align="center" />
          <Step from={0} to={1} collapse>
            <LineChart label="Altas por mes" categories={MONTHS} series={[ALTAS]} />
          </Step>
          <Step from={1} collapse>
            <LineChart label="Altas y bajas por mes" categories={MONTHS} series={[ALTAS, BAJAS]} />
          </Step>
        </Stack>
      </Steps>
    </Slide>
  ),
};
