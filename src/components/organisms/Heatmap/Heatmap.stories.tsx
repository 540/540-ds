import type { Meta, StoryObj } from '@storybook/react-vite';
import { SectionHeader } from '../../molecules/SectionHeader';
import { Stack } from '../../molecules/Stack';
import { Slide } from '../Slide';
import { Step, Steps } from '../Steps';
import { Heatmap } from './Heatmap';
import { HEATMAP_DEFAULTS } from './types';
import doc from './_docs/Heatmap.md?raw';

const DAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
const HOURS = Array.from({ length: 24 }, (_, h) => `${h} h`);
// Placeholder activity: two working-day peaks (11 h and 17 h), quieter weekends.
const ACTIVITY = DAYS.map((_, d) =>
  HOURS.map((_, h) => {
    const peak = Math.exp(-((h - 11) ** 2) / 8) + 0.8 * Math.exp(-((h - 17) ** 2) / 6);
    const weekday = d < 5 ? 1 : 0.35;
    return Math.round(5 + 120 * peak * weekday + ((d * 7 + h * 3) % 9));
  }),
);

const TEAMS = ['Equipo A', 'Equipo B', 'Equipo C', 'Equipo D'];
const WEEKS = ['S1', 'S2', 'S3', 'S4', 'S5', 'S6'];
const LOAD = [
  [62, 70, 75, 81, 90, 94],
  [40, 44, 51, 49, 55, 60],
  [85, 88, 92, 97, 99, 100],
  [30, 35, 33, 41, 46, 52],
];

const meta = {
  title: 'Organismos/Heatmap',
  component: Heatmap,
  tags: ['autodocs', '!dev'],
  parameters: { docs: { description: { component: doc } }, layout: 'padded' },
  args: { rows: DAYS, columns: HOURS, values: ACTIVITY, label: 'Visitas por día y hora', ...HEATMAP_DEFAULTS },
  argTypes: {
    rows: { control: false, description: 'Los nombres de las filas, de arriba abajo.', table: { type: { summary: 'string[]' } } },
    columns: { control: false, description: 'Los nombres de las columnas, de izquierda a derecha. Con más de 12 se escribe una de cada dos (o de cada tres…).', table: { type: { summary: 'string[]' } } },
    values: { control: false, description: 'Una lista de cifras por fila, una cifra por columna.', table: { type: { summary: 'number[][]' } } },
    label: { control: 'text', description: 'Nombre accesible de la gráfica.' },
    tone: { control: 'select', options: ['ink', 'accent'], description: 'Color de las celdas.', table: { defaultValue: { summary: 'ink' } } },
    min: { control: 'number', description: 'Cifra de la celda más tenue. Por defecto, el menor valor.' },
    max: { control: 'number', description: 'Cifra del color pleno. Por defecto, el mayor valor.' },
    unit: { control: 'text', description: 'Texto detrás de cada cifra (« %»).' },
    decimals: { control: 'number', description: 'Decimales de las cifras.', table: { defaultValue: { summary: '0' } } },
    scale: { control: 'object', description: 'Las palabras de los extremos de la clave de color. Por defecto, las cifras `min` y `max`.' },
    className: { control: false, table: { disable: true } },
  },
} satisfies Meta<typeof Heatmap>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { tags: ['dev'] };

export const DiasYHoras: Story = {
  name: 'Días y horas',
  parameters: { docs: { description: { story: 'Siete filas por 24 columnas: se escribe una hora de cada dos. Pasa el ratón por una celda, o tabula hasta el mapa y usa las flechas, para ver su cifra.' } } },
};

export const EscalaConPalabras: Story = {
  name: 'Escala con palabras',
  parameters: { docs: { description: { story: '`scale` cambia las cifras de los extremos de la clave por palabras, cuando el número exacto no importa.' } } },
  args: { scale: { low: 'Poca', high: 'Mucha' } },
};

export const PocasColumnas: Story = {
  name: 'Pocas columnas',
  parameters: { docs: { description: { story: 'Equipos por semanas, en porcentaje: con pocas columnas las celdas crecen hasta un tope y se escriben todos los nombres.' } } },
  args: { label: 'Carga por equipo y semana', rows: TEAMS, columns: WEEKS, values: LOAD, unit: ' %', min: 0, max: 100 },
};

export const ConAcento: Story = {
  name: 'Con acento',
  parameters: { docs: { description: { story: 'En amarillo, cuando el mapa es lo único que importa en la parada. Cuenta para la cuota de amarillo de la charla.' } } },
  args: { label: 'Carga por equipo y semana', rows: TEAMS, columns: WEEKS, values: LOAD, unit: ' %', min: 0, max: 100, tone: 'accent' },
};

export const PorPasos: Story = {
  name: 'Por pasos',
  parameters: { docs: { description: { story: 'Dentro de un `Steps`: en el paso 0, la carga de las primeras semanas; en el paso 1, todas. Pulsa dentro y usa →.' } } },
  render: () => (
    <Slide id="mapa">
      <Steps total={1}>
        <Stack>
          <SectionHeader title="Título de la parada" description="Una frase que dice qué cambia." align="center" />
          <Step from={0} to={1} collapse>
            <Heatmap label="Carga por equipo, semanas 1 a 3" rows={TEAMS} columns={WEEKS.slice(0, 3)} values={LOAD.map((r) => r.slice(0, 3))} unit=" %" min={0} max={100} />
          </Step>
          <Step from={1} collapse>
            <Heatmap label="Carga por equipo y semana" rows={TEAMS} columns={WEEKS} values={LOAD} unit=" %" min={0} max={100} />
          </Step>
        </Stack>
      </Steps>
    </Slide>
  ),
};
