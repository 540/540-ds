import type { Meta, StoryObj } from '@storybook/react-vite';
import { SectionHeader } from '../../molecules/SectionHeader';
import { Stack } from '../../molecules/Stack';
import { Slide } from '../Slide';
import { Step, Steps } from '../Steps';
import { Scatter } from './Scatter';
import { SCATTER_DEFAULTS } from './types';
import doc from './_docs/Scatter.md?raw';

// Placeholder stores: price of the average basket against monthly sales.
const STORES = {
  label: 'Tiendas',
  points: [
    { x: 18, y: 42, label: 'Tienda 1' },
    { x: 22, y: 51, label: 'Tienda 2' },
    { x: 25, y: 48, label: 'Tienda 3' },
    { x: 27, y: 60, label: 'Tienda 4' },
    { x: 31, y: 57, label: 'Tienda 5' },
    { x: 34, y: 66, label: 'Tienda 6' },
    { x: 36, y: 63, label: 'Tienda 7' },
    { x: 39, y: 74, label: 'Tienda 8' },
    { x: 42, y: 70, label: 'Tienda 9' },
    { x: 45, y: 81, label: 'Tienda 10' },
    { x: 48, y: 78, label: 'Tienda 11' },
    { x: 52, y: 88, label: 'Tienda 12' },
    { x: 29, y: 94, label: 'Tienda 13' },
  ],
};

const REGIONS = [
  { label: 'Norte', points: [{ x: 12, y: 3.1 }, { x: 18, y: 3.6 }, { x: 22, y: 4.0 }, { x: 27, y: 4.3 }, { x: 31, y: 4.9 }] },
  { label: 'Centro', points: [{ x: 20, y: 2.2 }, { x: 26, y: 2.6 }, { x: 33, y: 3.0 }, { x: 38, y: 3.3 }, { x: 44, y: 3.9 }] },
  { label: 'Sur', points: [{ x: 35, y: 4.6 }, { x: 40, y: 5.2 }, { x: 46, y: 5.5 }, { x: 52, y: 6.1 }, { x: 58, y: 6.4 }] },
];

const meta = {
  title: 'Organismos/Scatter',
  component: Scatter,
  tags: ['autodocs', '!dev'],
  parameters: { docs: { description: { component: doc } }, layout: 'padded' },
  args: { groups: [STORES], label: 'Ticket medio frente a ventas por tienda', xLabel: 'Ticket medio', yLabel: 'Ventas al mes', ...SCATTER_DEFAULTS, xUnit: ' €', yUnit: ' k€' },
  argTypes: {
    groups: { control: false, description: 'De uno a tres grupos de puntos. Con más de uno sale la leyenda.', table: { type: { summary: 'ScatterGroup[]' } } },
    label: { control: 'text', description: 'Nombre accesible de la gráfica.' },
    xLabel: { control: 'text', description: 'Título del eje horizontal.' },
    yLabel: { control: 'text', description: 'Título del eje vertical.' },
    highlight: { control: 'text', description: 'El `label` del punto que importa: en amarillo, más grande y con su nombre escrito. Uno por gráfica.' },
    xMin: { control: 'number', description: 'Mínimo del eje horizontal. Por defecto, un número redondo bajo el menor valor.' },
    xMax: { control: 'number', description: 'Máximo del eje horizontal. Por defecto, un número redondo sobre el mayor valor.' },
    yMin: { control: 'number', description: 'Mínimo del eje vertical. Por defecto, un número redondo bajo el menor valor.' },
    yMax: { control: 'number', description: 'Máximo del eje vertical. Por defecto, un número redondo sobre el mayor valor.' },
    xUnit: { control: 'text', description: 'Texto detrás de cada cifra horizontal (« €»).' },
    yUnit: { control: 'text', description: 'Texto detrás de cada cifra vertical (« %»).' },
    decimals: { control: 'number', description: 'Decimales de las cifras, en los dos ejes.', table: { defaultValue: { summary: '0' } } },
    className: { control: false, table: { disable: true } },
  },
} satisfies Meta<typeof Scatter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { tags: ['dev'] };

export const UnGrupo: Story = {
  name: 'Un grupo',
  parameters: { docs: { description: { story: 'Un punto por tienda, en tinta. Pasa el ratón por encima, o tabula hasta ella y usa ← →, para ver cada punto.' } } },
};

export const ConAcento: Story = {
  name: 'Con acento',
  parameters: { docs: { description: { story: '`highlight`: el punto que se sale de la tendencia, en amarillo y con su nombre escrito. Uno por gráfica.' } } },
  args: { highlight: 'Tienda 13' },
};

export const GrupoYContexto: Story = {
  name: 'Grupo y contexto',
  parameters: { docs: { description: { story: 'El grupo que cuenta la historia en tinta y el resto en gris, con leyenda.' } } },
  args: { groups: [{ label: 'Sur', points: REGIONS[2].points }, { label: 'Resto', points: [...REGIONS[0].points, ...REGIONS[1].points] }], label: 'Inversión frente a retorno por región', xLabel: 'Inversión', yLabel: 'Retorno', xUnit: ' k€', yUnit: ' %', decimals: 1, xMin: 0 },
};

export const PorPasos: Story = {
  name: 'Por pasos',
  parameters: { docs: { description: { story: 'Dentro de un `Steps`: en el paso 0 aparecen los puntos; en el paso 1, el mismo dibujo con el punto que se sale, en amarillo. Pulsa dentro y usa →.' } } },
  render: () => (
    <Slide id="dispersion">
      <Steps total={1}>
        <Stack>
          <SectionHeader title="Título de la parada" description="Una frase que dice qué cambia." align="center" />
          <Step from={0} to={1} collapse>
            <Scatter label="Ticket medio frente a ventas por tienda" groups={[STORES]} xLabel="Ticket medio" yLabel="Ventas al mes" xUnit=" €" yUnit=" k€" />
          </Step>
          <Step from={1} collapse>
            <Scatter label="Ticket medio frente a ventas por tienda" groups={[STORES]} xLabel="Ticket medio" yLabel="Ventas al mes" xUnit=" €" yUnit=" k€" highlight="Tienda 13" />
          </Step>
        </Stack>
      </Steps>
    </Slide>
  ),
};
