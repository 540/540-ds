import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from '../../atoms/Text';
import { Sheet } from '../Sheet';
import { Step, Steps } from '../Steps';
import { Timeline } from './Timeline';
import doc from './_docs/Timeline.md?raw';

const STEPS = [
  { title: 'Primer paso', body: 'Lo que pasó en el primer paso, en una o dos frases.' },
  { title: 'Segundo paso', body: 'Lo que pasó después, igual de corto.' },
  { title: 'Tercer paso', body: 'Un tercer hito, con su frase.' },
  { title: 'Cuarto paso', body: 'Y el último, que cierra la cronología.' },
];

const meta = {
  title: 'Organismos/Timeline',
  component: Timeline,
  tags: ['autodocs', '!dev'],
  parameters: { docs: { description: { component: doc }, story: { inline: false, height: '640px' } }, layout: 'fullscreen' },
  args: { id: 'recorrido', title: 'Título de la cronología', description: 'Una entradilla corta que la presenta.', steps: STEPS },
  argTypes: {
    id: { control: 'text', table: { type: { summary: 'string' } } },
    title: { control: 'text', table: { type: { summary: 'ReactNode' } } },
    description: { control: 'text', table: { type: { summary: 'ReactNode' } } },
    steps: { control: 'object', description: 'Los pasos, en orden. Cada uno es una parada.', table: { type: { summary: 'TimelineStep[]' } } },
    className: { control: false, table: { disable: true } },
  },
} satisfies Meta<typeof Timeline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { tags: ['dev'] };

export const ConAvisoYZoom: Story = {
  name: 'Con aviso y zoom',
  parameters: { docs: { description: { story: 'Pasos con antetítulo (la fecha), uno de aviso con el punto en rojo, y uno de zoom: dentro de un Steps, la flecha abre la hoja con el detalle del hito.' } } },
  args: {
    id: 'recorrido-aviso',
    steps: [
      { kicker: 'Mes uno', title: 'Primer hito', body: 'Lo que pasó en el primer mes.' },
      { kicker: 'El problema', title: 'Algo que no funcionaba como debía.', alert: true },
      { kicker: 'Mes tres', title: 'Tercer hito', body: 'Lo que cambió después.' },
      {
        kicker: 'Zoom · mes cuatro',
        title: 'Un hito con detalle',
        extra: (
          <Steps total={1}>
            <Step from={1}>
              <Sheet kicker="Zoom · mes cuatro" title="Un hito con detalle" description="Pulsa → con este paso a la vista para abrir la hoja.">
                <Text variant="body-m" tone="secondary">
                  El detalle ampliado del hito.
                </Text>
              </Sheet>
            </Step>
          </Steps>
        ),
      },
    ],
  },
};

export const CuatroPasos: Story = {
  name: 'Cuatro pasos',
  parameters: { docs: { description: { story: 'Cuatro pasos unidos por el eje. Baja con el scroll: la línea se dibuja y el punto aparece al entrar cada paso.' } } },
};
